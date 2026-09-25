import { notFound } from "next/navigation";

import { PageContainer } from "@/components/layout/page-container";

import { getBookTitleForEdit } from "./data";
import { EditBookForm } from "./edit-book-form";

export const metadata = {
  title: "Edit book",
};

type EditBookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBookPage({ params }: EditBookPageProps) {
  const { id } = await params;
  const book = await getBookTitleForEdit(id);

  if (!book) {
    notFound();
  }

  return (
    <PageContainer>
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium tracking-wide text-stone-500 uppercase">
          Bellbird Books
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-stone-950">
          Edit book
        </h1>

        <p className="mt-2 max-w-2xl text-stone-600">
          Update shared book-title information.
        </p>
      </header>

      <section
        aria-label="Edit book form"
        className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
      >
        <EditBookForm book={book} />
      </section>
    </PageContainer>
  );
}
