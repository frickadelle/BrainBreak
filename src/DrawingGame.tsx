import { useEffect, useRef, useState } from "react";
import type { FormEvent, PointerEvent } from "react";
import { CheckCircle2, Pencil, Trash2, Eraser } from "lucide-react";
import type { DrawingStroke, Language, RoomView } from "../shared/types";
import { copy } from "./i18n";
import type { useRoom } from "./useRoom";

const colors = ["#273b32", "#e76b53", "#4967c8", "#d29a2f", "#ffffff"];
const widths = [0.004, 0.008, 0.014];
type Point = DrawingStroke["points"][number];

export function DrawingGame({
  state,
  language,
  online,
  offset,
  send,
  feedback,
}: {
  state: RoomView;
  language: Language;
  online: boolean;
  offset: number;
  send: ReturnType<typeof useRoom>["send"];
  feedback: number;
}) {
  const t = copy[language];
  const drawing = state.drawing;
  const questionId = state.question!.id;
  const artist = state.players.find((p) => p.id === drawing?.artistId);
  const isArtist = drawing?.artistId === state.me.id;
  const [now, setNow] = useState(Date.now());
  const ended = state.endsAt !== null && now + offset >= state.endsAt;
  const editable = isArtist && online && !ended && state.phase === "question";
  const locked = state.me.answer !== undefined;
  const [color, setColor] = useState(colors[0]);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [width, setWidth] = useState(widths[1]);
  const [chatDraft, setChatDraft] = useState("");
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [preview, setPreview] = useState<DrawingStroke[]>([]);
  const active = useRef<{
    pointerId: number;
    points: Point[];
    color: string;
    width: number;
  } | null>(null);
  const queued = useRef<DrawingStroke[]>([]);
  const sent = useRef<DrawingStroke[]>([]);
  const lastPointAt = useRef(0);
  const lastSentAt = useRef(0);
  const clearQueued = useRef(false);
  const transport = useRef({ send, offset, editable });
  transport.current = { send, offset, editable };

  function repaint() {
    const current = active.current;
    setPreview([
      ...sent.current,
      ...queued.current,
      ...(current
        ? [
            {
              id: "preview",
              color: current.color,
              width: current.width,
              points: [...current.points],
            },
          ]
        : []),
    ]);
  }
  function queuePoints() {
    const current = active.current;
    if (!current || !current.points.length) return;
    queued.current.push({
      id: crypto.randomUUID(),
      color: current.color,
      width: current.width,
      points: [...current.points],
    });
    current.points = [current.points[current.points.length - 1]];
  }
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      const current = transport.current;
      if (!current.editable || Date.now() - lastSentAt.current < 400) return;
      if (clearQueued.current) {
        if (
          current.send({
            type: "drawClear",
            questionId,
            timestamp: Date.now() + current.offset,
          })
        ) {
          lastSentAt.current = Date.now();
          clearQueued.current = false;
        }
        return;
      }
      if (active.current && active.current.points.length > 1) queuePoints();
      const stroke = queued.current.shift();
      if (!stroke) return;
      if (
        current.send({
          type: "draw",
          questionId,
          timestamp: Date.now() + current.offset,
          stroke,
        })
      ) {
        sent.current.push(stroke);
        lastSentAt.current = Date.now();
      }
      repaint();
    }, 400);
    return () => clearInterval(timer);
  }, [questionId]);
  useEffect(() => {
    const acknowledged = new Set(drawing?.strokes.map((s) => s.id));
    sent.current = sent.current.filter((s) => !acknowledged.has(s.id));
    repaint();
  }, [drawing?.revision]);
  useEffect(() => {
    if (!editable) {
      active.current = null;
      queued.current = [];
      sent.current = [];
      setPreview([]);
      clearQueued.current = false;
    }
  }, [editable]);
  useEffect(() => {
    setPending(false);
    setWrong(false);
  }, [state.me.answer]);
  const previousFeedback = useRef(feedback);
  useEffect(() => {
    if (feedback !== previousFeedback.current) {
      previousFeedback.current = feedback;
      setPending(false);
      setWrong(true);
    }
  }, [feedback]);
  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(() => setPending(false), 4000);
    return () => clearTimeout(timer);
  }, [pending]);

  function point(event: PointerEvent<SVGSVGElement>): Point {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x:
        Math.round(
          Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)) *
            10_000,
        ) / 10_000,
      y:
        Math.round(
          Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)) *
            10_000,
        ) / 10_000,
    };
  }
  function begin(event: PointerEvent<SVGSVGElement>) {
    if (
      !editable ||
      active.current ||
      (event.pointerType === "mouse" && event.button !== 0)
    )
      return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    active.current = {
      pointerId: event.pointerId,
      points: [point(event)],
      color: tool === "eraser" ? "#ffffff" : color,
      width: tool === "eraser" ? Math.max(width, 0.014) : width,
    };
    repaint();
  }
  function move(event: PointerEvent<SVGSVGElement>) {
    const current = active.current;
    if (!editable || !current || current.pointerId !== event.pointerId) return;
    if (Date.now() - lastPointAt.current < 20) return;
    lastPointAt.current = Date.now();
    const next = point(event);
    const previous = current.points[current.points.length - 1];
    if (Math.hypot(next.x - previous.x, next.y - previous.y) < 0.002) return;
    if (current.points.length >= 32) queuePoints();
    current.points.push(next);
    repaint();
  }
  function end(event: PointerEvent<SVGSVGElement>) {
    if (active.current?.pointerId !== event.pointerId) return;
    queuePoints();
    active.current = null;
    repaint();
  }
  function clear() {
    active.current = null;
    queued.current = [];
    sent.current = [];
    setPreview([]);
    clearQueued.current = true;
  }
  function guess(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim() || pending || locked || ended || !online || isArtist)
      return;
    setWrong(false);
    if (send({ type: "answer", questionId, value: draft.trim() }))
      setPending(true);
  }
  const paths = [
    ...(drawing?.strokes ?? []),
    ...preview.filter((s) => !drawing?.strokes.some((p) => p.id === s.id)),
  ];
  return (
    <section className="drawing-game">
      <div className="drawing-workspace">
        <div className="drawing-stage">
          <div className="drawing-status">
            <Pencil size={20} />
            <strong>
              {isArtist
                ? t.drawingYou
                : `${t.drawingArtist}: ${artist?.name ?? "…"}`}
            </strong>
            {artist && !artist.connected && (
              <span role="status">{t.drawingArtistOffline}</span>
            )}
          </div>
          {isArtist && state.phase === "question" && drawing?.word && (
            <div className="drawing-secret">
              <span>{t.drawingWord}</span>
              <strong>{drawing.word[language]}</strong>
              <small>
                {language === "de" ? drawing.word.en : drawing.word.de}
              </small>
            </div>
          )}
          {isArtist && state.phase === "question" && (
            <fieldset className="drawing-tools" disabled={!editable}>
              <legend className="sr-only">{t.drawingTools}</legend>
              <div className="drawing-palette">
                {colors.map((value, index) => (
                  <button
                    type="button"
                    key={value}
                    style={{ backgroundColor: value }}
                    aria-pressed={tool === "pen" && color === value}
                    aria-label={t.drawingColors[index]}
                    onClick={() => {
                      setColor(value);
                      setTool("pen");
                    }}
                  />
                ))}
              </div>
              <div className="drawing-tool-picker">
                <button
                  type="button"
                  aria-pressed={tool === "pen"}
                  onClick={() => setTool("pen")}
                >
                  <Pencil size={18} />
                  {t.drawingPen}
                </button>
                <button
                  type="button"
                  aria-pressed={tool === "eraser"}
                  onClick={() => setTool("eraser")}
                >
                  <Eraser size={18} />
                  {t.drawingEraser}
                </button>
              </div>
              {tool === "pen" && (
                <label>
                  {t.drawingWidth}
                  <select
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                  >
                    {widths.map((value, index) => (
                      <option key={value} value={value}>
                        {t.drawingWidths[index]}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <button type="button" className="text-button" onClick={clear}>
                <Trash2 size={18} />
                {t.drawingClear}
              </button>
            </fieldset>
          )}
          <svg
            className={`drawing-board ${editable ? (tool === "eraser" ? "can-draw can-erase" : "can-draw") : ""}`}
            viewBox="0 0 1000 600"
            role="img"
            aria-label={t.drawingCanvas}
            onPointerDown={begin}
            onPointerMove={move}
            onPointerUp={end}
            onPointerCancel={end}
            onLostPointerCapture={end}
          >
            <rect width="1000" height="600" fill="#fff" />
            {paths.map((stroke) =>
              stroke.points.length === 1 ? (
                <circle
                  key={stroke.id}
                  cx={stroke.points[0].x * 1000}
                  cy={stroke.points[0].y * 600}
                  r={stroke.width * 500}
                  fill={stroke.color}
                />
              ) : (
                <polyline
                  key={stroke.id}
                  points={stroke.points
                    .map((p) => `${p.x * 1000},${p.y * 600}`)
                    .join(" ")}
                  fill="none"
                  stroke={stroke.color}
                  strokeWidth={stroke.width * 1000}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ),
            )}
          </svg>
          {state.phase === "question" && (
            <>
              <p className="small">
                {isArtist ? t.drawingArtistHint : t.drawingGuessHint}
              </p>
              {!isArtist &&
                (locked ? (
                  <div className="answer-confirmation" role="status">
                    <CheckCircle2 size={23} />
                    <div>
                      <strong>{t.drawingCorrect}</strong>
                      <span>{t.answerSaved}</span>
                    </div>
                  </div>
                ) : (
                  <form className="drawing-guess" onSubmit={guess}>
                    <label htmlFor="drawing-guess">{t.drawingGuess}</label>
                    <div>
                      <input
                        id="drawing-guess"
                        value={draft}
                        maxLength={40}
                        autoComplete="off"
                        disabled={pending || ended || !online}
                        onChange={(e) => {
                          setDraft(e.target.value);
                          setWrong(false);
                        }}
                      />
                      <button
                        className="button primary"
                        disabled={pending || ended || !online || !draft.trim()}
                      >
                        {pending ? t.joining : t.drawingSend}
                      </button>
                    </div>
                    {wrong && (
                      <p className="drawing-feedback" role="status">
                        {t.drawingWrong}
                      </p>
                    )}
                  </form>
                ))}
              <p className="small muted">{t.ruleDrawing}</p>
            </>
          )}
        </div>
        <aside className="drawing-community">
          <section
            className="drawing-chat"
            aria-label={language === "de" ? "Öffentlicher Chat" : "Public chat"}
          >
            <h3>{language === "de" ? "Chat" : "Chat"}</h3>
            <div
              className="chat-feed"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
            >
              {!drawing?.chat?.length && (
                <p className="muted">
                  {language === "de"
                    ? "Tipps erscheinen hier. Richtige Wörter bleiben geheim."
                    : "Guesses appear here. Correct words stay secret."}
                </p>
              )}
              {drawing?.chat?.map((entry) => (
                <p
                  key={entry.id}
                  className={entry.kind === "correct" ? "chat-correct" : ""}
                >
                  <strong>
                    {state.players.find(
                      (player) => player.id === entry.playerId,
                    )?.name ?? "…"}
                  </strong>
                  {entry.kind === "correct"
                    ? language === "de"
                      ? " hat richtig geraten ✓"
                      : " guessed correctly ✓"
                    : `: ${entry.text}`}
                </p>
              ))}
            </div>
            {state.phase === "question" && (isArtist || locked) && (
              <form
                className="chat-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (
                    chatDraft.trim() &&
                    send({
                      type: "drawChat",
                      questionId,
                      text: chatDraft.trim(),
                    })
                  )
                    setChatDraft("");
                }}
              >
                <label className="sr-only" htmlFor="draw-chat">
                  {language === "de" ? "Chatnachricht" : "Chat message"}
                </label>
                <input
                  id="draw-chat"
                  value={chatDraft}
                  maxLength={160}
                  disabled={!online || ended}
                  onChange={(event) => setChatDraft(event.target.value)}
                  placeholder={
                    language === "de"
                      ? "Nachricht an alle …"
                      : "Message everyone …"
                  }
                />
                <button
                  className="button secondary"
                  disabled={!online || ended || !chatDraft.trim()}
                >
                  {language === "de" ? "Senden" : "Send"}
                </button>
              </form>
            )}
          </section>
          <table className="drawing-progress">
            <caption>
              {language === "de" ? "Wer hat es erraten?" : "Who guessed it?"}
            </caption>
            <thead>
              <tr>
                <th>{language === "de" ? "Name" : "Name"}</th>
                <th>{language === "de" ? "Status" : "Status"}</th>
              </tr>
            </thead>
            <tbody>
              {state.players
                .filter((player) => player.id !== drawing?.artistId)
                .map((player) => (
                  <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>
                      {player.answered
                        ? language === "de"
                          ? "Richtig ✓"
                          : "Correct ✓"
                        : state.phase === "reveal"
                          ? language === "de"
                            ? "Nicht erraten"
                            : "Not guessed"
                          : language === "de"
                            ? "Rät noch"
                            : "Guessing"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </aside>
      </div>
    </section>
  );
}
