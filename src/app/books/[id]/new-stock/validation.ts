export type StockValues = {
  sellingPrice: string;
  quantity: string;
  minimumStockLevel: string;
};

export function validateStockValues(values: StockValues): string | null {
  const sellingPrice = values.sellingPrice.trim();
  const quantity = values.quantity.trim();
  const minimumStockLevel = values.minimumStockLevel.trim();

  if (
    sellingPrice === "" ||
    quantity === "" ||
    minimumStockLevel === ""
  ) {
    return "Please complete all three fields.";
  }

  // The price allows up to two decimal places.
  // The upper limits match the team's database columns.
  if (
    !/^\d+(\.\d{1,2})?$/.test(sellingPrice) ||
    Number(sellingPrice) > 99999999.99
  ) {
    return "Enter a price from 0 to 99,999,999.99, with up to two decimal places.";
  }

  if (
    !/^\d+$/.test(quantity) ||
    Number(quantity) > 2147483647
  ) {
    return "Quantity must be a whole number from 0 to 2,147,483,647.";
  }

  if (
    !/^\d+$/.test(minimumStockLevel) ||
    Number(minimumStockLevel) > 2147483647
  ) {
    return "Minimum stock must be a whole number from 0 to 2,147,483,647.";
  }

  return null;
}