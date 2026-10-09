import { describe, expect, it } from "vitest";
import { CATEGORIES } from "../shared/types";
import { isPuzzleCategory } from "../shared/puzzles";
import { validPuzzleQuestion } from "../worker/puzzles";
import { readFileSync, existsSync } from "node:fs";
import { wordleDictionary } from "../worker/content/bank-puzzles";
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
            isPuzzleCategory(category) && category !== "countries"
              ? []
              : category === "association"
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
      expect(all[category].filter((q) => q.difficulty === "easy")).toHaveLength(
        22,
      );
      for (const difficulty of ["medium", "hard"]) {
        expect(
          all[category].filter((q) => q.difficulty === difficulty),
        ).toHaveLength(10);
      }
    }
    expect(ids.size).toBe(630);
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

  it("validates all authored puzzle definitions and keeps identities opaque", () => {
    for (const category of CATEGORIES.filter(isPuzzleCategory)) {
      for (const question of packages[0].questions[category]) {
        expect(validPuzzleQuestion(question), question.id).toBe(true);
        expect(question.id).toMatch(/^bank-[a-z]+-[a-f0-9]{10}$/);
      }
    }
  });

  it("provides distinct twelve-card SET boards with genuinely different difficulty", () => {
    const signatures = new Set<string>();
    for (const question of packages[0].questions.sets) {
      const puzzle = question.puzzle!;
      if (puzzle.kind !== "sets") throw new Error("Wrong puzzle kind");
      expect(puzzle.cards).toHaveLength(12);
      const fields = ["shape", "color", "count", "fill"] as const;
      const active = fields.slice(0, puzzle.features);
      const designs = puzzle.cards.map((card) =>
        active.map((field) => card[field]).join("/"),
      );
      expect(new Set(designs).size).toBe(12);
      const signature = [...designs].sort().join("|");
      expect(signatures.has(signature)).toBe(false);
      signatures.add(signature);
      let solutions = 0;
      for (let a = 0; a < 12; a++)
        for (let b = a + 1; b < 12; b++)
          for (let c = b + 1; c < 12; c++)
            if (
              active.every((field) =>
                [1, 3].includes(
                  new Set([
                    puzzle.cards[a][field],
                    puzzle.cards[b][field],
                    puzzle.cards[c][field],
                  ]).size,
                ),
              )
            )
              solutions++;
      if (question.difficulty === "easy") {
        expect(puzzle.features).toBe(3);
        expect(solutions).toBeGreaterThanOrEqual(9);
      } else if (question.difficulty === "medium") {
        expect(puzzle.features).toBe(3);
        expect(solutions).toBeGreaterThanOrEqual(1);
        expect(solutions).toBeLessThanOrEqual(6);
      } else {
        expect(puzzle.features).toBe(4);
        expect(solutions).toBeGreaterThanOrEqual(1);
        expect(solutions).toBeLessThanOrEqual(4);
      }
    }
  });

  it("partitions distinct bilingual connection boards into complete four-word groups", () => {
    const signatures = new Set<string>();
    for (const question of packages[0].questions.connections) {
      const puzzle = question.puzzle!;
      if (puzzle.kind !== "connections") throw new Error("Wrong puzzle kind");
      const count =
        question.difficulty === "easy"
          ? 2
          : question.difficulty === "medium"
            ? 3
            : 4;
      expect(puzzle.groups).toHaveLength(count);
      expect(question.options).toHaveLength(count * 4);
      for (const group of puzzle.groups) {
        expect(group.ids).toHaveLength(4);
        expect(group.title.de.trim()).toBeTruthy();
        expect(group.title.en?.trim()).toBeTruthy();
        expect(group.id).toMatch(/^[a-f0-9]{8}$/);
      }
      expect(new Set(puzzle.groups.flatMap((group) => group.ids))).toEqual(
        new Set(question.options!.map((option) => option.id)),
      );
      for (const language of ["de", "en"] as const)
        expect(
          new Set(
            question.options!.map((option) =>
              option.text[language]?.toLowerCase(),
            ),
          ).size,
        ).toBe(count * 4);
      const signature = question
        .options!.map((option) => option.text.en)
        .sort()
        .join("|");
      expect(signatures.has(signature)).toBe(false);
      signatures.add(signature);
    }
  });

  it("uses a finite common English dictionary and 42 distinct five-letter Wordle secrets", () => {
    expect(wordleDictionary.length).toBeGreaterThan(500);
    expect(new Set(wordleDictionary).size).toBe(wordleDictionary.length);
    const words = new Set<string>();
    for (const question of packages[0].questions.wordle) {
      const puzzle = question.puzzle!;
      if (puzzle.kind !== "wordle") throw new Error("Wrong puzzle kind");
      expect(puzzle.word).toMatch(/^[A-Z]{5}$/);
      expect(puzzle.allowed).toContain(puzzle.word);
      expect(puzzle.allowed).toEqual(wordleDictionary);
      expect(words.has(puzzle.word)).toBe(false);
      words.add(puzzle.word);
    }
  });

  it("provides unique memory sequences and distinct reviewed wavelength scales", () => {
    const sequences = new Set<string>();
    for (const question of packages[0].questions.memory) {
      const puzzle = question.puzzle!;
      if (puzzle.kind !== "memory") throw new Error("Wrong puzzle kind");
      const length =
        question.difficulty === "easy"
          ? 4
          : question.difficulty === "medium"
            ? 5
            : 6;
      expect(puzzle.sequence).toHaveLength(length);
      expect(puzzle.previewMs).toBe(
        question.difficulty === "easy"
          ? 4000
          : question.difficulty === "medium"
            ? 3500
            : 3000,
      );
      const signature = puzzle.sequence.join("|");
      expect(sequences.has(signature)).toBe(false);
      sequences.add(signature);
    }
    const scales = new Set<string>();
    for (const question of packages[0].questions.wavelength) {
      const puzzle = question.puzzle!;
      if (puzzle.kind !== "wavelength") throw new Error("Wrong puzzle kind");
      expect(puzzle.target).toBeGreaterThanOrEqual(20);
      expect(puzzle.target).toBeLessThanOrEqual(80);
      const signature = puzzle.left.en + "|" + puzzle.right.en;
      expect(scales.has(signature)).toBe(false);
      scales.add(signature);
    }
  });

  it("bundles 42 distinct local country illustrations without readable answer metadata", () => {
    const images = new Set<string>();
    const drawings = new Set<string>();
    const kinds = { flag: 0, outline: 0 };
    for (const question of packages[0].questions.countries) {
      const puzzle = question.puzzle!;
      if (puzzle.kind !== "countries") throw new Error("Wrong puzzle kind");
      expect(puzzle.image).toMatch(/^\/countries\/[a-f0-9]{14}\.svg$/);
      expect(images.has(puzzle.image)).toBe(false);
      images.add(puzzle.image);
      const path = "public" + puzzle.image;
      expect(existsSync(path)).toBe(true);
      const svg = readFileSync(path, "utf8");
      expect(svg).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
      expect(svg).not.toMatch(
        /<(?:title|desc|metadata|script|image)\b|href=|<!--/,
      );
      expect(drawings.has(svg)).toBe(false);
      drawings.add(svg);
      expect(question.source).toMatch(/^https:\/\//);
      expect(question.options).toHaveLength(4);
      const correct = question.options!.find(
        (option) => option.id === question.answer,
      )!;
      expect(svg.toLowerCase()).not.toContain(correct.text.en!.toLowerCase());
      kinds[puzzle.imageKind]++;
    }
    expect(kinds).toEqual({ flag: 22, outline: 20 });
  });
});
