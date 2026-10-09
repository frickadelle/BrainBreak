import { describe, expect, it } from "vitest";
import { CATEGORIES, type Question, type WeekPackage } from "../shared/types";
import { packages } from "../worker/content/index";
import {
  chooseCategory,
  beginRound,
  finishRound,
  currentQuestion,
  nextDifficulty,
  successfulAnswer,
  initializeDrawing,
  initializePuzzle,
  selectRoundCategory,
  initializeAssociation,
  normalizedStroke,
  matchesDrawingWord,
  availableCategories,
  availableModes,
  containsDrawingSecret,
  hashToken,
  isoWeek,
  parseEstimate,
  parseAnswer,
  pointsFor,
  ranking,
  roomView,
  selectPackage,
  type RoomState,
} from "../worker/game";
import {
  associationTeams,
  associationCorrect,
  associationEvaluation,
  associationTargets,
  normalizeAssociationGuess,
  validAssociationClue,
  validAssociationQuestion,
  settleAssociationClues,
} from "../worker/association";
import {
  isPuzzleCategory,
  PUZZLE_CATEGORIES,
  type PuzzleCategory,
} from "../shared/puzzles";
import {
  validPuzzleQuestion,
  puzzleDuration,
  puzzleResult,
} from "../worker/puzzles";
import { BrainbreakRoom } from "../worker/room";
import {
  convertNumberDraft,
  convertNumberInput,
  parseLocalizedNumber,
} from "../shared/numbers";
import type { Env } from "../worker/index";

const question: Question = {
  id: "test-q",
  category: "trivia",
  prompt: { de: "Frage", en: "Question" },
  options: [
    { id: "a", text: { de: "Ja", en: "Yes" } },
    { id: "b", text: { de: "Nein", en: "No" } },
  ],
  answer: "a",
  explanation: { de: "Auflösung", en: "Explanation" },
};
const pack: WeekPackage = {
  id: "test",
  week: "2026-W41",
  title: { de: "Test", en: "Test" },
  questions: {
    trivia: Array.from({ length: 6 }, (_, i) => ({
      ...question,
      id: `q-${i}`,
    })),
    logic: [],
    estimate: [],
    arithmetic: [],
    truth: [],
    order: [],
    drawing: [],
    association: [],
    geography: [],
    code: [],
    sets: [],
    connections: [],
    wavelength: [],
    memory: [],
    wordle: [],
    countries: [],
  },
};
function state(): RoomState {
  return {
    code: "ABC234",
    sessionId: "session",
    hostId: "p1",
    createdAt: Date.now(),
    expiresAt: Date.now() + 86_400_000,
    phase: "question",
    endsAt: Date.now() + 45_000,
    round: 0,
    category: "trivia",
    pack: structuredClone(pack),
    week: "2026-W41",
    reused: false,
    players: {
      p1: { id: "p1", name: "Alex", score: 0 },
      p2: { id: "p2", name: "Alex", score: 0 },
      p3: { id: "p3", name: "Robin", score: 0 },
    },
    answers: {},
    dirty: false,
    saveError: false,
  };
}

class FakeSocket {
  messages: string[] = [];
  attachment: unknown;
  constructor(playerId = "p1", language = "de") {
    this.attachment = {
      playerId,
      language,
      createdAt: Date.now(),
      window: Date.now(),
      count: 0,
    };
  }
  serializeAttachment(value: unknown) {
    this.attachment = structuredClone(value);
  }
  deserializeAttachment() {
    return structuredClone(this.attachment);
  }
  send(message: string) {
    this.messages.push(message);
  }
  close() {}
}
function harness(initial = state()) {
  let saved = structuredClone(initial);
  let alarm = 0;
  let failing = false;
  let batchAttempts = 0;
  let ready: Promise<unknown> = Promise.resolve();
  const sockets = [
    new FakeSocket("p1"),
    new FakeSocket("p2", "en"),
    new FakeSocket("p3"),
  ];
  const writes: string[] = [];
  const storage = {
    get: async () => structuredClone(saved),
    put: async (_key: string, value: RoomState) => {
      saved = structuredClone(value);
    },
    setAlarm: async (value: number) => {
      alarm = value;
    },
    deleteAlarm: async () => {
      alarm = 0;
    },
    transaction: async (callback: (txn: unknown) => Promise<unknown>) =>
      callback(storage),
  };
  const ctx = {
    storage,
    getWebSockets: () => sockets,
    blockConcurrencyWhile: (callback: () => Promise<unknown>) => {
      ready = callback();
    },
  } as unknown as DurableObjectState;
  const db = {
    prepare: (sql: string) => ({
      bind(..._values: unknown[]) {
        return this;
      },
      async run() {
        if (failing) throw new Error("D1 unavailable");
        writes.push(sql);
        return { success: true };
      },
      async all() {
        if (failing) throw new Error("D1 unavailable");
        return { results: [] };
      },
      async first() {
        return { id: "p1" };
      },
    }),
    batch: async (statements: { run(): Promise<unknown> }[]) => {
      batchAttempts++;
      if (failing) throw new Error("D1 unavailable");
      return Promise.all(statements.map((s) => s.run()));
    },
  } as unknown as D1Database;
  const room = new BrainbreakRoom(ctx, { DB: db } as Env);
  return {
    room,
    ctx,
    db,
    sockets,
    ready: () => ready,
    saved: () => saved,
    alarm: () => alarm,
    fail: (value: boolean) => {
      failing = value;
    },
    writes,
    batchAttempts: () => batchAttempts,
  };
}

describe("authoritative game rules", () => {
  it("keeps numeric draft meaning through a language change and subsequent editing without repairing invalid grouping", () => {
    const english = convertNumberInput("10,8", "de", "en");
    expect(english).toBe("10.8");
    expect(parseLocalizedNumber(english + "00", "en")).toBe(10.8);
    const unfinished = convertNumberDraft("10,", "de", "en");
    expect(unfinished).toBe("10.");
    expect(parseLocalizedNumber(unfinished + "800", "en")).toBe(10.8);
    expect(convertNumberInput(unfinished!, "en", "de")).toBeNull();
    expect(convertNumberDraft("12.", "de", "en")).toBeNull();
    expect(convertNumberInput("86.400", "de", "en")).toBe("86400");
    expect(convertNumberInput("1,234.50", "en", "de")).toBe("1234,50");
    expect(convertNumberInput("12.34,5", "de", "en")).toBeNull();
    expect(convertNumberInput("12.34", "de", "en")).toBeNull();
    expect(convertNumberInput("1,23", "en", "de")).toBeNull();
  });
  it("uses Berlin ISO week across the Sunday UTC boundary and ISO year boundary", () => {
    expect(isoWeek(new Date("2026-10-04T22:30:00Z"))).toBe("2026-W41");
    expect(isoWeek(new Date("2021-01-01T12:00:00Z"))).toBe("2020-W53");
    expect(isoWeek(new Date("2024-12-30T12:00:00Z"))).toBe("2025-W01");
  });
  it("accepts locale decimal/grouping formats and rejects ambiguous or invalid numbers", () => {
    expect(parseEstimate("1.234,5", "de")).toBe(1234.5);
    expect(parseEstimate("1,234.5", "en")).toBe(1234.5);
    expect(parseEstimate("0", "de")).toBe(0);
    for (const invalid of [
      "-1",
      "NaN",
      "Infinity",
      "1e3",
      "12.34,5",
      "1,2,3",
      "",
      "23 kg",
    ])
      expect(parseEstimate(invalid, "de")).toBeNull();
    expect(parseEstimate("1,23", "en")).toBeNull();
  });
  it("gives equal correct-answer points and transparent proportional estimate points", () => {
    expect(pointsFor(question, "a")).toBe(1000);
    expect(pointsFor({ ...question, category: "logic" }, "a")).toBe(1000);
    expect(pointsFor(question, "b")).toBe(0);
    const estimate = {
      ...question,
      category: "estimate" as const,
      answer: 100,
    };
    expect(pointsFor(estimate, 75)).toBe(750);
    expect(pointsFor(estimate, 125)).toBe(750);
    expect(pointsFor(estimate, 300)).toBe(0);
    expect(pointsFor({ ...estimate, answer: 0 }, 0)).toBe(1000);
  });
  it("chooses only tied leaders, including a zero-vote tie", () => {
    expect(chooseCategory({ trivia: 2, logic: 2, estimate: 1 }, () => 0)).toBe(
      "trivia",
    );
    expect(
      chooseCategory({ trivia: 2, logic: 2, estimate: 1 }, () => 0.99),
    ).toBe("logic");
    expect(
      chooseCategory({ trivia: 0, logic: 0, estimate: 0 }, () => 0.99),
    ).toBe("estimate");
  });
  it("gives tied scores equal ranks without merging duplicate display names", () => {
    const rows = ranking([
      { id: "1", name: "Alex", score: 100 },
      { id: "2", name: "Alex", score: 100 },
      { id: "3", name: "Robin", score: 0 },
    ]);
    expect(rows.map((r) => r.rank)).toEqual([1, 1, 3]);
    expect(rows).toHaveLength(3);
  });
  it("stores only a SHA-256 digest of bearer credentials", async () => {
    const token = "ab".repeat(32);
    const hashed = await hashToken(token);
    expect(hashed).toMatch(/^[a-f0-9]{64}$/);
    expect(hashed).not.toBe(token);
  });
});

