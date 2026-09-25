# MSD426GC3-22 - Edit book-title information

## Summary

This story adds the ability to load and update an existing book-title record.

The feature is implemented within the `/books/[id]/edit` route and uses the shared Bellbird Books layout.

## Implementation

- Added an Edit Book page.
- Loaded the existing record from Supabase using its UUID.
- Adapted the Book Form with prefilled values.
- Added a server-side update operation.
- Reused the existing book-title validation rules.
- Added success, validation and database error messages.
- Revalidated affected book routes after a successful update.

## Validation

The Edit Book form validates:

- Required title
- Required author
- Required shop section
- Optional 10-digit or 13-digit ISBN
- ISBN normalisation
- Duplicate ISBN conflicts

## Testing

Four update-validation tests cover:

- Valid updated book information
- Missing required fields
- Invalid ISBN values
- Formatted ISBN normalisation

Manual testing confirmed:

- Existing book information loads correctly.
- Valid updates are saved to Supabase.
- Successful updates display confirmation.
- Invalid ISBN values display validation errors.

## Feature isolation

The implementation is isolated within `src/app/books/[id]/edit`.

It does not modify the book catalogue page or the individual book-details page owned by other team members.
