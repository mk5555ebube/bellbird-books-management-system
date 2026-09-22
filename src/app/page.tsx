export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 p-6">
      <section className="w-full max-w-2xl rounded-2xl border border-stone-200 bg-white p-10">
        <h1 className="text-3xl font-semibold text-stone-900">
          Bellbird Books Management System
        </h1>
        <p className="mt-4 text-stone-600">
          Manage book titles, new and second-hand stock, customers and orders.
        </p>
      </section>
    </main>
  );
}