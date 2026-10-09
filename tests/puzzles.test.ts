import { describe, expect, it } from "vitest";
import type { Question } from "../shared/types";
import type {
  PuzzleAction,
  PuzzleDefinition,
  PuzzleRound,
} from "../shared/puzzles";
import {
  applyPuzzleAction,
  createPuzzleRound,
  nextPuzzleTransition,
  puzzleDuration,
  puzzleEligible,
  puzzleResult,
  puzzleReveal,
  puzzleView,
  settlePuzzleRound,
  validPuzzleQuestion,
} from "../worker/puzzles";

const t = (de: string, en: string) => ({ de, en });
function question(
  puzzle: PuzzleDefinition,
  options?: Question["options"],
): Question {
  return {
    id: `opaque-${puzzle.kind}`,
    category: puzzle.kind,
    puzzle,
    prompt: t("Aufgabe", "Question"),
    explanation: t("Erklärung", "Explanation"),
    answer: "opaque-solution",
    ...(options ? { options } : {}),
  };
}
const code = question({
  kind: "code",
  secret: "1122",
  symbols: ["1", "2", "3"],
  maxAttempts: 6,
});
const wordle = question({
  kind: "wordle",
  word: "apple",
  allowed: ["apple", "alley", "eerie", "level", "eagle", "brick", "cloud"],
  maxAttempts: 6,
});
const sets = question({
  kind: "sets",
  features: 4,
  maxAttempts: 3,
  cards: [
    { id: "a", shape: 0, color: 0, count: 1, fill: 0 },
    { id: "b", shape: 1, color: 1, count: 2, fill: 1 },
    { id: "c", shape: 2, color: 2, count: 3, fill: 2 },
    { id: "d", shape: 0, color: 1, count: 1, fill: 0 },
    { id: "e", shape: 1, color: 2, count: 1, fill: 1 },
  ],
});
const connections = question(
  {
    kind: "connections",
    maxAttempts: 4,
    groups: [
      { id: "g7", title: t("Früchte", "Fruit"), ids: ["a", "b", "c"] },
      { id: "g9", title: t("Möbel", "Furniture"), ids: ["d", "e", "f"] },
    ],
  },
  [
    { id: "a", text: t("Apfel", "apple") },
    { id: "b", text: t("Birne", "pear") },
    { id: "c", text: t("Pfirsich", "peach") },
    { id: "d", text: t("Tisch", "table") },
    { id: "e", text: t("Stuhl", "chair") },
    { id: "f", text: t("Schrank", "cabinet") },
  ],
);
const wavelength = question({
  kind: "wavelength",
  left: t("Kalt", "Cold"),
  right: t("Heiß", "Hot"),
  target: 70,
  fallbackClue: t("Kaffee", "Coffee"),
});
const memory = question({
  kind: "memory",
  symbols: ["A", "B", "C"],
  sequence: ["A", "B", "A", "C"],
  previewMs: 3000,
});
const countries = {
  ...question(
    { kind: "countries", image: "/countries/f91bcf.svg", imageKind: "outline" },
    [
      { id: "a", text: t("Kanada", "Canada") },
      { id: "b", text: t("Japan", "Japan") },
    ],
  ),
  answer: "a",
};
const roster = ["alice", "bob", "charlie"];
const round = (q: Question, index = 0) =>
  createPuzzleRound(q, roster, index, 1000);
const guess = (value: string): PuzzleAction => ({ kind: "guess", value });
const select = (...ids: string[]): PuzzleAction => ({ kind: "select", ids });
function error(
  q: Question,
  state: PuzzleRound,
  player: string,
  action: PuzzleAction,
  now: number,
  code: string,
) {
  const before = structuredClone(state);
  expect(() => applyPuzzleAction(q, state, player, action, now)).toThrow(
    expect.objectContaining({ code }),
  );
  expect(state).toEqual(before);
}

