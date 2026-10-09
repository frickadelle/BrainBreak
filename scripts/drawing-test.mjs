import assert from "node:assert/strict";
import WebSocket from "ws";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function until(check, timeout = 15000) {
  const deadline = Date.now() + timeout;
  while (!check()) {
    if (Date.now() >= deadline) throw new Error("Drawing test timed out");
    await sleep(100);
  }
}

export async function runDrawing(base, count, packages) {
  const request = async (path, body, token) => {
    const response = await fetch(base + path, {
      method: body ? "POST" : "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const value = await response.json();
    assert.equal(response.status, 200, JSON.stringify(value));
    return value;
  };
  const players = [];
  for (let i = 0; i < count; i++)
    players.push(await request("/api/identity", {}));
  const { code } = await request(
    "/api/rooms",
    { name: "QA drawing 01" },
    players[0].token,
  );
  for (let i = 1; i < count; i++)
    await request(
      `/api/rooms/${code}/join`,
      { name: `QA drawing ${String(i + 1).padStart(2, "0")}` },
      players[i].token,
    );
  const send = (player, message) => player.ws.send(JSON.stringify(message));
  const connect = async (player, language) => {
    player.errors = [];
    player.language = language;
    player.state = null;
    const socket = new WebSocket(
      base.replace(/^http/, "ws") + `/api/rooms/${code}/socket`,
      { origin: base },
    );
    player.ws = socket;
    socket.on("message", (raw) => {
      if (raw.toString() === "pong") return;
      const message = JSON.parse(raw.toString());
      if (message.type === "state") player.state = message.state;
      else if (message.type === "error") player.errors.push(message.code);
      else if (
        message.type === "drawing" &&
        player.state?.question?.id === message.questionId
      ) {
        const board = player.state.drawing;
        assert.equal(message.revision, board.revision + 1);
        board.revision = message.revision;
        board.strokes = message.clear ? [] : [...board.strokes, message.stroke];
      }
    });
    await new Promise((resolve, reject) => {
      socket.once("open", resolve);
      socket.once("error", reject);
    });
    send(player, { type: "auth", token: player.token, language });
    await until(() => player.state?.me.id === player.id);
  };
  const errors = async (player, code, action) => {
    const previous = player.errors.length;
    send(player, action);
    await until(() => player.errors.slice(previous).includes(code));
  };
  await Promise.all(players.map((p, i) => connect(p, i % 2 ? "en" : "de")));
  const host = players[0];
  await until(
    () => host.state.players.filter((p) => p.connected).length === count,
  );
  await errors(players[1], "HOST_ONLY", { type: "start" });
  send(host, { type: "start" });
  await until(() => host.state.phase === "voting");
  for (const player of players.slice(0, -1))
    send(player, { type: "vote", category: "drawing" });
  await until(() => host.state.votes.drawing === count - 1);
  assert.equal(host.state.phase, "voting");
  const voteDeadline = host.state.endsAt;
  host.ws.close();
  const finalVoteAt = Date.now();
  send(players.at(-1), { type: "vote", category: "drawing" });
  await until(() => players[1].state.phase === "question", 5000);
  assert(players[1].state.endsAt >= finalVoteAt + 44_000);
  assert(players[1].state.endsAt < voteDeadline + 45_000);
  await connect(host, "de");
  const pack = packages.find((p) => p.id === host.state.pack.id);
  const scores = players.map(() => 0);
  const checks = [];
  for (let round = 0; round < 6; round++) {
    await until(
      () =>
        players.every(
          (p) => p.state.phase === "question" && p.state.round === round,
        ),
      65000,
    );
    const question = pack.questions.drawing.find(
      (q) => q.id === host.state.question.id,
    );
    assert(question);
    assert(!checks.some((check) => check.questionId === question.id));
    assert.equal(question.difficulty, round === 0 ? "medium" : "hard");
    const artist = players.find((p) => p.id === host.state.drawing.artistId);
    const guessers = players.filter((p) => p !== artist);
    assert.equal(artist.id, players[round % count].id);
    const deadline = host.state.endsAt;
    for (const player of players) {
      assert.equal(player.state.question.id, question.id);
      assert.equal(player.state.endsAt, deadline);
      assert.equal(player.state.reveal, undefined);
      assert.equal(player.state.question.answer, undefined);
      assert.equal(player.state.question.drawing, undefined);
      if (player === artist)
        assert.deepEqual(player.state.drawing.word, question.drawing.word);
      else {
        assert.equal(player.state.drawing.word, undefined);
        assert.equal(player.state.question.options, undefined);
        assert.equal(player.state.question.explanation, undefined);
      }
    }
    const stroke = {
      id: `stroke-${round}`,
      color: "#273b32",
      width: 0.008,
      points: [
        { x: 0.1, y: 0.2 },
        { x: 0.4, y: 0.5 },
      ],
    };
    await errors(guessers[0], "ARTIST_ONLY", {
      type: "draw",
      questionId: question.id,
      timestamp: Date.now(),
      stroke,
    });
    send(artist, {
      type: "draw",
      questionId: question.id,
      timestamp: Date.now(),
      stroke,
    });
    await until(() => players.every((p) => p.state.drawing.revision === 1));
    for (const player of players)
      assert.deepEqual(player.state.drawing.strokes, [stroke]);
    await sleep(400);
    send(artist, {
      type: "drawClear",
      questionId: question.id,
      timestamp: Date.now(),
    });
    await until(() =>
      players.every(
        (p) =>
          p.state.drawing.revision === 2 &&
          p.state.drawing.strokes.length === 0,
      ),
    );
    await sleep(400);
    stroke.id = `replacement-${round}`;
    send(artist, {
      type: "draw",
      questionId: question.id,
      timestamp: Date.now(),
      stroke,
    });
    await until(() => players.every((p) => p.state.drawing.revision === 3));
    await errors(artist, "GUESSER_ONLY", {
      type: "answer",
      questionId: question.id,
      value: question.drawing.word.en,
    });
    const otherGuesser = guessers[1] ?? artist;
    const otherGuesserErrorCount = otherGuesser.errors.length;
    await errors(guessers[0], "WRONG_GUESS", {
      type: "answer",
      questionId: question.id,
      value: "wrong private guess",
    });
    assert.equal(guessers[0].state.me.answer, undefined);
    assert(
      !otherGuesser.errors
        .slice(otherGuesserErrorCount)
        .includes("WRONG_GUESS"),
    );
    await until(() =>
      players.every((p) =>
        p.state.drawing.chat.some(
          (entry) => entry.text === "wrong private guess",
        ),
      ),
    );
    await errors(artist, "SECRET_WORD_HIDDEN", {
      type: "drawChat",
      questionId: question.id,
      text: `The answer is ${question.drawing.word.en}!`,
    });
    const last = guessers.at(-1),
      before = guessers.slice(0, -1);
    for (const guesser of before)
      send(guesser, {
        type: "answer",
        questionId: question.id,
        value: question.drawing.word[guesser.language],
      });
    await until(
      () =>
        before.every((p) => p.state.me.answer === question.answer) &&
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
      assert(p.state.players.every((row) => !("answer" in row)));
    }
    assert.equal(artist.state.me.answer, undefined);
    const target = before[0];
    if (target) {
      const nextLanguage = target.language === "de" ? "en" : "de";
      send(target, { type: "language", language: nextLanguage });
      await until(
        () => target.state.question.prompt === question.prompt[nextLanguage],
      );
      target.language = nextLanguage;
      assert.equal(target.state.me.answer, question.answer);
      assert.equal(target.state.endsAt, deadline);
      await errors(target, "ALREADY_ANSWERED", {
        type: "answer",
        questionId: question.id,
        value: question.drawing.word.en,
      });
    }
    for (const p of players)
      for (const entry of p.state.drawing.chat)
        if (entry.kind === "correct") assert.equal(entry.text, undefined);
    if (round === 1) {
      artist.ws.close();
      await sleep(100);
      await connect(artist, artist.language);
      assert.deepEqual(artist.state.drawing.strokes, [stroke]);
      assert.deepEqual(artist.state.drawing.word, question.drawing.word);
      if (target) {
        target.ws.close();
        await connect(target, target.language);
        assert.equal(target.state.me.answer, question.answer);
      }
    }
    if (round === 2) artist.ws.close();
    const submittedAt = Date.now();
    send(last, {
      type: "answer",
      questionId: question.id,
      value: question.drawing.word[last.language],
    });
    await until(() => last.state.phase === "reveal", 5000);
    if (round === 2) await connect(artist, artist.language);
    assert(artist.state.endsAt <= submittedAt + 11_000);
    assert(artist.state.endsAt < deadline + 10_000);
    await until(
      () =>
        players.every(
          (p) => p.state.phase === "reveal" && p.state.round === round,
        ),
      50000,
    );
    for (let i = 0; i < count; i++) {
      scores[i] += 1000;
      assert.equal(players[i].state.me.score, scores[i]);
      assert.equal(
        players[i].state.reveal.answer,
        question.drawing.word[
          players[i].state.question.prompt === question.prompt.de ? "de" : "en"
        ],
      );
      assert.equal(
        players[i].state.reveal.scores.find((s) => s.playerId === artist.id)
          .points,
        1000,
      );
    }
    checks.push({
      round: round + 1,
      questionId: question.id,
      artistId: artist.id,
      deadline,
      hostScore: host.state.me.score,
      difficulty: question.difficulty,
      nextDifficulty: host.state.adaptation.nextDifficulty,
      successCount: host.state.adaptation.successCount,
      eligibleCount: host.state.adaptation.eligibleCount,
    });
    console.log(
      JSON.stringify({
        category: "drawing",
        code,
        round: round + 1,
        players: count,
        score: host.state.me.score,
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
  const board = await request("/api/leaderboard");
  for (let i = 0; i < count; i++) {
    assert.equal(
      host.state.results.find((r) => r.id === players[i].id).score,
      scores[i],
    );
    const entry = board.weekly.find((r) => r.id === players[i].id);
    if (entry) assert.equal(entry.score, scores[i]);
  }
  for (const player of players) player.ws.close();
  console.log(
    `PASS drawing: ${count} authenticated players, six early-reveal rounds, private words/redacted correct guesses, artist permissions, stroke replay, language changes, reconnection and D1 results`,
  );
  return {
    category: "drawing",
    code,
    players: count,
    checks,
    scores,
    playerIds: players.map((p) => p.id),
  };
}
