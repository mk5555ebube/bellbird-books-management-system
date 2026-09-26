# MSD426GC3-26 - Increase or decrease a new book's quantity

## Summary

This feature allows staff to increase or decrease the available quantity of a new-book title from the `/books/[id]/new-stock` route, without retyping the full stock details.

The adjustment card only appears once a stock record already exists for the book. If it doesn't exist yet, staff are told to save the stock details first.

## Fields

- Adjustment type - Increase or Decrease (required, no default selected)
- Number of copies - required

## Validation

- A direction (Increase or Decrease) must be chosen.
- The amount is required.
- The amount must be a positive whole number from 1 to 2,147,483,647.
- Decreasing more than the current quantity is rejected (stock cannot go negative).
- Increasing past 2,147,483,647 is rejected.
- The book ID must be a valid UUID.

## Data flow

1. The page loads the book's current stock. The adjustment form is shown only if a stock record exists.
2. The user selects Increase or Decrease and enters an amount, then submits.
3. The server action validates the amount and direction.
4. The current quantity and `updated_at` are read from Supabase.
5. The new quantity is calculated and checked for negative results and overflow.
6. The update is saved only if `updated_at` still matches the value just read, so a second person's change in the meantime is not silently overwritten.
7. On success, the form clears and the page refreshes so the stock form above shows the new quantity too.
8. Validation or database errors are returned as messages without exposing credentials.

## Files

- `adjustment-form.tsx` - direction, amount, saving state and messages
- `adjustment-actions.ts` - validates, reads current quantity, calculates and saves the new value with the `updated_at` guard
- `adjustment-validation.ts` - validation of the amount and direction
- `page.tsx` - modified to show the adjustment form only when a stock record exists
- `stock-form.tsx` - modified so its quantity field re-renders with the latest value after an adjustment

## Requirements

- `new_book_stock` must have an `updated_at` column that changes on every update, for the concurrency check to work.

## Security

- Supabase access occurs through the server-side client.
- No credentials or `.env.local` values are committed.

## Testing completed

- Increase quantity
- Decrease quantity
- Decrease to exactly zero
- Decrease rejected when it would go below zero
- Amount of zero rejected
- Negative amount rejected
- Decimal amount rejected
- Empty amount rejected
- No direction selected rejected
- Adjusted quantity persists after page reload
- Stock form's quantity field updates after an adjustment without a manual refresh
- Selling price and minimum stock level unaffected by a quantity adjustment
- Adjustment card hidden, with a prompt to save stock first, for a book with no stock record
- Linting and production build