describe("visibility and translation parity", () => {
  it("hides solutions, other answers and future questions until reveal", () => {
    const s = state();
    s.answers["q-0"] = {
      p1: { value: "a", points: 0 },
      p2: { value: "b", points: 0 },
    };
    const view = roomView(s, "p1", "de", new Set(["p1", "p2"]));
    expect(view.me.answer).toBe("a");
    expect(view.players[1].answered).toBe(true);
    expect(view.reveal).toBeUndefined();
    expect(view.question).not.toHaveProperty("answer");
    expect(JSON.stringify(view)).not.toContain("q-1");
    expect(JSON.stringify(view)).not.toContain("Auflösung");
    expect(view.players[1]).not.toHaveProperty("answer");
    s.phase = "reveal";
    expect(roomView(s, "p1", "de", new Set()).reveal?.scores[1].answer).toBe(
      "b",
    );
  });
  it("preserves question/option IDs and timers when a player changes language", () => {
    const s = state();
    const de = roomView(s, "p1", "de", new Set(), 42),
      en = roomView(s, "p1", "en", new Set(), 42);
    expect(de.question?.id).toBe(en.question?.id);
    expect(de.question?.options?.map((o) => o.id)).toEqual(
      en.question?.options?.map((o) => o.id),
    );
    expect(de.endsAt).toBe(en.endsAt);
    expect(de.question?.prompt).not.toBe(en.question?.prompt);
    delete s.pack.questions.trivia[0].prompt.en;
    expect(roomView(s, "p1", "en", new Set()).question?.fallback).toBe(true);
  });
  it("all supplied pools contain at least six fully translated questions with unique identities", () => {
    for (const p of packages) {
      const allQuestions = CATEGORIES.flatMap(
        (category) => p.questions[category],
      );
      expect(allQuestions).toHaveLength((CATEGORIES.length - 1) * 42);
      expect(new Set(allQuestions.map((q) => q.id)).size).toBe(
        allQuestions.length,
      );
    }
    for (const p of packages) expect(p.week).toMatch(/^\d{4}-W\d{2}$/);
    for (const p of packages)
      for (const category of CATEGORIES) {
        if (category === "geography") {
          expect(p.questions[category]).toEqual([]);
          continue;
        }
        expect(p.questions[category]).toHaveLength(42);
        if (p.questions[category].some((q) => q.difficulty !== undefined)) {
          for (const q of p.questions[category])
            expect(["easy", "medium", "hard"]).toContain(q.difficulty);
        }
        for (const q of p.questions[category]) {
          expect(q.category).toBe(category);
          expect(q.prompt.en).toBeTruthy();
          expect(q.explanation.en).toBeTruthy();
          expect(new Set(q.options?.map((o) => o.id)).size).toBe(
            q.options?.length ?? 0,
          );
          if (isPuzzleCategory(category)) {
            expect(validPuzzleQuestion(q)).toBe(true);
          } else if (category === "estimate" || category === "arithmetic") {
            expect(typeof q.answer).toBe("number");
            expect(Number.isFinite(q.answer)).toBe(true);
            expect(q.answer as number).toBeGreaterThanOrEqual(0);
          } else if (category === "drawing") {
            expect(q.drawing?.word.de).toBeTruthy();
            expect(q.drawing?.word.en).toBeTruthy();
            expect(matchesDrawingWord(q, q.drawing!.word.de)).toBe(true);
            expect(matchesDrawingWord(q, q.drawing!.word.en)).toBe(true);
            expect(q.options).toBeUndefined();
          } else if (category === "association") {
            expect(validAssociationQuestion(q)).toBe(true);
          } else if (category === "order") {
            const ids = String(q.answer).split(",");
            expect(new Set(ids).size).toBe(4);
            expect(ids.every((id) => q.options?.some((o) => o.id === id))).toBe(
              true,
            );
            expect(ids).not.toEqual(q.options?.map((o) => o.id));
          } else {
            expect(q.options?.some((o) => o.id === q.answer)).toBe(true);
            if (category === "truth")
              expect(q.options?.map((o) => o.id)).toEqual(["true", "false"]);
          }
          for (const option of q.options ?? [])
            expect(option.text.en).toBeTruthy();
        }
      }
    const selection = selectPackage(packages, new Date("2040-01-01T12:00:00Z"));
    expect(selection.reused).toBe(true);
    expect(selection.pack).not.toBe(packages[0]);
  });
});

describe("durable room transitions", () => {
  it("normalizes exact numeric answers and validates every ordering item before durable acknowledgement", async () => {
    for (const category of ["arithmetic", "truth", "order"] as const) {
      const s = state();
      s.pack = structuredClone(packages[0]);
      s.category = category;
      const q = s.pack.questions[category][0];
      const h = harness(s);
      await h.ready();
      const valid = String(q.answer).replace(
        ".",
        category === "arithmetic" ? "," : ".",
      );
      await h.room.webSocketMessage(
        h.sockets[0] as unknown as WebSocket,
        JSON.stringify({
          type: "answer",
          questionId: q.id,
          value: category === "order" ? "a,a,c,d" : "invalid",
        }),
      );
      expect(JSON.parse(h.sockets[0].messages.at(-1)!).code).toBe(
        "INVALID_ANSWER",
      );
      expect(h.saved().answers[q.id]).toBeUndefined();
      await h.room.webSocketMessage(
        h.sockets[0] as unknown as WebSocket,
        JSON.stringify({ type: "answer", questionId: q.id, value: valid }),
      );
      expect(h.saved().answers[q.id].p1.value).toBe(q.answer);
      expect(pointsFor(q, h.saved().answers[q.id].p1.value)).toBe(1000);
      await h.room.webSocketMessage(
        h.sockets[0] as unknown as WebSocket,
        JSON.stringify({ type: "language", language: "en" }),
      );
      await h.room.webSocketMessage(
        h.sockets[0] as unknown as WebSocket,
        JSON.stringify({
          type: "answer",
          questionId: q.id,
          value: String(q.answer),
        }),
      );
      expect(JSON.parse(h.sockets[0].messages.at(-1)!).code).toBe(
        "ALREADY_ANSWERED",
      );
      expect(h.saved().endsAt).toBe(s.endsAt);
    }
  });
  it("restricts old room snapshots to their own available categories, including an empty-vote tie", async () => {
    const s = state();
    s.phase = "voting";
    s.category = undefined;
    s.endsAt = Date.now() - 1;
    // Older persisted packs do not contain the added game keys.
    for (const category of ["arithmetic", "truth", "order", "drawing"] as const)
      delete (s.pack.questions as Partial<WeekPackage["questions"]>)[category];
    expect(availableCategories(s.pack)).toEqual(["trivia"]);
    expect(roomView(s, "p1", "en", new Set()).availableCategories).toEqual([
      "trivia",
    ]);
    const h = harness(s);
    await h.ready();
    await h.room.alarm();
    expect(h.saved().category).toBe("trivia");
    expect(h.saved().phase).toBe("question");
    const voting = { ...s, endsAt: Date.now() + 30_000 };
    const old = harness(voting);
    await old.ready();
    await old.room.webSocketMessage(
      old.sockets[0] as unknown as WebSocket,
      JSON.stringify({ type: "vote", category: "order" }),
    );
    expect(JSON.parse(old.sockets[0].messages.at(-1)!).code).toBe(
      "INVALID_REQUEST",
    );
  });
  it("requires an exact arithmetic result and a complete ordering permutation", () => {
    const arithmetic = packages[0].questions.arithmetic[0];
    expect(parseAnswer(arithmetic, "10,8", "de")).toBe(10.8);
    expect(parseAnswer(arithmetic, "10.8", "en")).toBe(10.8);
    expect(pointsFor(arithmetic, 10.8001)).toBe(0);
    const order = packages[0].questions.order[0];
    for (const invalid of [
      "a,a,c,d",
      "a,b,c",
      "a,b,c,x",
      "a,b,c,d,e",
      "a, b,c,d",
      "",
    ])
      expect(parseAnswer(order, invalid, "en")).toBeNull();
    expect(parseAnswer(order, "a,b,c,d", "de")).toBe("a,b,c,d");
    expect(pointsFor(order, "a,b,c,d")).toBe(0);
    expect(pointsFor(order, order.answer)).toBe(1000);
  });
  it("keeps an acknowledged answer durable through a D1 outage and rejects a second submission after restart", async () => {
    const h = harness();
    await h.ready();
    h.fail(true);
    await h.room.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify({ type: "answer", questionId: "q-0", value: "a" }),
    );
    expect(h.saved().answers["q-0"].p1.value).toBe("a");
    expect(h.saved().saveError).toBe(true);
    expect(h.alarm()).toBeLessThan(Date.now() + 6000);
    const restarted = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await restarted.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify({ type: "answer", questionId: "q-0", value: "b" }),
    );
    expect(JSON.parse(h.sockets[0].messages.at(-1)!).code).toBe(
      "ALREADY_ANSWERED",
    );
    h.fail(false);
    await restarted.alarm();
    expect(h.saved().dirty).toBe(false);
  });
  it("scores a round once even after alarm redelivery and server reconstruction", async () => {
    const s = state();
    s.endsAt = Date.now() - 1;
    s.answers["q-0"] = { p1: { value: "a", points: 0 } };
    const h = harness(s);
    await h.ready();
    await h.room.alarm();
    expect(h.saved().phase).toBe("reveal");
    expect(h.saved().players.p1.score).toBe(1000);
    const restarted = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await restarted.alarm();
    expect(h.saved().players.p1.score).toBe(1000);
  });
  it("rejects answers at the server deadline and keeps language changes from granting another answer", async () => {
    const s = state();
    s.endsAt = Date.now() - 1;
    const h = harness(s);
    await h.ready();
    await h.room.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify({ type: "answer", questionId: "q-0", value: "a" }),
    );
    expect(JSON.parse(h.sockets[0].messages.at(-1)!).code).toBe("TOO_LATE");
    expect(h.saved().answers["q-0"]).toBeUndefined();
    const live = harness();
    await live.ready();
    await live.room.webSocketMessage(
      live.sockets[0] as unknown as WebSocket,
      JSON.stringify({ type: "answer", questionId: "q-0", value: "a" }),
    );
    const deadline = live.saved().endsAt;
    await live.room.webSocketMessage(
      live.sockets[0] as unknown as WebSocket,
      JSON.stringify({ type: "language", language: "en" }),
    );
    await live.room.webSocketMessage(
      live.sockets[0] as unknown as WebSocket,
      JSON.stringify({ type: "answer", questionId: "q-0", value: "b" }),
    );
    expect(JSON.parse(live.sockets[0].messages.at(-1)!).code).toBe(
      "ALREADY_ANSWERED",
    );
    expect(live.saved().endsAt).toBe(deadline);
  });
  it("attempts D1 once when sync advances a deadline during an outage", async () => {
    const s = state();
    s.endsAt = Date.now() - 1;
    const h = harness(s);
    await h.ready();
    h.fail(true);
    await h.room.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify({ type: "sync" }),
    );
    expect(h.saved().phase).toBe("reveal");
    expect(h.saved().saveError).toBe(true);
    expect(h.batchAttempts()).toBe(1);
    expect(h.alarm()).toBeLessThan(Date.now() + 6000);
  });
  it("automatically finishes the last reveal and retries idempotent results after storage recovers", async () => {
    const s = state();
    s.phase = "reveal";
    s.round = 5;
    s.endsAt = Date.now() - 1;
    s.players.p1.score = 5000;
    const h = harness(s);
    await h.ready();
    h.fail(true);
    await h.room.alarm();
    expect(h.saved().phase).toBe("results");
    expect(h.saved().dirty).toBe(true);
    const restarted = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    h.fail(false);
    await restarted.alarm();
    expect(h.saved().dirty).toBe(false);
    expect(h.saved().players.p1.score).toBe(5000);
    expect(
      h.writes.some(
        (sql) =>
          sql.includes("INSERT INTO results") && sql.includes("ON CONFLICT"),
      ),
    ).toBe(true);
  });
});

describe("room permissions and multilingual input", () => {
  it("requires the host and two participants to start", async () => {
    const lobby = state();
    lobby.phase = "lobby";
    lobby.endsAt = null;
    const h = harness(lobby);
    await h.ready();
    await h.room.webSocketMessage(
      h.sockets[1] as unknown as WebSocket,
      JSON.stringify({ type: "start" }),
    );
    expect(JSON.parse(h.sockets[1].messages.at(-1)!).code).toBe("HOST_ONLY");
    const small = structuredClone(lobby);
    delete small.players.p3;
    delete small.players.p2;
    const limited = harness(small);
    await limited.ready();
    await limited.room.webSocketMessage(
      limited.sockets[0] as unknown as WebSocket,
      JSON.stringify({ type: "start" }),
    );
    expect(JSON.parse(limited.sockets[0].messages.at(-1)!).code).toBe(
      "NOT_ENOUGH_PLAYERS",
    );
    await h.room.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify({ type: "start" }),
    );
    expect(h.saved().phase).toBe("voting");
    expect(h.saved().endsAt! - Date.now()).toBeGreaterThan(29_000);
  });
  it("normalizes German and English estimates to the same answer and score", async () => {
    const s = state();
    s.category = "estimate";
    s.pack.questions.estimate = [
      {
        ...question,
        id: "estimate-q",
        category: "estimate",
        answer: 1234.5,
        options: undefined,
      },
    ];
    const h = harness(s);
    await h.ready();
    await h.room.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify({
        type: "answer",
        questionId: "estimate-q",
        value: "1.234,5",
      }),
    );
    await h.room.webSocketMessage(
      h.sockets[1] as unknown as WebSocket,
      JSON.stringify({
        type: "answer",
        questionId: "estimate-q",
        value: "1,234.5",
      }),
    );
    expect(h.saved().answers["estimate-q"].p1.value).toBe(
      h.saved().answers["estimate-q"].p2.value,
    );
    expect(
      pointsFor(
        s.pack.questions.estimate[0],
        h.saved().answers["estimate-q"].p1.value,
      ),
    ).toBe(1000);
  });
  it("sends no state before socket authentication", async () => {
    const h = harness();
    await h.ready();
    h.sockets[0].attachment = {
      language: "de",
      createdAt: Date.now(),
      window: Date.now(),
      count: 0,
    };
    await h.room.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify({ type: "sync" }),
    );
    expect(h.sockets[0].messages.map((raw) => JSON.parse(raw).type)).toEqual([
      "error",
    ]);
    expect(JSON.parse(h.sockets[0].messages[0]).code).toBe("UNAUTHORIZED");
  });
});

