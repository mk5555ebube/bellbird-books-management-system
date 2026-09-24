# Feature Ownership

This document defines the agreed feature boundaries for the Bellbird Books Management System.

All feature branches must be created from the latest `develop` branch after MSD426GC3-14 has been merged.

## Ebubechukwu Ezeilo

Stories:

- MSD426GC3-14 — Shared layout and navigation
- MSD426GC3-19 — Add a book-title record
- MSD426GC3-22 — Edit book-title information

Primary ownership:

- `src/app/layout.tsx`
- `src/app/books/new/`
- `src/app/books/[id]/edit/`
- `src/components/layout/`
- Shared book-form components

## Alsih Ranabhat

Stories:

- MSD426GC3-20 — View the book catalogue
- MSD426GC3-23 — Search by title or author
- MSD426GC3-24 — Filter by section and stock type

Primary ownership:

- `src/app/books/page.tsx`
- Catalogue components
- Search components
- Filtering components
- Book-query functions

## Pamath Dassanayake

Stories:

- MSD426GC3-25 — Add price, quantity and minimum-stock information
- MSD426GC3-26 — Increase or decrease new-book quantity
- MSD426GC3-27 — Identify low-stock and out-of-stock books

Primary ownership:

- `src/app/books/[id]/new-stock/`
- `src/components/new-book-stock/`
- New-book-stock actions
- Stock validation
- Low-stock status calculation

## Manimel Peiris

Stories:

- MSD426GC3-21 — View individual book details
- MSD426GC3-28 — Record each second-hand book individually
- MSD426GC3-30 — View and update an individual second-hand copy

Primary ownership:

- `src/app/books/[id]/page.tsx`
- `src/app/books/[id]/second-hand/`
- `src/components/second-hand/`
- Second-hand-copy actions and validation

## Shared rules

- Do not edit another member’s primary files without coordinating first.
- Create one feature branch per Jira story.
- Pull the latest `develop` before creating a branch.
- Keep database changes in timestamped migration files.
- Do not commit credentials or `.env.local`.
- Run linting, tests and the production build before opening a pull request.
- MSD426GC3-29 is a duplicate of MSD426GC3-28 and is excluded.
