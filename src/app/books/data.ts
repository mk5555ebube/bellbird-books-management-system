import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import {
  BOOK_TITLE_COLUMNS,
  type BookTitleRow,
  readCatalogueResult,
} from "./catalogue";
import { buildSearchFilter } from "./search";

export type BookTitleQuery = {
  /** MSD426GC3-54: matches part of a title or author, ignoring capitals. */
  searchTerm?: string;
};

/**
 * MSD426GC3-39 and MSD426GC3-54: reads recorded book titles, ordered by title.
 * When a search term is supplied, only matching titles are returned.
 */
export async function getBookTitles(
  options: BookTitleQuery = {},
): Promise<BookTitleRow[]> {
  const supabase = createSupabaseServerClient();
  const searchTerm = options.searchTerm?.trim() ?? "";

  let query = supabase.from("book_titles").select(BOOK_TITLE_COLUMNS);

  if (searchTerm) {
    query = query.or(buildSearchFilter(searchTerm));
  }

  const result = await query.order("title", { ascending: true });

  if (result.error) {
    console.error("Unable to load the book catalogue:", result.error);
  }

  return readCatalogueResult(result);
}
