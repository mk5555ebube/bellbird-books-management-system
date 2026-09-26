import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

const replace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}));

import { CatalogueSearchForm } from "./catalogue-search-form";

describe("CatalogueSearchForm", () => {
  it("offers a labelled search field and a Search button", () => {
    render(<CatalogueSearchForm searchTerm="" />);

    expect(
      screen.getByRole("searchbox", { name: "Search by title or author" }),
    ).toHaveAttribute("name", "q");
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("keeps the current search term in the field", () => {
    render(<CatalogueSearchForm searchTerm="cold harv" />);

    expect(
      screen.getByRole("searchbox", { name: "Search by title or author" }),
    ).toHaveValue("cold harv");
  });

  it("only enables Clear while a search term is present", () => {
    const { rerender } = render(<CatalogueSearchForm searchTerm="" />);

    expect(screen.getByRole("button", { name: "Clear" })).toBeDisabled();

    rerender(<CatalogueSearchForm searchTerm="cold" />);

    expect(screen.getByRole("button", { name: "Clear" })).toBeEnabled();
  });
});
