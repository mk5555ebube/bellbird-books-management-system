import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import {
  BOOK_TITLE_COLUMNS,
  type BookTitleRow,
  readCatalogueResult,
} from "./catalogue";

/**
 * MSD426GC3-39: reads every recorded book title, ordered by title.
 */
export async function getBookTitles(): Promise<BookTitleRow[]> {
  const supabase = createSupabaseServerClient();

  const result = await supabase
    .from("book_titles")
    .select(BOOK_TITLE_COLUMNS)
    .order("title", { ascending: true });

  if (result.error) {
    console.error("Unable to load the book catalogue:", result.error);
  }

  return readCatalogueResult(result);
}