describe("live drawing", () => {
  const stroke = {
    id: "stroke-1",
    color: "#273b32",
    width: 0.008,
    points: [
      { x: 0.12345, y: 0.67891 },
      { x: 0.5, y: 0.5 },
    ],
  };
  function drawingState(): RoomState {
    const s = state();
    s.pack = structuredClone(packages[0]);
    s.category = "drawing";
    initializeDrawing(s);
    return s;
  }
  it("reveals both word translations only to the current artist, and preserves roles on reconstruction", async () => {
    const s = drawingState();
    const artist = roomView(s, "p1", "de", new Set());
    const guesser = roomView(s, "p2", "en", new Set());
    expect(artist.drawing?.word).toEqual({ de: "Fahrrad", en: "bicycle" });
    expect(guesser.drawing?.word).toBeUndefined();
    expect(JSON.stringify(guesser)).not.toContain("Fahrrad");
    expect(JSON.stringify(guesser)).not.toContain("bicycle");
    expect(JSON.stringify(guesser)).not.toContain("s1-drawing-02");
    expect(guesser.question).not.toHaveProperty("drawing");
    const h = harness(s);
    await h.ready();
    const restarted = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await restarted.webSocketMessage(
      h.sockets[1] as unknown as WebSocket,
      JSON.stringify({ type: "sync" }),
    );
    expect(
      JSON.parse(h.sockets[1].messages.at(-1)!).state.drawing.word,
    ).toBeUndefined();
  });
  it("accepts normalized bounded strokes only from the artist and commits incremental events without D1 writes", async () => {
    const h = harness(drawingState());
    await h.ready();
    const message = {
      type: "draw",
      questionId: "s1-drawing-01",
      timestamp: Date.now(),
      stroke,
    };
    await h.room.webSocketMessage(
      h.sockets[1] as unknown as WebSocket,
      JSON.stringify(message),
    );
    expect(JSON.parse(h.sockets[1].messages.at(-1)!).code).toBe("ARTIST_ONLY");
    expect(h.saved().drawing?.revision).toBe(0);
    await h.room.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify(message),
    );
    expect(h.saved().drawing?.strokes[0].points[0]).toEqual({
      x: 0.123,
      y: 0.679,
    });
    expect(h.writes).toHaveLength(0);
    expect(h.batchAttempts()).toBe(0);
    expect(JSON.parse(h.sockets[1].messages.at(-1)!)).toMatchObject({
      type: "drawing",
      questionId: "s1-drawing-01",
      revision: 1,
    });
    expect(JSON.stringify(h.sockets[1].messages)).not.toContain("Fahrrad");
    const count = h.sockets[1].messages.length;
    await h.room.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify(message),
    );
    expect(h.saved().drawing?.revision).toBe(1);
    expect(h.sockets[1].messages).toHaveLength(count);
    const restarted = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await restarted.webSocketMessage(
      h.sockets[1] as unknown as WebSocket,
      JSON.stringify({ type: "sync" }),
    );
    expect(
      JSON.parse(h.sockets[1].messages.at(-1)!).state.drawing.strokes,
    ).toEqual(h.saved().drawing?.strokes);
  });
  it("rejects malformed geometry, unsupported widths, oversize batches, stale timestamps and wrong question IDs", async () => {
    expect(
      normalizedStroke({ ...stroke, points: [{ x: NaN, y: 0.2 }] }),
    ).toBeNull();
    expect(
      normalizedStroke({ ...stroke, points: [{ x: 1.1, y: 0.2 }] }),
    ).toBeNull();
    expect(normalizedStroke({ ...stroke, width: 100 })).toBeNull();
    expect(normalizedStroke({ ...stroke, color: "url(secret)" })).toBeNull();
    expect(
      normalizedStroke({
        ...stroke,
        points: Array.from({ length: 33 }, () => ({ x: 0, y: 0 })),
      }),
    ).toBeNull();
    for (const change of [
      { questionId: "previous-round" },
      { timestamp: Date.now() - 11_000 },
      { stroke: { ...stroke, points: [{ x: -1, y: 0 }] } },
    ]) {
      const h = harness(drawingState());
      await h.ready();
      await h.room.webSocketMessage(
        h.sockets[0] as unknown as WebSocket,
        JSON.stringify({
          type: "draw",
          questionId: "s1-drawing-01",
          timestamp: Date.now(),
          stroke,
          ...change,
        }),
      );
      expect(JSON.parse(h.sockets[0].messages.at(-1)!).code).toBe(
        "INVALID_REQUEST",
      );
      expect(h.saved().drawing?.strokes).toHaveLength(0);
    }
  });
  it("persists clear operations while retaining stroke deduplication and rejects drawings at the deadline", async () => {
    const s = drawingState();
    s.drawing!.strokes = [stroke];
    s.drawing!.seenIds = [stroke.id];
    s.drawing!.pointCount = stroke.points.length;
    const h = harness(s);
    await h.ready();
    await h.room.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify({
        type: "drawClear",
        questionId: "s1-drawing-01",
        timestamp: Date.now(),
      }),
    );
    expect(h.saved().drawing?.strokes).toHaveLength(0);
    expect(h.saved().drawing?.seenIds).toContain(stroke.id);
    expect(JSON.parse(h.sockets[1].messages.at(-1)!)).toMatchObject({
      type: "drawing",
      clear: true,
      revision: 1,
    });
    const expired = drawingState();
    expired.endsAt = Date.now() - 1;
    const late = harness(expired);
    await late.ready();
    await late.room.webSocketMessage(
      late.sockets[0] as unknown as WebSocket,
      JSON.stringify({
        type: "draw",
        questionId: "s1-drawing-01",
        timestamp: Date.now(),
        stroke,
      }),
    );
    expect(JSON.parse(late.sockets[0].messages.at(-1)!).code).toBe("TOO_LATE");
    expect(late.saved().drawing?.strokes).toHaveLength(0);
  });
  it("publishes repeat wrong guesses without revealing correct words, accepts both languages and locks the first correct guess across restart", async () => {
    const h = harness(drawingState());
    await h.ready();
    const answer = (value: string) =>
      JSON.stringify({ type: "answer", questionId: "s1-drawing-01", value });
    await h.room.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      answer("Fahrrad"),
    );
    expect(JSON.parse(h.sockets[0].messages.at(-1)!).code).toBe("GUESSER_ONLY");
    for (const guess of ["car", "tree"]) {
      await h.room.webSocketMessage(
        h.sockets[1] as unknown as WebSocket,
        answer(guess),
      );
      expect(JSON.parse(h.sockets[1].messages.at(-1)!).code).toBe(
        "WRONG_GUESS",
      );
    }
    expect(
      JSON.parse(h.sockets[2].messages.at(-1)!).state.drawing.chat.map(
        (entry: { text: string }) => entry.text,
      ),
    ).toEqual(["car", "tree"]);
    expect(h.saved().answers["s1-drawing-01"]).toBeUndefined();
    await h.room.webSocketMessage(
      h.sockets[1] as unknown as WebSocket,
      answer("  FAHRRAD  "),
    );
    expect(h.saved().answers["s1-drawing-01"].p2.value).toBe("s1-concept-1");
    const restarted = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await restarted.webSocketMessage(
      h.sockets[1] as unknown as WebSocket,
      JSON.stringify({ type: "language", language: "de" }),
    );
    await restarted.webSocketMessage(
      h.sockets[1] as unknown as WebSocket,
      answer("bike"),
    );
    expect(JSON.parse(h.sockets[1].messages.at(-1)!).code).toBe(
      "ALREADY_ANSWERED",
    );
    await restarted.webSocketMessage(
      h.sockets[2] as unknown as WebSocket,
      answer("bicycle"),
    );
    expect(h.saved().answers["s1-drawing-01"].p3.value).toBe("s1-concept-1");
  });
  it("scores the artist once when anyone guesses correctly and retries D1 without duplicating points after restart", async () => {
    const s = drawingState();
    s.endsAt = Date.now() - 1;
    s.answers["s1-drawing-01"] = { p2: { value: "s1-concept-1", points: 0 } };
    const h = harness(s);
    await h.ready();
    h.fail(true);
    await h.room.alarm();
    expect(h.saved().players.p1.score).toBe(1000);
    expect(h.saved().players.p2.score).toBe(1000);
    expect(h.saved().players.p3.score).toBe(0);
    expect(h.saved().answers["s1-drawing-01"].p1.value).toBe("artist");
    const restarted = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    h.fail(false);
    await restarted.alarm();
    expect(h.saved().players.p1.score).toBe(1000);
    expect(h.saved().players.p2.score).toBe(1000);
    expect(h.saved().dirty).toBe(false);
    const reveal = roomView(h.saved(), "p2", "en", new Set());
    expect(reveal.reveal?.answer).toBe("bicycle");
    expect(reveal.reveal?.scores.find((p) => p.playerId === "p2")?.answer).toBe(
      "bicycle",
    );
    expect(reveal.reveal?.scores.find((p) => p.playerId === "p1")?.answer).toBe(
      "artist",
    );
  });
  it("keeps artist rotation stable and awards no artist points without a correct guess", async () => {
    const s = drawingState();
    s.round = 1;
    initializeDrawing(s);
    expect(s.drawing?.artistId).toBe("p2");
    s.round = 3;
    initializeDrawing(s);
    expect(s.drawing?.artistId).toBe("p1");
    const empty = drawingState();
    empty.endsAt = Date.now() - 1;
    const h = harness(empty);
    await h.ready();
    await h.room.alarm();
    expect(h.saved().players.p1.score).toBe(0);
    expect(h.saved().answers["s1-drawing-01"].p1.points).toBe(0);
  });
});