describe("puzzle content and durable lifecycle", () => {
  it("gives multi-attempt games 75 seconds and wavelength 45 seconds after its clue window", () => {
    expect([code, wordle, connections].map(puzzleDuration)).toEqual([
      75_000, 75_000, 75_000,
    ]);
    expect(puzzleDuration(wavelength)).toBe(60_000);
    expect([sets, countries].map(puzzleDuration)).toEqual([45_000, 45_000]);
    expect(puzzleDuration(memory)).toBe(48_000);
    const state = round(wavelength);
    settlePuzzleRound(wavelength, state, 16_000);
    applyPuzzleAction(wavelength, state, "bob", guess("70"), 60_999);
    error(wavelength, state, "charlie", guess("70"), 61_000, "TOO_LATE");
  });
  it("accepts all seven complete definitions and rejects malformed or mismatched content", () => {
    for (const q of [
      code,
      wordle,
      sets,
      connections,
      wavelength,
      memory,
      countries,
    ])
      expect(validPuzzleQuestion(q)).toBe(true);
    expect(validPuzzleQuestion({ ...code, category: "wordle" })).toBe(false);
    expect(
      validPuzzleQuestion({
        ...code,
        puzzle: { ...code.puzzle!, symbols: ["1", "1"] } as PuzzleDefinition,
      }),
    ).toBe(false);
    expect(
      validPuzzleQuestion({
        ...connections,
        puzzle: {
          kind: "connections",
          groups: [null],
          maxAttempts: 4,
        } as unknown as PuzzleDefinition,
      }),
    ).toBe(false);
    expect(
      validPuzzleQuestion({
        ...countries,
        puzzle: {
          kind: "countries",
          image: "https://example.com/flag.svg",
          imageKind: "flag",
        },
      }),
    ).toBe(false);
    expect(
      validPuzzleQuestion({
        ...wordle,
        puzzle: {
          kind: "wordle",
          word: "apple",
          allowed: ["brick"],
          maxAttempts: 6,
        },
      }),
    ).toBe(false);
  });
  it("rejects a SET board without any valid triple", () => {
    const puzzle = {
      kind: "sets" as const,
      features: 1,
      maxAttempts: 3,
      cards: [
        { id: "a", shape: 0, color: 0, count: 1, fill: 0 },
        { id: "b", shape: 0, color: 0, count: 1, fill: 0 },
        { id: "c", shape: 1, color: 0, count: 1, fill: 0 },
      ],
    };
    expect(validPuzzleQuestion(question(puzzle))).toBe(false);
  });
  it("rejects visually duplicate SET cards even when their IDs differ", () => {
    const q = question({
      kind: "sets",
      features: 3,
      maxAttempts: 3,
      cards: [
        { id: "a", shape: 0, color: 0, count: 1, fill: 0 },
        { id: "b", shape: 0, color: 0, count: 1, fill: 1 },
        { id: "c", shape: 0, color: 0, count: 1, fill: 2 },
      ],
    });
    expect(validPuzzleQuestion(q)).toBe(false);
  });
  it("rejects cross-question, unknown player and expired actions without mutation", () => {
    const state = round(code);
    error(
      { ...code, id: "other" },
      state,
      "alice",
      guess("1122"),
      1100,
      "INVALID_REQUEST",
    );
    error(code, state, "unknown", guess("1122"), 1100, "UNAUTHORIZED");
    error(code, state, "alice", guess("1122"), 76_000, "TOO_LATE");
    expect(() => puzzleView(wordle, state, "alice", "en", 1100, false)).toThrow(
      expect.objectContaining({ code: "INVALID_REQUEST" }),
    );
    expect(() => puzzleReveal(code, state, "unknown", "en")).toThrow(
      expect.objectContaining({ code: "UNAUTHORIZED" }),
    );
  });
  it("returns independent progress snapshots", () => {
    const state = round(code);
    applyPuzzleAction(code, state, "alice", guess("1211"), 1100);
    const alice = puzzleView(code, state, "alice", "en", 1200, false);
    alice.progress.guesses![0].feedback[0] = 999;
    expect(state.players.alice.guesses![0].feedback).toEqual([1, 2]);
    expect(
      puzzleView(code, state, "bob", "en", 1200, false).progress.guesses,
    ).toBeUndefined();
  });
});

