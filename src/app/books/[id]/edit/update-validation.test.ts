import { describe, expect, it } from "vitest";

import { validateBookTitleForm } from "@/app/books/new/validation";

type BookFormOverrides = {
  title?: string;
  author?: string;
  isbn?: string;
  section?: string;
};

function createBookFormData(overrides: BookFormOverrides = {}) {
  const formData = new FormData();

  formData.set("title", overrides.title ?? "Bellbird Test Updated");
  formData.set("author", overrides.author ?? "Test Author");
  formData.set("isbn", overrides.isbn ?? "9780000000002");
  formData.set("section", overrides.section ?? "Fantasy");

  return formData;
}

describe("Edit Book validation", () => {
  it("accepts valid updated book information", () => {
    const result = validateBookTitleForm(createBookFormData());

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual({
        title: "Bellbird Test Updated",
        author: "Test Author",
        isbn: "9780000000002",
        section: "Fantasy",
      });
    }
  });

  it("rejects missing required update fields", () => {
    const result = validateBookTitleForm(
      createBookFormData({
        title: " ",
        author: " ",
        section: " ",
      }),
    );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.state.fieldErrors).toEqual({
        title: "Enter the book title.",
        author: "Enter the author’s name.",
        section: "Enter the book section.",
      });
    }
  });

  it("rejects an invalid ISBN during an update", () => {
    const result = validateBookTitleForm(
      createBookFormData({
        isbn: "123",
      }),
    );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.state.fieldErrors.isbn).toBe(
        "Enter a valid 10-digit or 13-digit ISBN.",
      );
    }
  });

  it("normalises a formatted ISBN before an update", () => {
    const result = validateBookTitleForm(
      createBookFormData({
        isbn: "978-0-00-000000-2",
      }),
    );

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.isbn).toBe("9780000000002");
    }
  });
});
