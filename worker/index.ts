import {
  hashToken,
  isoWeek,
  validName,
  validToken,
  selectPackage,
  availableModes,
} from "./game";
import type { ErrorCode, LeaderboardRow } from "../shared/types";
import { packages } from "./content";
import { validGeoQuestion } from "./geography";
export { BrainbreakRoom } from "./room";
export interface Env {
  GOOGLE_MAPS_BROWSER_KEY?: string;
  DB: D1Database;
  ROOMS: DurableObjectNamespace;
  ASSETS: Fetcher;
}
export const json = (value: unknown, status = 200) =>
  Response.json(value, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
export const errorResponse = (code: ErrorCode, status = 400) =>
  json({ error: code }, status);
export async function authenticate(
  db: D1Database,
  token: unknown,
): Promise<string | null> {
  if (!validToken(token)) return null;
  const row = await db
    .prepare("SELECT id FROM players WHERE token_hash = ?")
    .bind(await hashToken(token))
    .first<{ id: string }>();
  return row?.id ?? null;
}
export async function leaderboards(
  db: D1Database,
  week = isoWeek(),
): Promise<{
  week: string;
  weekly: LeaderboardRow[];
  allTime: LeaderboardRow[];
}> {
  const query = async (weekly: boolean) => {
    const sql = `SELECT p.id, p.name, SUM(r.score) AS score, COUNT(*) AS sessions FROM results r JOIN sessions s ON s.id = r.session_id JOIN players p ON p.id = r.player_id WHERE s.completed_at IS NOT NULL ${weekly ? "AND s.week = ?" : ""} GROUP BY p.id ORDER BY score DESC, p.name, p.id LIMIT 100`;
    const statement = db.prepare(sql);
    const { results } = await (weekly ? statement.bind(week) : statement).all<
      Omit<LeaderboardRow, "rank">
    >();
    let rank = 0,
      lastScore = -1;
    return results.map((row, index) => {
      if (row.score !== lastScore) rank = index + 1;
      lastScore = row.score;
      return { ...row, rank };
    });
  };
  const [weekly, allTime] = await Promise.all([query(true), query(false)]);
  return { week, weekly, allTime };
}
function roomCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return [...crypto.getRandomValues(new Uint8Array(6))]
    .map((n) => alphabet[n & 31])
    .join("");
}
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);
    try {
      if (
        request.headers.has("Origin") &&
        request.headers.get("Origin") !== url.origin
      )
        return errorResponse("UNAUTHORIZED", 403);
      if (request.method === "GET" && url.pathname === "/api/games") {
        const configured = packages.map((pack) => {
          const geography = pack.questions.geography.filter(validGeoQuestion);
          return {
            ...pack,
            questions: {
              ...pack.questions,
              geography:
                env.GOOGLE_MAPS_BROWSER_KEY?.trim() && geography.length >= 6
                  ? geography
                  : [],
            },
          };
        });
        const { pack } = selectPackage(configured);
        return json({ modes: availableModes(pack, 2) });
      }
      if (request.method === "GET" && url.pathname === "/api/leaderboard")
        return json(await leaderboards(env.DB));
      if (request.method === "POST" && url.pathname === "/api/identity") {
        const body = (await request.json()) as { token?: unknown };
        if (body.token !== undefined) {
          const id = await authenticate(env.DB, body.token);
          return id
            ? json({ id, token: body.token })
            : errorResponse("UNAUTHORIZED", 401);
        }
        const token = [...crypto.getRandomValues(new Uint8Array(32))]
          .map((n) => n.toString(16).padStart(2, "0"))
          .join("");
        const id = crypto.randomUUID();
        await env.DB.prepare(
          "INSERT INTO players (id, token_hash, created_at) VALUES (?, ?, ?)",
        )
          .bind(id, await hashToken(token), Date.now())
          .run();
        return json({ id, token });
      }
      const match = /^\/api\/rooms\/([A-Z2-9]{6})(?:\/(join|socket))?$/.exec(
        url.pathname,
      );
      if (match && !match[2] && request.method === "GET")
        return env.ROOMS.get(env.ROOMS.idFromName(match[1])).fetch(
          new Request(`${url.origin}/internal/status`),
        );
      if (match?.[2] === "socket" && request.method === "GET") {
        if (url.search) return errorResponse("INVALID_REQUEST");
        return env.ROOMS.get(env.ROOMS.idFromName(match[1])).fetch(request);
      }
      if (request.method !== "POST")
        return errorResponse("INVALID_REQUEST", 404);
      const id = await authenticate(
        env.DB,
        request.headers.get("Authorization")?.replace(/^Bearer /, ""),
      );
      if (!id) return errorResponse("UNAUTHORIZED", 401);
      const body = (await request.json()) as { name?: unknown };
      if (!validName(body.name)) return errorResponse("INVALID_NAME");
      const name = body.name.trim();
      if (url.pathname === "/api/rooms") {
        for (let attempt = 0; attempt < 5; attempt++) {
          const code = roomCode();
          const response = await env.ROOMS.get(
            env.ROOMS.idFromName(code),
          ).fetch(
            new Request(`${url.origin}/internal/create`, {
              method: "POST",
              body: JSON.stringify({ id, name, code }),
            }),
          );
          if (response.status !== 409) return response;
        }
        return errorResponse("STORAGE_ERROR", 503);
      }
      if (match?.[2] === "join")
        return env.ROOMS.get(env.ROOMS.idFromName(match[1])).fetch(
          new Request(`${url.origin}/internal/join`, {
            method: "POST",
            body: JSON.stringify({ id, name }),
          }),
        );
      return errorResponse("INVALID_CODE", 404);
    } catch (error) {
      if (error instanceof SyntaxError || error instanceof TypeError)
        return errorResponse("INVALID_REQUEST");
      console.error("API storage operation failed");
      return errorResponse("STORAGE_ERROR", 503);
    }
  },
} satisfies ExportedHandler<Env>;
