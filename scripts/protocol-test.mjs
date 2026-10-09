import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import WebSocket from "ws";
import { runDrawing } from "./drawing-test.mjs";
const base = process.env.BRAINBREAK_URL || "http://127.0.0.1:8787";
const playerCount = Number(process.env.BRAINBREAK_PLAYERS || 30);
assert(Number.isInteger(playerCount) && playerCount >= 2 && playerCount <= 30);
const adaptiveTest = process.env.BRAINBREAK_ADAPTIVE === "1";
const moduleCache = new Map();
function compile(file) {
  if (moduleCache.has(file)) return moduleCache.get(file);
  let source = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  source = source.replace(/from\s+(['"])(\.[^'"]+)\1/g, (_, quote, path) => {
    const resolved = new URL(
      path + ".ts",
      new URL(file, "file://" + process.cwd() + "/"),
    ).pathname;
    return "from " + JSON.stringify(compile(resolved));
  });
  const url = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
  moduleCache.set(file, url);
  return url;
}
const { packages } = await import(compile("worker/content/index.ts"));
const modes = process.env.BRAINBREAK_CATEGORIES?.split(",") || [
  ...Object.keys(packages[0].questions).filter(
    (c) =>
      packages[0].questions[c].length >= 6 &&
      !packages[0].questions[c][0]?.puzzle,
  ),
];
assert(
  modes.every(
    (mode) => mode === "mixed" || packages[0].questions[mode]?.length >= 6,
  ),
);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function until(check, timeout = 15000) {
  const end = Date.now() + timeout;
  while (!check()) {
    if (Date.now() > end) throw Error("Timed out waiting for protocol state");
    await sleep(50);
  }
}
async function request(path, body, token, expected = 200) {
  const response = await fetch(base + path, {
    method: body === undefined ? "GET" : "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  assert.equal(response.status, expected, JSON.stringify(data));
  return data;
}
const send = (player, message) => player.ws.send(JSON.stringify(message));
async function connect(player, code, language) {
  player.language = language;
  player.state = null;
  player.errors ??= [];
  const ws = new WebSocket(
    base.replace(/^http/, "ws") + `/api/rooms/${code}/socket`,
    { origin: base },
  );
  player.ws = ws;
  ws.on("message", (raw) => {
    if (raw.toString() === "pong") return;
    const message = JSON.parse(raw);
    if (message.type === "state") player.state = message.state;
    else if (message.type === "error") player.errors.push(message.code);
  });
  await new Promise((resolve, reject) => {
    ws.once("open", resolve);
    ws.once("error", reject);
  });
  send(player, { type: "auth", token: player.token, language });
  await until(() => player.state?.me.id === player.id);
}
async function error(player, code, message) {
  const previous = player.errors.length;
  send(player, message);
  await until(() => player.errors.slice(previous).includes(code));
}
const targets = (question, team) =>
  [...question.association.targets[team]].sort().join(",");
const numeric = (c) => c === "estimate" || c === "arithmetic";
const report = [];
async function run(mode, count) {
  if (mode === "drawing") {
    report.push(await runDrawing(base, count, packages));
    return;
  }
  const players = [];
  for (let i = 0; i < count; i++)
    players.push(await request("/api/identity", {}));
  const { code } = await request(
    "/api/rooms",
    { name: `QA ${mode} ${count} 01` },
    players[0].token,
  );
  for (let i = 1; i < count; i++)
    await request(
      `/api/rooms/${code}/join`,
      { name: `QA ${mode} ${count} ${i + 1}` },
      players[i].token,
    );
  if (count === 30) {
    const extra = await request("/api/identity", {});
    assert.equal(
      (
        await request(
          `/api/rooms/${code}/join`,
          { name: "overflow" },
          extra.token,
          409,
        )
      ).error,
      "ROOM_FULL",
    );
  }
  await Promise.all(
    players.map((p, i) => connect(p, code, i % 2 ? "en" : "de")),
  );
  const host = players[0];
  await until(
    () => host.state.players.filter((p) => p.connected).length === count,
  );
  await error(players[1], "HOST_ONLY", { type: "start" });
  send(host, { type: "start" });
  await until(() => host.state.phase === "voting");
  assert(host.state.availableModes.includes(mode));
  assert(!host.state.availableModes.includes("geography"));
  const lastVoter = players.at(-1);
  for (const p of players.slice(0, -1))
    send(p, { type: "vote", category: mode });
  await until(() => host.state.votes[mode] === count - 1);
  const voteDeadline = host.state.endsAt;
  assert.equal(host.state.phase, "voting");
  send(host, { type: "vote", category: mode === "logic" ? "trivia" : "logic" });
  await until(() => host.state.me.vote !== mode);
  assert.equal(host.state.phase, "voting");
  send(host, { type: "vote", category: mode });
  await until(() => host.state.votes[mode] === count - 1);
  host.ws.close();
  const finalVoteAt = Date.now();
  send(lastVoter, { type: "vote", category: mode });
  await until(() => players[1].state.phase === "question", 5000);
  assert(players[1].state.endsAt >= finalVoteAt + 44_000);
  assert(players[1].state.endsAt <= Date.now() + 45_000);
  assert(players[1].state.endsAt < voteDeadline + 45_000);
  await connect(host, code, "de");
  const pack = packages.find((p) => p.id === host.state.pack.id),
    scores = players.map(() => 0),
    checks = [],
    seen = new Set();
  const teamScores = { green: 0, purple: 0 };
  for (let round = 0; round < 6; round++) {
    await until(
      () =>
        players.every(
          (p) => p.state.phase === "question" && p.state.round === round,
        ),
      65000,
    );
    const game = host.state.category,
      question = pack.questions[game].find(
        (q) => q.id === host.state.question.id,
      ),
      deadline = host.state.endsAt;
    assert(question);
    if (mode === "mixed") {
      assert(!seen.has(game));
      seen.add(game);
    } else assert.equal(game, mode);
    assert(!checks.some((c) => c.questionId === question.id));
    assert.equal(
      question.difficulty,
      round === 0 ? "medium" : checks.at(-1).nextDifficulty,
    );
    for (const p of players) {
      assert.equal(p.state.mode, mode);
      assert.equal(p.state.question.id, question.id);
      assert.equal(p.state.endsAt, deadline);
      assert.equal(p.state.reveal, undefined);
      assert.equal(p.state.question.answer, undefined);
      assert.equal(p.state.question.explanation, undefined);
      assert.equal(p.state.mixedCategories, undefined);
      assert.equal(p.state.adaptive, undefined);
      assert(p.state.players.every((row) => !("answer" in row)));
    }
    let eligible = players,
      values = new Map(),
      roundPoints = new Map(players.map((p) => [p.id, 0]));
    if (game === "association") {
      const captains = players.filter((p) => p.state.association.captain);
      eligible = players.filter((p) => !p.state.association.captain);
      assert.equal(captains.length, count < 4 ? 1 : 2);
      for (const p of players) {
        const a = p.state.association;
        assert.equal(a.cooperative, count < 4);
        assert.equal(
          a.teams.green.captainId,
          players.filter((_, i) => count < 4 || i % 2 === 0)[
            round % (count < 4 ? count : Math.ceil(count / 2))
          ].id,
        );
        if (a.captain) {
          assert(a.key);
          assert.deepEqual(a.suggestion, question.association.hints[a.team]);
        } else {
          assert.equal(a.key, undefined);
          assert.equal(a.suggestion, undefined);
        }
      }
      await error(eligible[0], "WAIT_FOR_CLUE", {
        type: "answer",
        questionId: question.id,
        value: targets(question, eligible[0].state.association.team),
      });
      const automatic = round === 1;
      if (automatic) {
        for (const captain of captains) captain.ws.close();
        await until(
          () =>
            eligible.every(
              (p) =>
                p.state.association.teams[p.state.association.team].automatic,
            ),
          20000,
        );
        for (const captain of captains)
          await connect(captain, code, captain.language);
      } else {
        for (const captain of captains) {
          const clue =
            question.association.hints[captain.state.association.team];
          send(captain, {
            type: "associationClue",
            questionId: question.id,
            clue,
          });
          await until(
            () =>
              captain.state.association.teams[captain.state.association.team]
                .clue,
          );
          await error(captain, "ALREADY_CLUED", {
            type: "associationClue",
            questionId: question.id,
            clue,
          });
          await error(captain, "ASSOCIATION_GUESSER_ONLY", {
            type: "answer",
            questionId: question.id,
            value: targets(question, captain.state.association.team),
          });
          roundPoints.set(captain.id, 1000);
        }
      }
      for (const p of eligible) {
        values.set(p.id, targets(question, p.state.association.team));
        roundPoints.set(p.id, 1000);
      }
    } else if (game === "drawing") {
      const artist = players.find((p) => p.state.drawing.artistId === p.id);
      eligible = players.filter((p) => p !== artist);
      assert.equal(artist.id, players[round % count].id);
      for (const p of players)
        assert.deepEqual(
          p.state.drawing.word,
          p === artist ? question.drawing.word : undefined,
        );
      await error(eligible[0], "WRONG_GUESS", {
        type: "answer",
        questionId: question.id,
        value: "wrong public guess",
      });
      await until(() =>
        players.every((p) =>
          p.state.drawing.chat.some((c) => c.text === "wrong public guess"),
        ),
      );
      await error(artist, "SECRET_WORD_HIDDEN", {
        type: "drawChat",
        questionId: question.id,
        text: `Answer: ${question.drawing.word.en}!`,
      });
      for (const p of eligible) {
        values.set(p.id, question.drawing.word[p.language]);
        roundPoints.set(p.id, 1000);
      }
      roundPoints.set(artist.id, 1000);
    } else {
      players.forEach((p, i) => {
        const correct =
          mode === "mixed" || (adaptiveTest ? round % 2 === 0 : i < 2);
        const number = correct
          ? Number(question.answer)
          : Number(question.answer) * 2 + 1;
        const value = numeric(game)
          ? String(number).replace(".", p.language === "de" ? "," : ".")
          : game === "order"
            ? correct
              ? question.answer
              : String(question.answer).split(",").reverse().join(",")
            : correct
              ? question.answer
              : question.options.find((o) => o.id !== question.answer).id;
        values.set(p.id, String(value));
        roundPoints.set(
          p.id,
          game === "estimate"
            ? Math.max(
                0,
                Math.round(
                  1000 *
                    (1 -
                      Math.abs(number - question.answer) /
                        Math.max(Math.abs(question.answer), 1)),
                ),
              )
            : correct
              ? 1000
              : 0,
        );
      });
    }
    const last = eligible.at(-1),
      before = eligible.slice(0, -1);
    for (const p of before)
      send(p, {
        type: "answer",
        questionId: question.id,
        value: values.get(p.id),
      });
    await until(
      () =>
        before.every((p) => p.state.me.answer !== undefined) &&
        players.every(
          (p) =>
            p.state.players.filter((row) => row.answered).length ===
            before.length,
        ),
    );
    for (const p of players) {
      assert.equal(p.state.phase, "question");
      assert.equal(p.state.endsAt, deadline);
      assert.equal(p.state.reveal, undefined);
      assert.equal(
        p.state.players.filter((row) => row.answered).length,
        before.length,
      );
      assert.equal(p.state.players.length, count);
    }
    if (before.length) {
      const target = before[0],
        locked = target.state.me.answer;
      const nextLanguage = target.language === "de" ? "en" : "de";
      send(target, { type: "language", language: nextLanguage });
      await until(
        () => target.state.question.prompt === question.prompt[nextLanguage],
      );
      target.language = nextLanguage;
      assert.equal(target.state.endsAt, deadline);
      assert.equal(target.state.me.answer, locked);
      await error(target, "ALREADY_ANSWERED", {
        type: "answer",
        questionId: question.id,
        value: values.get(target.id),
      });
      if (round === 1) {
        target.ws.close();
        await connect(target, code, target.language);
        assert.equal(target.state.me.answer, locked);
      }
    }
    if (game === "drawing")
      for (const p of players)
        for (const c of p.state.drawing.chat)
          if (c.kind === "correct") assert.equal(c.text, undefined);
    const submittedAt = Date.now();
    send(last, {
      type: "answer",
      questionId: question.id,
      value: values.get(last.id),
    });
    await until(
      () =>
        players.every(
          (p) => p.state.phase === "reveal" && p.state.round === round,
        ),
      5000,
    );
    assert(host.state.endsAt <= submittedAt + 11_000);
    assert(host.state.endsAt < deadline + 10_000);
    for (let i = 0; i < count; i++) {
      scores[i] += roundPoints.get(players[i].id);
      assert.equal(players[i].state.me.score, scores[i]);
      const solution =
        game === "association"
          ? targets(question, players[i].state.association.team)
          : game === "drawing"
            ? question.drawing.word[
                players[i].state.question.prompt === question.prompt.de
                  ? "de"
                  : "en"
              ]
            : question.answer;
      assert.equal(players[i].state.reveal.answer, solution);
      assert.equal(players[i].state.reveal.scores.length, count);
    }
    if (game === "association") {
      teamScores.green += 1000;
      if (count >= 4) teamScores.purple += 1000;
    }
    if (game === "association")
      for (const p of players) {
        assert(p.state.association.key);
        assert.equal(p.state.association.teams.green.score, teamScores.green);
        if (count >= 4)
          assert.equal(
            p.state.association.teams.purple.score,
            teamScores.purple,
          );
      }
    checks.push({
      round: round + 1,
      category: game,
      questionId: question.id,
      difficulty: question.difficulty,
      nextDifficulty: host.state.adaptation.nextDifficulty,
      successCount: host.state.adaptation.successCount,
      eligibleCount: host.state.adaptation.eligibleCount,
      deadline,
      revealDeadline: host.state.endsAt,
      hostScore: scores[0],
    });
    console.log(
      JSON.stringify({
        mode,
        game,
        code,
        round: round + 1,
        players: count,
        score: scores[0],
      }),
    );
  }
  await until(
    () =>
      players.every(
        (p) =>
          p.state.phase === "results" && !p.state.saving && !p.state.saveError,
      ),
    20000,
  );
  if (mode === "mixed") assert.equal(seen.size, 6);
  const board = await request("/api/leaderboard");
  for (let i = 0; i < count; i++) {
    assert.equal(
      host.state.results.find((row) => row.id === players[i].id).score,
      scores[i],
    );
    const entry = board.weekly.find((row) => row.id === players[i].id);
    if (entry) assert.equal(entry.score, scores[i]);
  }
  report.push({
    category: mode,
    code,
    players: count,
    checks,
    scores,
    playerIds: players.map((p) => p.id),
  });
  for (const p of players) p.ws.close();
  console.log(
    `PASS ${mode}: ${count} players, six early-reveal rounds, privacy, rotation, locale, reconnect and durable results`,
  );
}
try {
  const runs = modes.map((mode) => [mode, playerCount]);
  if (modes.includes("association"))
    for (const count of [2, 4])
      if (count !== playerCount) runs.push(["association", count]);
  if (modes.includes("drawing") && playerCount !== 2) runs.push(["drawing", 2]);
  const outcomes = await Promise.allSettled(
    runs.map(([mode, count]) => run(mode, count)),
  );
  const failures = outcomes.flatMap((result, index) =>
    result.status === "rejected"
      ? [{ scenario: runs[index], error: String(result.reason) }]
      : [],
  );
  if (failures.length) throw new Error(JSON.stringify(failures));
  fs.mkdirSync("test-results", { recursive: true });
  fs.writeFileSync(
    "test-results/protocol.json",
    JSON.stringify(
      { time: new Date().toISOString(), reports: report },
      null,
      2,
    ),
  );
} catch (error) {
  fs.mkdirSync("test-results", { recursive: true });
  fs.writeFileSync(
    "test-results/protocol-partial.json",
    JSON.stringify(
      { time: new Date().toISOString(), error: String(error), reports: report },
      null,
      2,
    ),
  );
  console.error(error);
  process.exitCode = 1;
  setTimeout(() => process.exit(1), 1000);
}
