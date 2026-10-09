import { describe, expect, it } from "vitest";
import type { RoomView } from "../shared/types";
import { soundCue } from "../src/useSounds";

function room(overrides: Partial<RoomView> = {}): RoomView {
  return {
    code: "ABC234",
    hostId: "player-1",
    phase: "question",
    me: { id: "player-1", name: "Ada", score: 0 },
    players: [
      {
        id: "player-1",
        name: "Ada",
        score: 0,
        connected: true,
        answered: false,
      },
      {
        id: "player-2",
        name: "Bo",
        score: 0,
        connected: true,
        answered: false,
      },
    ],
    endsAt: 100000,
    serverNow: 55000,
    round: 0,
    totalRounds: 6,
    category: "trivia",
    availableCategories: ["trivia"],
    question: {
      id: "question-1",
      category: "trivia",
      prompt: "Question",
      fallback: false,
    },
    votes: {
      code: 0,
      sets: 0,
      connections: 0,
      wavelength: 0,
      memory: 0,
      wordle: 0,
      countries: 0,
      trivia: 0,
      logic: 0,
      estimate: 0,
      arithmetic: 0,
      truth: 0,
      order: 0,
      drawing: 0,
      association: 0,
      geography: 0,
      mixed: 0,
    },
    pack: {
      id: "pack",
      title: "Pack",
      week: "2026-W41",
      reused: false,
      fallback: false,
    },
    ...overrides,
  };
}
function reveal(points: number): RoomView {
  return room({
    phase: "reveal",
    me: { id: "player-1", name: "Ada", score: points, answer: "a" },
    reveal: {
      answer: "a",
      explanation: "Answer",
      fallback: false,
      scores: [
        { playerId: "player-1", answer: "a", points },
        { playerId: "player-2", answer: "a", points: 1000 },
      ],
    },
  });
}

describe("game sound cues", () => {
  it("keeps the initial snapshot silent after loading or reloading any game phase", () => {
    for (const phase of [
      "lobby",
      "voting",
      "question",
      "reveal",
      "results",
    ] as const) {
      expect(soundCue(null, room({ phase }))).toBeNull();
    }
    expect(soundCue(room(), null)).toBeNull();
  });
  it("keeps room and player identity changes silent", () => {
    expect(soundCue(room(), reveal(1000))).toBe("correct");
    expect(soundCue(room({ code: "XYZ678" }), reveal(1000))).toBeNull();
    expect(
      soundCue(
        room({ me: { id: "other-player", name: "Other", score: 0 } }),
        reveal(1000),
      ),
    ).toBeNull();
  });
  it("does not repeat a cue for state broadcasts, language changes, chat or canvas deltas", () => {
    const initial = room();
    expect(soundCue(initial, room({ serverNow: 56000 }))).toBeNull();
    expect(
      soundCue(
        initial,
        room({
          question: {
            ...initial.question!,
            prompt: "Frage",
            difficulty: "hard",
          },
        }),
      ),
    ).toBeNull();
    const drawing = room({
      category: "drawing",
      question: {
        id: "draw-1",
        category: "drawing",
        prompt: "Draw",
        fallback: false,
      },
      drawing: { artistId: "player-2", strokes: [], revision: 0 },
    });
    const changed = room({
      ...drawing,
      drawing: {
        artistId: "player-2",
        revision: 1,
        strokes: [
          {
            id: "stroke",
            color: "#ffffff",
            width: 0.01,
            points: [{ x: 0.2, y: 0.4 }],
          },
        ],
        chat: [
          {
            id: "chat",
            playerId: "player-2",
            timestamp: 56000,
            kind: "message",
            text: "Keep guessing",
          },
        ],
      },
    });
    expect(soundCue(drawing, changed)).toBeNull();
  });
  it("acknowledges a newly locked answer once without rewarding another player's answer", () => {
    const before = room();
    const locked = room({ me: { ...before.me, answer: "a" } });
    expect(soundCue(before, locked)).toBe("answer");
    expect(soundCue(locked, room({ ...locked, serverNow: 56000 }))).toBeNull();
    expect(
      soundCue(
        before,
        room({
          players: before.players.map((player) => ({
            ...player,
            answered: player.id === "player-2",
          })),
        }),
      ),
    ).toBeNull();
  });
  it("prioritizes the scored reveal over an answer acknowledgement when the last answer ends the round", () => {
    expect(soundCue(room(), reveal(1000))).toBe("correct");
    expect(soundCue(room(), reveal(0))).toBe("reveal");
    // A proportional estimation award uses the positive-score celebration too.
    expect(soundCue(room({ category: "estimate" }), reveal(650))).toBe(
      "correct",
    );
  });
  it("uses only the current player's reveal score", () => {
    const otherPlayerWon = reveal(0);
    expect(soundCue(room(), otherPlayerWon)).toBe("reveal");
    expect(
      soundCue(otherPlayerWon, room({ ...otherPlayerWon, serverNow: 57000 })),
    ).toBeNull();
  });
  it("announces voting and the next question once during a continuous connection", () => {
    expect(
      soundCue(
        room({ phase: "lobby", question: undefined }),
        room({ phase: "voting", question: undefined }),
      ),
    ).toBe("start");
    const next = room({
      round: 1,
      question: {
        id: "question-2",
        category: "trivia",
        prompt: "Next",
        fallback: false,
      },
    });
    expect(soundCue(reveal(1000), next)).toBe("start");
    expect(soundCue(next, room({ ...next, serverNow: 58000 }))).toBeNull();
  });
  it("does not replay missed question, reveal or result cues on reconnect", () => {
    const before = room();
    const next = room({
      round: 1,
      question: {
        id: "question-2",
        category: "trivia",
        prompt: "Next",
        fallback: false,
      },
    });
    for (const caughtUp of [
      next,
      reveal(1000),
      room({ phase: "results", question: undefined }),
    ]) {
      expect(soundCue(before, caughtUp, false)).toBeNull();
      expect(
        soundCue(caughtUp, room({ ...caughtUp, serverNow: 58000 })),
      ).toBeNull();
    }
    // The next actual live transition after reconnect still produces its cue.
    expect(
      soundCue(next, room({ ...reveal(0), round: 1, question: next.question })),
    ).toBe("reveal");
  });
  it("announces the final results once, including later leaderboard-save updates", () => {
    const results = room({
      phase: "results",
      question: undefined,
      saving: true,
    });
    expect(soundCue(reveal(1000), results)).toBe("result");
    expect(
      soundCue(
        results,
        room({
          ...results,
          saving: false,
          results: [
            { id: "player-1", name: "Ada", score: 6000, sessions: 1, rank: 1 },
          ],
        }),
      ),
    ).toBeNull();
  });
});

