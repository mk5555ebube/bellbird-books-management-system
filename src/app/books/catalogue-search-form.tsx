"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

type CatalogueSearchFormProps = {
  searchTerm: string;
};

/** How long to wait after the last keystroke before searching. */
const TYPING_PAUSE_MS = 300;

/**
 * MSD426GC3-54: the catalogue search control.
 *
 * Results update as staff type, so a customer question can be answered
 * without a second click. The Search button and the Enter key run the same
 * search immediately. The term stays in the address, so a search can be
 * refreshed, bookmarked or shared, and submitting the form still works if
 * JavaScript has not loaded.
 */
export function CatalogueSearchForm({ searchTerm }: CatalogueSearchFormProps) {
  const router = useRouter();
  const [value, setValue] = useState(searchTerm);
  const lastRequested = useRef(searchTerm);

  function runSearch(term: string) {
    const trimmed = term.trim();
    lastRequested.current = trimmed;
    router.replace(
      trimmed ? `/books?q=${encodeURIComponent(trimmed)}` : "/books",
    );
  }

  // Keep the field in step when the address changes elsewhere, such as the
  // browser back button.
  useEffect(() => {
    setValue(searchTerm);
    lastRequested.current = searchTerm;
  }, [searchTerm]);

  // Wait for a pause in typing before asking the server, so a six-letter
  // title does not send six queries.
  useEffect(() => {
    const trimmed = value.trim();

    if (trimmed === lastRequested.current) {
      return;
    }

    const timer = setTimeout(() => runSearch(trimmed), TYPING_PAUSE_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runSearch(value);
  }

  return (
    <form
      method="get"
      action="/books"
      role="search"
      onSubmit={onSubmit}
      className="mb-6 flex max-w-3xl items-center gap-3"
    >
      <label htmlFor="catalogue-search" className="sr-only">
        Search by title or author
      </label>

      <input
        id="catalogue-search"
        type="search"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Part of a title or author, such as cold harv"
        className="min-w-0 flex-1 rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-950 shadow-sm outline-none placeholder:text-stone-500 focus:border-stone-700 focus:ring-2 focus:ring-stone-200"
      />

      <button
        type="submit"
        className="w-28 shrink-0 rounded-lg bg-stone-950 px-4 py-3 text-sm font-medium text-white hover:bg-stone-800"
      >
        Search
      </button>

      <button
        type="button"
        onClick={() => setValue("")}
        disabled={value === ""}
        className="w-28 shrink-0 rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-800 hover:bg-stone-50 disabled:invisible"
      >
        Clear
      </button>
    </form>
  );
}
