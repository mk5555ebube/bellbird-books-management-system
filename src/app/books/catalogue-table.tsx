import Link from "next/link";

import type { BookTitleRow } from "./catalogue";

type CatalogueTableProps = {
  books: BookTitleRow[];
  emptyMessage?: string;
};

export function CatalogueTable({
  books,
  emptyMessage = "No book titles have been recorded yet.",
}: CatalogueTableProps) {
  if (books.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-stone-300 bg-white p-6 text-stone-600">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Recorded book titles</caption>

        <thead className="border-b border-stone-200 bg-stone-50 text-stone-600">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">
              Title
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Author
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              ISBN
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Shop section
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-stone-200">
          {books.map((book) => (
            <tr key={book.id} className="hover:bg-stone-50">
              <td className="px-4 py-3 font-medium text-stone-950">
                <Link
                  href={`/books/${book.id}`}
                  className="underline underline-offset-4 hover:text-stone-700"
                >
                  {book.title}
                </Link>
              </td>

              <td className="px-4 py-3 text-stone-700">{book.author}</td>

              <td className="px-4 py-3 text-stone-500">
                {book.isbn ?? "No ISBN"}
              </td>

              <td className="px-4 py-3 text-stone-700">{book.section}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
