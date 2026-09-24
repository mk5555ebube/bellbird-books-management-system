import { PageContainer } from "@/components/layout/page-container";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StockForm } from "./stock-form";

export const metadata = {
  title: "New-book stock",
};

const inputClassName =
  "mt-1 w-full rounded-md border border-stone-300 px-3 py-2";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NewBookStockPage({ params }: PageProps) {
  const { id: bookTitleId } = await params;

  //Load any current stock for this book
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("new_book_stock")
    .select("selling_price, quantity, minimum_stock_level")
    .eq("book_title_id", bookTitleId)
    .maybeSingle();

  //Convert to String
  const initialValues = {
    sellingPrice: data ? String(data.selling_price) : "",
    quantity: data ? String(data.quantity) : "",
    minimumStockLevel: data ? String(data.minimum_stock_level) : "",
  };

  return (
    <PageContainer>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-stone-950">
          New Book Stock
        </h1>

        <p className="mt-2 text-stone-600">
          Set the selling price, available quantity and minimum stock level.
        </p>
      </header>

      <StockForm bookTitleId={bookTitleId} initialValues={initialValues} />
    </PageContainer>
  );
}