describe("code breaking and five-letter words", () => {
  it("matches an independent frequency-count oracle for every three-symbol, three-position code pair", () => {
    const values = Array.from({ length: 27 }, (_, value) =>
      [Math.floor(value / 9), Math.floor(value / 3) % 3, value % 3]
        .map((n) => String(n + 1))
        .join(""),
    );
    for (const secret of values)
      for (const attempt of values) {
        const q = question({
          kind: "code",
          secret,
          symbols: ["1", "2", "3"],
          maxAttempts: 6,
        });
        const state = round(q);
        applyPuzzleAction(q, state, "alice", guess(attempt), 1100);
        const exact = Array.from(attempt).filter(
          (symbol, index) => symbol === secret[index],
        ).length;
        const overlap = ["1", "2", "3"].reduce(
          (sum, symbol) =>
            sum +
            Math.min(
              Array.from(secret).filter((s) => s === symbol).length,
              Array.from(attempt).filter((s) => s === symbol).length,
            ),
          0,
        );
        expect(state.players.alice.guesses![0].feedback).toEqual([
          exact,
          overlap - exact,
        ]);
      }
  });
  it("counts duplicate code symbols using a multiset after exact matches", () => {
    const state = round(code);
    applyPuzzleAction(code, state, "alice", guess("1211"), 1100);
    applyPuzzleAction(code, state, "alice", guess("2211"), 1200);
    expect(state.players.alice.guesses!.map((g) => g.feedback)).toEqual([
      [1, 2],
      [0, 4],
    ]);
    expect(
      puzzleView(code, state, "alice", "en", 1300, false).solution,
    ).toBeUndefined();
    applyPuzzleAction(code, state, "alice", guess("1122"), 1300);
    expect(puzzleResult(code, state, "alice")).toEqual({
      value: "1122",
      points: 1000,
      success: true,
    });
    error(code, state, "alice", guess("2211"), 1400, "ALREADY_ANSWERED");
  });
  it("rejects wrong code length or symbols and makes repeats idempotent across reload", () => {
    const state = round(code);
    error(code, state, "alice", guess("111"), 1100, "INVALID_ANSWER");
    error(code, state, "alice", guess("9999"), 1100, "INVALID_ANSWER");
    applyPuzzleAction(code, state, "alice", guess("1111"), 1100);
    const restored = structuredClone(state);
    expect(
      applyPuzzleAction(code, restored, "alice", guess("1111"), 1200),
    ).toBe(false);
    expect(restored.players.alice.attempts).toBe(1);
  });
  it("locks an unsolved code after six distinct attempts", () => {
    const state = round(code);
    for (const value of ["1111", "2222", "3333", "1212", "2121", "1231"])
      applyPuzzleAction(code, state, "alice", guess(value), 1100);
    expect(state.players.alice).toMatchObject({
      attempts: 6,
      done: true,
      success: false,
      points: 0,
    });
    error(code, state, "alice", guess("1122"), 1200, "ALREADY_ANSWERED");
  });
  it("assigns Wordle repeated-letter feedback without reusing a target letter", () => {
    const state = round(wordle);
    applyPuzzleAction(wordle, state, "alice", guess("ALLEY"), 1100);
    expect(state.players.alice.guesses![0].feedback).toEqual([2, 1, 0, 1, 0]);
    applyPuzzleAction(wordle, state, "bob", guess("eagle"), 1200);
    expect(state.players.bob.guesses![0].feedback).toEqual([0, 1, 0, 2, 2]);
    expect(
      puzzleView(wordle, state, "bob", "de", 1300, false),
    ).not.toHaveProperty("solution");
    expect(puzzleView(wordle, state, "bob", "de", 1300, true).solution).toBe(
      "APPLE",
    );
  });
  it("requires dictionary membership, preserves attempts on invalid input and normalizes case", () => {
    const state = round(wordle);
    error(wordle, state, "alice", guess("xxxxx"), 1100, "INVALID_ANSWER");
    applyPuzzleAction(wordle, state, "alice", guess("alley"), 1100);
    expect(
      applyPuzzleAction(wordle, state, "alice", guess("ALLEY"), 1200),
    ).toBe(false);
    applyPuzzleAction(wordle, state, "alice", guess("apple"), 1300);
    expect(puzzleResult(wordle, state, "alice").points).toBe(1000);
    expect(state.players.alice.attempts).toBe(2);
  });
  it("locks Wordle at six valid wrong guesses without a speed or attempt bonus", () => {
    const state = round(wordle);
    for (const value of ["alley", "eerie", "level", "eagle", "brick", "cloud"])
      applyPuzzleAction(wordle, state, "alice", guess(value), 1100);
    expect(state.players.alice).toMatchObject({
      attempts: 6,
      done: true,
      points: 0,
    });
    applyPuzzleAction(wordle, state, "bob", guess("apple"), 75_999);
    expect(puzzleResult(wordle, state, "bob").points).toBe(1000);
  });
});