describe("drawing traffic limits", () => {
  it("rejects rapid unique batches and retains round point limits after clear", async () => {
    const s = state();
    s.pack = structuredClone(packages[0]);
    s.category = "drawing";
    initializeDrawing(s);
    const h = harness(s);
    await h.ready();
    const stroke = {
      id: "one",
      color: "#273b32",
      width: 0.008,
      points: [{ x: 0.1, y: 0.2 }],
    };
    const draw = (value: typeof stroke) =>
      JSON.stringify({
        type: "draw",
        questionId: "s1-drawing-01",
        timestamp: Date.now(),
        stroke: value,
      });
    await h.room.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      draw(stroke),
    );
    await h.room.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      draw({ ...stroke, id: "two" }),
    );
    expect(JSON.parse(h.sockets[0].messages.at(-1)!).code).toBe("RATE_LIMITED");
    expect(h.saved().drawing?.strokes).toHaveLength(1);
    const exhausted = structuredClone(s);
    exhausted.drawing!.pointCount = 2400;
    exhausted.drawing!.strokes = [];
    const limited = harness(exhausted);
    await limited.ready();
    await limited.room.webSocketMessage(
      limited.sockets[0] as unknown as WebSocket,
      draw(stroke),
    );
    expect(JSON.parse(limited.sockets[0].messages.at(-1)!).code).toBe(
      "RATE_LIMITED",
    );
    expect(limited.saved().drawing?.strokes).toHaveLength(0);
  });
});

describe("adaptive round selection", () => {
  function adaptiveState(): RoomState {
    const s = state();
    s.pack.questions.trivia = Array.from({ length: 12 }, (_, i) => ({
      ...question,
      id: `tier-question-${i}`,
      difficulty: (["easy", "medium", "hard"] as const)[Math.floor(i / 4)],
    }));
    return s;
  }
  it("uses exact 70% and 30% boundaries with a fixed minimum denominator and clamped levels", () => {
    expect(nextDifficulty("medium", 7, 10)).toBe("hard");
    expect(nextDifficulty("medium", 6, 10)).toBe("medium");
    expect(nextDifficulty("medium", 3, 10)).toBe("medium");
    expect(nextDifficulty("medium", 2, 10)).toBe("easy");
    expect(nextDifficulty("hard", 10, 10)).toBe("hard");
    expect(nextDifficulty("easy", 0, 10)).toBe("easy");
    expect(nextDifficulty("medium", 1, 1)).toBe("hard");
    expect(nextDifficulty("medium", 0, 1)).toBe("easy");
    expect(nextDifficulty("medium", 0, 0)).toBe("medium");
  });
  it("uses unrounded estimate error rather than rounded score and accepts the exact ten-percent threshold", () => {
    const q = { ...question, category: "estimate" as const, answer: 100 };
    expect(successfulAnswer(q, 110)).toBe(true);
    expect(successfulAnswer(q, 90)).toBe(true);
    expect(pointsFor(q, 110.04)).toBe(900);
    expect(successfulAnswer(q, 110.04)).toBe(false);
    expect(successfulAnswer({ ...q, answer: 0 }, 0.1)).toBe(true);
    expect(successfulAnswer({ ...q, answer: 0 }, 0.10001)).toBe(false);
    expect(successfulAnswer(q, "110")).toBe(false);
    expect(successfulAnswer({ ...q, answer: 42.195 }, 37.9755)).toBe(true);
    expect(successfulAnswer({ ...q, answer: 42.195 }, 46.4145)).toBe(true);
    expect(successfulAnswer({ ...q, answer: 10.8 }, 11.88)).toBe(true);
    expect(successfulAnswer({ ...q, answer: 10.8 }, 11.88108)).toBe(false);
  });
  it("starts medium, snapshots all eligible identities and keeps nonanswers in the denominator", () => {
    const s = adaptiveState();
    beginRound(s, () => 0);
    const q = currentQuestion(s)!;
    expect(q.difficulty).toBe("medium");
    expect(s.adaptive?.eligible[q.id]).toEqual(["p1", "p2", "p3"]);
    s.answers[q.id] = { p1: { value: "a", points: 1000 } };
    finishRound(s);
    expect(s.adaptive?.history[0]).toMatchObject({
      successCount: 1,
      eligibleCount: 3,
      nextDifficulty: "medium",
    });
    const offline = roomView(s, "p1", "de", new Set(["p1"]));
    expect(offline.players.filter((p) => p.connected)).toHaveLength(1);
    expect(s.adaptive?.eligible[q.id]).toHaveLength(3);
  });
  it("selects the next level only after reveal, never repeats in six rounds, and falls back to the nearest unused tier", () => {
    const s = adaptiveState();
    beginRound(s, () => 0);
    const first = currentQuestion(s)!;
    s.answers[first.id] = Object.fromEntries(
      Object.keys(s.players).map((id) => [id, { value: "a", points: 1000 }]),
    );
    finishRound(s);
    s.phase = "reveal";
    expect(currentQuestion(s)?.id).toBe(first.id);
    expect(s.adaptive?.chosenQuestionIds).toHaveLength(1);
    expect(roomView(s, "p1", "de", new Set()).adaptation?.nextDifficulty).toBe(
      "hard",
    );
    for (let i = 1; i < 6; i++) {
      s.round = i;
      s.phase = "question";
      beginRound(s, () => 0);
      const q = currentQuestion(s)!;
      s.answers[q.id] = {};
      finishRound(s);
    }
    expect(new Set(s.adaptive?.chosenQuestionIds).size).toBe(6);
    const fallback = adaptiveState();
    fallback.pack.questions.trivia = fallback.pack.questions.trivia.filter(
      (q) => q.difficulty !== "hard",
    );
    beginRound(fallback, () => 0);
    fallback.adaptive!.targetDifficulty = "hard";
    fallback.round = 1;
    beginRound(fallback, () => 0);
    expect(currentQuestion(fallback)?.difficulty).toBe("medium");
  });
  it("hides the unused bank and selection history while all languages share the chosen question and deadline", () => {
    const s = adaptiveState();
    beginRound(s, () => 0);
    const de = roomView(s, "p1", "de", new Set());
    const en = roomView(s, "p2", "en", new Set());
    expect(de.question?.id).toBe(en.question?.id);
    expect(de.endsAt).toBe(en.endsAt);
    expect(de.question?.difficulty).toBe("medium");
    expect(de.adaptation).toBeUndefined();
    expect(JSON.stringify(en)).not.toContain("tier-question-11");
    expect(en).not.toHaveProperty("adaptive");
    expect(en).not.toHaveProperty("pack.questions");
  });
  it("persists a chosen identity and reveal evaluation across reconstruction and a D1 outage without repeat scoring", async () => {
    const s = adaptiveState();
    beginRound(s, () => 0.5);
    const id = currentQuestion(s)!.id;
    s.endsAt = Date.now() - 1;
    s.answers[id] = Object.fromEntries(
      Object.keys(s.players).map((pid) => [pid, { value: "a", points: 0 }]),
    );
    const h = harness(s);
    await h.ready();
    h.fail(true);
    await h.room.alarm();
    expect(h.saved().adaptive?.history).toHaveLength(1);
    expect(h.saved().players.p1.score).toBe(1000);
    const restarted = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    h.fail(false);
    await restarted.alarm();
    expect(currentQuestion(h.saved())?.id).toBe(id);
    expect(h.saved().adaptive?.history).toHaveLength(1);
    expect(h.saved().players.p1.score).toBe(1000);
  });
  it("excludes the drawing artist from fixed success eligibility and measures only correct guessers", () => {
    const s = state();
    s.pack = structuredClone(packages[0]);
    s.category = "drawing";
    s.pack.questions.drawing = s.pack.questions.drawing
      .slice(0, 6)
      .map((q) => ({ ...q, difficulty: "medium" as const }));
    beginRound(s, () => 0);
    initializeDrawing(s);
    const q = currentQuestion(s)!;
    expect(s.adaptive?.eligible[q.id]).toEqual(["p2", "p3"]);
    s.answers[q.id] = {
      p1: { value: "artist", points: 1000 },
      p2: { value: q.answer, points: 1000 },
    };
    finishRound(s);
    expect(s.adaptive?.history[0]).toMatchObject({
      successCount: 1,
      eligibleCount: 2,
      nextDifficulty: "medium",
    });
  });
  it("keeps legacy snapshots in their original fixed order with no adaptive state", () => {
    const s = state();
    beginRound(s, () => 0.99);
    expect(s.adaptive).toBeUndefined();
    expect(currentQuestion(s)?.id).toBe("q-0");
    s.round = 1;
    beginRound(s, () => 0);
    expect(currentQuestion(s)?.id).toBe("q-1");
    s.phase = "reveal";
    finishRound(s);
    expect(roomView(s, "p1", "en", new Set()).adaptation).toBeUndefined();
  });
  it("rejects undersized, mixed-difficulty and duplicate-identity banks while accepting a full explicit bank", () => {
    const full = structuredClone(packages[0]);
    for (const category of CATEGORIES)
      full.questions[category] = full.questions[category].map((q, i) => ({
        ...q,
        difficulty:
          category === "association"
            ? q.difficulty
            : (["easy", "medium", "hard"] as const)[i % 3],
      }));
    expect(selectPackage([full]).pack.id).toBe(full.id);
    const short = structuredClone(full);
    short.questions.trivia = short.questions.trivia.slice(0, 5);
    expect(() => selectPackage([short])).toThrow();
    const mixed = structuredClone(full);
    delete mixed.questions.trivia[0].difficulty;
    expect(() => selectPackage([mixed])).toThrow();
    const duplicate = structuredClone(full);
    duplicate.questions.trivia[1].id = duplicate.questions.trivia[0].id;
    expect(() => selectPackage([duplicate])).toThrow();
  });
});

function associationState(): RoomState {
  const s = state();
  s.players.p4 = { id: "p4", name: "Morgan", score: 0 };
  s.category = "association";
  const words = [
    ["Baum", "Tree"],
    ["Auto", "Car"],
    ["Blume", "Flower"],
    ["Rad", "Wheel"],
    ["Brot", "Bread"],
    ["Mond", "Moon"],
  ];
  s.pack.questions.association = Array.from(
    { length: 6 },
    (_, i): Question => ({
      id: `association-${i}`,
      category: "association",
      difficulty: "easy",
      prompt: { de: "Wählt zwei Karten.", en: "Choose two cards." },
      options: words.map(([de, en], j) => ({
        id: String.fromCharCode(97 + j),
        text: { de, en },
      })),
      answer: `private-concept-${i}`,
      explanation: { de: "Teamziele", en: "Team targets" },
      association: {
        targets: { green: ["a", "c"], purple: ["b", "d"] },
        hints: {
          green: { de: "Natur", en: "Nature" },
          purple: { de: "Technik", en: "Technology" },
        },
      },
    }),
  );
  beginRound(s, () => 0);
  initializeAssociation(s);
  return s;
}
const action = (
  h: ReturnType<typeof harness>,
  index: number,
  message: unknown,
) =>
  h.room.webSocketMessage(
    h.sockets[index] as unknown as WebSocket,
    JSON.stringify(message),
  );
const lastError = (socket: FakeSocket) =>
  socket.messages
    .map((m) => JSON.parse(m))
    .filter((m) => m.type === "error")
    .at(-1)?.code;

