import type { ErrorCode, Language, Question } from "../shared/types";
import type {
  PuzzleAction,
  PuzzleDefinition,
  PuzzleProgress,
  PuzzleRound,
  PuzzleView,
} from "../shared/puzzles";
import { localPuzzleText } from "../shared/puzzles";

type EngineRound = PuzzleRound & { endsAt?: number; previewSettled?: boolean };
const featureNames = ["shape", "color", "count", "fill"] as const;
const initialProgress = (): PuzzleProgress => ({
  attempts: 0,
  done: false,
  success: false,
  points: 0,
});
const unique = (values: string[]) => new Set(values).size === values.length;
const boundedAttempts = (n: number) => Number.isInteger(n) && n >= 1 && n <= 6;
const clueText = (value: unknown): value is string =>
  typeof value === "string" &&
  value.trim().length > 0 &&
  value.trim().length <= 80 &&
  /\p{L}/u.test(value) &&
  !/[\u0000-\u001f\u007f]/.test(value);

function fail(code: ErrorCode): never {
  throw Object.assign(new Error(code), { code });
}
function definition(question: Question): PuzzleDefinition {
  if (!question.puzzle) fail("INVALID_REQUEST");
  return question.puzzle;
}
function matchesSet(
  cards: Extract<PuzzleDefinition, { kind: "sets" }>["cards"],
  features: number,
): boolean {
  return featureNames.slice(0, features).every((feature) => {
    const size = new Set(cards.map((card) => card[feature])).size;
    return size === 1 || size === 3;
  });
}
function firstSet(
  puzzle: Extract<PuzzleDefinition, { kind: "sets" }>,
): typeof puzzle.cards | undefined {
  for (let a = 0; a < puzzle.cards.length; a++)
    for (let b = a + 1; b < puzzle.cards.length; b++)
      for (let c = b + 1; c < puzzle.cards.length; c++)
        if (
          matchesSet(
            [puzzle.cards[a], puzzle.cards[b], puzzle.cards[c]],
            puzzle.features,
          )
        )
          return [puzzle.cards[a], puzzle.cards[b], puzzle.cards[c]];
  return undefined;
}

export function validPuzzleQuestion(question: Question): boolean {
  try {
    return checkPuzzleQuestion(question);
  } catch {
    return false;
  }
}

