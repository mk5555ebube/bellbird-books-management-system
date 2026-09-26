# MSD426GC3-25 — Add price, quantity and minimum stock to a book

## Summary

This feature allows staff to set the selling price, available quantity and minimum stock level for a new-book title from the `/books/[id]/new-stock` route.

The page loads the current stock for the book if there's any and lets staff save or update it.

## Fields

- Selling price (AUD) — required
- Available quantity — required
- Minimum stock level — required

## Validation

- All three fields are required.
- Selling price must be from 0 to 99,999,999.99 with up to two decimal places.
- Quantity must be a whole number from 0 to 2,147,483,647.
- Minimum stock level must be a whole number from 0 to 2,147,483,647.
- Negative values are rejected.
- The book ID must be a valid UUID.
- Saving for a book that no longer exists returns an error message.

## Data flow

1. The page reads the book ID from the URL and loads any existing stock for that book.
2. The user completes the form and submits it.
3. The server action validates the submitted values and the book ID.
4. Valid data is upserted into the Supabase `new_book_stock` table, matched on `book_title_id`, so each book has one stock row.
5. A success message is displayed and the related book pages are revalidated.
6. Validation or database errors are returned as messages without exposing credentials.

## Files

- `page.tsx` - loads the book ID and existing stock
- `stock-form.tsx` - saving state and messages
- `actions.ts` - server action that saves to Supabase
- `validation.ts` - validation of the submitted values

## Requirements

- `new_book_stock.book_title_id` must have a unique constraint (or be the primary key) for the upsert to work.

## Security

- Supabase access occurs through the server-side client.
- No credentials or `.env.local` values are committed.

## Testing completed

- Required-field validation (all fields empty, one field empty)
- Negative value validation (price, quantity, minimum stock)
- Decimal quantity rejected
- Price with more than two decimal places rejected
- Oversized value rejected
- Successful Supabase insertion
- Saved values shown after page refresh
- Saving the same book twice updates the same row (no duplicates)
- Zero values accepted