describe("association team rounds", () => {
  it("keeps join-order teams stable and rotates captains fairly for every supported room size", () => {
    for (let count = 4; count <= 30; count++) {
      const roster = Array.from({ length: count }, (_, i) => `id-${i}`);
      for (let round = 0; round < 6; round++) {
        const teams = associationTeams(roster, round);
        expect(
          [...teams.green.playerIds, ...teams.purple.playerIds].sort(),
        ).toEqual([...roster].sort());
        for (const team of ["green", "purple"] as const)
          expect(teams[team].captainId).toBe(
            teams[team].playerIds[round % teams[team].playerIds.length],
          );
        expect(teams.green.playerIds).toEqual(
          roster.filter((_, i) => i % 2 === 0),
        );
      }
    }
    expect(() => associationTeams(["a"], 0)).toThrow();
  });
  it("hides target keys and reviewed hints from guessers until reveal, with personalized solutions", () => {
    const s = associationState(),
      q = currentQuestion(s)!;
    const captain = roomView(s, "p1", "de", new Set()),
      guesser = roomView(s, "p3", "en", new Set());
    expect(captain.association?.key).toEqual({
      a: "green",
      b: "purple",
      c: "green",
      d: "purple",
      e: "neutral",
      f: "neutral",
    });
    expect(captain.association?.suggestion?.en).toBe("Nature");
    expect(guesser.association?.key).toBeUndefined();
    expect(guesser.association?.suggestion).toBeUndefined();
    expect(JSON.stringify(guesser)).not.toContain("private-concept");
    expect(JSON.stringify(guesser)).not.toContain("targets");
    s.phase = "reveal";
    expect(roomView(s, "p3", "en", new Set()).reveal?.answer).toBe("a,c");
    expect(roomView(s, "p4", "de", new Set()).reveal?.answer).toBe("b,d");
    expect(roomView(s, "p4", "de", new Set()).association?.key).toBeTruthy();
    expect(validAssociationQuestion(q)).toBe(true);
  });
  it("accepts only complete unique canonical target selections and valid bilingual single-word hints", () => {
    const q = currentQuestion(associationState())!;
    expect(normalizeAssociationGuess(q, "c,a")).toBe("a,c");
    for (const value of ["a", "a,a", "a,z", "a,b,c", "a, c"])
      expect(normalizeAssociationGuess(q, value)).toBeNull();
    expect(
      validAssociationClue(q, { de: "Öko-System", en: "Eco-system" }),
    ).toBe(true);
    for (const value of [
      { de: "Baum", en: "Nature" },
      { de: "Natur", en: "TREE" },
      { de: "zwei Wörter", en: "Nature" },
      { de: "Natur", en: "" },
      { de: "Natur", en: "N4ture" },
      { de: "N".repeat(31), en: "Nature" },
      { de: "Natur" },
    ])
      expect(validAssociationClue(q, value)).toBe(false);
    const malformed = structuredClone(q);
    malformed.association!.targets.purple = ["a", "d"];
    expect(validAssociationQuestion(malformed)).toBe(false);
  });
  it("locks one bilingual human clue across locale changes and restricts roles and premature guesses", async () => {
    const s = associationState(),
      h = harness(s),
      id = currentQuestion(s)!.id;
    h.sockets.push(new FakeSocket("p4", "en"));
    await h.ready();
    await action(h, 2, { type: "answer", questionId: id, value: "a,c" });
    expect(lastError(h.sockets[2])).toBe("WAIT_FOR_CLUE");
    await action(h, 2, {
      type: "associationClue",
      questionId: id,
      clue: { de: "Natur", en: "Nature" },
    });
    expect(lastError(h.sockets[2])).toBe("ASSOCIATION_CLUE_ONLY");
    await action(h, 0, {
      type: "associationClue",
      questionId: id,
      clue: { de: "Baum", en: "Nature" },
    });
    expect(lastError(h.sockets[0])).toBe("INVALID_CLUE");
    await action(h, 0, {
      type: "associationClue",
      questionId: id,
      clue: { de: "Natur", en: "Nature" },
    });
    await action(h, 0, { type: "language", language: "en" });
    await action(h, 0, {
      type: "associationClue",
      questionId: id,
      clue: { de: "Pflanzen", en: "Plants" },
    });
    expect(lastError(h.sockets[0])).toBe("ALREADY_CLUED");
    expect(h.saved().association?.teams.green.clue).toEqual({
      de: "Natur",
      en: "Nature",
    });
    await action(h, 0, { type: "answer", questionId: id, value: "a,c" });
    expect(lastError(h.sockets[0])).toBe("ASSOCIATION_GUESSER_ONLY");
    await action(h, 2, { type: "answer", questionId: id, value: "c,a" });
    expect(h.saved().answers[id].p3.value).toBe("a,c");
    await action(h, 2, { type: "answer", questionId: id, value: "b,d" });
    expect(lastError(h.sockets[2])).toBe("ALREADY_ANSWERED");
  });
  it("automatically supplies durable reviewed clues at 15 seconds after restart without a host, and moves the alarm forward", async () => {
    const s = associationState();
    s.association!.clueEndsAt = Date.now() - 1;
    const h = harness(s);
    h.sockets.length = 0;
    await h.ready();
    await h.room.alarm();
    expect(h.saved().association?.teams.green).toMatchObject({
      clue: { de: "Natur", en: "Nature" },
      automatic: true,
    });
    expect(h.saved().association?.teams.purple.automatic).toBe(true);
    expect(h.alarm()).toBe(s.endsAt);
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await resumed.alarm();
    expect(h.saved().association?.teams.green.clue?.en).toBe("Nature");
    expect(h.saved().phase).toBe("question");
    expect(
      settleAssociationClues(
        currentQuestion(s)!,
        h.saved().association!,
        Date.now(),
      ),
    ).toBe(false);
  });
  it("scores human captain contributions, normalizes team scores, and excludes both captains from adaptive eligibility", () => {
    const s = associationState(),
      q = currentQuestion(s)!,
      round = s.association!;
    round.teams.green.clue = { de: "Natur", en: "Nature" };
    round.teams.green.automatic = false;
    round.teams.purple.clue = { de: "Technik", en: "Technology" };
    round.teams.purple.automatic = true;
    s.answers[q.id] = {
      p3: { value: "a,c", points: 0 },
      p4: { value: "b,d", points: 0 },
    };
    expect(associationEvaluation(q, round, s.answers[q.id])).toEqual({
      points: { p1: 1000, p2: 0, p3: 1000, p4: 1000 },
      roundScores: { green: 1000, purple: 1000 },
    });
    expect(s.adaptive?.eligible[q.id]).toEqual(["p3", "p4"]);
    finishRound(s);
    expect(s.adaptive?.history[0]).toMatchObject({
      successCount: 2,
      eligibleCount: 2,
      nextDifficulty: "medium",
    });
    expect(associationCorrect(q, round, "p4", "a,c")).toBe(false);
    const six = associationTeams(["p1", "p2", "p3", "p4", "p5", "p6"], 0);
    round.teams = six;
    expect(
      associationEvaluation(q, round, { p3: { value: "a,c" } }).roundScores,
    ).toEqual({ green: 500, purple: 0 });
  });
  it("journals scoring and captain answers once, survives D1 failure and reconstruction, and rejects late clues", async () => {
    const s = associationState(),
      id = currentQuestion(s)!.id;
    s.association!.teams.green.clue = { de: "Natur", en: "Nature" };
    s.association!.teams.green.automatic = false;
    s.answers[id] = { p3: { value: "a,c", points: 0 } };
    s.endsAt = Date.now() - 1;
    const h = harness(s);
    await h.ready();
    h.fail(true);
    await h.room.alarm();
    expect(h.saved().players.p1.score).toBe(1000);
    expect(h.saved().players.p3.score).toBe(1000);
    expect(h.saved().associationScores).toEqual({ green: 1000, purple: 0 });
    expect(h.saved().answers[id].p1.value).toBe("association-captain");
    expect(h.saved().associationHistory).toHaveLength(1);
    expect(h.saved().adaptive?.history).toHaveLength(1);
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    h.fail(false);
    await resumed.alarm();
    expect(h.saved().players.p1.score).toBe(1000);
    expect(h.saved().associationHistory).toHaveLength(1);
    expect(h.saved().saveError).toBe(false);
    const pending = associationState();
    pending.association!.clueEndsAt = Date.now() - 1;
    const late = harness(pending);
    await late.ready();
    await action(late, 0, {
      type: "associationClue",
      questionId: currentQuestion(pending)!.id,
      clue: { de: "Natur", en: "Nature" },
    });
    expect(lastError(late.sockets[0])).toBe("CLUE_TOO_LATE");
    expect(late.saved().association?.teams.green.automatic).toBe(true);
  });
  it("offers cooperative association below four players and preserves legacy seven-category snapshots without enabling empty geography", () => {
    const s = associationState();
    expect(availableCategories(s.pack, 3)).toContain("association");
    expect(availableCategories(s.pack, 2)).toContain("association");
    expect(
      roomView(s, "p1", "de", new Set()).availableCategories,
    ).not.toContain("geography");
    const old = structuredClone(packages[0]);
    delete (old.questions as Partial<WeekPackage["questions"]>).association;
    delete (old.questions as Partial<WeekPackage["questions"]>).geography;
    for (const category of PUZZLE_CATEGORIES)
      delete (old.questions as Partial<WeekPackage["questions"]>)[category];
    expect(availableCategories(old)).toEqual([
      "trivia",
      "logic",
      "estimate",
      "arithmetic",
      "truth",
      "order",
      "drawing",
    ]);
  });
});

