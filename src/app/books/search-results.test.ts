import { buildSearchFilter } from "./search";

const books = [
  { title: "Cold Harvest", author: "R. Nakamura" },
  { title: "Brave New World", author: "Aldous Huxley" },
  { title: "Wintering Grounds", author: "J. P. Halloran" },
];

/**
 * Applies an or() ilike filter the way PostgreSQL would: case-insensitive,
 * with % matching any characters. This lets the search rules be tested
 * without a database connection.
 */
function search(searchTerm: string) {
  const clauses = buildSearchFilter(searchTerm)
    .split(/,(?=\w+\.ilike\.)/)
    .map((clause) => {
      const [column, , pattern] = clause.split(/\.(ilike)\./);
      const value = pattern
        .slice(1, -1)
        .replace(/\\([%_])/g, "$1")
        .toLowerCase();

      return { column: column as "title" | "author", value };
    });

  return books
    .filter((book) =>
      clauses.some(({ column, value }) =>
        book[column].toLowerCase().includes(value),
      ),
    )
    .map((book) => book.title);
}

describe("searching the catalogue", () => {
  it("finds a title from its complete name", () => {
    expect(search("Cold Harvest")).toEqual(["Cold Harvest"]);
  });

  it("finds a title from part of its name", () => {
    expect(search("harv")).toEqual(["Cold Harvest"]);
  });

  it("finds a book from part of the author's name", () => {
    expect(search("huxl")).toEqual(["Brave New World"]);
  });

  it("ignores capital letters", () => {
    expect(search("WINTERING")).toEqual(["Wintering Grounds"]);
    expect(search("cold harvest")).toEqual(["Cold Harvest"]);
  });

  it("returns nothing when no title or author matches", () => {
    expect(search("zzzz")).toEqual([]);
  });
});
