import {
  buildSearchFilter,
  buildSearchPattern,
  MAX_SEARCH_LENGTH,
  normaliseSearchTerm,
} from "./search";

describe("normaliseSearchTerm", () => {
  it("trims spaces and collapses repeated spaces", () => {
    expect(normaliseSearchTerm("  cold   harvest ")).toBe("cold harvest");
  });

  it("returns an empty string when nothing usable was typed", () => {
    expect(normaliseSearchTerm(undefined)).toBe("");
    expect(normaliseSearchTerm("   ")).toBe("");
  });

  it("uses the first value when the address repeats the parameter", () => {
    expect(normaliseSearchTerm(["lantern", "ignored"])).toBe("lantern");
  });

  it("limits very long search terms", () => {
    expect(normaliseSearchTerm("a".repeat(500))).toHaveLength(
      MAX_SEARCH_LENGTH,
    );
  });
});

describe("buildSearchPattern", () => {
  it("matches any part of the recorded value", () => {
    expect(buildSearchPattern("harv")).toBe("%harv%");
  });

  it("treats % and _ as ordinary characters", () => {
    expect(buildSearchPattern("50%_off")).toBe("%50\\%\\_off%");
  });

  it("removes characters that would break the database filter", () => {
    expect(buildSearchPattern('salt, line ("2nd")')).toBe("%salt line 2nd%");
  });
});

describe("buildSearchFilter", () => {
  it("searches both the title and the author", () => {
    expect(buildSearchFilter("nakam")).toBe(
      "title.ilike.%nakam%,author.ilike.%nakam%",
    );
  });
});
