"use client";

import { useState, type FormEvent } from "react";

import { saveNewBookStock, type StockSaveResult } from "./actions";
import type { StockValues } from "./validation";

type StockFormProps = {
  bookTitleId: string;
  initialValues: StockValues;
};

const inputClassName =
  "mt-1 w-full rounded-md border border-stone-300 px-3 py-2";

export function StockForm({
  bookTitleId,
  initialValues,
}: StockFormProps) {
  const [result, setResult] = useState<StockSaveResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    
    const formData = new FormData(event.currentTarget);

    setIsSaving(true);
    setResult(null);

    try {
      const response = await saveNewBookStock(bookTitleId, formData);
      setResult(response);
    } catch {
      setResult({
        status: "error",
        message: "The save request failed. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => setResult(null)}
      aria-busy={isSaving}
      className="max-w-lg space-y-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
    >
      <fieldset disabled={isSaving} className="space-y-6">
        <div>
          <label
            htmlFor="selling-price"
            className="block font-medium text-stone-900"
          >
            Selling price (AUD)
          </label>
          <input
            id="selling-price"
            name="sellingPrice"
            type="number"
            min="0"
            max="99999999.99"
            step="0.01"
            required
            defaultValue={initialValues.sellingPrice}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block font-medium text-stone-900"
          >
            Available quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            max="2147483647"
            step="1"
            required
            defaultValue={initialValues.quantity}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="minimum-stock"
            className="block font-medium text-stone-900"
          >
            Minimum stock level
          </label>
          <input
            id="minimum-stock"
            name="minimumStockLevel"
            type="number"
            min="0"
            max="2147483647"
            step="1"
            required
            defaultValue={initialValues.minimumStockLevel}
            className={inputClassName}
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-md bg-stone-900 px-4 py-2 font-medium text-white hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save stock"}
        </button>
      </fieldset>

      {result && (
        <p
          role={result.status === "error" ? "alert" : "status"}
          className={
            result.status === "error" ? "text-red-700" : "text-green-700"
          }
        >
          {result.message}
        </p>
      )}
    </form>
  );
}