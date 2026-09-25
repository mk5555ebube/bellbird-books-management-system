import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type EditableBookTitle = {
  id: string;
  title: string;
  author: string;
  isbn: string | null;
  section: string;
};

export async function getBookTitleForEdit(
  id: string,
): Promise<EditableBookTitle | null> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("book_titles")
    .select("id, title, author, isbn, section")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Unable to load book title for editing:", error);
    throw new Error("Unable to load the book title.");
  }

  return data;
}
