import type {
  ClientMessage,
  ErrorCode,
  Language,
  DrawingStroke,
  ServerMessage,
} from "../shared/types";
import { validGeoQuestion } from "./geography";
import { packages } from "./content/index";
import {
  authenticate,
  errorResponse,
  json,
  leaderboards,
  type Env,
} from "./index";
import {
  chooseMode,
  availableModes,
  roundEligible,
  containsDrawingSecret,
  currentQuestion,
  beginRound,
  finishRound,
  initializeDrawing,
  initializeAssociation,
  matchesDrawingWord,
  normalizedStroke,
  availableCategories,
  LOBBY_TTL_MS,
  parseAnswer,
  pointsFor,
  QUESTION_MS,
  RESULTS_TTL_MS,
  REVEAL_MS,
  roomView,
  selectPackage,
  validName,
  voteCounts,
  VOTE_MS,
  type RoomState,
} from "./game";

import {
  TEAMS,
  associationTeam,
  associationEvaluation,
  normalizeAssociationGuess,
  settleAssociationClues,
  validAssociationClue,
} from "./association";

interface Connection {
  playerId?: string;
  language: Language;
  createdAt: number;
  window: number;
  count: number;
}
class ActionError extends Error {
  constructor(public code: ErrorCode) {
    super(code);
  }
}
export class BrainbreakRoom {
  private state: RoomState | undefined;
  private queue: Promise<unknown> = Promise.resolve();
  constructor(
    private ctx: DurableObjectState,
    private env: Env,
  ) {
    if (typeof WebSocketRequestResponsePair !== "undefined")
      ctx.setWebSocketAutoResponse(
        new WebSocketRequestResponsePair("ping", "pong"),
      );
    ctx.blockConcurrencyWhile(async () => {
      this.state = await ctx.storage.get<RoomState>("room");
    });
  }
  private ordered<T>(work: () => Promise<T>): Promise<T> {
    const next = this.queue.then(work);
    this.queue = next.catch(() => undefined);
    return next;
  }
  fetch(request: Request): Promise<Response> {
    return this.ordered(async () => {
      try {
        const path = new URL(request.url).pathname;
        if (path === "/internal/create") {
          if (this.state) return json({ error: "INVALID_CODE" }, 409);
          const { id, name, code } = (await request.json()) as {
            id: string;
            name: string;
            code: string;
          };
          const now = Date.now();
          const browserKey = this.env.GOOGLE_MAPS_BROWSER_KEY?.trim();
          const configured = packages.map((pack) => {
            const questions =
              pack.questions.geography?.filter(validGeoQuestion) ?? [];
            return {
              ...pack,
              questions: {
                ...pack.questions,
                geography: browserKey && questions.length >= 6 ? questions : [],
              },
            };
          });
          const selected = selectPackage(configured);
          this.state = {
            code,
            sessionId: crypto.randomUUID(),
            hostId: id,
            createdAt: now,
            expiresAt: now + LOBBY_TTL_MS,
            phase: "lobby",
            endsAt: null,
            round: 0,
            ...selected,
            players: { [id]: { id, name, score: 0 } },
            answers: {},
            dirty: true,
            saveError: false,
          };
          await this.persist();
          await this.flush();
          return json({ code });
        }
        if (!this.state) return errorResponse("ROOM_NOT_FOUND", 404);
        if (Date.now() >= this.state.expiresAt)
          return errorResponse("ROOM_EXPIRED", 410);
        await this.advance();
        if (path === "/internal/status")
          return json({ code: this.state.code, phase: this.state.phase });
        if (path === "/internal/join") {
          const { id, name } = (await request.json()) as {
            id: string;
            name: string;
          };
          if (!validName(name)) return errorResponse("INVALID_NAME");
          if (!this.state.players[id]) {
            if (this.state.phase !== "lobby")
              return errorResponse("GAME_STARTED", 409);
            if (Object.keys(this.state.players).length >= 30)
              return errorResponse("ROOM_FULL", 409);
            this.state.players[id] = { id, name: name.trim(), score: 0 };
            this.state.dirty = true;
            await this.persist();
            await this.flush();
            this.broadcast();
          }
          return json({ code: this.state.code });
        }
        if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket")
          return errorResponse("INVALID_REQUEST", 426);
        if (this.ctx.getWebSockets().length >= 90)
          return errorResponse("RATE_LIMITED", 429);
        const pair = new WebSocketPair();
        const [client, server] = Object.values(pair);
        this.ctx.acceptWebSocket(server);
        const now = Date.now();
        server.serializeAttachment({
          language: "de",
          createdAt: now,
          window: now,
          count: 0,
        } satisfies Connection);
        await this.schedule();
        return new Response(null, { status: 101, webSocket: client });
      } catch {
        return errorResponse("STORAGE_ERROR", 503);
      }
    });
  }
  webSocketMessage(
    socket: WebSocket,
    raw: string | ArrayBuffer,
  ): Promise<void> {
    return this.ordered(async () => {
      try {
        if (!this.state) throw new ActionError("ROOM_NOT_FOUND");
        if (Date.now() >= this.state.expiresAt)
          throw new ActionError("ROOM_EXPIRED");
        if (typeof raw !== "string" || raw.length > 2048)
          throw new ActionError("INVALID_REQUEST");
        const connection = socket.deserializeAttachment() as Connection;
        const now = Date.now();
        if (now - connection.window >= 10_000) {
          connection.window = now;
          connection.count = 0;
        }
        if (++connection.count > 40) throw new ActionError("RATE_LIMITED");
        socket.serializeAttachment(connection);
        const message = JSON.parse(raw) as ClientMessage;
        if (!message || typeof message !== "object")
          throw new ActionError("INVALID_REQUEST");
        if (!connection.playerId) {
          if (message.type !== "auth" || now >= connection.createdAt + 10_000)
            throw new ActionError("UNAUTHORIZED");
          if (message.language !== "de" && message.language !== "en")
            throw new ActionError("INVALID_REQUEST");
          const id = await authenticate(this.env.DB, message.token);
          if (!id || !this.state.players[id])
            throw new ActionError("UNAUTHORIZED");
          if (
            this.ctx
              .getWebSockets()
              .filter(
                (other) =>
                  (other.deserializeAttachment() as Connection).playerId === id,
              ).length >= 3
          )
            throw new ActionError("RATE_LIMITED");
          connection.playerId = id;
          connection.language = message.language;
          socket.serializeAttachment(connection);
          await this.advance();
          this.broadcast();
          await this.schedule();
          return;
        }
        await this.settleClues();
        const player = this.state.players[connection.playerId];
        const deadlinePassed =
          this.state.endsAt !== null && Date.now() >= this.state.endsAt;
        const advancedAtDeadline = deadlinePassed
          ? await this.advance()
          : false;
        switch (message.type) {
          case "language":
            if (message.language !== "de" && message.language !== "en")
              throw new ActionError("INVALID_REQUEST");
            connection.language = message.language;
            socket.serializeAttachment(connection);
            break;
          case "sync": {
            const advanced = advancedAtDeadline || (await this.advance());
            if (this.state.dirty && !advanced) await this.flush();
            break;
          }
          case "start":
            if (player.id !== this.state.hostId)
              throw new ActionError("HOST_ONLY");
            if (this.state.phase !== "lobby")
              throw new ActionError("WRONG_PHASE");
            if (this.connectedPlayers().size < 2)
              throw new ActionError("NOT_ENOUGH_PLAYERS");
            this.state.phase = "voting";
            this.state.endsAt = Date.now() + VOTE_MS;
            this.state.expiresAt = Date.now() + LOBBY_TTL_MS;
            this.state.dirty = true;
            await this.persist();
            await this.flush();
            break;
          case "vote":
            if (deadlinePassed) throw new ActionError("TOO_LATE");
            if (this.state.phase !== "voting")
              throw new ActionError("WRONG_PHASE");
            if (
              !availableModes(
                this.state.pack,
                Object.keys(this.state.players).length,
              ).includes(message.category)
            )
              throw new ActionError("INVALID_REQUEST");
            player.vote = message.category;
            if (this.allVoted()) {
              // Final vote and selected round commit together; D1 retries cannot redraw the game.
              this.finishVoting(Date.now());
              this.state.dirty = true;
              await this.persist();
              await this.flush();
            } else await this.persist();
            break;
          case "drawChat": {
            if (deadlinePassed) throw new ActionError("TOO_LATE");
            if (
              this.state.phase !== "question" ||
              this.state.category !== "drawing" ||
              !this.state.drawing
            )
              throw new ActionError("WRONG_PHASE");
            const question = currentQuestion(this.state)!;
            if (message.questionId !== question.id)
              throw new ActionError("INVALID_REQUEST");
            if (
              this.state.drawing.artistId !== player.id &&
              !this.state.answers[question.id]?.[player.id]
            )
              throw new ActionError("GUESSER_ONLY");
            if (
              typeof message.text !== "string" ||
              !message.text.trim() ||
              message.text.trim().length > 160 ||
              /[\u0000-\u001f\u007f]/.test(message.text)
            )
              throw new ActionError("INVALID_CHAT");
            if (containsDrawingSecret(question, message.text))
              throw new ActionError("SECRET_WORD_HIDDEN");
            this.appendChat(player.id, "message", message.text.trim());
            await this.persist();
            break;
          }
          case "associationClue": {
            if (
              this.state.phase !== "question" ||
              this.state.category !== "association" ||
              !this.state.association
            )
              throw new ActionError("WRONG_PHASE");
            const question = currentQuestion(this.state)!;
            const round = this.state.association;
            if (message.questionId !== question.id)
              throw new ActionError("INVALID_REQUEST");
            const team = round.teams[associationTeam(round, player.id)];
            if (team.captainId !== player.id)
              throw new ActionError("ASSOCIATION_CLUE_ONLY");
            if (Date.now() >= round.clueEndsAt)
              throw new ActionError("CLUE_TOO_LATE");
            if (team.clue) throw new ActionError("ALREADY_CLUED");
            if (!validAssociationClue(question, message.clue))
              throw new ActionError("INVALID_CLUE");
            team.clue = { de: message.clue.de, en: message.clue.en };
            team.automatic = false;
            await this.persist();
            break;
          }
          case "draw":
          case "drawClear": {
            if (deadlinePassed) throw new ActionError("TOO_LATE");
            if (
              this.state.phase !== "question" ||
              this.state.category !== "drawing" ||
              !this.state.drawing
            )
              throw new ActionError("WRONG_PHASE");
            const drawing = this.state.drawing;
            if (drawing.artistId !== player.id)
              throw new ActionError("ARTIST_ONLY");
            if (
              message.questionId !== drawing.questionId ||
              !Number.isInteger(message.timestamp) ||
              Math.abs(Date.now() - message.timestamp) > 10_000
            )
              throw new ActionError("INVALID_REQUEST");
            let stroke: DrawingStroke | undefined;
            if (message.type === "draw") {
              const validated = normalizedStroke(message.stroke);
              if (!validated) throw new ActionError("INVALID_REQUEST");
              if (drawing.seenIds.includes(validated.id)) {
                this.send(socket, {
                  type: "state",
                  state: roomView(
                    this.state,
                    player.id,
                    connection.language,
                    this.connectedPlayers(),
                    undefined,
                    this.env.GOOGLE_MAPS_BROWSER_KEY,
                  ),
                });
                return;
              }
              stroke = validated;
              if (
                drawing.pointCount + stroke.points.length > 2400 ||
                drawing.seenIds.length >= 135
              )
                throw new ActionError("RATE_LIMITED");
            }
            if (Date.now() - drawing.lastStrokeAt < 334)
              throw new ActionError("RATE_LIMITED");
            drawing.lastStrokeAt = Date.now();
            drawing.revision++;
            if (stroke) {
              drawing.strokes.push(stroke);
              drawing.seenIds.push(stroke.id);
              drawing.pointCount += stroke.points.length;
            } else drawing.strokes = [];
            await this.persist();
            const delta: ServerMessage = {
              type: "drawing",
              questionId: drawing.questionId,
              revision: drawing.revision,
              ...(stroke ? { stroke } : { clear: true }),
            };
            for (const other of this.ctx.getWebSockets())
              if ((other.deserializeAttachment() as Connection).playerId)
                this.send(other, delta);
            return;
          }
          case "answer": {
            if (deadlinePassed) throw new ActionError("TOO_LATE");
            if (this.state.phase !== "question" || !this.state.category)
              throw new ActionError("WRONG_PHASE");
            const question = currentQuestion(this.state)!;
            if (message.questionId !== question.id)
              throw new ActionError("INVALID_ANSWER");
            if (this.state.answers[question.id]?.[player.id])
              throw new ActionError("ALREADY_ANSWERED");
            if (
              typeof message.value !== "string" ||
              message.value.length >
                (question.category === "geography" ? 128 : 40)
            )
              throw new ActionError("INVALID_ANSWER");
            let value: string | number | null;
            if (question.category === "association") {
              const round = this.state.association!;
              const team = round.teams[associationTeam(round, player.id)];
              if (team.captainId === player.id)
                throw new ActionError("ASSOCIATION_GUESSER_ONLY");
              if (!team.clue) throw new ActionError("WAIT_FOR_CLUE");
              value = normalizeAssociationGuess(question, message.value);
            } else if (question.category === "drawing") {
              if (this.state.drawing?.artistId === player.id)
                throw new ActionError("GUESSER_ONLY");
              if (!matchesDrawingWord(question, message.value)) {
                if (
                  !message.value.trim() ||
                  /[\u0000-\u001f\u007f]/.test(message.value)
                )
                  throw new ActionError("INVALID_ANSWER");
                if (containsDrawingSecret(question, message.value))
                  throw new ActionError("SECRET_WORD_HIDDEN");
                this.appendChat(player.id, "message", message.value.trim());
                await this.persist();
                this.broadcast();
                throw new ActionError("WRONG_GUESS");
              }
              this.appendChat(player.id, "correct");
              value = question.answer;
            } else
              value = parseAnswer(question, message.value, connection.language);
            if (value === null) throw new ActionError("INVALID_ANSWER");
            (this.state.answers[question.id] ??= {})[player.id] = {
              value,
              points: 0,
            };
            const previouslyDirty = this.state.dirty;
            this.state.dirty = true;
            if (this.allAnswered()) {
              // The final answer, points and reveal phase share one atomic durable journal commit.
              this.finishQuestion(Math.min(this.state.endsAt!, Date.now()));
              await this.persist();
              await this.flush();
            } else {
              // The durable journal commits before acknowledgement; D1 retries independently.
              await this.persist();
              await this.flushAnswer(question.id, player.id, previouslyDirty);
            }
            break;
          }
          default:
            throw new ActionError("INVALID_REQUEST");
        }
        this.broadcast();
      } catch (error) {
        this.send(socket, {
          type: "error",
          code:
            error instanceof ActionError
              ? error.code
              : error instanceof SyntaxError
                ? "INVALID_REQUEST"
                : "STORAGE_ERROR",
        });
      }
    });
  }
  webSocketClose(
    socket: WebSocket,
    code: number,
    reason: string,
  ): Promise<void> {
    return this.ordered(async () => {
      try {
        socket.close(code, reason);
      } catch {}
      this.broadcast();
      await this.schedule();
    });
  }
  webSocketError(socket: WebSocket): Promise<void> {
    return this.webSocketClose(socket, 1011, "Connection error");
  }
  alarm(): Promise<void> {
    return this.ordered(async () => {
      if (!this.state) return;
      const now = Date.now();
      for (const socket of this.ctx.getWebSockets()) {
        const c = socket.deserializeAttachment() as Connection;
        if (!c.playerId && now >= c.createdAt + 10_000)
          socket.close(1008, "Authentication required");
      }
      if (now >= this.state.expiresAt) {
        for (const socket of this.ctx.getWebSockets())
          socket.close(1000, "Room expired");
        await this.ctx.storage.deleteAlarm();
        return;
      }
      const advanced = await this.advance();
      if (this.state.dirty && !advanced) await this.flush();
      await this.schedule();
      this.broadcast();
    });
  }
  private async advance(): Promise<boolean> {
    if (!this.state) return false;
    await this.settleClues();
    let changed = false;
    if (this.allVoted() && Date.now() < this.state.endsAt!) {
      this.finishVoting(Date.now());
      changed = true;
    }
    if (this.allAnswered()) {
      this.finishQuestion(Math.min(this.state.endsAt!, Date.now()));
      changed = true;
    }
    while (this.state.endsAt !== null && Date.now() >= this.state.endsAt) {
      const deadline = this.state.endsAt;
      if (this.state.phase === "voting") {
        this.finishVoting(deadline);
      } else if (this.state.phase === "question") {
        this.finishQuestion(deadline);
      } else if (this.state.phase === "reveal") {
        if (this.state.round === 5) {
          this.state.phase = "results";
          this.state.endsAt = null;
          this.state.expiresAt = Date.now() + RESULTS_TTL_MS;
        } else {
          this.state.round++;
          this.state.phase = "question";
          this.state.endsAt = deadline + QUESTION_MS;
          beginRound(this.state);
          initializeDrawing(this.state);
          initializeAssociation(this.state);
        }
      } else break;
      changed = true;
    }
    if (changed) {
      this.state.dirty = true;
      await this.persist();
      await this.flush();
      this.broadcast();
    }
    return changed;
  }
  private allVoted(): boolean {
    if (!this.state || this.state.phase !== "voting") return false;
    const roster = Object.values(this.state.players);
    return (
      roster.length >= 2 && roster.every((player) => player.vote !== undefined)
    );
  }
  private finishVoting(deadline: number): void {
    if (!this.state || this.state.phase !== "voting") return;
    this.state.mode = chooseMode(
      voteCounts(this.state),
      availableModes(this.state.pack, Object.keys(this.state.players).length),
    );
    this.state.category =
      this.state.mode === "mixed" ? undefined : this.state.mode;
    this.state.phase = "question";
    this.state.endsAt = deadline + QUESTION_MS;
    beginRound(this.state);
    initializeDrawing(this.state);
    initializeAssociation(this.state);
  }
  private allAnswered(): boolean {
    if (!this.state || this.state.phase !== "question") return false;
    const question = currentQuestion(this.state);
    const eligible = roundEligible(this.state);
    return Boolean(
      question &&
      eligible.length &&
      eligible.every((id) => this.state!.answers[question.id]?.[id]),
    );
  }
  private appendChat(
    playerId: string,
    kind: "message" | "correct",
    text?: string,
  ): void {
    const drawing = this.state!.drawing!;
    (drawing.chat ??= []).push({
      id: crypto.randomUUID(),
      playerId,
      timestamp: Date.now(),
      kind,
      ...(text !== undefined ? { text } : {}),
    });
    if (drawing.chat.length > 100)
      drawing.chat.splice(0, drawing.chat.length - 100);
  }
  private finishQuestion(deadline: number): void {
    if (!this.state || this.state.phase !== "question") return;
    const question = currentQuestion(this.state)!;
    let associationPoints: Record<string, number> | undefined;
    if (question.category === "association" && this.state.association) {
      settleAssociationClues(question, this.state.association, Date.now());
      const answers = (this.state.answers[question.id] ??= {});
      const evaluation = associationEvaluation(
        question,
        this.state.association,
        answers,
      );
      associationPoints = evaluation.points;
      for (const team of TEAMS) {
        const captainId = this.state.association.teams[team].captainId;
        if (captainId)
          answers[captainId] = {
            value: "association-captain",
            points: evaluation.points[captainId],
          };
      }
      if (
        !this.state.associationHistory!.some(
          (row) => row.questionId === question.id,
        )
      ) {
        for (const team of TEAMS)
          this.state.associationScores![team] += evaluation.roundScores[team];
        this.state.associationHistory!.push({
          questionId: question.id,
          roundScores: evaluation.roundScores,
        });
      }
    }
    let artistId: string | undefined;
    let artistPoints = 0;
    if (question.category === "drawing") {
      artistId = this.state.drawingArtists?.[question.id];
      const roundAnswers = (this.state.answers[question.id] ??= {});
      artistPoints = Object.entries(roundAnswers).some(
        ([id, a]) => id !== artistId && a.value === question.answer,
      )
        ? 1000
        : 0;
      if (artistId)
        roundAnswers[artistId] = { value: "artist", points: artistPoints };
    }
    for (const [id, answer] of Object.entries(
      this.state.answers[question.id] ?? {},
    )) {
      answer.points = associationPoints
        ? (associationPoints[id] ?? 0)
        : id === artistId
          ? artistPoints
          : pointsFor(question, answer.value);
      this.state.players[id].score += answer.points;
    }
    finishRound(this.state);
    this.state.phase = "reveal";
    this.state.endsAt = deadline + REVEAL_MS;
  }
  private async settleClues(): Promise<void> {
    if (
      !this.state ||
      this.state.phase !== "question" ||
      this.state.category !== "association" ||
      !this.state.association
    )
      return;
    if (
      settleAssociationClues(
        currentQuestion(this.state)!,
        this.state.association,
        Date.now(),
      )
    ) {
      await this.persist();
      this.broadcast();
    }
  }
  private async flushAnswer(
    questionId: string,
    playerId: string,
    previouslyDirty: boolean,
  ): Promise<void> {
    if (!this.state) return;
    try {
      const answer = this.state.answers[questionId][playerId];
      await this.env.DB.prepare(
        "INSERT INTO answers (session_id, player_id, question_id, value_json, points) VALUES (?, ?, ?, ?, ?) ON CONFLICT(session_id, player_id, question_id) DO UPDATE SET value_json=excluded.value_json, points=excluded.points",
      )
        .bind(
          this.state.sessionId,
          playerId,
          questionId,
          JSON.stringify(answer.value),
          answer.points,
        )
        .run();
      if (!previouslyDirty) {
        this.state.dirty = false;
        this.state.saveError = false;
      }
      await this.persist();
    } catch {
      this.state.saveError = true;
      await this.persist();
    }
  }
  private async flush(): Promise<void> {
    if (!this.state) return;
    const s = this.state;
    try {
      const statements = [
        this.env.DB.prepare(
          "INSERT INTO sessions (id, code, host_id, week, package_id, category, phase, created_at, completed_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET category=excluded.category, phase=excluded.phase, completed_at=COALESCE(sessions.completed_at, excluded.completed_at)",
        ).bind(
          s.sessionId,
          s.code,
          s.hostId,
          s.week,
          s.pack.id,
          s.mode ?? s.category ?? null,
          s.phase,
          s.createdAt,
          s.phase === "results" ? Date.now() : null,
        ),
      ];
      for (const player of Object.values(s.players)) {
        statements.push(
          this.env.DB.prepare("UPDATE players SET name = ? WHERE id = ?").bind(
            player.name,
            player.id,
          ),
        );
      }
      const appendRows = (
        table: string,
        columns: string[],
        rows: unknown[][],
        conflict: string,
      ) => {
        const size = Math.floor(100 / columns.length);
        for (let i = 0; i < rows.length; i += size) {
          const chunk = rows.slice(i, i + size);
          const values = chunk
            .map(() => `(${columns.map(() => "?").join(",")})`)
            .join(",");
          statements.push(
            this.env.DB.prepare(
              `INSERT INTO ${table} (${columns.join(",")}) VALUES ${values} ${conflict}`,
            ).bind(...chunk.flat()),
          );
        }
      };
      appendRows(
        "session_players",
        ["session_id", "player_id", "name"],
        Object.values(s.players).map((p) => [s.sessionId, p.id, p.name]),
        "ON CONFLICT(session_id, player_id) DO UPDATE SET name=excluded.name",
      );
      const answerRows: unknown[][] = [];
      for (const [questionId, answers] of Object.entries(s.answers))
        for (const [id, answer] of Object.entries(answers))
          answerRows.push([
            s.sessionId,
            id,
            questionId,
            JSON.stringify(answer.value),
            answer.points,
          ]);
      appendRows(
        "answers",
        ["session_id", "player_id", "question_id", "value_json", "points"],
        answerRows,
        "ON CONFLICT(session_id, player_id, question_id) DO UPDATE SET value_json=excluded.value_json, points=excluded.points",
      );
      if (s.phase === "results")
        appendRows(
          "results",
          ["session_id", "player_id", "score"],
          Object.values(s.players).map((p) => [s.sessionId, p.id, p.score]),
          "ON CONFLICT(session_id, player_id) DO UPDATE SET score=excluded.score",
        );
      await this.env.DB.batch(statements);
      if (s.phase === "results") {
        const boards = await leaderboards(this.env.DB, s.week);
        s.weekly = boards.weekly;
        s.allTime = boards.allTime;
      }
      s.dirty = false;
      s.saveError = false;
    } catch {
      s.dirty = true;
      s.saveError = true;
      console.error("Room D1 snapshot failed; retry scheduled");
    }
    await this.persist();
  }
  private async persist(): Promise<void> {
    if (!this.state) return;
    // Both the journal and its next alarm commit together, including crash recovery.
    try {
      await this.ctx.storage.transaction(async (txn) => {
        await txn.put("room", this.state!);
        await txn.setAlarm(this.nextAlarm());
      });
    } catch (error) {
      this.state = await this.ctx.storage.get<RoomState>("room");
      throw error;
    }
  }
  private nextAlarm(): number {
    const now = Date.now();
    const deadlines = [this.state!.expiresAt];
    if (this.state!.endsAt !== null) deadlines.push(this.state!.endsAt);
    if (
      this.state!.phase === "question" &&
      this.state!.association &&
      this.state!.category === "association" &&
      TEAMS.some(
        (team) =>
          this.state!.association!.teams[team].captainId &&
          !this.state!.association!.teams[team].clue,
      )
    )
      deadlines.push(this.state!.association.clueEndsAt);
    if (this.allAnswered() || this.allVoted()) deadlines.push(now + 1);
    if (this.state!.saveError) deadlines.push(now + 5_000);
    for (const socket of this.ctx.getWebSockets()) {
      const c = socket.deserializeAttachment() as Connection;
      if (!c.playerId) deadlines.push(c.createdAt + 10_000);
    }
    return Math.max(now + 1, Math.min(...deadlines));
  }
  private async schedule(): Promise<void> {
    if (this.state) await this.ctx.storage.setAlarm(this.nextAlarm());
  }
  private send(socket: WebSocket, message: ServerMessage): void {
    try {
      socket.send(JSON.stringify(message));
    } catch {}
  }
  private connectedPlayers(): Set<string> {
    return new Set(
      this.ctx
        .getWebSockets()
        .map(
          (socket) => (socket.deserializeAttachment() as Connection).playerId,
        )
        .filter((id): id is string => Boolean(id && this.state?.players[id])),
    );
  }
  private broadcast(): void {
    if (!this.state) return;
    const sockets = this.ctx.getWebSockets();
    const connected = this.connectedPlayers();
    for (const socket of sockets) {
      const c = socket.deserializeAttachment() as Connection;
      if (c.playerId && this.state.players[c.playerId])
        this.send(socket, {
          type: "state",
          state: roomView(
            this.state,
            c.playerId,
            c.language,
            connected,
            undefined,
            this.env.GOOGLE_MAPS_BROWSER_KEY,
          ),
        });
    }
  }
}
