import type { AssociationView, Question, Team } from "../shared/types";
export const TEAMS: Team[] = ["green", "purple"];
export interface AssociationTeam {
  playerIds: string[];
  captainId?: string;
  clue?: { de: string; en: string };
  automatic?: boolean;
}
export interface AssociationRound {
  cooperative: boolean;
  questionId: string;
  clueEndsAt: number;
  targetCount: number;
  teams: Record<Team, AssociationTeam>;
}
export function associationTeams(
  roster: string[],
  round: number,
): Record<Team, AssociationTeam> {
  if (roster.length < 2) throw new Error("Association needs two participants");
  if (roster.length < 4)
    return {
      green: { playerIds: roster, captainId: roster[round % roster.length] },
      purple: { playerIds: [] },
    };
  const green = roster.filter((_, i) => i % 2 === 0),
    purple = roster.filter((_, i) => i % 2 === 1);
  return {
    green: { playerIds: green, captainId: green[round % green.length] },
    purple: { playerIds: purple, captainId: purple[round % purple.length] },
  };
}
export function createAssociationRound(
  question: Question,
  roster: string[],
  round: number,
  endsAt: number,
): AssociationRound {
  return {
    cooperative: roster.length < 4,
    questionId: question.id,
    clueEndsAt: endsAt - 30_000,
    targetCount: question.association!.targets.green.length,
    teams: associationTeams(roster, round),
  };
}
export function associationTeam(
  round: AssociationRound,
  playerId: string,
): Team {
  return TEAMS.find((team) => round.teams[team].playerIds.includes(playerId))!;
}
export function associationTargets(question: Question, team: Team): string {
  return [...question.association!.targets[team]].sort().join(",");
}
export function normalizeAssociationGuess(
  question: Question,
  input: string,
): string | null {
  const ids = input.split(",");
  const count = question.association!.targets.green.length;
  if (
    ids.length !== count ||
    new Set(ids).size !== count ||
    !ids.every((id) => question.options?.some((option) => option.id === id))
  )
    return null;
  return ids.sort().join(",");
}
export function associationCorrect(
  question: Question,
  round: AssociationRound,
  playerId: string,
  value: string | number,
): boolean {
  const team = associationTeam(round, playerId);
  return Boolean(
    team &&
    playerId !== round.teams[team].captainId &&
    value === associationTargets(question, team),
  );
}
export function validAssociationClue(
  question: Question,
  value: unknown,
): value is { de: string; en: string } {
  if (!value || typeof value !== "object") return false;
  const clue = value as { de?: unknown; en?: unknown };
  const normalize = (s: string) => s.normalize("NFKC").trim().toLowerCase();
  const board = new Set(
    question
      .options!.flatMap((option) => [
        option.text.de,
        option.text.en ?? option.text.de,
      ])
      .map(normalize),
  );
  return [clue.de, clue.en].every(
    (s) =>
      typeof s === "string" &&
      s.length <= 30 &&
      /^\p{L}+(?:-\p{L}+)*$/u.test(s) &&
      !board.has(normalize(s)),
  );
}
export function settleAssociationClues(
  question: Question,
  round: AssociationRound,
  now: number,
): boolean {
  if (now < round.clueEndsAt) return false;
  let changed = false;
  for (const team of TEAMS)
    if (round.teams[team].captainId && !round.teams[team].clue) {
      const hint = question.association!.hints[team];
      round.teams[team].clue = { de: hint.de, en: hint.en ?? hint.de };
      round.teams[team].automatic = true;
      changed = true;
    }
  return changed;
}
export function associationEvaluation(
  question: Question,
  round: AssociationRound,
  answers: Record<string, { value: string | number }>,
): { roundScores: Record<Team, number>; points: Record<string, number> } {
  const roundScores = { green: 0, purple: 0 },
    points: Record<string, number> = {};
  for (const team of TEAMS) {
    const t = round.teams[team],
      eligible = t.playerIds.filter((id) => id !== t.captainId);
    const correct = eligible.filter(
      (id) =>
        answers[id] &&
        associationCorrect(question, round, id, answers[id].value),
    );
    for (const id of eligible) points[id] = correct.includes(id) ? 1000 : 0;
    if (t.captainId)
      points[t.captainId] =
        t.clue && !t.automatic && correct.length > 0 ? 1000 : 0;
    roundScores[team] = eligible.length
      ? Math.round((1000 * correct.length) / eligible.length)
      : 0;
  }
  return { roundScores, points };
}
export function associationView(
  question: Question,
  round: AssociationRound,
  playerId: string,
  scores: Record<Team, number>,
  reveal: boolean,
): AssociationView {
  const team = associationTeam(round, playerId),
    captain = round.teams[team].captainId === playerId;
  const view: AssociationView = {
    cooperative: round.cooperative,
    team,
    captain,
    clueEndsAt: round.clueEndsAt,
    targetCount: round.targetCount,
    teams: {
      green: { ...round.teams.green, score: scores.green },
      purple: { ...round.teams.purple, score: scores.purple },
    },
  };
  if (captain || reveal)
    view.key = Object.fromEntries(
      question.options!.map((option) => [
        option.id,
        TEAMS.find((t) =>
          question.association!.targets[t].includes(option.id),
        ) ?? "neutral",
      ]),
    );
  if (captain && !reveal) view.suggestion = question.association!.hints[team];
  return view;
}
export function validAssociationQuestion(question: Question): boolean {
  const data = question.association,
    options = question.options;
  if (
    !data ||
    !options ||
    !data.targets ||
    !data.hints ||
    !TEAMS.every(
      (team) =>
        Array.isArray(data.targets[team]) &&
        data.hints[team] &&
        typeof data.hints[team].de === "string" &&
        typeof data.hints[team].en === "string",
    )
  )
    return false;
  if (
    new Set(options.map((o) => o.id)).size !== options.length ||
    !options.every((o) => o.id && o.text.de && o.text.en)
  )
    return false;
  const count =
    question.difficulty === "hard"
      ? 4
      : question.difficulty === "medium"
        ? 3
        : 2;
  const all = [...data.targets.green, ...data.targets.purple];
  return (
    options.length === count * 3 &&
    data.targets.green.length === count &&
    data.targets.purple.length === count &&
    new Set(all).size === all.length &&
    all.every((id) => options.some((o) => o.id === id)) &&
    TEAMS.every((team) =>
      validAssociationClue(question, {
        de: data.hints[team].de,
        en: data.hints[team].en ?? data.hints[team].de,
      }),
    )
  );
}