function checkPuzzleQuestion(question: Question): boolean {
  const puzzle = question.puzzle;
  if (!puzzle || puzzle.kind !== question.category) return false;
  switch (puzzle.kind) {
    case "code":
      return (
        typeof puzzle.secret === "string" &&
        Array.from(puzzle.secret).length >= 2 &&
        Array.from(puzzle.secret).length <= 6 &&
        Array.isArray(puzzle.symbols) &&
        puzzle.symbols.length >= 2 &&
        puzzle.symbols.length <= 10 &&
        unique(puzzle.symbols) &&
        puzzle.symbols.every(
          (s) => typeof s === "string" && Array.from(s).length === 1,
        ) &&
        Array.from(puzzle.secret).every((s) => puzzle.symbols.includes(s)) &&
        puzzle.maxAttempts === 6
      );
    case "sets":
      return (
        Number.isInteger(puzzle.features) &&
        puzzle.features >= 1 &&
        puzzle.features <= 4 &&
        boundedAttempts(puzzle.maxAttempts) &&
        Array.isArray(puzzle.cards) &&
        puzzle.cards.length >= 3 &&
        puzzle.cards.length <= 18 &&
        unique(puzzle.cards.map((c) => c.id)) &&
        unique(
          puzzle.cards.map((card) =>
            featureNames
              .slice(0, puzzle.features)
              .map((feature) => card[feature])
              .join(","),
          ),
        ) &&
        puzzle.cards.every(
          (c) =>
            typeof c.id === "string" &&
            c.id.length > 0 &&
            featureNames.every(
              (f) =>
                Number.isInteger(c[f]) &&
                c[f] >= (f === "count" ? 1 : 0) &&
                c[f] <= (f === "count" ? 3 : 2),
            ),
        ) &&
        Boolean(firstSet(puzzle))
      );
    case "connections": {
      if (
        !Array.isArray(puzzle.groups) ||
        puzzle.groups.length < 2 ||
        puzzle.groups.length > 4 ||
        puzzle.maxAttempts !== 4 ||
        !question.options ||
        !unique(question.options.map((o) => o.id))
      )
        return false;
      const size = puzzle.groups[0].ids?.length;
      if (
        !size ||
        size < 2 ||
        size > 4 ||
        !unique(puzzle.groups.map((g) => g.id)) ||
        !puzzle.groups.every(
          (g) =>
            typeof g.id === "string" &&
            g.id &&
            g.title &&
            typeof g.title.de === "string" &&
            typeof g.title.en === "string" &&
            Array.isArray(g.ids) &&
            g.ids.length === size,
        )
      )
        return false;
      const ids = puzzle.groups.flatMap((g) => g.ids);
      return (
        unique(ids) &&
        ids.length === question.options.length &&
        ids.every((id) => question.options!.some((o) => o.id === id))
      );
    }
    case "wavelength":
      return (
        Number.isFinite(puzzle.target) &&
        puzzle.target >= 0 &&
        puzzle.target <= 100 &&
        puzzle.left &&
        puzzle.right &&
        puzzle.fallbackClue &&
        [
          puzzle.left.de,
          puzzle.left.en,
          puzzle.right.de,
          puzzle.right.en,
        ].every(clueText) &&
        clueText(puzzle.fallbackClue.de) &&
        clueText(puzzle.fallbackClue.en)
      );
    case "memory":
      return (
        Array.isArray(puzzle.sequence) &&
        puzzle.sequence.length >= 3 &&
        puzzle.sequence.length <= 12 &&
        Array.isArray(puzzle.symbols) &&
        puzzle.symbols.length >= 2 &&
        puzzle.symbols.length <= 12 &&
        unique(puzzle.symbols) &&
        puzzle.symbols.every(
          (s) => typeof s === "string" && s.length > 0 && s.length <= 20,
        ) &&
        puzzle.sequence.every((s) => puzzle.symbols.includes(s)) &&
        Number.isInteger(puzzle.previewMs) &&
        puzzle.previewMs >= 1000 &&
        puzzle.previewMs <= 15000
      );
    case "wordle":
      return (
        typeof puzzle.word === "string" &&
        /^[a-z]{5}$/i.test(puzzle.word) &&
        Array.isArray(puzzle.allowed) &&
        puzzle.allowed.length > 0 &&
        puzzle.allowed.every(
          (word) => typeof word === "string" && /^[a-z]{5}$/i.test(word),
        ) &&
        puzzle.allowed.some(
          (word) => word.toUpperCase() === puzzle.word.toUpperCase(),
        ) &&
        puzzle.maxAttempts === 6
      );
    case "countries":
      return (
        typeof puzzle.image === "string" &&
        /^\/countries\/[a-zA-Z0-9_-]+\.(svg|png|webp)$/.test(puzzle.image) &&
        ["flag", "outline"].includes(puzzle.imageKind) &&
        Boolean(
          question.options &&
          question.options.length >= 2 &&
          question.options.length <= 8 &&
          unique(question.options.map((o) => o.id)) &&
          question.options.some((o) => o.id === question.answer),
        )
      );
  }
}

export function puzzleDuration(question: Question): number {
  const puzzle = definition(question);
  if (["code", "wordle", "connections"].includes(puzzle.kind)) return 75_000;
  if (puzzle.kind === "wavelength") return 60_000;
  return 45_000 + (puzzle.kind === "memory" ? puzzle.previewMs : 0);
}

export function createPuzzleRound(
  question: Question,
  playerIds: string[],
  roundIndex: number,
  startedAt: number,
): PuzzleRound {
  if (
    !validPuzzleQuestion(question) ||
    !playerIds.length ||
    !unique(playerIds) ||
    !Number.isInteger(roundIndex) ||
    roundIndex < 0 ||
    !Number.isFinite(startedAt)
  )
    fail("INVALID_REQUEST");
  const puzzle = definition(question);
  const round: EngineRound = {
    questionId: question.id,
    players: Object.fromEntries(playerIds.map((id) => [id, initialProgress()])),
    endsAt: startedAt + puzzleDuration(question),
  };
  if (puzzle.kind === "memory") {
    round.previewEndsAt = startedAt + puzzle.previewMs;
    round.previewSettled = false;
  }
  if (puzzle.kind === "wavelength") {
    round.captainId = playerIds[roundIndex % playerIds.length];
    round.clueEndsAt = startedAt + 15_000;
  }
  return round;
}

export function puzzleEligible(
  round: PuzzleRound,
  playerIds: string[],
): string[] {
  return playerIds.filter(
    (id) => Object.hasOwn(round.players, id) && id !== round.captainId,
  );
}

export function nextPuzzleTransition(round: PuzzleRound): number | undefined {
  if (
    round.previewEndsAt !== undefined &&
    !(round as EngineRound).previewSettled
  )
    return round.previewEndsAt;
  if (round.clueEndsAt !== undefined && !round.clue) return round.clueEndsAt;
  return undefined;
}

