import type { Question } from "../../shared/types";

function words(
  prefix: string,
  entries: [string, string, string[], string[]][],
): Question[] {
  return entries.map(([de, en, germanAliases, englishAliases], i) => ({
    id: `${prefix}-drawing-${String(i + 1).padStart(2, "0")}`,
    category: "drawing",
    prompt: {
      de: "Eine Person zeichnet. Was zeigt das Bild?",
      en: "One person is drawing. What does the picture show?",
    },
    // Canonical identities never encode the secret word.
    answer: `${prefix}-concept-${i + 1}`,
    explanation: { de: "Das gesuchte Wort war:", en: "The word was:" },
    drawing: {
      word: { de, en },
      aliases: { de: [de, ...germanAliases], en: [en, ...englishAliases] },
    },
  }));
}
export const drawingQuestions: Record<string, Question[]> = {
  "starter-01": words("s1", [
    ["Fahrrad", "bicycle", ["Rad"], ["bike"]],
    ["Baum", "tree", [], []],
    ["Regenschirm", "umbrella", ["Schirm"], []],
    ["Rakete", "rocket", [], []],
    ["Schlüssel", "key", ["Schluessel"], []],
    ["Haus", "house", [], []],
  ]),
  "starter-02": words("s2", [
    ["Sonne", "sun", [], []],
    ["Katze", "cat", [], []],
    ["Fisch", "fish", [], []],
    ["Berg", "mountain", [], []],
    ["Stern", "star", [], []],
    ["Auto", "car", ["Automobil"], ["automobile"]],
  ]),
};
