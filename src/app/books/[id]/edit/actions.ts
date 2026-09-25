"use server";

import { revalidatePath } from "next/cache";

import {
  type BookTitleFormState,
  validateBookTitleForm,
} from "@/app/books/new/validation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateBookTitle(
  bookId: string,
  previousState: BookTitleFormState,
  formData: FormData,
): Promise<BookTitleFormState> {
  void previousState;

  const validation = validateBookTitleForm(formData);

  if (!validation.success) {
    return validation.state;
  }

  const { data } = validation;
  const values = {
    title: data.title,
    author: data.author,
    isbn: data.isbn ?? "",
    section: data.section,
  };

  const supabase = createSupabaseServerClient();

  const { data: updatedBook, error } = await supabase
    .from("book_titles")
    .update({
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      section: data.section,
    })
    .eq("id", bookId)
    .select("id")
    .maybeSingle();

  if (error?.code === "23505") {
    return {
      status: "error",
      message: "Another book with this ISBN already exists.",
      fieldErrors: {
        isbn: "This ISBN is already being used.",
      },
      values,
    };
  }

  if (error) {
    console.error("Unable to update book title:", error);

    return {
      status: "error",
      message: "The book could not be updated. Please try again.",
      fieldErrors: {},
      values,
    };
  }

  if (!updatedBook) {
    return {
      status: "error",
      message: "This book could not be found.",
      fieldErrors: {},
      values,
    };
  }

  revalidatePath("/books");
  revalidatePath(`/books/${bookId}`);
  revalidatePath(`/books/${bookId}/edit`);

  return {
    status: "success",
    message: "Book information updated successfully.",
    fieldErrors: {},
    values,
  };
}