export function settlePuzzleRound(
  question: Question,
  round: PuzzleRound,
  now: number,
): boolean {
  if (round.questionId !== question.id) fail("INVALID_REQUEST");
  const puzzle = definition(question);
  if (
    puzzle.kind === "memory" &&
    now >= round.previewEndsAt! &&
    !(round as EngineRound).previewSettled
  ) {
    (round as EngineRound).previewSettled = true;
    return true;
  }
  if (puzzle.kind === "wavelength" && now >= round.clueEndsAt! && !round.clue) {
    round.clue = {
      de: puzzle.fallbackClue.de,
      en: puzzle.fallbackClue.en ?? puzzle.fallbackClue.de,
    };
    round.automaticClue = true;
    round.players[round.captainId!].done = true;
    round.players[round.captainId!].value = "captain";
    return true;
  }
  return false;
}

// First consume exact positions, then match remaining symbols against a multiset.
// This prevents one secret occurrence from satisfying multiple misplaced guesses.
function letterFeedback(secret: string[], guess: string[]): number[] {
  const feedback: number[] = guess.map((s, i) => (s === secret[i] ? 2 : 0));
  const remaining = new Map<string, number>();
  secret.forEach((s, i) => {
    if (feedback[i] !== 2) remaining.set(s, (remaining.get(s) ?? 0) + 1);
  });
  guess.forEach((s, i) => {
    if (feedback[i] === 2 || !(remaining.get(s) ?? 0)) return;
    feedback[i] = 1;
    remaining.set(s, remaining.get(s)! - 1);
  });
  return feedback;
}
function selectedIds(
  action: PuzzleAction,
  offered: string[],
  count: number,
): string[] {
  if (
    action.kind !== "select" ||
    !Array.isArray(action.ids) ||
    action.ids.length !== count ||
    !unique(action.ids) ||
    !action.ids.every((id) => typeof id === "string" && offered.includes(id))
  )
    fail("INVALID_ANSWER");
  return [...action.ids].sort();
}

