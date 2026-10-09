import type { Language, Localized } from "./types";

export const PUZZLE_CATEGORIES = [
  "code",
  "sets",
  "connections",
  "wavelength",
  "memory",
  "wordle",
  "countries",
] as const;
export type PuzzleCategory = (typeof PUZZLE_CATEGORIES)[number];
export type PuzzleDefinition =
  | { kind: "code"; secret: string; symbols: string[]; maxAttempts: number }
  | {
      kind: "sets";
      cards: {
        id: string;
        shape: number;
        color: number;
        count: number;
        fill: number;
      }[];
      features: number;
      maxAttempts: number;
    }
  | {
      kind: "connections";
      groups: { id: string; title: Localized<string>; ids: string[] }[];
      maxAttempts: number;
    }
  | {
      kind: "wavelength";
      left: Localized<string>;
      right: Localized<string>;
      target: number;
      fallbackClue: Localized<string>;
    }
  | { kind: "memory"; sequence: string[]; symbols: string[]; previewMs: number }
  | { kind: "wordle"; word: string; allowed: string[]; maxAttempts: number }
  | { kind: "countries"; image: string; imageKind: "flag" | "outline" };
export type PuzzleAction =
  | { kind: "guess"; value: string }
  | { kind: "select"; ids: string[] }
  | { kind: "clue"; de: string; en: string };
export interface PuzzleProgress {
  attempts: number;
  done: boolean;
  success: boolean;
  points: number;
  value?: string;
  guesses?: { value: string; feedback: number[] }[];
  foundGroups?: string[];
  selections?: string[][];
  feedback?: "incorrect" | "group" | "solved";
}
export interface PuzzleRound {
  questionId: string;
  players: Record<string, PuzzleProgress>;
  previewEndsAt?: number;
  captainId?: string;
  clueEndsAt?: number;
  clue?: { de: string; en: string };
  automaticClue?: boolean;
}
export interface PuzzleView {
  kind: PuzzleCategory;
  progress: PuzzleProgress;
  maxAttempts?: number;
  symbols?: string[];
  length?: number;
  cards?: Extract<PuzzleDefinition, { kind: "sets" }>["cards"];
  features?: number;
  groups?: { id: string; title: string; ids: string[] }[];
  groupSize?: number;
  groupCount?: number;
  previewEndsAt?: number;
  sequence?: string[];
  image?: string;
  imageKind?: "flag" | "outline";
  left?: string;
  right?: string;
  captainId?: string;
  clueEndsAt?: number;
  clue?: string;
  automaticClue?: boolean;
  target?: number;
  solution?: string;
  solutionIds?: string[];
}

export function isPuzzleCategory(category: string): category is PuzzleCategory {
  return (PUZZLE_CATEGORIES as readonly string[]).includes(category);
}
export function localPuzzleText(
  value: Localized<string>,
  language: Language,
): string {
  return value[language] || value.de;
}
