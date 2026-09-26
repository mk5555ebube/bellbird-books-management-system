# MSD426GC3-20 - View the book catalogue

## Summary

This story replaces the `/books` placeholder with the recorded book catalogue,
so staff can see every title without walking the shop floor.

The page uses the shared Bellbird Books layout, navigation and page container.

## What the page shows

- Title, linked to the book-detail page (MSD426GC3-21)
- Author
- ISBN, or "No ISBN" when the title was recorded without one
- Shop section
- An "Add book" link to `/books/new` (MSD426GC3-19)

Titles are ordered alphabetically.

## States handled

- Titles recorded: a table with one row per title.
- No titles recorded: a plain message, not an empty table.
- Database failure: one clear alert, with no database or credential details.

## Data flow

1. The page requests the catalogue from the server-only data module.
2. The module reads `book_titles` through the server-side Supabase client.
3. `readCatalogueResult` returns the rows, or raises `CatalogueLoadError`.
4. The page renders the table, the empty message, or the error alert.

## Files

- `src/app/books/catalogue.ts` - row type, column list and result handling
- `src/app/books/data.ts` - server-only Supabase query
- `src/app/books/catalogue-table.tsx` - table and empty state
- `src/app/books/page.tsx` - catalogue page

## Security

- Supabase is read only through the server-side client.
- The Supabase secret key is never sent to the browser.
- Database error details are logged on the server, not shown to staff.
- Row Level Security remains enabled on `book_titles`.

## Testing completed

- Catalogue rows returned from a successful query
- Empty catalogue handled as a valid empty list
- Missing rows from Supabase handled as an empty list
- Database failure raises a safe catalogue error
- Error message contains no database details
- Table renders one row per title with author, ISBN and section
- Title links to the book-detail page
- "No ISBN" shown when a title has no ISBN
- Empty state shown instead of an empty table
- Linting and unit tests
