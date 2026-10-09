import type { Language } from "../shared/types";
import type { PuzzleCategory } from "../shared/puzzles";

export const puzzleNames: Record<
  Language,
  Record<PuzzleCategory, { title: string; description: string; label: string }>
> = {
  de: {
    code: {
      title: "Codeknacker",
      description: "Nutze die Hinweise, um den Zahlencode zu knacken.",
      label: "KOMBINIEREN",
    },
    sets: {
      title: "Musterjagd",
      description: "Drei Karten, jedes Merkmal gleich oder verschieden.",
      label: "MUSTER ERKENNEN",
    },
    connections: {
      title: "Verbindungen",
      description: "Finde die versteckten Wortgruppen.",
      label: "ZUSAMMENHÄNGE FINDEN",
    },
    wavelength: {
      title: "Wellenlänge",
      description: "Ein Hinweis, eine Skala. Wo liegt das Ziel?",
      label: "EINANDER EINSCHÄTZEN",
    },
    memory: {
      title: "Merkfeld",
      description: "Merke dir die Symbole und ihre Reihenfolge.",
      label: "GENAU HINSEHEN",
    },
    wordle: {
      title: "Wordle",
      description: "Fünf Buchstaben, sechs Versuche. Ein englisches Wort.",
      label: "BUCHSTABEN KOMBINIEREN",
    },
    countries: {
      title: "Länderraten",
      description: "Erkenne Länder an Flaggen und Umrissen.",
      label: "DIE WELT ERKENNEN",
    },
  },
  en: {
    code: {
      title: "Codebreaker",
      description: "Use the clues to crack a number code.",
      label: "DEDUCE THE CODE",
    },
    sets: {
      title: "Pattern hunt",
      description: "Three cards, each feature the same or different.",
      label: "SPOT PATTERNS",
    },
    connections: {
      title: "Connections",
      description: "Find the hidden word groups.",
      label: "FIND THE LINK",
    },
    wavelength: {
      title: "Wavelength",
      description: "One clue, one scale. Where is the target?",
      label: "READ THE ROOM",
    },
    memory: {
      title: "Memory field",
      description: "Remember the symbols and their order.",
      label: "LOOK CLOSELY",
    },
    wordle: {
      title: "Wordle",
      description: "Five letters, six attempts. One English word.",
      label: "DEDUCE THE WORD",
    },
    countries: {
      title: "Country guessing",
      description: "Recognise countries by flags and outlines.",
      label: "RECOGNISE THE WORLD",
    },
  },
};
