"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import {
  type BookTitleFormState,
  initialBookTitleFormState,
  validateBookTitleForm,
} from "./validation";

export async function createBookTitle(
  previousState: BookTitleFormState,
  formData: FormData,
): Promise<BookTitleFormState> {
  void previousState;

  const validation = validateBookTitleForm(formData);

  if (!validation.success) {
    return validation.state;
  }

  const { data } = validation;
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from("book_titles").insert({
    title: data.title,
    author: data.author,
    isbn: data.isbn,
    section: data.section,
  });

  if (error?.code === "23505") {
    return {
      status: "error",
      message: "A book with this ISBN already exists.",
      fieldErrors: {
        isbn: "This ISBN is already being used.",
      },
      values: {
        title: data.title,
        author: data.author,
        isbn: data.isbn ?? "",
        section: data.section,
      },
    };
  }

  if (error) {
    console.error("Unable to create book title:", error);

    return {
      status: "error",
      message: "The book could not be saved. Please try again.",
      fieldErrors: {},
      values: {
        title: data.title,
        author: data.author,
        isbn: data.isbn ?? "",
        section: data.section,
      },
    };
  }

  revalidatePath("/books");

  return {
    ...initialBookTitleFormState,
    status: "success",
    message: "Book title added successfully.",
  };
}
