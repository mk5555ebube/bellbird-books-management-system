import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";

import { CatalogueSearchForm } from "./catalogue-search-form";
import { CatalogueTable } from "./catalogue-table";
import { CatalogueLoadError, type BookTitleRow } from "./catalogue";
import { getBookTitles } from "./data";
import { normaliseSearchTerm } from "./search";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Books",
};

type BooksPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const searchTerm = normaliseSearchTerm((await searchParams).q);

  let books: BookTitleRow[] = [];
  let loadError: string | null = null;

  try {
    books = await getBookTitles({ searchTerm });
  } catch (error) {
    loadError =
      error instanceof CatalogueLoadError
        ? error.message
        : "The catalogue could not be loaded. Please try again.";
  }

  return (
    <PageContainer>
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium tracking-wide text-stone-500 uppercase">
          Bellbird Books
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-stone-950">
          Book catalogue
        </h1>

        <p className="mt-2 max-w-2xl text-stone-600">
          Every book title recorded by the shop. Search by any part of a title
          or author; capital letters do not matter.
        </p>

        <Link
          href="/books/new"
          className="mt-4 inline-block rounded-lg bg-stone-950 px-5 py-3 text-sm font-medium text-white hover:bg-stone-800"
        >
          Add book
        </Link>
      </header>

      <CatalogueSearchForm searchTerm={searchTerm} />

      {searchTerm && !loadError && books.length > 0 ? (
        <p role="status" className="mb-3 text-sm text-stone-600">
          {books.length} {books.length === 1 ? "title matches" : "titles match"}{" "}
          &ldquo;{searchTerm}&rdquo;.
        </p>
      ) : null}

      {loadError ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {loadError}
        </p>
      ) : (
        <CatalogueTable
          books={books}
          emptyMessage={
            searchTerm
              ? `No book titles match “${searchTerm}”. Check the spelling, or try fewer words such as the author's surname.`
              : "No book titles have been recorded yet."
          }
        />
      )}
    </PageContainer>
  );
}
