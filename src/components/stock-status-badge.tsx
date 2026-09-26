import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getStockStatus, STOCK_STATUS_DISPLAY } from "@/lib/stock-status";

type StockStatusBadgeProps = {
  quantity: number;
  minimumStockLevel: number;
};


export function StockStatusBadge({
  quantity,
  minimumStockLevel,
}: StockStatusBadgeProps) {
  const status = getStockStatus(quantity, minimumStockLevel);
  const display = STOCK_STATUS_DISPLAY[status];

  return (
    <span
      className={
        "inline-block rounded-full px-2 py-1 text-xs font-medium " +
        display.className
      }
    >
      {display.label}
    </span>
  );
}

type StockStatusForBookProps = {
  bookTitleId: string;
};

//For pages that only have a book's ID, this looks up that book's own stock and renders the badge. It will show nothing if the book has no stock record yet.

export async function StockStatusForBook({
  bookTitleId,
}: StockStatusForBookProps) {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("new_book_stock")
    .select("quantity, minimum_stock_level")
    .eq("book_title_id", bookTitleId)
    .maybeSingle();

  if (!data) {
    return null;
  }

  return (
    <StockStatusBadge
      quantity={data.quantity}
      minimumStockLevel={data.minimum_stock_level}
    />
  );
}