describe("cooperative rooms, mixed mode, early reveal and public drawing chat", () => {
  it("starts with two connected players and supports cooperative association with one rotating captain", async () => {
    const s = associationState();
    delete s.players.p3;
    delete s.players.p4;
    Object.assign(s, { adaptive: undefined, association: undefined });
    beginRound(s, () => 0);
    initializeAssociation(s);
    expect(s.association?.cooperative).toBe(true);
    expect(s.association?.teams.purple.playerIds).toEqual([]);
    expect(s.association?.teams.purple.captainId).toBeUndefined();
    expect(s.adaptive?.eligible[currentQuestion(s)!.id]).toEqual(["p2"]);
    const h = harness(s);
    h.sockets.splice(2);
    await h.ready();
    const id = currentQuestion(s)!.id;
    await action(h, 0, {
      type: "associationClue",
      questionId: id,
      clue: { de: "Natur", en: "Nature" },
    });
    await action(h, 1, { type: "answer", questionId: id, value: "c,a" });
    expect(h.saved().phase).toBe("reveal");
    expect(h.saved().players.p1.score).toBe(1000);
    expect(h.saved().players.p2.score).toBe(1000);
    expect(h.saved().associationScores).toEqual({ green: 1000, purple: 0 });
    expect(h.saved().adaptive?.history[0].eligibleCount).toBe(1);
    const next = h.saved();
    next.round++;
    next.phase = "question";
    next.endsAt = Date.now() + 45_000;
    beginRound(next, () => 0);
    initializeAssociation(next);
    expect(next.association?.teams.green.captainId).toBe("p2");
    const lobby = state();
    delete lobby.players.p3;
    lobby.phase = "lobby";
    lobby.endsAt = null;
    const start = harness(lobby);
    start.sockets.splice(2);
    await start.ready();
    await action(start, 0, { type: "start" });
    expect(start.saved().phase).toBe("voting");
  });
  it("selects six distinct mixed games, carries difficulty and keeps future history out of every public view", () => {
    const s = state();
    s.pack = structuredClone(packages[0]);
    s.mode = "mixed";
    s.category = undefined;
    expect(availableModes(s.pack, 2)).toContain("mixed");
    expect(availableModes(pack, 2)).not.toContain("mixed");
    for (let round = 0; round < 6; round++) {
      s.round = round;
      s.phase = "question";
      s.endsAt = Date.now() + 45_000;
      beginRound(s, () => 0);
      initializeDrawing(s);
      initializeAssociation(s);
      const q = currentQuestion(s)!;
      const chosen = q.id;
      const category = s.category;
      beginRound(s, () => 0.99);
      expect(currentQuestion(s)?.id).toBe(chosen);
      expect(s.category).toBe(category);
      const view = roomView(s, "p1", "en", new Set());
      expect(view.mode).toBe("mixed");
      expect(view.category).toBe(q.category);
      expect(JSON.stringify(view)).not.toContain("mixedCategories");
      expect(JSON.stringify(view)).not.toContain("chosenQuestionIds");
      s.answers[q.id] = Object.fromEntries(
        (s.adaptive?.eligible[q.id] ?? []).map((id) => [
          id,
          {
            value:
              q.category === "association"
                ? associationTargets(q, id === "p2" ? "purple" : "green")
                : q.answer,
            points: 1000,
          },
        ]),
      );
      finishRound(s);
      expect(s.adaptive?.targetDifficulty).toBe("hard");
    }
    expect(new Set(s.mixedCategories).size).toBe(6);
    expect(s.adaptive?.chosenQuestionIds).toHaveLength(6);
  });
  it("reconstructs mixed mode without redrawing the current game and progresses to an unseen category", async () => {
    const s = state();
    s.pack = structuredClone(packages[0]);
    s.mode = "mixed";
    s.category = undefined;
    beginRound(s, () => 0);
    const first = currentQuestion(s)!.id;
    s.endsAt = Date.now() - 1;
    const h = harness(s);
    await h.ready();
    await h.room.alarm();
    expect(currentQuestion(h.saved())?.id).toBe(first);
    const revealed = h.saved();
    revealed.endsAt = Date.now() - 1;
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await resumed.alarm();
    expect(h.saved().round).toBe(1);
    expect(h.saved().mode).toBe("mixed");
    expect(new Set(h.saved().mixedCategories).size).toBe(2);
    const current = currentQuestion(h.saved())!.id;
    const again = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await again.alarm();
    expect(currentQuestion(h.saved())!.id).toBe(current);
  });
  it("reveals immediately only once all eligible players answered, including wrong answers, and keeps offline nonanswers eligible", async () => {
    const h = harness(state());
    await h.ready();
    for (let i = 0; i < 2; i++)
      await action(h, i, { type: "answer", questionId: "q-0", value: "b" });
    expect(h.saved().phase).toBe("question");
    h.sockets.splice(2);
    await h.room.alarm();
    expect(h.saved().phase).toBe("question");
    const offline = h.saved();
    offline.answers["q-0"].p3 = { value: "b", points: 0 };
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await resumed.alarm();
    expect(h.saved().phase).toBe("reveal");
    expect(h.saved().endsAt! - Date.now()).toBeGreaterThan(9900);
    expect(h.saved().players.p1.score).toBe(0);
    await resumed.alarm();
    expect(h.saved().players.p1.score).toBe(0);
  });
  it("keeps the two-player drawing secret out of public chat and reveals early after the only guesser solves", async () => {
    const s = state();
    delete s.players.p3;
    s.category = "drawing";
    s.pack = structuredClone(packages[0]);
    initializeDrawing(s);
    const q = currentQuestion(s)!;
    const h = harness(s);
    h.sockets.splice(2);
    await h.ready();
    await action(h, 1, {
      type: "answer",
      questionId: q.id,
      value: "definitely-wrong",
    });
    expect(lastError(h.sockets[1])).toBe("WRONG_GUESS");
    expect(h.saved().phase).toBe("question");
    expect(h.saved().drawing?.chat?.[0].text).toBe("definitely-wrong");
    await action(h, 0, {
      type: "drawChat",
      questionId: q.id,
      text: `Look at this ${q.drawing!.word.en}!`,
    });
    expect(lastError(h.sockets[0])).toBe("SECRET_WORD_HIDDEN");
    expect(h.saved().drawing?.chat).toHaveLength(1);
    await action(h, 1, {
      type: "answer",
      questionId: q.id,
      value: q.drawing!.word.en,
    });
    expect(h.saved().phase).toBe("reveal");
    expect(h.saved().drawing?.chat?.[1]).toMatchObject({
      playerId: "p2",
      kind: "correct",
    });
    expect(h.saved().drawing?.chat?.[1].text).toBeUndefined();
    expect(h.saved().players.p1.score).toBe(1000);
    expect(h.saved().players.p2.score).toBe(1000);
  });
  it("redacts bounded aliases in either language, stores text as data, caps chat at 100 entries, and commits without D1", async () => {
    const s = state();
    s.category = "drawing";
    s.pack = structuredClone(packages[0]);
    initializeDrawing(s);
    const q = currentQuestion(s)!;
    for (const word of [...q.drawing!.aliases.de, ...q.drawing!.aliases.en]) {
      expect(containsDrawingSecret(q, `(${word.toUpperCase()})`)).toBe(true);
      expect(containsDrawingSecret(q, `<img src=x onerror='${word}'>`)).toBe(
        true,
      );
    }
    const h = harness(s);
    await h.ready();
    await action(h, 0, {
      type: "drawChat",
      questionId: q.id,
      text: "<script>alert(1)</script>",
    });
    expect(h.saved().drawing?.chat?.[0].text).toBe("<script>alert(1)</script>");
    expect(h.writes).toHaveLength(0);
    await action(h, 1, { type: "drawChat", questionId: q.id, text: "Hello" });
    expect(lastError(h.sockets[1])).toBe("GUESSER_ONLY");
    await action(h, 0, {
      type: "drawChat",
      questionId: q.id,
      text: "x".repeat(161),
    });
    expect(lastError(h.sockets[0])).toBe("INVALID_CHAT");
    const stored = h.saved();
    stored.drawing!.chat = Array.from({ length: 100 }, (_, i) => ({
      id: `old-${i}`,
      playerId: "p1",
      timestamp: i,
      kind: "message",
      text: "old",
    }));
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await resumed.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify({ type: "drawChat", questionId: q.id, text: "Hello" }),
    );
    expect(h.saved().drawing?.chat).toHaveLength(100);
    expect(h.saved().drawing?.chat?.at(-1)?.text).toBe("Hello");
    expect(h.saved().drawing?.chat?.[0].id).toBe("old-1");
  });
});

describe("prepared geography server boundary", () => {
  const q: Question = {
    id: "geo-test",
    category: "geography",
    difficulty: "medium",
    prompt: { de: "Wo?", en: "Where?" },
    answer: "opaque-location-id",
    explanation: { de: "Berlin", en: "Berlin" },
    geography: {
      panoId: "verified-pano",
      heading: 10,
      pitch: 0,
      target: { lat: 52.52, lng: 13.405 },
      verifiedAt: "2026-10-09T12:00:00Z",
    },
  };
  it("normalizes coordinate guesses, scores on the server, and reveals only the current target at reveal", () => {
    const s = state();
    s.category = "geography";
    s.pack.questions.geography = Array.from({ length: 6 }, (_, i) => ({
      ...q,
      id: `geo-${i}`,
    }));
    const de = roomView(
        s,
        "p1",
        "de",
        new Set(),
        undefined,
        "browser-restricted-key",
      ),
      en = roomView(
        s,
        "p2",
        "en",
        new Set(),
        undefined,
        "browser-restricted-key",
      );
    expect(de.question?.geography).toEqual(en.question?.geography);
    expect(de.question?.geography).toEqual({
      panoId: "verified-pano",
      heading: 10,
      pitch: 0,
    });
    expect(JSON.stringify(de)).not.toContain("52.52");
    expect(JSON.stringify(de)).not.toContain("target");
    expect(de.geography?.browserKey).toBe("browser-restricted-key");
    const guess = JSON.stringify(q.geography!.target);
    expect(parseAnswer(q, guess, "de")).toBe(guess);
    expect(pointsFor(q, guess)).toBe(1000);
    expect(successfulAnswer(q, guess)).toBe(true);
    for (const input of [
      '{"lat":91,"lng":0}',
      '{"lat":"52","lng":13}',
      '{"lat":52,"lng":13,"extra":1}',
    ])
      expect(parseAnswer(q, input, "en")).toBeNull();
    s.phase = "reveal";
    expect(roomView(s, "p1", "de", new Set()).reveal?.answer).toBe(guess);
    s.phase = "lobby";
    expect(roomView(s, "p1", "de", new Set()).geography).toBeUndefined();
  });
  it("permits an empty geography bank while rejecting partial or unverified banks", () => {
    const p = structuredClone(packages[0]);
    expect(p.questions.geography).toEqual([]);
    expect(selectPackage([p]).pack.id).toBe(p.id);
    p.questions.geography = [q];
    expect(() => selectPackage([p])).toThrow();
    p.questions.geography = Array.from({ length: 6 }, (_, i) => ({
      ...q,
      id: `geo-${i}`,
    }));
    expect(selectPackage([p]).pack.questions.geography).toHaveLength(6);
    delete p.questions.geography[0].geography!.verifiedAt;
    expect(() => selectPackage([p])).toThrow("Unverified");
  });
});

describe("mixed vote validation", () => {
  it("accepts and selects mixed only when the snapshot supplies six categories", async () => {
    const s = state();
    s.pack = structuredClone(packages[0]);
    s.category = undefined;
    s.phase = "voting";
    s.endsAt = Date.now() + 30_000;
    const h = harness(s);
    await h.ready();
    await action(h, 0, { type: "vote", category: "mixed" });
    expect(h.saved().players.p1.vote).toBe("mixed");
    expect(roomView(h.saved(), "p1", "en", new Set()).votes.mixed).toBe(1);
    h.saved().endsAt = Date.now() - 1;
    const restarted = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await restarted.alarm();
    expect(h.saved().mode).toBe("mixed");
    expect(h.saved().category).not.toBe("mixed");
    expect(h.saved().mixedCategories).toHaveLength(1);
    const old = state();
    old.phase = "voting";
    const restricted = harness(old);
    await restricted.ready();
    await action(restricted, 0, { type: "vote", category: "mixed" });
    expect(lastError(restricted.sockets[0])).toBe("INVALID_REQUEST");
  });
});

