"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { validateStockAdjustment } from "./adjustment-validation";

export type StockAdjustmentResult = {
  status: "success" | "error";
  message: string;
};

export async function adjustNewBookQuantity(
  bookTitleId: string,
  formData: FormData,
): Promise<StockAdjustmentResult> {
  const amount = String(formData.get("amount") ?? "");
  const direction = String(formData.get("direction") ?? "");

  const validationError = validateStockAdjustment(amount, direction);

  if (validationError) {
    return { status: "error", message: validationError };
  }

  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!uuidPattern.test(bookTitleId)) {
    return {
      status: "error",
      message: "Select a valid book before adjusting stock.",
    };
  }

  try {
    const supabase = createSupabaseServerClient();

    //Read the current quantity before calculating the adjustment.
    const { data: stock, error: readError } = await supabase
      .from("new_book_stock")
      .select("quantity, updated_at")
      .eq("book_title_id", bookTitleId)
      .maybeSingle();

    if (readError) {
      return {
        status: "error",
        message: "Current stock could not be loaded. Please try again.",
      };
    }

    if (!stock) {
      return {
        status: "error",
        message: "Save this book's initial stock details before adjusting it.",
      };
    }

    const adjustmentAmount = Number(amount);

    const newQuantity =
      direction === "increase"
        ? stock.quantity + adjustmentAmount
        : stock.quantity - adjustmentAmount;

    if (newQuantity < 0) {
      return {
        status: "error",
        message: `Only ${stock.quantity} copies are available. You cannot remove more than this.`,
      };
    }

    if (newQuantity > 2147483647) {
      return {
        status: "error",
        message: "The resulting quantity cannot exceed 2,147,483,647.",
      };
    }

    //Save only if the record has not changed since we read it.
    const { data: updatedStock, error: updateError } = await supabase
      .from("new_book_stock")
      .update({ quantity: newQuantity })
      .eq("book_title_id", bookTitleId)
      .eq("updated_at", stock.updated_at)
      .select("quantity")
      .maybeSingle();

    if (updateError) {
      return {
        status: "error",
        message: "Stock could not be adjusted. Please try again.",
      };
    }

    if (!updatedStock) {
      return {
        status: "error",
        message:
          "The stock record changed or was removed. Refresh the page and check it before trying again.",
      };
    }
  } catch {
    return {
      status: "error",
      message: "The adjustment request failed. Please try again.",
    };
  }

  revalidatePath("/books");
  revalidatePath(`/books/${bookTitleId}`);
  revalidatePath(`/books/${bookTitleId}/new-stock`);

  return {
    status: "success",
    message: "Stock quantity adjusted successfully.",
  };
}