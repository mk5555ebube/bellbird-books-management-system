# MSD426GC3-19 - Add a book-title record

## Summary

This feature allows staff to add a shared book-title record from the `/books/new` route.

The page follows the approved Add Book wireframe and uses the shared Bellbird Books layout and navigation.

## Fields

- Title - required
- Author - required
- ISBN - optional
- Shop section - required

## Validation

- Blank titles are rejected.
- Blank authors are rejected.
- A shop section must be selected.
- ISBNs must contain 10 or 13 characters after spaces and hyphens are removed.
- Duplicate ISBNs are rejected.
- ISBN values are normalised before being stored.

## Data flow

1. The user completes the Add Book form.
2. The server action validates the submitted values.
3. Valid data is inserted into the Supabase `book_titles` table.
4. A success message is displayed and the form is cleared.
5. Validation or database errors are returned without exposing credentials.

## Security

- Supabase access occurs through the server-side client.
- The Supabase secret key is not sent to the browser.
- No credentials or `.env.local` values are committed.
- Row Level Security remains enabled on `book_titles`.

## Testing completed

- Required-field validation
- Invalid ISBN validation
- ISBN normalisation
- Optional ISBN handling
- Duplicate ISBN protection
- Successful Supabase insertion
- Responsive UI comparison against the approved wireframe
- Linting and production build
