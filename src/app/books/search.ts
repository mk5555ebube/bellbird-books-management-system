/** The longest search term accepted; anything longer is trimmed. */
export const MAX_SEARCH_LENGTH = 100;

/**
 * MSD426GC3-54: cleans what a staff member typed. Trims, collapses repeated
 * spaces and limits the length. Returns an empty string when nothing usable
 * was entered.
 */
export function normaliseSearchTerm(value: unknown): string {
  const raw = Array.isArray(value) ? value[0] : value;

  if (typeof raw !== "string") {
    return "";
  }

  return raw.replace(/\s+/g, " ").trim().slice(0, MAX_SEARCH_LENGTH);
}

/**
 * Builds the pattern used by an ilike filter so a search matches any part of
 * a title or author. Characters that would break a PostgREST or() filter are
 * removed, and the % and _ wildcards are escaped so they match literally.
 */
export function buildSearchPattern(searchTerm: string): string {
  const safe = searchTerm
    .replace(/[(),"\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return `%${safe.replace(/[%_]/g, (character) => `\\${character}`)}%`;
}

/** The or() filter that matches the term against the title or the author. */
export function buildSearchFilter(searchTerm: string): string {
  const pattern = buildSearchPattern(searchTerm);

  return `title.ilike.${pattern},author.ilike.${pattern}`;
}
