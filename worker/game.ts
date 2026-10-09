import {
  CATEGORIES,
  type Category,
  type GameMode,
  type DrawingChat,
  type Team,
  type DrawingStroke,
  type Difficulty,
  type Language,
  type LeaderboardRow,
  type Question,
  type RoomView,
  type WeekPackage,
} from "../shared/types";
import {
  associationTeams,
  createAssociationRound,
  associationCorrect,
  associationView,
  associationTargets,
  validAssociationQuestion,
  type AssociationRound,
} from "./association";
import {
  geographyPoints,
  parseGeoGuess,
  successfulGeoGuess,
  validGeoQuestion,
} from "./geography";
import { isPuzzleCategory, type PuzzleRound } from "../shared/puzzles";
import {
  validPuzzleQuestion,
  createPuzzleRound,
  puzzleView,
  puzzleEligible,
  puzzleResult,
  puzzleReveal,
} from "./puzzles";
import { parseLocalizedNumber } from "../shared/numbers";

export const TUTORIAL_MS = 45_000;
export const VOTE_MS = 30_000;
export const QUESTION_MS = 45_000;
export const REVEAL_MS = 10_000;
export const LOBBY_TTL_MS = 86_400_000;
export const RESULTS_TTL_MS = 7 * 86_400_000;
export interface Player {
  id: string;
  name: string;
  score: number;
  vote?: GameMode;
}
export interface Answer {
  value: string | number;
  points: number;
}
export interface DrawingRound {
  chat?: DrawingChat[];
  questionId: string;
  artistId: string;
  strokes: DrawingStroke[];
  revision: number;
  pointCount: number;
  lastStrokeAt: number;
  seenIds: string[];
}
export interface AdaptationRecord {
  questionId: string;
  difficulty: Difficulty;
  successCount: number;
  eligibleCount: number;
  nextDifficulty: Difficulty;
}
export interface AdaptiveState {
  targetDifficulty: Difficulty;
  chosenQuestionIds: string[];
  eligible: Record<string, string[]>;
  history: AdaptationRecord[];
}
export interface RoomState {
  code: string;
  sessionId: string;
  hostId: string;
  createdAt: number;
  expiresAt: number;
  phase: RoomView["phase"];
  endsAt: number | null;
  round: number;
  category?: Category;
  mode?: GameMode;
  mixedCategories?: Category[];
  guided?: boolean;
  tutorial?: { category: Category; readyIds: string[] };
  puzzle?: PuzzleRound;
  pack: WeekPackage;
  week: string;
  reused: boolean;
  players: Record<string, Player>;
  answers: Record<string, Record<string, Answer>>;
  dirty: boolean;
  saveError: boolean;
  weekly?: LeaderboardRow[];
  allTime?: LeaderboardRow[];
  drawing?: DrawingRound;
  drawingArtists?: Record<string, string>;
  adaptive?: AdaptiveState;
  association?: AssociationRound;
  associationScores?: Record<Team, number>;
  associationHistory?: {
    questionId: string;
    roundScores: Record<Team, number>;
  }[];
}