describe("guided puzzle sound cues", () => {
  it("keeps tutorials and readiness silent, then announces the actual game start", () => {
    const tutorial = room({
      phase: "tutorial",
      question: undefined,
      tutorial: { category: "wordle", readyIds: [] },
    });
    const ready = {
      ...tutorial,
      tutorial: { category: "wordle" as const, readyIds: ["player-1"] },
    };
    expect(
      soundCue(room({ phase: "lobby", question: undefined }), tutorial),
    ).toBeNull();
    expect(soundCue(tutorial, ready)).toBeNull();
    expect(soundCue(ready, room())).toBe("start");
  });

  it("acknowledges an accepted private attempt without replaying it on a repeated state", () => {
    const before = room({
      puzzle: {
        kind: "wordle",
        progress: {
          attempts: 0,
          done: false,
          success: false,
          points: 0,
          guesses: [],
        },
      },
    });
    const after = room({
      puzzle: {
        kind: "wordle",
        progress: {
          attempts: 1,
          done: false,
          success: false,
          points: 0,
          guesses: [{ value: "APPLE", feedback: [0, 1, 0, 2, 0] }],
        },
      },
    });
    expect(soundCue(before, after)).toBe("answer");
    expect(
      soundCue(after, { ...after, serverNow: after.serverNow + 10 }),
    ).toBeNull();
    expect(soundCue(before, after, false)).toBeNull();
  });

  it("acknowledges a connection group even when it consumes no wrong attempt", () => {
    const before = room({
      puzzle: {
        kind: "connections",
        progress: {
          attempts: 0,
          done: false,
          success: false,
          points: 0,
          foundGroups: [],
        },
      },
    });
    const after = room({
      puzzle: {
        kind: "connections",
        progress: {
          attempts: 0,
          done: false,
          success: false,
          points: 500,
          foundGroups: ["opaque-group"],
        },
      },
    });
    expect(soundCue(before, after)).toBe("answer");
  });
});
