/**
 * Shared numeric-entry helpers for `NumberInput` and `MoneyInput`.
 *
 * Both components display grouped values ("65,950"), which makes the raw text
 * in the field unsafe to emit or to parse: `parseFloat("65,950.")` is 65, and a
 * consumer parsing with decimal.js throws outright on the separator. Everything
 * here exists to guarantee one property — a value handed to `onChange` is always
 * safe to pass to `Number()`, `parseFloat`, or a decimal library.
 */

export type NumberInputMode = "POSITIVE_INTEGERS" | "INTEGERS" | "FLOATS";

function allowedCharsPattern(mode: NumberInputMode): RegExp {
  if (mode === "FLOATS") return /[^\d.-]/g;
  if (mode === "INTEGERS") return /[^\d-]/g;
  return /[^\d]/g;
}

/** Strips grouping separators and every character the mode disallows. */
export function sanitize(raw: string, mode: NumberInputMode): string {
  return raw.replace(allowedCharsPattern(mode), "");
}

/**
 * True while the value is a syntactically incomplete number the user is still
 * typing: a lone minus, a trailing decimal point, or trailing zeros after the
 * point ("1.", "1.0", "1.00"). These are kept as strings rather than parsed,
 * since parsing collapses "1.0" to 1 and swallows the keystroke.
 */
export function isPartialEntry(sanitized: string, mode: NumberInputMode): boolean {
  if (sanitized === "-") return true;
  if (mode !== "FLOATS") return false;
  return /^-?\d*\.\d*$/.test(sanitized) && !/[1-9]$/.test(sanitized);
}

export function parseNumber(sanitized: string, mode: NumberInputMode): number | string {
  // Partial entries are checked first: a lone "-" is the start of a negative
  // number, not a zero, and collapsing it here would make negatives untypable.
  if (isPartialEntry(sanitized, mode)) return sanitized;
  if (sanitized === "" || sanitized === ".") return 0;

  const num = mode === "FLOATS" ? parseFloat(sanitized) : parseInt(sanitized, 10);
  return isNaN(num) ? 0 : num;
}

/**
 * Prefixes like "-", "." and "-." must stay on screen so the number can be
 * finished, but they are not values — emit 0 for them instead of a string no
 * numeric parser accepts.
 */
export function toEmittedValue(parsed: number | string): number | string {
  return typeof parsed === "string" && !isFinite(Number(parsed)) ? 0 : parsed;
}

/** Parses a sanitized string to a settled number, for use on blur. */
export function toSettledNumber(sanitized: string, mode: NumberInputMode): number {
  const num = mode === "FLOATS" ? parseFloat(sanitized) : parseInt(sanitized, 10);
  return isNaN(num) ? 0 : num;
}
