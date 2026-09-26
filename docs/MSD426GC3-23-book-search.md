# MSD426GC3-23 - Search by complete or partial title or author

## Summary

Staff can find a book on the catalogue page by typing any part of its title
or its author's name, so a customer question can be answered without walking
the shop floor.

The feature is implemented within the `/books` route and uses the shared
Bellbird Books layout.

## Implementation

- Added a search control to the book catalogue page.
- Added search-term cleaning and filter building in `search.ts`.
- Extended the catalogue query with an optional search term.
- Used a case-insensitive `ilike` filter across title and author.
- Added a result count and a separate no-match message.
- Held the search term in the address as `/books?q=<term>`.

## Search behaviour

- A complete or partial title returns every matching book.
- A complete or partial author name returns every matching book.
- Capital letters are ignored.
- Results update as staff type, after a short pause.
- The Search button and the Enter key run the same search at once.
- Clear empties the field and returns the full catalogue.
- An unmatched search explains that clearly instead of showing an empty table.

## Data flow

1. The page reads `q` from the address and cleans it.
2. The cleaned term is passed to the catalogue query.
3. A case-insensitive filter is built for the title and author columns.
4. Supabase returns only matching rows, so filtering happens in the database.
5. The catalogue table renders the results or the no-match message.

## Design decisions

- Filtering runs in the database, so the search still works as the catalogue
  grows to several thousand titles.
- Search-as-you-type waits 300 milliseconds after the last keystroke, so
  typing a six-letter title sends one query rather than six.
- The search control is a client component, because live results need browser
  state. The catalogue page and its query remain server-side.
- `%` and `_` are escaped and bracket characters removed, so a term such as
  `50% off` is matched literally and cannot break the database filter.

## Security

- Supabase access occurs through the server-side client.
- The Supabase secret key is not sent to the browser.
- Search input is escaped before it reaches the database filter.
- Row Level Security remains enabled on `book_titles`.

## Testing completed

- Complete title search
- Partial title search
- Partial author search
- Case-insensitive search
- Unmatched search returns no results
- Search text trimmed, collapsed and length-limited
- Repeated address parameters handled
- Wildcards escaped and unsafe characters removed
- Search field labelled, named and pre-filled from the address
- Clear disabled until a search term is present
- Linting, unit tests and production build
