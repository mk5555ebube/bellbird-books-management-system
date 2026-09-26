export function validateStockAdjustment(
  amount: string,
  direction: string,
): string | null {
  if (direction !== "increase" && direction !== "decrease") {
    return "Choose whether to increase or decrease stock.";
  }

  const trimmedAmount = amount.trim();

  if (trimmedAmount === "") {
    return "Enter the number of copies to add or remove.";
  }

  if (!/^\d+$/.test(trimmedAmount)) {
    return "The adjustment amount must be a positive whole number.";
  }

  const adjustmentAmount = Number(trimmedAmount);

  //Keeping the amount within the database's integer limit.
  if (adjustmentAmount < 1 || adjustmentAmount > 2147483647) {
    return "Enter an adjustment amount from 1 to 2,147,483,647.";
  }

  return null;
}