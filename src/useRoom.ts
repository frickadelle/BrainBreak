import { useEffect, useRef, useState } from "react";
import type {
  ClientMessage,
  ErrorCode,
  Language,
  RoomView,
  ServerMessage,
} from "../shared/types";
import { api, errorCode, identity } from "./client";
export function useRoom(code: string | null, language: Language) {
  const [state, setState] = useState<RoomView | null>(null);
  const [status, setStatus] = useState<"connecting" | "connected" | "offline">(
    "connecting",
  );
  const [guessFeedback, setGuessFeedback] = useState(0);
  const stateRef = useRef<RoomView | null>(null);
  const [error, setError] = useState<ErrorCode | null>(null);
  const [attempt, setAttempt] = useState(0);
  const socket = useRef<WebSocket | null>(null);
  const languageRef = useRef(language);
  const clockOffset = useRef(0);
  languageRef.current = language;
  useEffect(() => {
    setState(null);
    stateRef.current = null;
    setError(null);
    if (!code) return;
    let cancelled = false,
      tries = 0,
      retryTimer: ReturnType<typeof setTimeout>;
    let heartbeat: ReturnType<typeof setInterval>;
    let fatal = false;
    const connect = async () => {
      setStatus("connecting");
      try {
        await api(`/api/rooms/${code}`);
        const player = await identity();
        if (cancelled) return;
        const protocol = location.protocol === "https:" ? "wss:" : "ws:";
        const ws = new WebSocket(
          `${protocol}//${location.host}/api/rooms/${code}/socket`,
        );
        socket.current = ws;
        ws.onopen = () => {
          if (cancelled) {
            ws.close();
            return;
          }
          ws.send(
            JSON.stringify({
              type: "auth",
              token: player.token,
              language: languageRef.current,
            }),
          );
        };
        ws.onmessage = (event) => {
          if (event.data === "pong") return;
          let message: ServerMessage;
          try {
            message = JSON.parse(event.data);
          } catch {
            return;
          }
          if (message.type === "state") {
            tries = 0;
            setStatus("connected");
            stateRef.current = message.state;
            setState(message.state);
            clockOffset.current = message.state.serverNow - Date.now();
            setError(null);
          } else if (message.type === "drawing") {
            const previous = stateRef.current;
            if (
              !previous?.drawing ||
              previous.question?.id !== message.questionId
            )
              return;
            if (message.revision <= previous.drawing.revision) return;
            if (message.revision !== previous.drawing.revision + 1) {
              ws.send(JSON.stringify({ type: "sync" }));
              return;
            }
            const next = {
              ...previous,
              drawing: {
                ...previous.drawing,
                revision: message.revision,
                strokes: message.clear
                  ? []
                  : message.stroke
                    ? [...previous.drawing.strokes, message.stroke]
                    : previous.drawing.strokes,
              },
            };
            stateRef.current = next;
            setState(next);
          } else {
            if (message.code === "WRONG_GUESS") {
              setGuessFeedback((previous) => previous + 1);
              return;
            }
            setError(message.code);
            if (
              ["UNAUTHORIZED", "ROOM_NOT_FOUND", "ROOM_EXPIRED"].includes(
                message.code,
              )
            ) {
              fatal = true;
              setStatus("offline");
              ws.close();
            }
          }
        };
        ws.onclose = () => {
          clearInterval(heartbeat);
          if (cancelled || fatal) return;
          setStatus("offline");
          retryTimer = setTimeout(
            connect,
            Math.min(15000, 1000 * 2 ** Math.min(tries++, 4)),
          );
        };
        ws.onerror = () => {
          setStatus("offline");
        };
        heartbeat = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) ws.send("ping");
        }, 25000);
      } catch (e) {
        if (cancelled) return;
        const problem = errorCode(e);
        setError(problem);
        setStatus("offline");
        if (
          ["UNAUTHORIZED", "ROOM_NOT_FOUND", "ROOM_EXPIRED"].includes(problem)
        ) {
          fatal = true;
          return;
        }
        retryTimer = setTimeout(
          connect,
          Math.min(15000, 1000 * 2 ** Math.min(tries++, 4)),
        );
      }
    };
    void connect();
    return () => {
      cancelled = true;
      clearTimeout(retryTimer);
      clearInterval(heartbeat);
      socket.current?.close();
      socket.current = null;
    };
  }, [code, attempt]);
  useEffect(() => {
    if (socket.current?.readyState === WebSocket.OPEN)
      socket.current.send(JSON.stringify({ type: "language", language }));
  }, [language]);
  const send = (message: ClientMessage): boolean => {
    if (
      status !== "connected" ||
      socket.current?.readyState !== WebSocket.OPEN
    ) {
      setError("CONNECTION_ERROR");
      return false;
    }
    socket.current.send(JSON.stringify(message));
    setError(null);
    return true;
  };
  return {
    state,
    status,
    error,
    guessFeedback,
    clearError: () => setError(null),
    send,
    clockOffset,
    retry: () => setAttempt((n) => n + 1),
  };
}