describe("visual sets and connections", () => {
  it("checks every active SET feature and accepts all-different features", () => {
    const state = round(sets);
    applyPuzzleAction(sets, state, "alice", select("a", "b", "d"), 1100);
    expect(state.players.alice).toMatchObject({
      feedback: "incorrect",
      attempts: 1,
      done: false,
    });
    applyPuzzleAction(sets, state, "alice", select("c", "a", "b"), 1200);
    expect(puzzleResult(sets, state, "alice").points).toBe(1000);
    expect(puzzleReveal(sets, state, "alice", "en")).toBe(
      "Shape: all different · Colour: all different · Count: all different · Fill: all different",
    );
    expect(
      puzzleView(sets, state, "alice", "en", 1201, false),
    ).not.toHaveProperty("solutionIds");
    expect(
      puzzleView(sets, state, "alice", "en", 1201, true).solutionIds,
    ).toEqual(["a", "b", "c"]);
  });
  it("accepts all-same and all-different per feature, ignoring inactive features", () => {
    const q = question({
      kind: "sets",
      features: 2,
      maxAttempts: 3,
      cards: [
        { id: "a", shape: 0, color: 0, count: 1, fill: 0 },
        { id: "b", shape: 0, color: 1, count: 1, fill: 0 },
        { id: "c", shape: 0, color: 2, count: 2, fill: 1 },
      ],
    });
    const state = round(q);
    applyPuzzleAction(q, state, "alice", select("a", "b", "c"), 1100);
    expect(state.players.alice.success).toBe(true);
    expect(puzzleReveal(q, state, "alice", "de")).toBe(
      "Form: alle gleich · Farbe: alle unterschiedlich",
    );
  });
  it("rejects duplicate or unknown selections and does not spend another try on a repeated set", () => {
    const state = round(sets);
    error(sets, state, "alice", select("a", "a", "b"), 1100, "INVALID_ANSWER");
    error(
      sets,
      state,
      "alice",
      select("a", "b", "unknown"),
      1100,
      "INVALID_ANSWER",
    );
    applyPuzzleAction(sets, state, "alice", select("a", "b", "d"), 1100);
    expect(
      applyPuzzleAction(sets, state, "alice", select("d", "b", "a"), 1200),
    ).toBe(false);
    expect(state.players.alice.attempts).toBe(1);
  });
  it("locks SET after its bounded wrong attempts", () => {
    const state = round(sets);
    for (const ids of [
      ["a", "b", "d"],
      ["a", "b", "e"],
      ["a", "c", "d"],
    ])
      applyPuzzleAction(sets, state, "alice", { kind: "select", ids }, 1100);
    expect(state.players.alice).toMatchObject({
      attempts: 3,
      done: true,
      points: 0,
    });
  });
  it("exposes only the current player's solved connection groups", () => {
    const state = round(connections);
    expect(
      puzzleView(connections, state, "alice", "en", 1100, false).groups,
    ).toEqual([]);
    applyPuzzleAction(connections, state, "alice", select("c", "b", "a"), 1100);
    expect(
      puzzleView(connections, state, "alice", "en", 1200, false).groups,
    ).toEqual([{ id: "g7", title: "Fruit", ids: ["a", "b", "c"] }]);
    expect(
      puzzleView(connections, state, "bob", "en", 1200, false).groups,
    ).toEqual([]);
    expect(puzzleResult(connections, state, "alice")).toMatchObject({
      points: 500,
      success: false,
    });
    expect(puzzleReveal(connections, state, "alice", "de")).toContain(
      "Früchte: Apfel, Birne, Pfirsich",
    );
  });
  it("does not duplicate solved groups and scores the complete collection", () => {
    const state = round(connections);
    applyPuzzleAction(connections, state, "alice", select("a", "b", "c"), 1100);
    expect(
      applyPuzzleAction(
        connections,
        state,
        "alice",
        select("c", "a", "b"),
        1200,
      ),
    ).toBe(false);
    error(
      connections,
      state,
      "alice",
      select("a", "d", "e"),
      1200,
      "INVALID_ANSWER",
    );
    applyPuzzleAction(connections, state, "alice", select("d", "e", "f"), 1300);
    expect(state.players.alice).toMatchObject({
      attempts: 0,
      foundGroups: ["g7", "g9"],
      done: true,
      points: 1000,
    });
  });
  it("bounds connection mistakes at four and preserves partial points after reload and timeout", () => {
    const state = round(connections);
    applyPuzzleAction(connections, state, "alice", select("a", "d", "e"), 1100);
    expect(
      applyPuzzleAction(
        connections,
        state,
        "alice",
        select("e", "a", "d"),
        1200,
      ),
    ).toBe(false);
    for (const ids of [
      ["b", "d", "e"],
      ["c", "d", "e"],
      ["c", "d", "f"],
    ])
      applyPuzzleAction(
        connections,
        state,
        "alice",
        { kind: "select", ids },
        1300,
      );
    expect(state.players.alice).toMatchObject({
      attempts: 4,
      done: true,
      points: 0,
    });
    applyPuzzleAction(connections, state, "bob", select("a", "b", "c"), 1400);
    const restored = structuredClone(state);
    restored.players.bob.done = true;
    expect(puzzleResult(connections, restored, "bob")).toMatchObject({
      points: 500,
      success: false,
    });
  });
});

