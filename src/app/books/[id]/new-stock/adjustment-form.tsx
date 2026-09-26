"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import {
  adjustNewBookQuantity,
  type StockAdjustmentResult,
} from "./adjustment-actions";

type AdjustmentFormProps = {
  bookTitleId: string;
  currentQuantity: number;
};

const inputClassName =
  "mt-1 w-full rounded-md border border-stone-300 px-3 py-2";

export function AdjustmentForm({
  bookTitleId,
  currentQuantity,
}: AdjustmentFormProps) {
  const router = useRouter();
  const [result, setResult] = useState<StockAdjustmentResult | null>(null);
  const [isAdjusting, setIsAdjusting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsAdjusting(true);
    setResult(null);

    try {
      const response = await adjustNewBookQuantity(bookTitleId, formData);
      setResult(response);

      if (response.status === "success") {
        
        form.reset();

        router.refresh();
      }
    } catch {
      setResult({
        status: "error",
        message: "The adjustment request failed. Please try again.",
      });
    } finally {
      setIsAdjusting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => setResult(null)}
      aria-busy={isAdjusting}
      className="max-w-lg space-y-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-stone-950">
          Adjust quantity
        </h2>

        <p className="mt-1 text-stone-600">
          Current quantity: {currentQuantity}
        </p>
      </div>

      <fieldset disabled={isAdjusting} className="space-y-6">
        <fieldset className="space-y-2">
          <legend className="font-medium text-stone-900">
            Adjustment type
          </legend>

          <div className="flex gap-6">
            <label
              htmlFor="direction-increase"
              className="flex items-center gap-2 text-stone-900"
            >
              <input
                id="direction-increase"
                name="direction"
                type="radio"
                value="increase"
                className="h-4 w-4"
              />
              Increase
            </label>

            <label
              htmlFor="direction-decrease"
              className="flex items-center gap-2 text-stone-900"
            >
              <input
                id="direction-decrease"
                name="direction"
                type="radio"
                value="decrease"
                className="h-4 w-4"
              />
              Decrease
            </label>
          </div>
        </fieldset>

        <div>
          <label htmlFor="amount" className="block font-medium text-stone-900">
            Number of copies
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="1"
            max="2147483647"
            step="1"
            required
            className={inputClassName}
          />
        </div>

        <button
          type="submit"
          disabled={isAdjusting}
          className="rounded-md bg-stone-900 px-4 py-2 font-medium text-white hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isAdjusting ? "Adjusting..." : "Adjust stock"}
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