export function applyPuzzleAction(
  question: Question,
  round: PuzzleRound,
  playerId: string,
  action: PuzzleAction,
  now: number,
): boolean {
  if (round.questionId !== question.id) fail("INVALID_REQUEST");
  if (!Object.hasOwn(round.players, playerId)) fail("UNAUTHORIZED");
  if (
    (round as EngineRound).endsAt !== undefined &&
    now >= (round as EngineRound).endsAt!
  )
    fail("TOO_LATE");
  if (!action || typeof action !== "object") fail("INVALID_ANSWER");
  const puzzle = definition(question),
    progress = round.players[playerId];
  if (puzzle.kind === "wavelength" && action.kind === "clue") {
    if (playerId !== round.captainId) fail("GUESSER_ONLY");
    if (now >= round.clueEndsAt!) fail("CLUE_TOO_LATE");
    if (round.clue) fail("ALREADY_CLUED");
    if (!clueText(action.de) || !clueText(action.en)) fail("INVALID_CLUE");
    round.clue = { de: action.de.trim(), en: action.en.trim() };
    round.automaticClue = false;
    progress.done = true;
    progress.value = "captain";
    return true;
  }
  if (puzzle.kind === "wavelength" && playerId === round.captainId)
    fail("GUESSER_ONLY");
  if (progress.done) fail("ALREADY_ANSWERED");
  switch (puzzle.kind) {
    case "code":
    case "wordle": {
      if (action.kind !== "guess" || typeof action.value !== "string")
        fail("INVALID_ANSWER");
      const value =
        puzzle.kind === "wordle"
          ? action.value.trim().toUpperCase()
          : action.value.trim();
      const secret = Array.from(
          puzzle.kind === "wordle" ? puzzle.word.toUpperCase() : puzzle.secret,
        ),
        guess = Array.from(value);
      if (
        guess.length !== secret.length ||
        (puzzle.kind === "code"
          ? !guess.every((s) => puzzle.symbols.includes(s))
          : !puzzle.allowed.some((word) => word.toUpperCase() === value))
      )
        fail("INVALID_ANSWER");
      if (progress.guesses?.some((g) => g.value === value)) return false;
      const feedback = letterFeedback(secret, guess);
      progress.guesses ??= [];
      progress.guesses.push({
        value,
        feedback:
          puzzle.kind === "wordle"
            ? feedback
            : [
                feedback.filter((f) => f === 2).length,
                feedback.filter((f) => f === 1).length,
              ],
      });
      progress.attempts++;
      progress.value = value;
      progress.success = feedback.every((f) => f === 2);
      progress.points = progress.success ? 1000 : 0;
      progress.done =
        progress.success || progress.attempts >= puzzle.maxAttempts;
      return true;
    }
    case "sets": {
      const ids = selectedIds(
        action,
        puzzle.cards.map((c) => c.id),
        3,
      );
      if (progress.selections?.some((s) => s.join(",") === ids.join(",")))
        return false;
      progress.selections ??= [];
      progress.selections.push(ids);
      progress.attempts++;
      progress.success = matchesSet(
        ids.map((id) => puzzle.cards.find((c) => c.id === id)!),
        puzzle.features,
      );
      progress.points = progress.success ? 1000 : 0;
      progress.done =
        progress.success || progress.attempts >= puzzle.maxAttempts;
      progress.feedback = progress.success ? "solved" : "incorrect";
      progress.value = ids.join(",");
      return true;
    }
    case "connections": {
      const ids = selectedIds(
        action,
        question.options!.map((o) => o.id),
        puzzle.groups[0].ids.length,
      );
      if (progress.selections?.some((s) => s.join(",") === ids.join(",")))
        return false;
      const found = progress.foundGroups ?? [];
      if (
        puzzle.groups
          .filter((g) => found.includes(g.id))
          .some((g) => g.ids.some((id) => ids.includes(id)))
      )
        fail("INVALID_ANSWER");
      progress.selections ??= [];
      progress.selections.push(ids);
      const group = puzzle.groups.find(
        (g) => [...g.ids].sort().join(",") === ids.join(","),
      );
      if (group) {
        progress.foundGroups = [...found, group.id];
        progress.points = Math.round(
          (1000 * progress.foundGroups.length) / puzzle.groups.length,
        );
        progress.success = progress.foundGroups.length === puzzle.groups.length;
        progress.feedback = progress.success ? "solved" : "group";
      } else {
        progress.attempts++;
        progress.feedback = "incorrect";
      }
      progress.value = (progress.foundGroups ?? []).join(",");
      progress.done =
        progress.success || progress.attempts >= puzzle.maxAttempts;
      return true;
    }
    case "wavelength": {
      if (!round.clue) fail("WAIT_FOR_CLUE");
      if (
        action.kind !== "guess" ||
        typeof action.value !== "string" ||
        !/^\d{1,3}(?:[.,]\d{1,2})?$/.test(action.value.trim())
      )
        fail("INVALID_ANSWER");
      const value = Number(action.value.trim().replace(",", "."));
      if (!Number.isFinite(value) || value < 0 || value > 100)
        fail("INVALID_ANSWER");
      progress.value = String(value);
      progress.points = Math.round(
        Math.max(0, 1000 - 40 * Math.abs(value - puzzle.target)),
      );
      progress.success = progress.points >= 600;
      progress.done = true;
      progress.attempts = 1;
      return true;
    }
    case "memory": {
      if (now < round.previewEndsAt!) fail("WRONG_PHASE");
      if (
        action.kind !== "select" ||
        !Array.isArray(action.ids) ||
        action.ids.length < 1 ||
        action.ids.length > puzzle.sequence.length ||
        !action.ids.every(
          (id) => typeof id === "string" && puzzle.symbols.includes(id),
        )
      )
        fail("INVALID_ANSWER");
      const correct = action.ids.filter(
        (s, i) => s === puzzle.sequence[i],
      ).length;
      progress.value = action.ids.join("→");
      progress.points = Math.round((1000 * correct) / puzzle.sequence.length);
      progress.success = correct === puzzle.sequence.length;
      progress.done = true;
      progress.attempts = 1;
      return true;
    }
    case "countries": {
      const value =
        action.kind === "guess"
          ? action.value
          : selectedIds(
              action,
              question.options!.map((o) => o.id),
              1,
            )[0];
      if (
        typeof value !== "string" ||
        !question.options!.some((o) => o.id === value)
      )
        fail("INVALID_ANSWER");
      progress.value = value;
      progress.success = value === question.answer;
      progress.points = progress.success ? 1000 : 0;
      progress.done = true;
      progress.attempts = 1;
      return true;
    }
  }
}

export function puzzleResult(
  question: Question,
  round: PuzzleRound,
  playerId: string,
): { value: string; points: number; success: boolean } {
  if (round.questionId !== question.id) fail("INVALID_REQUEST");
  const progress = round.players[playerId];
  if (!progress) fail("UNAUTHORIZED");
  if (
    definition(question).kind === "wavelength" &&
    playerId === round.captainId
  ) {
    const success = Object.entries(round.players).some(
      ([id, p]) => id !== playerId && p.points >= 600 && p.done,
    );
    return { value: "captain", points: success ? 1000 : 0, success };
  }
  return {
    value: progress.value ?? "",
    points: progress.points,
    success: progress.success,
  };
}