describe("wavelength clue roles and scores", () => {
  it("rotates the captain, excludes them from adaptation and projects the target privately", () => {
    const state = round(wavelength, 1);
    expect(state.captainId).toBe("bob");
    expect(puzzleEligible(state, roster)).toEqual(["alice", "charlie"]);
    expect(
      puzzleView(wavelength, state, "alice", "en", 1100, false),
    ).not.toHaveProperty("target");
    expect(puzzleView(wavelength, state, "bob", "de", 1100, false).target).toBe(
      70,
    );
    expect(
      puzzleView(wavelength, state, "alice", "en", 1100, true).target,
    ).toBe(70);
    error(wavelength, state, "bob", guess("70"), 1100, "GUESSER_ONLY");
    error(
      wavelength,
      state,
      "alice",
      { kind: "clue", de: "Tee", en: "Tea" },
      1100,
      "GUESSER_ONLY",
    );
    error(wavelength, state, "alice", guess("70"), 1100, "WAIT_FOR_CLUE");
  });
  it("validates bilingual human clues and preserves the first clue", () => {
    const state = round(wavelength);
    error(
      wavelength,
      state,
      "alice",
      { kind: "clue", de: "", en: "Tea" },
      1100,
      "INVALID_CLUE",
    );
    applyPuzzleAction(
      wavelength,
      state,
      "alice",
      { kind: "clue", de: "Warmer Tee", en: "Warm tea" },
      1100,
    );
    expect(puzzleView(wavelength, state, "bob", "en", 1200, false).clue).toBe(
      "Warm tea",
    );
    error(
      wavelength,
      state,
      "alice",
      { kind: "clue", de: "Kaffee", en: "Coffee" },
      1200,
      "ALREADY_CLUED",
    );
    expect(nextPuzzleTransition(state)).toBeUndefined();
  });
  it("settles a reviewed fallback exactly at the persisted clue deadline", () => {
    const state = round(wavelength);
    expect(nextPuzzleTransition(state)).toBe(16_000);
    expect(settlePuzzleRound(wavelength, state, 15_999)).toBe(false);
    const restored = structuredClone(state);
    expect(settlePuzzleRound(wavelength, restored, 16_000)).toBe(true);
    expect(restored.clue).toEqual({ de: "Kaffee", en: "Coffee" });
    expect(restored.automaticClue).toBe(true);
    expect(settlePuzzleRound(wavelength, restored, 16_001)).toBe(false);
    error(
      wavelength,
      restored,
      "alice",
      { kind: "clue", de: "Tee", en: "Tea" },
      16_001,
      "CLUE_TOO_LATE",
    );
  });
  it("scores distance without a speed bonus, locks guesses and derives captain contribution", () => {
    const state = round(wavelength);
    applyPuzzleAction(
      wavelength,
      state,
      "alice",
      { kind: "clue", de: "Tee", en: "Tea" },
      1100,
    );
    expect(puzzleResult(wavelength, state, "alice").points).toBe(0);
    applyPuzzleAction(wavelength, state, "bob", guess("60"), 1200);
    expect(puzzleResult(wavelength, state, "bob")).toEqual({
      value: "60",
      points: 600,
      success: true,
    });
    expect(puzzleResult(wavelength, state, "alice").points).toBe(1000);
    applyPuzzleAction(wavelength, state, "charlie", guess("20"), 44_000);
    expect(puzzleResult(wavelength, state, "charlie").points).toBe(0);
    error(wavelength, state, "bob", guess("70"), 1300, "ALREADY_ANSWERED");
    expect(
      puzzleView(wavelength, state, "charlie", "en", 44_001, false).progress
        .value,
    ).toBe("20");
    expect(
      JSON.stringify(
        puzzleView(wavelength, state, "charlie", "en", 44_001, false),
      ),
    ).not.toContain('"60"');
  });
  it("rejects out-of-range and malformed spectrum guesses without consuming an answer", () => {
    const state = round(wavelength);
    settlePuzzleRound(wavelength, state, 16_000);
    for (const value of ["101", "-1", "70abc", "NaN", "Infinity"])
      error(wavelength, state, "bob", guess(value), 17_000, "INVALID_ANSWER");
    applyPuzzleAction(wavelength, state, "bob", guess("70,5"), 17_000);
    expect(puzzleResult(wavelength, state, "bob").points).toBe(980);
  });
  it("hides one-shot correctness and wavelength distance until the common reveal", () => {
    for (const q of [wavelength, memory, countries]) {
      const state = round(q);
      settlePuzzleRound(q, state, 17_000);
      const action =
        q.category === "wavelength"
          ? guess("70")
          : q.category === "memory"
            ? select("A", "B", "A", "C")
            : select("a");
      applyPuzzleAction(q, state, "bob", action, 17_001);
      expect(puzzleResult(q, state, "bob")).toMatchObject({
        points: 1000,
        success: true,
      });
      expect(
        puzzleView(q, state, "bob", "en", 17_002, false).progress,
      ).toMatchObject({ points: 0, success: false, done: true });
      expect(
        puzzleView(q, state, "bob", "en", 17_002, true).progress,
      ).toMatchObject({ points: 1000, success: true, done: true });
    }
  });
});

