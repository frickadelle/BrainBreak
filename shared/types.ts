import type { PuzzleAction, PuzzleDefinition, PuzzleView } from "./puzzles";
export type Difficulty = "easy" | "medium" | "hard";
export type Team = "green" | "purple";
export type Language = "de" | "en";
export type Category =
  | "trivia"
  | "logic"
  | "estimate"
  | "arithmetic"
  | "truth"
  | "order"
  | "drawing"
  | "association"
  | "geography"
  | "code"
  | "sets"
  | "connections"
  | "wavelength"
  | "memory"
  | "wordle"
  | "countries";
export type GameMode = Category | "mixed";
export type Localized<T> = { de: T; en?: T };
export const CATEGORIES: Category[] = [
  "trivia",
  "logic",
  "estimate",
  "arithmetic",
  "truth",
  "order",
  "drawing",
  "association",
  "geography",
  "code",
  "sets",
  "connections",
  "wavelength",
  "memory",
  "wordle",
  "countries",
];
export function isNumericCategory(category: Category): boolean {
  return category === "estimate" || category === "arithmetic";
}
export interface DrawingStroke {
  id: string;
  color: string;
  width: number;
  points: { x: number; y: number }[];
}
export interface DrawingChat {
  id: string;
  playerId: string;
  timestamp: number;
  kind: "message" | "correct";
  text?: string;
}
export interface DrawingView {
  chat?: DrawingChat[];
  artistId: string;
  strokes: DrawingStroke[];
  revision: number;
  word?: { de: string; en: string };
}
export interface AssociationView {
  cooperative: boolean;
  team: Team;
  captain: boolean;
  clueEndsAt: number;
  targetCount: number;
  teams: Record<
    Team,
    {
      playerIds: string[];
      captainId?: string;
      score: number;
      clue?: { de: string; en: string };
      automatic?: boolean;
    }
  >;
  key?: Record<string, Team | "neutral">;
  suggestion?: Localized<string>;
}
export interface GeoPoint {
  lat: number;
  lng: number;
}
export interface Question {
  puzzle?: PuzzleDefinition;
  geography?: {
    panoId: string;
    heading?: number;
    pitch?: number;
    target: GeoPoint;
    verifiedAt?: string;
  };
  id: string;
  category: Category;
  difficulty?: Difficulty;
  prompt: Localized<string>;
  options?: { id: string; text: Localized<string> }[];
  answer: string | number;
  explanation: Localized<string>;
  unit?: Localized<string>;
  source?: string;
  association?: {
    targets: Record<Team, string[]>;
    hints: Record<Team, Localized<string>>;
  };
  drawing?: {
    word: { de: string; en: string };
    aliases: { de: string[]; en: string[] };
  };
}
export interface WeekPackage {
  id: string;
  week: string;
  title: Localized<string>;
  questions: Record<Category, Question[]>;
}
export interface PublicQuestion {
  geography?: { panoId: string; heading: number; pitch: number };
  id: string;
  category: Category;
  difficulty?: Difficulty;
  prompt: string;
  options?: { id: string; text: string }[];
  unit?: string;
  fallback: boolean;
}
export interface PlayerView {
  id: string;
  name: string;
  score: number;
  connected: boolean;
  answered: boolean;
}
export interface LeaderboardRow {
  id: string;
  name: string;
  score: number;
  sessions: number;
  rank: number;
}
export interface RoomView {
  code: string;
  phase: "lobby" | "voting" | "tutorial" | "question" | "reveal" | "results";
  hostId: string;
  me: {
    id: string;
    name: string;
    score: number;
    vote?: GameMode;
    answer?: string | number;
  };
  players: PlayerView[];
  endsAt: number | null;
  serverNow: number;
  round: number;
  totalRounds: number;
  category?: Category;
  mode?: GameMode;
  availableModes?: GameMode[];
  availableCategories: Category[];
  tutorial?: { category: Category; readyIds: string[] };
  puzzle?: PuzzleView;
  question?: PublicQuestion;
  geography?: { browserKey: string };
  drawing?: DrawingView;
  association?: AssociationView;
  adaptation?: {
    successCount: number;
    eligibleCount: number;
    nextDifficulty: Difficulty;
  };
  votes: Record<GameMode, number>;
  pack: {
    id: string;
    title: string;
    week: string;
    reused: boolean;
    fallback: boolean;
  };
  reveal?: {
    answer: string | number;
    explanation: string;
    scores: {
      playerId: string;
      answer: string | number | null;
      points: number;
    }[];
    fallback: boolean;
  };
  results?: LeaderboardRow[];
  weekly?: LeaderboardRow[];
  allTime?: LeaderboardRow[];
  saving?: boolean;
  saveError?: boolean;
}
export type ClientMessage =
  | { type: "auth"; token: string; language: Language }
  | { type: "language"; language: Language }
  | { type: "start"; mode?: GameMode; tutorials?: boolean }
  | { type: "ready"; round: number }
  | { type: "puzzleAction"; questionId: string; action: PuzzleAction }
  | { type: "vote"; category: GameMode }
  | { type: "answer"; questionId: string; value: string }
  | {
      type: "associationClue";
      questionId: string;
      clue: { de: string; en: string };
    }
  | {
      type: "draw";
      questionId: string;
      timestamp: number;
      stroke: DrawingStroke;
    }
  | { type: "drawChat"; questionId: string; text: string }
  | { type: "drawClear"; questionId: string; timestamp: number }
  | { type: "sync" };
export type ServerMessage =
  | { type: "state"; state: RoomView }
  | { type: "error"; code: ErrorCode }
  | {
      type: "drawing";
      questionId: string;
      revision: number;
      stroke?: DrawingStroke;
      clear?: boolean;
    };
export type ErrorCode =
  | "INVALID_REQUEST"
  | "INVALID_NAME"
  | "INVALID_CODE"
  | "ROOM_NOT_FOUND"
  | "ROOM_FULL"
  | "GAME_STARTED"
  | "UNAUTHORIZED"
  | "HOST_ONLY"
  | "NOT_ENOUGH_PLAYERS"
  | "WRONG_PHASE"
  | "ALREADY_ANSWERED"
  | "INVALID_ANSWER"
  | "TOO_LATE"
  | "STORAGE_ERROR"
  | "CONNECTION_ERROR"
  | "RATE_LIMITED"
  | "ROOM_EXPIRED"
  | "WRONG_GUESS"
  | "ARTIST_ONLY"
  | "GUESSER_ONLY"
  | "INVALID_CHAT"
  | "SECRET_WORD_HIDDEN"
  | "ASSOCIATION_CLUE_ONLY"
  | "ALREADY_CLUED"
  | "INVALID_CLUE"
  | "CLUE_TOO_LATE"
  | "WAIT_FOR_CLUE"
  | "ASSOCIATION_GUESSER_ONLY";