function votingState(count = 3): RoomState {
  const s = state();
  s.pack = structuredClone(packages[0]);
  s.category = undefined;
  s.phase = "voting";
  s.endsAt = Date.now() + 30_000;
  if (count === 2) delete s.players.p3;
  return s;
}
describe("authoritative early voting completion", () => {
  it("starts a fresh45-second round immediately after the final of two votes and hides the future bank", async () => {
    const s = votingState(2),
      oldDeadline = s.endsAt!,
      h = harness(s);
    h.sockets.splice(2);
    await h.ready();
    await action(h, 0, { type: "vote", category: "trivia" });
    expect(h.saved().phase).toBe("voting");
    expect(h.saved().endsAt).toBe(oldDeadline);
    const before = Date.now();
    await action(h, 1, { type: "vote", category: "trivia" });
    expect(h.saved().phase).toBe("question");
    expect(h.saved().category).toBe("trivia");
    expect(h.saved().endsAt).toBeGreaterThanOrEqual(before + 45_000);
    expect(h.saved().endsAt).toBeLessThanOrEqual(Date.now() + 45_000);
    expect(h.saved().endsAt).toBeLessThan(oldDeadline + 45_000);
    expect(h.alarm()).toBe(h.saved().endsAt);
    const q = currentQuestion(h.saved())!;
    expect(h.saved().adaptive?.chosenQuestionIds).toEqual([q.id]);
    for (const socket of h.sockets) {
      const view = JSON.parse(socket.messages.at(-1)!).state;
      expect(view.question.id).toBe(q.id);
      expect(view.question.answer).toBeUndefined();
      expect(view.question.explanation).toBeUndefined();
      expect(view.pack.questions).toBeUndefined();
      for (const future of s.pack.questions.trivia.filter(
        (candidate) => candidate.id !== q.id,
      ))
        expect(JSON.stringify(view)).not.toContain(future.id);
    }
  });
  it("counts duplicate and replacement votes once, keeps voting open before the final roster member, and locks the selected round", async () => {
    const h = harness(votingState());
    await h.ready();
    await action(h, 0, { type: "vote", category: "logic" });
    await action(h, 0, { type: "vote", category: "logic" });
    expect(roomView(h.saved(), "p1", "de", new Set()).votes.logic).toBe(1);
    await action(h, 0, { type: "vote", category: "trivia" });
    await action(h, 1, { type: "vote", category: "trivia" });
    expect(h.saved().phase).toBe("voting");
    expect(roomView(h.saved(), "p1", "de", new Set()).votes.logic).toBe(0);
    await action(h, 2, { type: "vote", category: "logic" });
    expect(h.saved().category).toBe("trivia");
    const id = currentQuestion(h.saved())!.id,
      deadline = h.saved().endsAt;
    await action(h, 0, { type: "vote", category: "logic" });
    expect(lastError(h.sockets[0])).toBe("WRONG_PHASE");
    expect(currentQuestion(h.saved())!.id).toBe(id);
    expect(h.saved().endsAt).toBe(deadline);
    expect(h.saved().adaptive?.chosenQuestionIds).toHaveLength(1);
  });
  it("keeps an offline unvoted roster member eligible until the original timeout and preserves the timed tie path", async () => {
    const s = votingState(),
      h = harness(s);
    h.sockets.splice(2);
    await h.ready();
    await action(h, 0, { type: "vote", category: "trivia" });
    await action(h, 1, { type: "vote", category: "logic" });
    expect(h.saved().phase).toBe("voting");
    expect(h.saved().endsAt).toBe(s.endsAt);
    await h.room.alarm();
    expect(h.saved().phase).toBe("voting");
    const deadline = Date.now() - 1;
    h.saved().endsAt = deadline;
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await resumed.alarm();
    expect(h.saved().phase).toBe("question");
    expect(["trivia", "logic"]).toContain(h.saved().mode);
    expect(h.saved().endsAt).toBe(deadline + 45_000);
    expect(h.saved().players.p3.vote).toBeUndefined();
  });
  it("journals the final vote and chosen round together despite D1 failure, then retries without drawing a new question", async () => {
    const h = harness(votingState(2));
    h.sockets.splice(2);
    await h.ready();
    await action(h, 0, { type: "vote", category: "mixed" });
    h.fail(true);
    await action(h, 1, { type: "vote", category: "mixed" });
    expect(h.saved().phase).toBe("question");
    expect(h.saved().mode).toBe("mixed");
    expect(h.saved().players.p2.vote).toBe("mixed");
    expect(h.saved().saveError).toBe(true);
    const q = currentQuestion(h.saved())!.id,
      category = h.saved().category,
      deadline = h.saved().endsAt;
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    h.fail(false);
    await resumed.alarm();
    expect(h.saved().saveError).toBe(false);
    expect(h.saved().phase).toBe("question");
    expect(currentQuestion(h.saved())!.id).toBe(q);
    expect(h.saved().category).toBe(category);
    expect(h.saved().endsAt).toBe(deadline);
    expect(h.saved().mixedCategories).toHaveLength(1);
    expect(h.saved().adaptive?.chosenQuestionIds).toHaveLength(1);
  });
  it("recovers a fully voted legacy voting snapshot before its deadline and starts from recovery time only once", async () => {
    const s = votingState(2);
    s.players.p1.vote = "association";
    s.players.p2.vote = "association";
    const h = harness(s);
    h.sockets.splice(2);
    await h.ready();
    const before = Date.now();
    await h.room.alarm();
    expect(h.saved().phase).toBe("question");
    expect(h.saved().association?.cooperative).toBe(true);
    expect(h.saved().endsAt).toBeGreaterThanOrEqual(before + 45_000);
    expect(h.saved().association?.clueEndsAt).toBe(h.saved().endsAt! - 30_000);
    const q = currentQuestion(h.saved())!.id,
      deadline = h.saved().endsAt;
    await h.room.alarm();
    expect(currentQuestion(h.saved())!.id).toBe(q);
    expect(h.saved().endsAt).toBe(deadline);
  });
});

function lobbyState(): RoomState {
  const s = state();
  s.pack = structuredClone(packages[0]);
  s.phase = "lobby";
  s.category = undefined;
  s.endsAt = null;
  return s;
}
function engineState(kind: PuzzleCategory): RoomState {
  const s = state();
  s.pack = structuredClone(packages[0]);
  s.category = kind;
  const start = Date.now();
  beginRound(s, () => 0);
  const q = currentQuestion(s)!;
  s.endsAt = start + puzzleDuration(q);
  initializePuzzle(s, start);
  return s;
}

describe("guided tutorial transport", () => {
  it("starts the guided mix directly with a secret-free tutorial and persists readiness across reload", async () => {
    const h = harness(lobbyState());
    await h.ready();
    await action(h, 0, { type: "start", mode: "mixed", tutorials: true });
    expect(h.saved().phase).toBe("tutorial");
    expect(h.saved().guided).toBe(true);
    expect(h.saved().mode).toBe("mixed");
    expect(h.saved().mixedCategories).toHaveLength(1);
    expect(h.saved().adaptive).toBeUndefined();
    expect(h.saved().puzzle).toBeUndefined();
    expect(h.saved().drawing).toBeUndefined();
    expect(h.saved().association).toBeUndefined();
    for (const socket of h.sockets) {
      const view = JSON.parse(socket.messages.at(-1)!).state;
      expect(view.tutorial.readyIds).toEqual([]);
      for (const field of [
        "question",
        "puzzle",
        "drawing",
        "association",
        "reveal",
      ])
        expect(view[field]).toBeUndefined();
      expect(view.me.answer).toBeUndefined();
      expect(JSON.stringify(view)).not.toContain("chosenQuestionIds");
    }
    await action(h, 0, { type: "ready", round: 0 });
    await action(h, 0, { type: "ready", round: 0 });
    expect(h.saved().tutorial?.readyIds).toEqual(["p1"]);
    const category = h.saved().category,
      deadline = h.saved().endsAt;
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await resumed.webSocketMessage(
      h.sockets[1] as unknown as WebSocket,
      JSON.stringify({ type: "sync" }),
    );
    expect(h.saved().tutorial?.readyIds).toEqual(["p1"]);
    expect(h.saved().category).toBe(category);
    expect(h.saved().endsAt).toBe(deadline);
  });
  it("requires the fixed roster to become ready and starts a fresh game clock after the final readiness", async () => {
    const h = harness(lobbyState());
    await h.ready();
    await action(h, 0, { type: "start", mode: "memory", tutorials: true });
    const tutorialDeadline = h.saved().endsAt;
    await action(h, 0, { type: "ready", round: 1 });
    expect(lastError(h.sockets[0])).toBe("INVALID_REQUEST");
    expect(h.saved().tutorial?.readyIds).toEqual([]);
    await action(h, 0, { type: "ready", round: 0 });
    await action(h, 1, { type: "ready", round: 0 });
    expect(h.saved().phase).toBe("tutorial");
    expect(h.saved().endsAt).toBe(tutorialDeadline);
    expect(h.saved().puzzle).toBeUndefined();
    const before = Date.now();
    await action(h, 2, { type: "ready", round: 0 });
    const q = currentQuestion(h.saved())!;
    expect(h.saved().phase).toBe("question");
    expect(h.saved().tutorial).toBeUndefined();
    expect(h.saved().endsAt).toBeGreaterThanOrEqual(before + puzzleDuration(q));
    expect(h.saved().puzzle?.previewEndsAt).toBe(h.saved().endsAt! - 45_000);
    expect(h.saved().puzzle?.questionId).toBe(q.id);
  });
  it("preserves the45-second fallback for an offline unready player and starts from actual timeout handling time", async () => {
    const h = harness(lobbyState());
    await h.ready();
    await action(h, 0, { type: "start", mode: "trivia", tutorials: true });
    h.sockets.splice(2);
    await action(h, 0, { type: "ready", round: 0 });
    await action(h, 1, { type: "ready", round: 0 });
    await h.room.alarm();
    expect(h.saved().phase).toBe("tutorial");
    h.saved().endsAt = Date.now() - 12_000;
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    const before = Date.now();
    await resumed.alarm();
    expect(h.saved().phase).toBe("question");
    expect(h.saved().endsAt).toBeGreaterThanOrEqual(before + 45_000);
    expect(h.saved().players.p3).toBeTruthy();
  });
  it("uses a new tutorial each guided round and keeps subsequent solutions and prior role data private", async () => {
    const s = engineState("wavelength");
    s.guided = true;
    s.mode = "mixed";
    s.mixedCategories = ["wavelength"];
    s.phase = "reveal";
    s.endsAt = Date.now() - 1;
    s.answers[currentQuestion(s)!.id] = { p1: { value: "captain", points: 0 } };
    const h = harness(s);
    await h.ready();
    await h.room.alarm();
    expect(h.saved().round).toBe(1);
    expect(h.saved().phase).toBe("tutorial");
    expect(h.saved().category).not.toBe("wavelength");
    expect(h.saved().tutorial?.readyIds).toEqual([]);
    const view = roomView(h.saved(), "p1", "en", new Set());
    expect(view.puzzle).toBeUndefined();
    expect(view.question).toBeUndefined();
    expect(view.me.answer).toBeUndefined();
    expect(view.players.every((p) => !p.answered)).toBe(true);
    expect(JSON.stringify(view)).not.toContain("captain");
    await action(h, 0, { type: "ready", round: 0 });
    expect(lastError(h.sockets[0])).toBe("INVALID_REQUEST");
  });
  it("balances creative, visual, knowledge and brain games without selecting repeat categories or revealing later choices", () => {
    const s = lobbyState();
    s.guided = true;
    s.mode = "mixed";
    s.phase = "tutorial";
    for (let round = 0; round < 6; round++) {
      s.round = round;
      selectRoundCategory(s, () => 0);
      s.tutorial = { category: s.category!, readyIds: [] };
      expect(roomView(s, "p1", "en", new Set()).question).toBeUndefined();
      expect(s.adaptive).toBeUndefined();
    }
    expect(new Set(s.mixedCategories).size).toBe(6);
    expect(s.mixedCategories).toContain("drawing");
    expect(s.mixedCategories).toContain("sets");
    expect(s.mixedCategories).toContain("trivia");
    expect(s.mixedCategories).toContain("logic");
  });
});

