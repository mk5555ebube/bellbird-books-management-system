import { PageContainer } from "@/components/layout/page-container";

import { AddBookForm } from "./add-book-form";

export const metadata = {
  title: "Add book",
};

export default function AddBookPage() {
  return (
    <PageContainer>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-950">
          Add book
        </h1>

        <p className="mt-2 text-stone-600">Create a shared book-title record</p>
      </header>

      <section
        aria-label="Add book form"
        className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <AddBookForm />
      </section>
    </PageContainer>
  );
}