export function isoWeek(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)!.value);
  const d = new Date(Date.UTC(get("year"), get("month") - 1, get("day")));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const year = d.getUTCFullYear();
  const week = Math.ceil(
    ((d.getTime() - Date.UTC(year, 0, 1)) / 86_400_000 + 1) / 7,
  );
  return `${year}-W${String(week).padStart(2, "0")}`;
}
export function selectPackage(
  packages: WeekPackage[],
  date = new Date(),
): { pack: WeekPackage; week: string; reused: boolean } {
  const week = isoWeek(date);
  const pack =
    packages.find((p) => p.week === week) ??
    [...packages]
      .filter((p) => p.week <= week)
      .sort((a, b) => b.week.localeCompare(a.week))[0] ??
    packages[0];
  if (
    !pack ||
    !CATEGORIES.some(
      (c) => Array.isArray(pack.questions[c]) && pack.questions[c].length >= 6,
    ) ||
    CATEGORIES.some(
      (c) =>
        pack.questions[c] !== undefined &&
        (!Array.isArray(pack.questions[c]) ||
          (c === "geography" && pack.questions[c].length === 0
            ? false
            : pack.questions[c].length < 6)),
    )
  )
    throw new Error(
      "Every package must contain at least six questions per category",
    );
  const all = CATEGORIES.flatMap((c) => pack.questions[c] ?? []);
  if (new Set(all.map((q) => q.id)).size !== all.length)
    throw new Error("Question identities must be unique within a package");
  for (const category of CATEGORIES) {
    const pool = pack.questions[category] ?? [];
    if (pool.some((q) => q.category !== category))
      throw new Error("Question category mismatch");
    if (
      category === "association" &&
      pool.some((q) => !validAssociationQuestion(q))
    )
      throw new Error("Invalid association board or hints");
    if (category === "geography" && pool.some((q) => !validGeoQuestion(q)))
      throw new Error("Unverified geography question");
    if (isPuzzleCategory(category) && pool.some((q) => !validPuzzleQuestion(q)))
      throw new Error("Invalid puzzle question");
    const declared = pool.filter((q) => q.difficulty !== undefined);
    if (
      declared.length &&
      (declared.length !== pool.length ||
        declared.some((q) => !DIFFICULTIES.includes(q.difficulty!)))
    )
      throw new Error(
        "Difficulty must be valid and present on every pool question",
      );
  }
  return { pack: structuredClone(pack), week, reused: pack.week !== week };
}
export const parseEstimate = parseLocalizedNumber;
export function pointsFor(question: Question, value: string | number): number {
  if (question.category === "geography")
    return geographyPoints(value, question);
  if (question.category !== "estimate")
    return value === question.answer ? 1000 : 0;
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0 ||
    typeof question.answer !== "number"
  )
    return 0;
  return Math.max(
    0,
    Math.round(
      1000 *
        (1 -
          Math.abs(value - question.answer) /
            Math.max(Math.abs(question.answer), 1)),
    ),
  );
}
export function chooseCategory(
  votes: Partial<Record<Category, number>>,
  random: () => number = secureRandom,
  available = CATEGORIES.filter((c) => Number.isFinite(votes[c])),
): Category {
  if (!available.length) throw new Error("No available game categories");
  const highest = Math.max(...available.map((c) => votes[c] ?? 0));
  const tied = available.filter((c) => (votes[c] ?? 0) === highest);
  return tied[Math.floor(random() * tied.length)];
}
function secureRandom(): number {
  return crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
}
export function voteCounts(state: RoomState): Record<GameMode, number> {
  const result = Object.fromEntries(
    [...CATEGORIES, "mixed"].map((c) => [c, 0]),
  ) as Record<GameMode, number>;
  for (const player of Object.values(state.players))
    if (player.vote) result[player.vote]++;
  return result;
}
export function availableCategories(
  pack: WeekPackage,
  playerCount = 30,
): Category[] {
  return CATEGORIES.filter(
    (c) =>
      (pack.questions[c]?.length ?? 0) >= 6 &&
      (c !== "association" || playerCount >= 2),
  );
}
export function availableModes(
  pack: WeekPackage,
  playerCount = 30,
): GameMode[] {
  const categories = availableCategories(pack, playerCount);
  return categories.length >= 6 ? [...categories, "mixed"] : categories;
}
export function chooseMode(
  votes: Record<GameMode, number>,
  available: GameMode[],
  random = secureRandom,
): GameMode {
  const highest = Math.max(...available.map((c) => votes[c] ?? 0));
  const tied = available.filter((c) => (votes[c] ?? 0) === highest);
  if (!tied.length) throw new Error("No available modes");
  return tied[Math.floor(random() * tied.length)];
}
export function roundEligible(state: RoomState): string[] {
  const ids = Object.keys(state.players);
  if (
    state.puzzle &&
    currentQuestion(state)?.puzzle &&
    state.puzzle.questionId === currentQuestion(state)?.id
  )
    return puzzleEligible(state.puzzle, ids);
  if (state.category === "drawing")
    return ids.filter((id) => id !== state.drawing?.artistId);
  if (state.category === "association" && state.association)
    return ids.filter(
      (id) =>
        !Object.values(state.association!.teams).some(
          (team) => team.captainId === id,
        ),
    );
  return ids;
}
export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];
export function currentQuestion(state: RoomState): Question | undefined {
  if (!state.category) return undefined;
  const pool = state.pack.questions[state.category] ?? [];
  const id = state.adaptive?.chosenQuestionIds[state.round];
  return id ? pool.find((q) => q.id === id) : pool[state.round];
}
export function selectRoundCategory(
  state: RoomState,
  random: () => number = secureRandom,
): void {
  if (state.mode === "mixed") {
    state.mixedCategories ??= [];
    if (!state.mixedCategories[state.round]) {
      const unused = availableCategories(
        state.pack,
        Object.keys(state.players).length,
      ).filter((c) => !state.mixedCategories!.includes(c));
      if (!unused.length) throw new Error("Mixed category pool exhausted");
      let candidates = unused;
      if (state.guided) {
        const family = (category: Category) =>
          category === "drawing" ||
          category === "association" ||
          category === "wavelength"
            ? "creative"
            : category === "sets" ||
                category === "memory" ||
                category === "countries" ||
                category === "geography"
              ? "visual"
              : category === "trivia" ||
                  category === "truth" ||
                  category === "estimate"
                ? "knowledge"
                : "brain";
        const used = state.mixedCategories.slice(0, state.round);
        const count = (category: Category) =>
          used.filter((c) => family(c) === family(category)).length;
        const least = Math.min(...unused.map(count));
        candidates = unused.filter((c) => count(c) === least);
      }
      state.mixedCategories[state.round] =
        candidates[Math.floor(random() * candidates.length)];
    }
    state.category = state.mixedCategories[state.round];
  }
}
export function beginRound(
  state: RoomState,
  random: () => number = secureRandom,
): void {
  selectRoundCategory(state, random);
  if (!state.category) return;
  const pool = state.pack.questions[state.category] ?? [];
  if (
    !state.adaptive &&
    state.round === 0 &&
    pool.every((q) => q.difficulty && DIFFICULTIES.includes(q.difficulty))
  ) {
    state.adaptive = {
      targetDifficulty: "medium",
      chosenQuestionIds: [],
      eligible: {},
      history: [],
    };
  }
  if (!state.adaptive || state.adaptive.chosenQuestionIds[state.round]) return;
  const unused = pool.filter(
    (q) => !state.adaptive!.chosenQuestionIds.includes(q.id),
  );
  if (!unused.length)
    throw new Error("Question pool exhausted before six rounds");
  const distance = (q: Question) =>
    Math.abs(
      DIFFICULTIES.indexOf(q.difficulty!) -
        DIFFICULTIES.indexOf(state.adaptive!.targetDifficulty),
    );
  const nearest = Math.min(...unused.map(distance));
  const candidates = unused.filter((q) => distance(q) === nearest);
  const question = candidates[Math.floor(random() * candidates.length)];
  state.adaptive.chosenQuestionIds[state.round] = question.id;
  const roster = Object.keys(state.players);
  const artistId =
    state.category === "drawing" || question.puzzle?.kind === "wavelength"
      ? roster[state.round % roster.length]
      : undefined;
  const captains =
    state.category === "association"
      ? Object.values(associationTeams(roster, state.round)).map(
          (team) => team.captainId,
        )
      : [];
  state.adaptive.eligible[question.id] = roster.filter(
    (id) => id !== artistId && !captains.includes(id),
  );
}
export function nextDifficulty(
  level: Difficulty,
  successCount: number,
  eligibleCount: number,
): Difficulty {
  if (eligibleCount < 1) return level;
  const index = DIFFICULTIES.indexOf(level);
  if (successCount * 10 >= eligibleCount * 7)
    return DIFFICULTIES[Math.min(2, index + 1)];
  if (successCount * 10 < eligibleCount * 3)
    return DIFFICULTIES[Math.max(0, index - 1)];
  return level;
}
export function successfulAnswer(
  question: Question,
  value: string | number,
): boolean {
  if (question.category === "geography")
    return successfulGeoGuess(value, question);
  if (question.category !== "estimate")
    return pointsFor(question, value) === 1000;
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    typeof question.answer === "number" &&
    Math.abs(value - question.answer) <=
      Math.max(Math.abs(question.answer), 1) / 10 +
        Number.EPSILON *
          Math.max(Math.abs(question.answer), Math.abs(value), 1) *
          4
  );
}
export function finishRound(state: RoomState): void {
  const question = currentQuestion(state);
  const adaptive = state.adaptive;
  if (
    !question?.difficulty ||
    !adaptive ||
    adaptive.history.some((row) => row.questionId === question.id)
  )
    return;
  const roster = adaptive.eligible[question.id] ?? [];
  const answers = state.answers[question.id] ?? {};
  const successes = roster.filter(
    (id) =>
      answers[id] &&
      (question.category === "association" && state.association
        ? associationCorrect(question, state.association, id, answers[id].value)
        : question.puzzle && state.puzzle
          ? puzzleResult(question, state.puzzle, id).success
          : successfulAnswer(question, answers[id].value)),
  ).length;
  const next = nextDifficulty(question.difficulty, successes, roster.length);
  adaptive.history.push({
    questionId: question.id,
    difficulty: question.difficulty,
    successCount: successes,
    eligibleCount: roster.length,
    nextDifficulty: next,
  });
  adaptive.targetDifficulty = next;
}
export function parseAnswer(
  question: Question,
  input: string,
  language: Language,
): string | number | null {
  if (question.category === "geography") return parseGeoGuess(input);
  if (question.category === "estimate" || question.category === "arithmetic")
    return parseEstimate(input, language);
  if (question.category === "order") {
    const ids = input.split(",");
    const options = question.options ?? [];
    if (
      ids.length !== options.length ||
      new Set(ids).size !== options.length ||
      !ids.every((id) => options.some((o) => o.id === id))
    )
      return null;
    return ids.join(",");
  }
  return question.options?.some((o) => o.id === input) ? input : null;
}
export function initializeAssociation(state: RoomState): void {
  if (state.category !== "association") return;
  const question = currentQuestion(state)!;
  if (state.association?.questionId === question.id) return;
  state.association = createAssociationRound(
    question,
    Object.keys(state.players),
    state.round,
    state.endsAt!,
  );
  state.associationScores ??= { green: 0, purple: 0 };
  state.associationHistory ??= [];
}
export function initializePuzzle(state: RoomState, startedAt: number): void {
  const question = currentQuestion(state);
  if (!question?.puzzle || state.puzzle?.questionId === question.id) return;
  state.puzzle = createPuzzleRound(
    question,
    Object.keys(state.players),
    state.round,
    startedAt,
  );
}
export function initializeDrawing(state: RoomState): void {
  if (state.category !== "drawing") return;
  const question = currentQuestion(state)!;
  if (state.drawing?.questionId === question.id) return;
  const ids = Object.keys(state.players);
  const artistId = ids[state.round % ids.length];
  state.drawing = {
    questionId: question.id,
    artistId,
    strokes: [],
    revision: 0,
    pointCount: 0,
    lastStrokeAt: 0,
    seenIds: [],
    chat: [],
  };
  (state.drawingArtists ??= {})[question.id] = artistId;
}
export function matchesDrawingWord(question: Question, input: string): boolean {
  const normalize = (text: string) =>
    text.normalize("NFKC").trim().replace(/\s+/g, " ").toLowerCase();
  if (!question.drawing || input.length > 40) return false;
  const value = normalize(input);
  return [...question.drawing.aliases.de, ...question.drawing.aliases.en].some(
    (alias) => normalize(alias) === value,
  );
}
export function normalizedStroke(stroke: DrawingStroke): DrawingStroke | null {
  if (
    !stroke ||
    typeof stroke !== "object" ||
    typeof stroke.id !== "string" ||
    !/^[a-zA-Z0-9_-]{1,64}$/.test(stroke.id) ||
    typeof stroke.color !== "string" ||
    !/^#[a-fA-F0-9]{6}$/.test(stroke.color) ||
    !Number.isFinite(stroke.width) ||
    stroke.width < 0.001 ||
    stroke.width > 0.05 ||
    !Array.isArray(stroke.points) ||
    stroke.points.length < 1 ||
    stroke.points.length > 32
  )
    return null;
  const points: { x: number; y: number }[] = [];
  for (const point of stroke.points) {
    if (
      !point ||
      !Number.isFinite(point.x) ||
      !Number.isFinite(point.y) ||
      point.x < 0 ||
      point.x > 1 ||
      point.y < 0 ||
      point.y > 1
    )
      return null;
    points.push({
      x: Math.round(point.x * 1000) / 1000,
      y: Math.round(point.y * 1000) / 1000,
    });
  }
  return {
    id: stroke.id,
    color: stroke.color.toLowerCase(),
    width: stroke.width,
    points,
  };
}
export function ranking(players: Player[]): LeaderboardRow[] {
  const sorted = [...players].sort(
    (a, b) =>
      b.score - a.score ||
      a.name.localeCompare(b.name) ||
      a.id.localeCompare(b.id),
  );
  return sorted.map((p, i) => ({
    id: p.id,
    name: p.name,
    score: p.score,
    sessions: 1,
    rank:
      i > 0 && sorted[i - 1].score === p.score
        ? sorted.findIndex((x) => x.score === p.score) + 1
        : i + 1,
  }));
}
export function roomView(
  state: RoomState,
  playerId: string,
  language: Language,
  connected: Set<string>,
  now = Date.now(),
  browserKey?: string,
): RoomView {
  const player = state.players[playerId];
  const question =
    state.phase === "tutorial" ? undefined : currentQuestion(state);
  const answers = question ? (state.answers[question.id] ?? {}) : {};
  const translate = (text: { de: string; en?: string }) =>
    text[language] || text.de;
  const missing = (text: { de: string; en?: string }) =>
    language === "en" && !text.en;
  const view: RoomView = {
    code: state.code,
    phase: state.phase,
    hostId: state.hostId,
    me: {
      id: player.id,
      name: player.name,
      score: player.score,
      vote: player.vote,
      answer: answers[playerId]?.value,
    },
    players: Object.values(state.players).map((p) => ({
      id: p.id,
      name: p.name,
      score: p.score,
      connected: connected.has(p.id),
      answered: Boolean(answers[p.id]),
    })),
    endsAt: state.endsAt,
    serverNow: now,
    round: state.round,
    totalRounds: 6,
    category: state.category,
    mode: state.mode ?? state.category,
    availableModes: availableModes(
      state.pack,
      Object.keys(state.players).length,
    ),
    availableCategories: availableCategories(
      state.pack,
      Object.keys(state.players).length,
    ),
    votes: voteCounts(state),
    pack: {
      id: state.pack.id,
      title: translate(state.pack.title),
      week: state.week,
      reused: state.reused,
      fallback: missing(state.pack.title),
    },
    saving: state.dirty,
    saveError: state.saveError,
  };
  if (state.phase === "tutorial" && state.tutorial)
    view.tutorial = {
      category: state.tutorial.category,
      readyIds: [...state.tutorial.readyIds],
    };
  if (
    question?.puzzle &&
    state.puzzle &&
    state.puzzle.questionId === question.id
  )
    view.puzzle = puzzleView(
      question,
      state.puzzle,
      playerId,
      language,
      now,
      state.phase === "reveal",
    );
  if (question?.category === "association" && state.association)
    view.association = associationView(
      question,
      state.association,
      playerId,
      state.associationScores ?? { green: 0, purple: 0 },
      state.phase === "reveal",
    );
  if (question?.category === "drawing" && state.drawing) {
    view.drawing = {
      chat: state.drawing.chat ?? [],
      artistId: state.drawing.artistId,
      strokes: state.drawing.strokes,
      revision: state.drawing.revision,
    };
    if (playerId === state.drawing.artistId && question.drawing)
      view.drawing.word = question.drawing.word;
  }
  if (question && (state.phase === "question" || state.phase === "reveal")) {
    if (question.category === "geography" && browserKey)
      view.geography = { browserKey };
    view.question = {
      id: question.id,
      category: question.category,
      difficulty: question.difficulty,
      prompt: translate(question.prompt),
      options: question.options?.map((o) => ({
        id: o.id,
        text: translate(o.text),
      })),
      geography: question.geography
        ? {
            panoId: question.geography.panoId,
            heading: question.geography.heading ?? 0,
            pitch: question.geography.pitch ?? 0,
          }
        : undefined,
      unit: question.unit ? translate(question.unit) : undefined,
      fallback:
        missing(question.prompt) ||
        Boolean(question.unit && missing(question.unit)) ||
        Boolean(question.options?.some((o) => missing(o.text))),
    };
    if (state.phase === "reveal")
      view.reveal = {
        answer:
          question.puzzle && state.puzzle
            ? puzzleReveal(question, state.puzzle, playerId, language)
            : question.geography
              ? JSON.stringify(question.geography.target)
              : question.association && view.association
                ? associationTargets(question, view.association.team)
                : question.drawing
                  ? translate(question.drawing.word)
                  : question.answer,
        explanation: translate(question.explanation),
        scores: Object.keys(state.players).map((id) => ({
          playerId: id,
          answer:
            question.drawing && answers[id]?.value === question.answer
              ? translate(question.drawing.word)
              : (answers[id]?.value ?? null),
          points: answers[id]?.points ?? 0,
        })),
        fallback: missing(question.explanation),
      };
  }
  if (state.phase === "reveal" && state.adaptive) {
    const record = state.adaptive.history.find(
      (row) => row.questionId === question?.id,
    );
    if (record)
      view.adaptation = {
        successCount: record.successCount,
        eligibleCount: record.eligibleCount,
        nextDifficulty: record.nextDifficulty,
      };
  }
  if (state.phase === "results") {
    view.results = ranking(Object.values(state.players));
    view.weekly = state.weekly;
    view.allTime = state.allTime;
  }
  return view;
}
export async function hashToken(token: string): Promise<string> {
  const bytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(token),
  );
  return [...new Uint8Array(bytes)]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("");
}
export function validToken(token: unknown): token is string {
  return typeof token === "string" && /^[a-f0-9]{64}$/.test(token);
}
export function validName(name: unknown): name is string {
  return (
    typeof name === "string" &&
    name.trim().length >= 1 &&
    name.trim().length <= 24 &&
    !/[\u0000-\u001f\u007f]/.test(name)
  );
}

export function containsDrawingSecret(
  question: Question,
  text: string,
): boolean {
  if (!question.drawing) return false;
  const normalized = text.normalize("NFKC").toLowerCase().replace(/\s+/g, " ");
  return [
    ...question.drawing.aliases.de,
    ...question.drawing.aliases.en,
    question.drawing.word.de,
    question.drawing.word.en,
  ].some((alias) => {
    const value = alias
      .normalize("NFKC")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
    const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(
      `(^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`,
      "u",
    ).test(normalized);
  });
}
