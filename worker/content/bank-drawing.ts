import type { Difficulty, Question } from "../../shared/types";

// Concrete concepts progress from one silhouette to several interacting parts.
// Synonyms denote the whole concept; component words do not unlock an answer.
const words: Record<Difficulty, [string, string, string[], string[]][]> = {
  easy: [
    ["Apfel", "apple", [], []],
    ["Schneemann", "snowman", [], []],
    ["Brille", "eyeglasses", [], ["spectacles", "glasses"]],
    ["Schere", "scissors", [], []],
    ["Kerze", "candle", [], []],
    ["Gitarre", "guitar", [], []],
    ["Schmetterling", "butterfly", [], []],
    ["Krone", "crown", [], []],
    ["Tasse", "cup", ["Becher"], ["mug"]],
    ["Anker", "anchor", [], []],
  ],
  medium: [
    ["Leuchtturm", "lighthouse", [], []],
    [
      "Heißluftballon",
      "hot air balloon",
      ["Heissluftballon", "Heißluft-Ballon"],
      ["hot-air balloon"],
    ],
    ["Wasserfall", "waterfall", [], []],
    ["Skateboard", "skateboard", [], []],
    ["Kaktus", "cactus", [], []],
    ["Windmühle", "windmill", ["Windmuehle"], ["wind mill"]],
    ["Teleskop", "telescope", ["Fernrohr"], []],
    ["Hängematte", "hammock", ["Haengematte"], []],
    ["Pinguin", "penguin", [], []],
    ["Schatztruhe", "treasure chest", ["Schatzkiste"], []],
  ],
  hard: [
    [
      "Fallschirmspringer",
      "skydiver",
      ["Fallschirmspringerin"],
      ["parachutist"],
    ],
    ["Achterbahn", "roller coaster", [], ["rollercoaster", "roller-coaster"]],
    ["Zugbrücke", "drawbridge", ["Zugbruecke"], ["draw bridge"]],
    [
      "Flaschenpost",
      "message in a bottle",
      ["Flaschen-Post"],
      ["bottle message"],
    ],
    ["Chamäleon", "chameleon", ["Chamaeleon"], []],
    ["Sonnenfinsternis", "solar eclipse", [], []],
    [
      "Schiffsschleuse",
      "canal lock",
      ["Schleuse"],
      ["navigation lock", "water lock"],
    ],
    [
      "Tiefseetaucher",
      "deep-sea diver",
      ["Tiefseetaucherin", "Tiefsee-Taucher"],
      ["deep sea diver"],
    ],
    ["Dampfmaschine", "steam engine", ["Dampf-Maschine"], []],
    ["Marionette", "marionette", ["Fadenpuppe"], ["string puppet"]],
  ],
};

export const drawingBank: Question[] = Object.entries(words).flatMap(
  ([difficulty, entries], tier) =>
    entries.map(([de, en, deAliases, enAliases], index) => {
      const id = String(tier * 10 + index + 1).padStart(2, "0");
      return {
        id: `bank-drawing-${id}`,
        category: "drawing" as const,
        difficulty: difficulty as Difficulty,
        prompt: {
          de: "Eine Person zeichnet. Was zeigt das Bild?",
          en: "One person is drawing. What does the picture show?",
        },
        answer: `bank-concept-${id}`,
        explanation: { de: "Das gesuchte Wort war:", en: "The word was:" },
        drawing: {
          word: { de, en },
          aliases: { de: [de, ...deAliases], en: [en, ...enAliases] },
        },
      };
    }),
);