describe("memory preview and country identification", () => {
  it("shows memory only during preview and makes the preview transition durable and idempotent", () => {
    const state = round(memory);
    expect(puzzleDuration(memory)).toBe(48_000);
    expect(
      puzzleView(memory, state, "alice", "en", 3999, false).sequence,
    ).toEqual(["A", "B", "A", "C"]);
    error(
      memory,
      state,
      "alice",
      select("A", "B", "A", "C"),
      3999,
      "WRONG_PHASE",
    );
    expect(
      puzzleView(memory, state, "alice", "en", 4000, false),
    ).not.toHaveProperty("sequence");
    expect(settlePuzzleRound(memory, state, 4000)).toBe(true);
    const restored = structuredClone(state);
    expect(nextPuzzleTransition(restored)).toBeUndefined();
    expect(settlePuzzleRound(memory, restored, 4001)).toBe(false);
    expect(
      puzzleView(memory, restored, "alice", "en", 4001, false),
    ).not.toHaveProperty("sequence");
  });
  it("accepts repeated memory symbols, awards position-based partial credit, and locks the sequence", () => {
    const state = round(memory);
    applyPuzzleAction(memory, state, "alice", select("A", "B", "A", "C"), 4000);
    expect(puzzleResult(memory, state, "alice")).toEqual({
      value: "A→B→A→C",
      points: 1000,
      success: true,
    });
    applyPuzzleAction(memory, state, "bob", select("A", "C", "A"), 4000);
    expect(puzzleResult(memory, state, "bob")).toMatchObject({
      points: 500,
      success: false,
    });
    error(
      memory,
      state,
      "bob",
      select("A", "B", "A", "C"),
      4100,
      "ALREADY_ANSWERED",
    );
    expect(
      puzzleView(memory, state, "charlie", "en", 4100, false).progress.value,
    ).toBeUndefined();
    expect(puzzleReveal(memory, state, "charlie", "en")).toBe("A → B → A → C");
  });
  it("bounds memory input and permits recall for the full 45 seconds after preview", () => {
    const state = round(memory);
    error(memory, state, "alice", select(), 4000, "INVALID_ANSWER");
    error(
      memory,
      state,
      "alice",
      select("A", "B", "A", "C", "A"),
      4000,
      "INVALID_ANSWER",
    );
    error(memory, state, "alice", select("D"), 4000, "INVALID_ANSWER");
    applyPuzzleAction(
      memory,
      state,
      "alice",
      select("A", "B", "A", "C"),
      48_999,
    );
    error(memory, state, "bob", select("A"), 49_000, "TOO_LATE");
  });
  it("projects country assets without answers and locks one offered selection", () => {
    const state = round(countries);
    expect(
      puzzleView(countries, state, "alice", "en", 1100, false),
    ).toMatchObject({ image: "/countries/f91bcf.svg", imageKind: "outline" });
    expect(
      puzzleView(countries, state, "alice", "en", 1100, false),
    ).not.toHaveProperty("solution");
    error(countries, state, "alice", select("unknown"), 1100, "INVALID_ANSWER");
    error(countries, state, "alice", select("a", "b"), 1100, "INVALID_ANSWER");
    applyPuzzleAction(countries, state, "alice", select("b"), 1100);
    expect(puzzleResult(countries, state, "alice")).toEqual({
      value: "b",
      points: 0,
      success: false,
    });
    error(countries, state, "alice", select("a"), 1200, "ALREADY_ANSWERED");
    applyPuzzleAction(countries, state, "bob", guess("a"), 1200);
    expect(puzzleResult(countries, state, "bob").points).toBe(1000);
    expect(puzzleReveal(countries, state, "alice", "de")).toBe("Kanada");
    expect(puzzleReveal(countries, state, "alice", "en")).toBe("Canada");
  });
});
