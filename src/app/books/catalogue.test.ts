import { CatalogueLoadError, readCatalogueResult } from "./catalogue";

const book = {
  id: "11111111-1111-4111-8111-111111111111",
  title: "Cold Harvest",
  author: "R. Nakamura",
  isbn: null,
  section: "Fiction",
};

describe("readCatalogueResult", () => {
  it("returns the recorded book titles", () => {
    expect(readCatalogueResult({ data: [book], error: null })).toEqual([book]);
  });

  it("treats an empty catalogue as a valid empty list", () => {
    expect(readCatalogueResult({ data: [], error: null })).toEqual([]);
  });

  it("returns an empty list when Supabase sends no rows", () => {
    expect(readCatalogueResult({ data: null, error: null })).toEqual([]);
  });

  it("raises a catalogue error when the query fails", () => {
    expect(() =>
      readCatalogueResult({
        data: null,
        error: { message: 'relation "book_titles" does not exist' },
      }),
    ).toThrow(CatalogueLoadError);
  });

  it("does not expose database details in the error message", () => {
    expect(() =>
      readCatalogueResult({
        data: null,
        error: { message: 'relation "book_titles" does not exist' },
      }),
    ).toThrow("The catalogue could not be loaded. Please try again.");
  });
});