export function puzzleReveal(
  question: Question,
  round: PuzzleRound,
  playerId: string,
  language: Language,
): string {
  if (round.questionId !== question.id) fail("INVALID_REQUEST");
  if (!Object.hasOwn(round.players, playerId)) fail("UNAUTHORIZED");
  const puzzle = definition(question);
  switch (puzzle.kind) {
    case "code":
      return puzzle.secret;
    case "wordle":
      return puzzle.word.toUpperCase();
    case "memory":
      return puzzle.sequence.join(" → ");
    case "wavelength":
      return String(puzzle.target);
    case "countries":
      return (
        question.options!.find((o) => o.id === question.answer)!.text[
          language
        ] ?? question.options!.find((o) => o.id === question.answer)!.text.de
      );
    case "connections":
      return puzzle.groups
        .map(
          (g) =>
            `${localPuzzleText(g.title, language)}: ${g.ids.map((id) => localPuzzleText(question.options!.find((o) => o.id === id)!.text, language)).join(", ")}`,
        )
        .join(" · ");
    case "sets": {
      const cards = firstSet(puzzle)!;
      const names =
        language === "de"
          ? ["Form", "Farbe", "Anzahl", "Füllung"]
          : ["Shape", "Colour", "Count", "Fill"];
      return featureNames
        .slice(0, puzzle.features)
        .map((feature, index) => {
          const same = new Set(cards.map((card) => card[feature])).size === 1;
          const relationship =
            language === "de"
              ? same
                ? "alle gleich"
                : "alle unterschiedlich"
              : same
                ? "all the same"
                : "all different";
          return `${names[index]}: ${relationship}`;
        })
        .join(" · ");
    }
  }
}

export function puzzleView(
  question: Question,
  round: PuzzleRound,
  playerId: string,
  language: Language,
  now: number,
  reveal: boolean,
): PuzzleView {
  if (round.questionId !== question.id) fail("INVALID_REQUEST");
  if (!Object.hasOwn(round.players, playerId)) fail("UNAUTHORIZED");
  const puzzle = definition(question);
  const progress = structuredClone(round.players[playerId]);
  // Single-shot games reveal correctness only at the shared round reveal.
  // In wavelength, early distance points would also reveal the private target.
  if (!reveal && ["wavelength", "memory", "countries"].includes(puzzle.kind)) {
    progress.points = 0;
    progress.success = false;
  }
  if (reveal)
    Object.assign(progress, puzzleResult(question, round, playerId), {
      done: true,
    });
  const view: PuzzleView = { kind: puzzle.kind, progress };
  if ("maxAttempts" in puzzle) view.maxAttempts = puzzle.maxAttempts;
  switch (puzzle.kind) {
    case "code":
      view.symbols = [...puzzle.symbols];
      view.length = Array.from(puzzle.secret).length;
      break;
    case "wordle":
      view.length = 5;
      break;
    case "sets":
      view.cards = structuredClone(puzzle.cards);
      view.features = puzzle.features;
      if (reveal) view.solutionIds = firstSet(puzzle)!.map((card) => card.id);
      break;
    case "connections":
      view.groupSize = puzzle.groups[0].ids.length;
      view.groupCount = puzzle.groups.length;
      view.groups = puzzle.groups
        .filter((g) => reveal || progress.foundGroups?.includes(g.id))
        .map((g) => ({
          id: g.id,
          title: localPuzzleText(g.title, language),
          ids: [...g.ids],
        }));
      break;
    case "memory":
      view.symbols = [...puzzle.symbols];
      view.length = puzzle.sequence.length;
      view.previewEndsAt = round.previewEndsAt;
      if (reveal || now < round.previewEndsAt!)
        view.sequence = [...puzzle.sequence];
      break;
    case "wavelength":
      view.left = localPuzzleText(puzzle.left, language);
      view.right = localPuzzleText(puzzle.right, language);
      view.captainId = round.captainId;
      view.clueEndsAt = round.clueEndsAt;
      if (round.clue) {
        view.clue = round.clue[language];
        view.automaticClue = round.automaticClue;
      }
      if (reveal || playerId === round.captainId) view.target = puzzle.target;
      break;
    case "countries":
      view.image = puzzle.image;
      view.imageKind = puzzle.imageKind;
      break;
  }
  if (reveal) view.solution = puzzleReveal(question, round, playerId, language);
  return view;
}
