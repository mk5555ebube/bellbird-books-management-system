"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";

import { createBookTitle } from "./actions";
import { initialBookTitleFormState } from "./validation";

export function AddBookForm() {
  const [state, formAction, isPending] = useActionState(
    createBookTitle,
    initialBookTitleFormState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="space-y-7">
      {state.message ? (
        <div
          role={state.status === "error" ? "alert" : "status"}
          className={`rounded-lg border px-4 py-3 text-sm ${
            state.status === "success"
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-stone-950"
        >
          Title <span className="font-normal text-stone-500">Required</span>
        </label>

        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Enter book title"
          defaultValue={state.values.title}
          aria-invalid={Boolean(state.fieldErrors.title)}
          aria-describedby={state.fieldErrors.title ? "title-error" : undefined}
          className="mt-3 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-950 shadow-sm outline-none placeholder:text-stone-500 focus:border-stone-700 focus:ring-2 focus:ring-stone-200"
        />

        {state.fieldErrors.title ? (
          <p id="title-error" className="mt-2 text-sm text-red-700">
            {state.fieldErrors.title}
          </p>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-stone-950"
          >
            Author <span className="font-normal text-stone-500">Required</span>
          </label>

          <input
            id="author"
            name="author"
            type="text"
            required
            placeholder="Enter author name"
            defaultValue={state.values.author}
            aria-invalid={Boolean(state.fieldErrors.author)}
            aria-describedby={
              state.fieldErrors.author ? "author-error" : undefined
            }
            className="mt-3 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-950 shadow-sm outline-none placeholder:text-stone-500 focus:border-stone-700 focus:ring-2 focus:ring-stone-200"
          />

          {state.fieldErrors.author ? (
            <p id="author-error" className="mt-2 text-sm text-red-700">
              {state.fieldErrors.author}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="isbn"
            className="block text-sm font-medium text-stone-950"
          >
            ISBN <span className="font-normal text-stone-500">Optional</span>
          </label>

          <input
            id="isbn"
            name="isbn"
            type="text"
            placeholder="Enter ISBN"
            defaultValue={state.values.isbn}
            aria-invalid={Boolean(state.fieldErrors.isbn)}
            aria-describedby={
              state.fieldErrors.isbn ? "isbn-help isbn-error" : "isbn-help"
            }
            className="mt-3 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-950 shadow-sm outline-none placeholder:text-stone-500 focus:border-stone-700 focus:ring-2 focus:ring-stone-200"
          />

          <p id="isbn-help" className="mt-2 text-sm text-stone-500">
            Existing ISBNs will trigger a duplicate warning.
          </p>

          {state.fieldErrors.isbn ? (
            <p id="isbn-error" className="mt-2 text-sm text-red-700">
              {state.fieldErrors.isbn}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor="section"
          className="block text-sm font-medium text-stone-950"
        >
          Shop section{" "}
          <span className="font-normal text-stone-500">Required</span>
        </label>

        <select
          id="section"
          name="section"
          required
          defaultValue={state.values.section}
          aria-invalid={Boolean(state.fieldErrors.section)}
          aria-describedby={
            state.fieldErrors.section ? "section-error" : undefined
          }
          className="mt-3 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-950 shadow-sm outline-none focus:border-stone-700 focus:ring-2 focus:ring-stone-200"
        >
          <option value="" disabled>
            Select a section
          </option>
          <option value="Classics">Classics</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Fiction">Fiction</option>
          <option value="Literary fiction">Literary fiction</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Science fiction">Science fiction</option>
          <option value="Other">Other</option>
        </select>

        {state.fieldErrors.section ? (
          <p id="section-error" className="mt-2 text-sm text-red-700">
            {state.fieldErrors.section}
          </p>
        ) : null}
      </div>

      <div className="flex justify-end gap-3 border-t border-stone-200 pt-6">
        <Link
          href="/books"
          className="rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-800 hover:bg-stone-50"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-stone-950 px-5 py-3 text-sm font-medium text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving…" : "Save book"}
        </button>
      </div>
    </form>
  );
}
