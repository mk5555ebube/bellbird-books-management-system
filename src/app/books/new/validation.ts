export type BookTitleField = "title" | "author" | "isbn" | "section";

export type BookTitleValues = Record<BookTitleField, string>;

export type BookTitleFormState = {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors: Partial<Record<BookTitleField, string>>;
  values: BookTitleValues;
};

export const initialBookTitleFormState: BookTitleFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: {
    title: "",
    author: "",
    isbn: "",
    section: "",
  },
};

function readField(formData: FormData, field: BookTitleField) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export function validateBookTitleForm(formData: FormData) {
  const values: BookTitleValues = {
    title: readField(formData, "title"),
    author: readField(formData, "author"),
    isbn: readField(formData, "isbn"),
    section: readField(formData, "section"),
  };

  const fieldErrors: BookTitleFormState["fieldErrors"] = {};

  if (!values.title) {
    fieldErrors.title = "Enter the book title.";
  }

  if (!values.author) {
    fieldErrors.author = "Enter the author’s name.";
  }

  if (!values.section) {
    fieldErrors.section = "Enter the book section.";
  }

  const normalisedIsbn = values.isbn.replace(/[\s-]/g, "").toUpperCase();

  if (normalisedIsbn && !/^(?:\d{9}[\dX]|\d{13})$/.test(normalisedIsbn)) {
    fieldErrors.isbn = "Enter a valid 10-digit or 13-digit ISBN.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false as const,
      state: {
        status: "error" as const,
        message: "Check the highlighted fields and try again.",
        fieldErrors,
        values,
      },
    };
  }

  return {
    success: true as const,
    data: {
      title: values.title,
      author: values.author,
      isbn: normalisedIsbn || null,
      section: values.section,
    },
  };
}
