import { PageContainer } from "@/components/layout/page-container";

export default function Loading() {
  return (
    <PageContainer>
      <div
        role="status"
        className="rounded-xl border border-stone-200 bg-white p-6 text-stone-600 shadow-sm"
      >
        Loading…
      </div>
    </PageContainer>
  );
}
