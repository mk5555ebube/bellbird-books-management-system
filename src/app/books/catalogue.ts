export type BookTitleRow = {
  id: string;
  title: string;
  author: string;
  isbn: string | null;
  section: string;
};

export const BOOK_TITLE_COLUMNS = "id, title, author, isbn, section";

/**
 * Raised when the catalogue cannot be read. The message is safe to show to
 * staff and never contains database or credential details.
 */
export class CatalogueLoadError extends Error {
  constructor(
    message = "The catalogue could not be loaded. Please try again.",
  ) {
    super(message);
    this.name = "CatalogueLoadError";
  }
}

/**
 * MSD426GC3-39: turns a Supabase response into catalogue rows.
 *
 * An empty catalogue is a valid result and returns an empty list. A database
 * failure raises CatalogueLoadError so the page can show one clear message.
 */
export function readCatalogueResult(result: {
  data: unknown;
  error: unknown;
}): BookTitleRow[] {
  if (result.error) {
    throw new CatalogueLoadError();
  }

  return (result.data ?? []) as BookTitleRow[];
}
