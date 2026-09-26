"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { validateStockValues } from "./validation";

export type StockSaveResult = {
  status: "success" | "error";
  message: string;
};

export async function saveNewBookStock(
  bookTitleId: string,
  formData: FormData,
): Promise<StockSaveResult> {
  const values = {
    sellingPrice: String(formData.get("sellingPrice") ?? ""),
    quantity: String(formData.get("quantity") ?? ""),
    minimumStockLevel: String(formData.get("minimumStockLevel") ?? ""),
  };

  const validationError = validateStockValues(values);

  if (validationError) {
    return {
      status: "error",
      message: validationError,
    };
  }

  //Check if book ID is in standard UUID format
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!uuidPattern.test(bookTitleId)) {
    return {
      status: "error",
      message: "Select a valid book before saving stock.",
    };
  }

  try {
    const supabase = createSupabaseServerClient();

    //Insert new stock row for this book or update if a record already exxists
    const { error } = await supabase.from("new_book_stock").upsert(
      {
        book_title_id: bookTitleId,
        selling_price: Number(values.sellingPrice),
        quantity: Number(values.quantity),
        minimum_stock_level: Number(values.minimumStockLevel),
      },
      {
        onConflict: "book_title_id",
      },
    );

    if (error) {
      return {
        status: "error",
        message:
          error.code === "23503"
            ? "This book no longer exists. Please select another book."
            : "Stock could not be saved. Please try again.",
      };
    }
  } catch {
    return {
      status: "error",
      message: "The save request failed. Please try again.",
    };
  }

  //Update pages that may display the changed stock information.
  revalidatePath("/books");
  revalidatePath(`/books/${bookTitleId}`);
  revalidatePath(`/books/${bookTitleId}/new-stock`);

  return {
    status: "success",
    message: "Stock saved successfully.",
  };
}