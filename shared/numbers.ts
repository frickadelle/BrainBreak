import type { Language } from "./types";

export function parseLocalizedNumber(
  input: string,
  language: Language,
): number | null {
  const raw = input.trim();
  // Grouping is accepted only in complete groups of three. Exponents, signs and units are rejected.
  const pattern =
    language === "de"
      ? /^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/
      : /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
  if (!pattern.test(raw) || raw.length > 40) return null;
  const normalized =
    language === "de"
      ? raw.replaceAll(".", "").replace(",", ".")
      : raw.replaceAll(",", "");
  const value = Number(normalized);
  return Number.isFinite(value) && value >= 0 ? value : null;
}

// Validate before translating separators so an invalid grouping cannot become a valid number.
// Keep the original digits and decimal precision rather than reformatting a floating-point value.
export function convertNumberInput(
  input: string,
  from: Language,
  to: Language,
): string | null {
  if (parseLocalizedNumber(input, from) === null) return null;
  if (from === to) return input.trim();
  return input
    .trim()
    .split(from === "de" ? "." : ",")
    .join("")
    .replace(from === "de" ? "," : ".", to === "de" ? "," : ".");
}

// An unfinished decimal can change separators without becoming a submitted answer.
export function convertNumberDraft(
  input: string,
  from: Language,
  to: Language,
): string | null {
  const valid = convertNumberInput(input, from, to);
  if (valid !== null) return valid;
  const raw = input.trim();
  if (!raw.endsWith(from === "de" ? "," : ".")) return null;
  const prefix = convertNumberInput(raw.slice(0, -1), from, to);
  return prefix === null ? null : prefix + (to === "de" ? "," : ".");
}
