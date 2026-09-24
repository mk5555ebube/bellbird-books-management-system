import { validateBookTitleForm } from "./validation";

function createFormData(values: {
  title?: string;
  author?: string;
  isbn?: string;
  section?: string;
}) {
  const formData = new FormData();

  formData.set("title", values.title ?? "");
  formData.set("author", values.author ?? "");
  formData.set("isbn", values.isbn ?? "");
  formData.set("section", values.section ?? "");

  return formData;
}

describe("book-title validation", () => {
  it("rejects missing required fields", () => {
    const result = validateBookTitleForm(
      createFormData({
        title: " ",
        author: "",
        isbn: "",
        section: "",
      }),
    );

    expect(result.success).toBe(false);

    if (result.success) {
      throw new Error("Expected validation to fail.");
    }

    expect(result.state.fieldErrors).toEqual({
      title: "Enter the book title.",
      author: "Enter the author’s name.",
      section: "Enter the book section.",
    });
  });

  it("rejects an invalid ISBN", () => {
    const result = validateBookTitleForm(
      createFormData({
        title: "Test Book",
        author: "Test Author",
        isbn: "12345",
        section: "Fiction",
      }),
    );

    expect(result.success).toBe(false);

    if (result.success) {
      throw new Error("Expected validation to fail.");
    }

    expect(result.state.fieldErrors.isbn).toBe(
      "Enter a valid 10-digit or 13-digit ISBN.",
    );
  });

  it("normalises and accepts a valid ISBN", () => {
    const result = validateBookTitleForm(
      createFormData({
        title: " Test Book ",
        author: " Test Author ",
        isbn: "978-0-00000-000-2",
        section: " Fiction ",
      }),
    );

    expect(result.success).toBe(true);

    if (!result.success) {
      throw new Error("Expected validation to succeed.");
    }

    expect(result.data).toEqual({
      title: "Test Book",
      author: "Test Author",
      isbn: "9780000000002",
      section: "Fiction",
    });
  });

  it("allows ISBN to be omitted", () => {
    const result = validateBookTitleForm(
      createFormData({
        title: "Book Without ISBN",
        author: "Test Author",
        section: "Other",
      }),
    );

    expect(result.success).toBe(true);

    if (!result.success) {
      throw new Error("Expected validation to succeed.");
    }

    expect(result.data.isbn).toBeNull();
  });
});