describe("durable puzzle server integration", () => {
  it("persists repeated private code attempts across reload and forbids the ordinary answer scoring route", async () => {
    const s = engineState("code"),
      q = currentQuestion(s)!,
      h = harness(s);
    await h.ready();
    const definition = q.puzzle!;
    if (definition.kind !== "code") throw new Error("fixture");
    let wrong = definition.symbols[0].repeat(definition.secret.length);
    if (wrong === definition.secret)
      wrong = definition.symbols[1].repeat(definition.secret.length);
    await action(h, 0, {
      type: "answer",
      questionId: q.id,
      value: definition.secret,
    });
    expect(lastError(h.sockets[0])).toBe("INVALID_REQUEST");
    await action(h, 0, {
      type: "puzzleAction",
      questionId: q.id,
      action: { kind: "guess", value: wrong },
    });
    expect(h.saved().puzzle?.players.p1.attempts).toBe(1);
    expect(h.saved().answers[q.id]).toBeUndefined();
    expect(h.writes).toHaveLength(0);
    const other = roomView(h.saved(), "p2", "en", new Set());
    expect(other.puzzle?.progress.guesses).toBeUndefined();
    expect(other.question).not.toHaveProperty("puzzle");
    expect(other.puzzle?.solution).toBeUndefined();
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await resumed.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify({ type: "sync" }),
    );
    expect(
      JSON.parse(h.sockets[0].messages.at(-1)!).state.puzzle.progress.attempts,
    ).toBe(1);
    await resumed.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify({
        type: "puzzleAction",
        questionId: q.id,
        action: { kind: "guess", value: definition.secret },
      }),
    );
    expect(h.saved().answers[q.id].p1.points).toBe(1000);
    expect(h.saved().phase).toBe("question");
    await resumed.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify({
        type: "puzzleAction",
        questionId: q.id,
        action: { kind: "guess", value: definition.secret },
      }),
    );
    expect(lastError(h.sockets[0])).toBe("ALREADY_ANSWERED");
  });
  it("scores all complete engine progress once on early reveal and retries D1 after reconstruction", async () => {
    const s = engineState("countries"),
      q = currentQuestion(s)!,
      h = harness(s);
    await h.ready();
    h.fail(true);
    for (let index = 0; index < 3; index++)
      await action(h, index, {
        type: "puzzleAction",
        questionId: q.id,
        action: { kind: "select", ids: [q.answer] },
      });
    expect(h.saved().phase).toBe("reveal");
    expect(Object.values(h.saved().players).map((p) => p.score)).toEqual([
      1000, 1000, 1000,
    ]);
    expect(h.saved().adaptive?.history[0]).toMatchObject({
      successCount: 3,
      eligibleCount: 3,
      nextDifficulty: "hard",
    });
    expect(h.saved().saveError).toBe(true);
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    h.fail(false);
    await resumed.alarm();
    expect(Object.values(h.saved().players).map((p) => p.score)).toEqual([
      1000, 1000, 1000,
    ]);
    expect(h.saved().adaptive?.history).toHaveLength(1);
    expect(h.saved().saveError).toBe(false);
  });
  it("commits partial connections points at timeout and retains nonanswers in adaptive eligibility", async () => {
    const s = engineState("connections"),
      q = currentQuestion(s)!,
      h = harness(s);
    await h.ready();
    const puzzle = q.puzzle!;
    if (puzzle.kind !== "connections") throw new Error("fixture");
    await action(h, 0, {
      type: "puzzleAction",
      questionId: q.id,
      action: { kind: "select", ids: puzzle.groups[0].ids },
    });
    expect(h.saved().answers[q.id]).toBeUndefined();
    const partial = puzzleResult(q, h.saved().puzzle!, "p1").points;
    expect(partial).toBeGreaterThan(0);
    expect(partial).toBeLessThan(1000);
    h.saved().endsAt = Date.now() - 1;
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await resumed.alarm();
    expect(h.saved().players.p1.score).toBe(partial);
    expect(h.saved().players.p2.score).toBe(0);
    expect(h.saved().adaptive?.history[0]).toMatchObject({
      successCount: 0,
      eligibleCount: 3,
      nextDifficulty: "easy",
    });
    expect(h.saved().puzzle?.players.p1.done).toBe(true);
    expect(h.saved().answers[q.id].p1.points).toBe(partial);
  });
  it("broadcasts memory preview expiry once and preserves the full recall deadline after restart", async () => {
    const s = engineState("memory"),
      q = currentQuestion(s)!,
      h = harness(s);
    await h.ready();
    const puzzle = q.puzzle!;
    if (puzzle.kind !== "memory") throw new Error("fixture");
    await action(h, 0, {
      type: "puzzleAction",
      questionId: q.id,
      action: { kind: "select", ids: puzzle.sequence },
    });
    expect(lastError(h.sockets[0])).toBe("WRONG_PHASE");
    expect(roomView(h.saved(), "p1", "de", new Set()).puzzle?.sequence).toEqual(
      puzzle.sequence,
    );
    const deadline = h.saved().endsAt;
    h.saved().puzzle!.previewEndsAt = Date.now() - 1;
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await resumed.alarm();
    expect(h.saved().endsAt).toBe(deadline);
    expect(h.alarm()).toBe(deadline);
    expect(
      JSON.parse(h.sockets[0].messages.at(-1)!).state.puzzle.sequence,
    ).toBeUndefined();
    await resumed.webSocketMessage(
      h.sockets[0] as unknown as WebSocket,
      JSON.stringify({
        type: "puzzleAction",
        questionId: q.id,
        action: { kind: "select", ids: puzzle.sequence },
      }),
    );
    expect(h.saved().answers[q.id].p1.points).toBe(1000);
    expect(h.saved().phase).toBe("question");
  });
  it("keeps wavelength target private, supplies fallback after15s, rotates/excludes captain, and scores their contribution", async () => {
    const s = engineState("wavelength"),
      q = currentQuestion(s)!,
      h = harness(s);
    await h.ready();
    const puzzle = q.puzzle!;
    if (puzzle.kind !== "wavelength") throw new Error("fixture");
    expect(s.puzzle?.captainId).toBe("p1");
    expect(s.adaptive?.eligible[q.id]).toEqual(["p2", "p3"]);
    expect(roomView(s, "p1", "de", new Set()).puzzle?.target).toBe(
      puzzle.target,
    );
    expect(roomView(s, "p2", "en", new Set()).puzzle?.target).toBeUndefined();
    await action(h, 1, {
      type: "puzzleAction",
      questionId: q.id,
      action: { kind: "guess", value: String(puzzle.target) },
    });
    expect(lastError(h.sockets[1])).toBe("WAIT_FOR_CLUE");
    h.saved().puzzle!.clueEndsAt = Date.now() - 1;
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await resumed.alarm();
    expect(h.saved().puzzle?.automaticClue).toBe(true);
    expect(h.alarm()).toBe(h.saved().endsAt);
    for (const socket of h.sockets.slice(1))
      await resumed.webSocketMessage(
        socket as unknown as WebSocket,
        JSON.stringify({
          type: "puzzleAction",
          questionId: q.id,
          action: { kind: "guess", value: String(puzzle.target) },
        }),
      );
    expect(h.saved().phase).toBe("reveal");
    expect(Object.values(h.saved().players).map((p) => p.score)).toEqual([
      1000, 1000, 1000,
    ]);
    expect(h.saved().answers[q.id].p1.value).toBe("captain");
    expect(h.saved().adaptive?.history[0]).toMatchObject({
      successCount: 2,
      eligibleCount: 2,
    });
    const next = h.saved();
    next.round = 1;
    next.phase = "question";
    beginRound(next, () => 0);
    initializePuzzle(next, Date.now());
    expect(next.puzzle?.captainId).toBe("p2");
  });
  it("accepts older package snapshots lacking all new banks while rejecting malformed present puzzle definitions", () => {
    const old = structuredClone(packages[0]);
    for (const category of PUZZLE_CATEGORIES)
      delete (old.questions as Partial<WeekPackage["questions"]>)[category];
    expect(selectPackage([old]).pack.id).toBe(old.id);
    expect(availableCategories(old)).toHaveLength(8);
    const s = state();
    s.pack = old;
    s.category = "wordle";
    expect(currentQuestion(s)).toBeUndefined();
    const bad = structuredClone(packages[0]);
    delete bad.questions.wordle[0].puzzle;
    expect(() => selectPackage([bad])).toThrow("Invalid puzzle");
  });
});

describe("preview delivery during D1 latency", () => {
  it("broadcasts a durably initialized memory round before waiting for the D1 snapshot", async () => {
    const s = state();
    s.pack = structuredClone(packages[0]);
    s.category = "memory";
    s.mode = "memory";
    s.guided = true;
    s.phase = "tutorial";
    s.tutorial = { category: "memory", readyIds: ["p1", "p2"] };
    s.endsAt = Date.now() + 45_000;
    const h = harness(s);
    await h.ready();
    const original = h.db.batch.bind(h.db);
    let unblock!: () => void;
    let entered!: () => void;
    const enteredD1 = new Promise<void>((resolve) => {
      entered = resolve;
    });
    const blocked = new Promise<void>((resolve) => {
      unblock = resolve;
    });
    Object.assign(h.db, {
      batch: async (statements: D1PreparedStatement[]) => {
        entered();
        await blocked;
        return original(statements);
      },
    });
    const finalReady = action(h, 2, { type: "ready", round: 0 });
    await enteredD1;
    expect(h.saved().phase).toBe("question");
    expect(h.saved().puzzle).toBeTruthy();
    const view = JSON.parse(h.sockets[0].messages.at(-1)!).state;
    expect(view.phase).toBe("question");
    expect(view.puzzle.sequence?.length).toBeGreaterThan(0);
    expect(view.saving).toBe(true);
    expect(view.puzzle.previewEndsAt).toBe(h.saved().puzzle?.previewEndsAt);
    unblock();
    await finalReady;
    expect(h.saved().saveError).toBe(false);
  });
});

describe("game-specific duration after readiness", () => {
  it("starts Wordle with a fresh75-second deadline and preserves it across attempts and reconnect", async () => {
    const h = harness(lobbyState());
    await h.ready();
    await action(h, 0, { type: "start", mode: "wordle", tutorials: true });
    expect(h.saved().phase).toBe("tutorial");
    await action(h, 0, { type: "ready", round: 0 });
    await action(h, 1, { type: "ready", round: 0 });
    const before = Date.now();
    await action(h, 2, { type: "ready", round: 0 });
    const question = currentQuestion(h.saved())!,
      deadline = h.saved().endsAt!;
    expect(puzzleDuration(question)).toBe(75_000);
    expect(deadline).toBeGreaterThanOrEqual(before + 75_000);
    expect(deadline).toBeLessThanOrEqual(Date.now() + 75_000);
    expect(h.alarm()).toBe(deadline);
    const puzzle = question.puzzle!;
    if (puzzle.kind !== "wordle") throw new Error("fixture");
    await action(h, 0, {
      type: "puzzleAction",
      questionId: question.id,
      action: { kind: "guess", value: puzzle.word },
    });
    expect(h.saved().phase).toBe("question");
    expect(h.saved().endsAt).toBe(deadline);
    const resumed = new BrainbreakRoom(h.ctx, { DB: h.db } as Env);
    await h.ready();
    await resumed.webSocketMessage(
      h.sockets[1] as unknown as WebSocket,
      JSON.stringify({ type: "sync" }),
    );
    expect(h.saved().endsAt).toBe(deadline);
    expect(JSON.parse(h.sockets[1].messages.at(-1)!).state.endsAt).toBe(
      deadline,
    );
    expect(h.saved().answers[question.id].p1.points).toBe(1000);
  });
});
