"use client";

import { PageContainer } from "@/components/layout/page-container";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <PageContainer>
      <section className="rounded-xl border border-red-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-stone-950">
          Something went wrong
        </h1>

        <p className="mt-3 text-stone-600">
          The request could not be completed. Please try again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700"
        >
          Try again
        </button>
      </section>
    </PageContainer>
  );
}
