import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import WebSocket from "ws";
const base = process.env.BRAINBREAK_URL || "http://127.0.0.1:8787";
const cache = new Map();
function compile(file) {
  if (cache.has(file)) return cache.get(file);
  let code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  code = code.replace(
    /from\s+(['"])(\.[^'"]+)\1/g,
    (_, quote, path) =>
      "from " +
      JSON.stringify(
        compile(
          new URL(path + ".ts", new URL(file, "file://" + process.cwd() + "/"))
            .pathname,
        ),
      ),
  );
  const uri = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  cache.set(file, uri);
  return uri;
}
const { packages } = await import(compile("worker/content/index.ts"));
const modes = process.env.BRAINBREAK_CATEGORIES?.split(",") || [
  ...Object.keys(packages[0].questions).filter(
    (c) => packages[0].questions[c].length >= 6,
  ),
  "mixed",
];
const counts = process.env.BRAINBREAK_PLAYER_COUNTS?.split(",").map(Number) || [
  2, 30,
];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function until(check, timeout = 15000) {
  const end = Date.now() + timeout;
  while (!check()) {
    if (Date.now() > end) throw Error("Protocol timeout");
    await sleep(25);
  }
}
async function api(path, body, token) {
  const response = await fetch(base + path, {
    method: body === undefined ? "GET" : "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const data = await response.json();
  assert.equal(response.status, 200, JSON.stringify(data));
  return data;
}
const send = (p, message) => p.ws.send(JSON.stringify(message));
async function connect(p, code, language) {
  p.state = null;
  p.language = language;
  p.errors ??= [];
  p.ws = new WebSocket(
    base.replace(/^http/, "ws") + `/api/rooms/${code}/socket`,
    { origin: base },
  );
  p.ws.on("message", (raw) => {
    if (raw.toString() === "pong") return;
    const message = JSON.parse(raw);
    if (message.type === "state") p.state = message.state;
    if (message.type === "error") p.errors.push(message.code);
  });
  await new Promise((resolve, reject) => {
    p.ws.once("open", resolve);
    p.ws.once("error", reject);
  });
  send(p, { type: "auth", token: p.token, language });
  await until(() => p.state?.me.id === p.id);
}
async function expectError(p, code, action) {
  const n = p.errors.length;
  send(p, action);
  await until(() => p.errors.slice(n).includes(code));
}
function action(q) {
  const d = q.puzzle;
  if (!d) return null;
  switch (d.kind) {
    case "code":
      return { kind: "guess", value: d.secret };
    case "wordle":
      return { kind: "guess", value: d.word };
    case "countries":
      return { kind: "select", ids: [q.answer] };
    case "memory":
      return { kind: "select", ids: d.sequence };
    case "connections":
      return { kind: "select", ids: d.groups[0].ids };
    case "wavelength":
      return { kind: "guess", value: String(d.target) };
    case "sets":
      for (let a = 0; a < d.cards.length; a++)
        for (let b = a + 1; b < d.cards.length; b++)
          for (let c = b + 1; c < d.cards.length; c++) {
            const cards = [d.cards[a], d.cards[b], d.cards[c]],
              fields = ["shape", "color", "count", "fill"].slice(0, d.features);
            if (
              fields.every((f) =>
                [1, 3].includes(new Set(cards.map((x) => x[f])).size),
              )
            )
              return { kind: "select", ids: cards.map((x) => x.id) };
          }
      throw Error("No SET");
  }
}
async function run(mode, count) {
  const players = [];
  for (let i = 0; i < count; i++) players.push(await api("/api/identity", {}));
  const { code } = await api(
    "/api/rooms",
    { name: `QA G ${mode.slice(0, 6)} ${count} 1` },
    players[0].token,
  );
  for (let i = 1; i < count; i++)
    await api(
      `/api/rooms/${code}/join`,
      { name: `QA G ${mode.slice(0, 6)} ${count} ${i + 1}` },
      players[i].token,
    );
  const host = players[0],
    checks = [];
  try {
    await Promise.all(
      players.map((p, i) => connect(p, code, i % 2 ? "en" : "de")),
    );
    await until(() => host.state.players.every((p) => p.connected));
    await expectError(players[1], "HOST_ONLY", {
      type: "start",
      mode,
      tutorials: true,
    });
    send(host, { type: "start", mode, tutorials: true });
    const pack = packages.find((p) => p.id === host.state.pack.id);
    let expected = 0;
    for (let round = 0; round < 6; round++) {
      await until(
        () =>
          players.every(
            (p) => p.state?.phase === "tutorial" && p.state.round === round,
          ),
        20000,
      );
      for (const p of players) {
        const view = p.state;
        assert(view.tutorial);
        assert.equal(view.question, undefined);
        assert.equal(view.puzzle, undefined);
        assert.equal(view.drawing, undefined);
        assert.equal(view.association, undefined);
        assert.equal(view.me.answer, undefined);
        assert.equal(JSON.stringify(view).includes("chosenQuestionIds"), false);
        assert.equal(JSON.stringify(view).includes("mixedCategories"), false);
      }
      await expectError(host, "INVALID_REQUEST", {
        type: "ready",
        round: round + 1,
      });
      const deadline = host.state.endsAt;
      for (const p of players.slice(0, -1)) send(p, { type: "ready", round });
      await until(() => host.state.tutorial?.readyIds.length === count - 1);
      assert.equal(host.state.phase, "tutorial");
      assert.equal(host.state.endsAt, deadline);
      if (round === 0) {
        host.ws.close();
        await connect(host, code, "en");
        assert(host.state.tutorial.readyIds.includes(host.id));
        assert.equal(host.state.endsAt, deadline);
      }
      const started = Date.now();
      send(players.at(-1), { type: "ready", round });
      await until(() =>
        players.every(
          (p) => p.state?.phase === "question" && p.state.round === round,
        ),
      );
      const q = pack.questions[host.state.category].find(
        (q) => q.id === host.state.question.id,
      );
      assert(q);
      const end = host.state.endsAt;
      const duration = ["code", "wordle", "connections"].includes(q.category)
        ? 75000
        : q.category === "wavelength"
          ? 60000
          : 45000 + (q.puzzle?.previewMs ?? 0);
      assert(end >= started + duration - 1000);
      assert(end <= Date.now() + duration);
      for (const p of players) {
        assert.equal(p.state.question.id, q.id);
        assert.equal(p.state.endsAt, end);
        assert.equal(p.state.question.answer, undefined);
        assert.equal(p.state.question.puzzle, undefined);
        assert.equal(p.state.reveal, undefined);
      }
      if (q.puzzle) {
        if (q.category === "memory") {
          await expectError(host, "WRONG_PHASE", {
            type: "puzzleAction",
            questionId: q.id,
            action: action(q),
          });
          await until(
            () => players.every((p) => p.state.puzzle.sequence === undefined),
            10000,
          );
          assert.equal(host.state.endsAt, end);
        }
        if (q.category === "wavelength") {
          const captain = players.find(
            (p) => p.id === host.state.puzzle.captainId,
          );
          for (const p of players)
            assert.equal(
              p.state.puzzle.target,
              p === captain ? q.puzzle.target : undefined,
            );
          send(captain, {
            type: "puzzleAction",
            questionId: q.id,
            action: { kind: "clue", ...q.puzzle.fallbackClue },
          });
          await until(() => players.every((p) => p.state.puzzle.clue));
        }
        if (round === 0 && ["wordle", "code"].includes(q.category)) {
          const wrong =
            q.category === "wordle"
              ? q.puzzle.allowed.find((w) => w !== q.puzzle.word)
              : q.puzzle.symbols[0].repeat(q.puzzle.secret.length) ===
                  q.puzzle.secret
                ? q.puzzle.symbols[1].repeat(q.puzzle.secret.length)
                : q.puzzle.symbols[0].repeat(q.puzzle.secret.length);
          send(host, {
            type: "puzzleAction",
            questionId: q.id,
            action: { kind: "guess", value: wrong },
          });
          await until(() => host.state.puzzle.progress.attempts === 1);
          assert.equal(players[1].state.puzzle.progress.attempts, 0);
          const saved = host.state.puzzle.progress.guesses;
          send(host, { type: "language", language: "de" });
          await until(() => host.state.question.prompt === q.prompt.de);
          assert.deepEqual(host.state.puzzle.progress.guesses, saved);
          assert.equal(host.state.endsAt, end);
          host.ws.close();
          await connect(host, code, "en");
          assert.deepEqual(host.state.puzzle.progress.guesses, saved);
          assert.equal(host.state.endsAt, end);
        }
        for (const p of players) {
          if (q.category === "wavelength" && p.id === p.state.puzzle.captainId)
            continue;
          if (q.category === "connections") {
            for (const group of q.puzzle.groups) {
              send(p, {
                type: "puzzleAction",
                questionId: q.id,
                action: { kind: "select", ids: group.ids },
              });
              await until(
                () =>
                  p.state.phase === "reveal" ||
                  p.state.puzzle.progress.foundGroups?.includes(group.id),
              );
            }
          } else
            send(p, {
              type: "puzzleAction",
              questionId: q.id,
              action: action(q),
            });
        }
      } else if (q.category === "drawing") {
        const artist = players.find(
          (p) => p.id === host.state.drawing.artistId,
        );
        assert(artist.state.drawing.word);
        for (const p of players) {
          if (p === artist) continue;
          assert.equal(p.state.drawing.word, undefined);
          send(p, {
            type: "answer",
            questionId: q.id,
            value: q.drawing.word[p.language],
          });
        }
      } else if (q.category === "association") {
        for (const team of ["green", "purple"]) {
          const captain = players.find(
            (p) => p.id === host.state.association.teams[team].captainId,
          );
          if (captain)
            send(captain, {
              type: "associationClue",
              questionId: q.id,
              clue: q.association.hints[team],
            });
        }
        await until(() =>
          players.every(
            (p) => p.state.association.teams[p.state.association.team].clue,
          ),
        );
        for (const p of players) {
          if (p.state.association.captain) continue;
          send(p, {
            type: "answer",
            questionId: q.id,
            value: [...q.association.targets[p.state.association.team]]
              .sort()
              .join(","),
          });
        }
      } else
        for (const p of players)
          send(p, {
            type: "answer",
            questionId: q.id,
            value: String(q.answer).replace(
              ".",
              p.language === "de" ? "," : ".",
            ),
          });
      await until(() =>
        players.every(
          (p) => p.state?.phase === "reveal" && p.state.round === round,
        ),
      );
      expected += 1000;
      for (const p of players) {
        assert.equal(p.state.me.score, expected);
        assert.equal(
          p.state.reveal.scores.find((s) => s.playerId === p.id).points,
          1000,
        );
        assert.equal(p.state.adaptation.nextDifficulty, "hard");
        assert(p.state.endsAt < end + 10000);
      }
      checks.push({
        round: round + 1,
        category: q.category,
        questionId: q.id,
        tutorialDeadline: deadline,
        questionDeadline: end,
        score: expected,
      });
      if (round === 0)
        await expectError(host, "WRONG_PHASE", { type: "ready", round });
    }
    await until(
      () =>
        players.every(
          (p) =>
            p.state?.phase === "results" &&
            !p.state.saving &&
            !p.state.saveError,
        ),
      20000,
    );
    for (const p of players) {
      assert.equal(p.state.results.length, count);
      assert.equal(p.state.me.score, 6000);
      const weeklyRow = p.state.weekly.find((r) => r.id === p.id);
      if (weeklyRow) assert.equal(weeklyRow.score, 6000);
      else
        assert.equal(
          p.state.weekly.length,
          100,
          "Leaderboard is capped; all result rows are checked independently in D1",
        );
    }
    if (mode === "mixed")
      assert.equal(new Set(checks.map((c) => c.category)).size, 6);
    console.log(`PASS ${mode} ${count} ${code}`);
    return { mode, count, code, players: players.map((p) => p.id), checks };
  } finally {
    for (const p of players) p.ws?.close();
  }
}
const reports = [];
const tasks = counts.flatMap((count) => modes.map((mode) => ({ mode, count })));
for (let i = 0; i < tasks.length; i += 6) {
  const batch = await Promise.all(
    tasks.slice(i, i + 6).map((t) => run(t.mode, t.count)),
  );
  reports.push(...batch);
  fs.mkdirSync("test-results", { recursive: true });
  fs.writeFileSync(
    "test-results/guided-protocol-partial.json",
    JSON.stringify({ time: new Date().toISOString(), base, reports }, null, 2) +
      "\n",
  );
}
fs.mkdirSync("test-results", { recursive: true });
fs.writeFileSync(
  "test-results/guided-protocol.json",
  JSON.stringify({ time: new Date().toISOString(), base, reports }, null, 2) +
    "\n",
);
console.log(`PASS ${reports.length} sessions, ${reports.length * 6} rounds`);
