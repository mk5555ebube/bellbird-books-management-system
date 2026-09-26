export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

type StockStatusDisplay = {
  label: string;
  className: string;
};

//Display label and colour classes for each stock status.
export const STOCK_STATUS_DISPLAY: Record<StockStatus, StockStatusDisplay> = {
  "in-stock": {
    label: "In stock",
    className: "bg-green-100 text-green-800",
  },
  "low-stock": {
    label: "Low stock",
    className: "bg-yellow-100 text-yellow-800",
  },
  "out-of-stock": {
    label: "Out of stock",
    className: "bg-red-100 text-red-800",
  },
};

/**
 MSD426GC3-27: Calculates whether a book is In stock, Low stock or Out of stock based on the available quantity and minimum stock threshold.
 Quantity above the minimum: in stock.
 Quantity at or below the minimum: low stock.
 Quantity of zero: out of stock.
 A negative quantity is rejected, since stock can never go below zero.
 */
export function getStockStatus(
  quantity: number,
  minimumStockLevel: number,
): StockStatus {
  if (quantity < 0) {
    throw new Error("Quantity cannot be negative.");
  }

  if (quantity === 0) {
    return "out-of-stock";
  }

  if (quantity <= minimumStockLevel) {
    return "low-stock";
  }

  return "in-stock";
}