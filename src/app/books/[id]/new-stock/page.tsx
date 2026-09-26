import { PageContainer } from "@/components/layout/page-container";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdjustmentForm } from "./adjustment-form";
import { StockForm } from "./stock-form";
import { StockStatusBadge } from "@/components/stock-status-badge";

export const metadata = {
  title: "New-book stock",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NewBookStockPage({ params }: PageProps) {
  const { id: bookTitleId } = await params;

  //Load any current stock for this book
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("new_book_stock")
    .select("selling_price, quantity, minimum_stock_level")
    .eq("book_title_id", bookTitleId)
    .maybeSingle();

  
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

      {error ? (
        <p role="alert" className="max-w-lg text-red-700">
          The stock details could not be loaded. Refresh the page and try again.
        </p>
      ) : (
        <div className="space-y-8">
          <StockForm bookTitleId={bookTitleId} initialValues={initialValues} />

          {data ? (
            <>
              <StockStatusBadge
                quantity={data.quantity}
                minimumStockLevel={data.minimum_stock_level}
              />
              <AdjustmentForm
                bookTitleId={bookTitleId}
                currentQuantity={data.quantity}
              />
            </>
          ) : (
            <p className="max-w-lg text-stone-600">
              Save the stock details above before adjusting the quantity.
            </p>
          )}
        </div>
      )}
    </PageContainer>
  );
}