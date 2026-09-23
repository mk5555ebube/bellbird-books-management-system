import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";

export default function NotFound() {
  return (
    <PageContainer>
      <section className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-stone-500">404</p>

        <h1 className="mt-2 text-3xl font-semibold text-stone-950">
          Page not found
        </h1>

        <p className="mt-3 text-stone-600">
          The requested Bellbird Books page could not be found.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700"
        >
          Return to dashboard
        </Link>
      </section>
    </PageContainer>
  );
}
