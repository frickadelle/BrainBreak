import { describe, expect, it } from "vitest";
import { CATEGORIES } from "../shared/types";
import { packages } from "../worker/content";
import { matchesDrawingWord } from "../worker/game";

describe("expanded bilingual content bank", () => {
  it("provides 42 unique questions per category with ten new medium and hard challenges", () => {
    const all = packages[0].questions;
    const ids = new Set<string>();
    for (const category of CATEGORIES.filter((c) => c !== "geography")) {
      expect(all[category]).toHaveLength(42);
      for (const question of all[category]) {
        expect(ids.has(question.id)).toBe(false);
        ids.add(question.id);
        expect(question.category).toBe(category);
        expect(question.prompt.de.trim()).not.toBe("");
        expect(question.prompt.en?.trim()).toBeTruthy();
        expect(question.explanation.de.trim()).not.toBe("");
        expect(question.explanation.en?.trim()).toBeTruthy();
        expect(["easy", "medium", "hard"]).toContain(question.difficulty);
        if (question.options) {
          expect(new Set(question.options.map((o) => o.id)).size).toBe(
            question.options.length,
          );
          for (const option of question.options)
            expect(option.text.en?.trim()).toBeTruthy();
          const answerIds =
            category === "association"
              ? Object.values(question.association!.targets).flat()
              : String(question.answer).split(",");
          for (const answer of answerIds)
            expect(question.options.map((o) => o.id)).toContain(answer);
          if (category === "order") {
            expect(new Set(answerIds).size).toBe(4);
            expect(question.options).toHaveLength(4);
          }
        }
        if (typeof question.answer === "number") {
          expect(Number.isFinite(question.answer)).toBe(true);
          expect(question.answer).toBeGreaterThanOrEqual(0);
        }
      }
      for (const difficulty of ["medium", "hard"]) {
        expect(
          all[category].filter((q) => q.difficulty === difficulty),
        ).toHaveLength(10);
      }
    }
    expect(ids.size).toBe(336);
    expect(all.geography).toEqual([]);
    expect(packages[1].questions).toEqual(all);
  });

  it("keeps drawing synonyms unique across the full bilingual pool", () => {
    const pool = packages[0].questions.drawing;
    for (const question of pool) {
      expect(question.drawing).toBeDefined();
      for (const language of ["de", "en"] as const) {
        const aliases = question.drawing!.aliases[language];
        expect(aliases).toContain(question.drawing!.word[language]);
        for (const alias of aliases) {
          expect(
            pool
              .filter((candidate) => matchesDrawingWord(candidate, alias))
              .map((q) => q.id),
          ).toEqual([question.id]);
        }
      }
    }
  });
});
