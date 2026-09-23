import { PageContainer } from "./page-container";

type PlaceholderPageProps = {
  title: string;
  description: string;
  message: string;
};

export function PlaceholderPage({
  title,
  description,
  message,
}: PlaceholderPageProps) {
  return (
    <PageContainer>
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium tracking-wide text-stone-500 uppercase">
          Bellbird Books
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-stone-950">
          {title}
        </h1>

        <p className="mt-2 max-w-2xl text-stone-600">{description}</p>
      </header>

      <section
        aria-label={`${title} workspace`}
        className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-stone-900">
          Feature workspace
        </h2>

        <p className="mt-2 text-stone-600">{message}</p>
      </section>
    </PageContainer>
  );
}
