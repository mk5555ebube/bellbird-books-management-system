import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";

import { CatalogueLoadError, type BookTitleRow } from "./catalogue";
import { CatalogueTable } from "./catalogue-table";
import { getBookTitles } from "./data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Books",
};

export default async function BooksPage() {
  let books: BookTitleRow[] = [];
  let loadError: string | null = null;

  try {
    books = await getBookTitles();
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
          Every book title recorded by the shop. New-book stock and second-hand
          copies are recorded against these titles.
        </p>

        <Link
          href="/books/new"
          className="mt-4 inline-block rounded-lg bg-stone-950 px-5 py-3 text-sm font-medium text-white hover:bg-stone-800"
        >
          Add book
        </Link>
      </header>

      {loadError ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {loadError}
        </p>
      ) : (
        <CatalogueTable books={books} />
      )}
    </PageContainer>
  );
}
