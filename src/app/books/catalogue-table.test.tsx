import { render, screen } from "@testing-library/react";

import { CatalogueTable } from "./catalogue-table";

const books = [
  {
    id: "1",
    title: "Cold Harvest",
    author: "R. Nakamura",
    isbn: null,
    section: "Fiction",
  },
  {
    id: "2",
    title: "The Lantern Keeper",
    author: "I. Rand",
    isbn: "9780994117205",
    section: "Literary fiction",
  },
];

describe("CatalogueTable", () => {
  it("shows one row for each recorded title", () => {
    render(<CatalogueTable books={books} />);

    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getByText("R. Nakamura")).toBeInTheDocument();
    expect(screen.getByText("9780994117205")).toBeInTheDocument();
    expect(screen.getByText("Literary fiction")).toBeInTheDocument();
  });

  it("links each title to its book-detail page", () => {
    render(<CatalogueTable books={books} />);

    expect(
      screen.getByRole("link", { name: "The Lantern Keeper" }),
    ).toHaveAttribute("href", "/books/2");
  });

  it("shows No ISBN for titles recorded without one", () => {
    render(<CatalogueTable books={books} />);

    expect(screen.getByText("No ISBN")).toBeInTheDocument();
  });

  it("explains an empty catalogue instead of showing an empty table", () => {
    render(<CatalogueTable books={[]} />);

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(
      screen.getByText("No book titles have been recorded yet."),
    ).toBeInTheDocument();
  });

  it("uses a supplied empty message", () => {
    render(<CatalogueTable books={[]} emptyMessage="Nothing matched." />);

    expect(screen.getByText("Nothing matched.")).toBeInTheDocument();
  });
});
