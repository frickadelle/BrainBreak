import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  Calculator,
  CircleHelp,
  Brain,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  Globe2,
  Lightbulb,
  Link2,
  ListOrdered,
  Radio,
  Pencil,
  Sparkles,
  Target,
  Trophy,
  Users,
  Shuffle,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { CATEGORIES, isNumericCategory } from "../shared/types";
import { convertNumberDraft, convertNumberInput } from "../shared/numbers";
import type {
  Category,
  GameMode,
  ErrorCode,
  Language,
  LeaderboardRow,
  RoomView,
  PublicQuestion,
} from "../shared/types";
import {
  api,
  errorCode,
  identity,
  persistentStorageAvailable,
  resetIdentity,
} from "./client";
import { categories, copy, errors, initialLanguage, number } from "./i18n";
import { useRoom } from "./useRoom";
import { useSounds } from "./useSounds";
import { AssociationGame } from "./AssociationGame";
import { GeoGame } from "./GeoGame";
import { OrderInput } from "./OrderInput";
import { DrawingGame } from "./DrawingGame";
import { PuzzleGame } from "./PuzzleGame";
import { Tutorial } from "./Tutorial";
import { isPuzzleCategory } from "../shared/puzzles";

function roomFromUrl() {
  return (
    location.pathname
      .match(/^\/room\/([A-Za-z0-9]{6})\/?$/)?.[1]
      ?.toUpperCase() ||
    new URLSearchParams(location.search).get("room")?.toUpperCase() ||
    ""
  );
}
function readLocal(key: string): string {
  try {
    return localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}
function writeLocal(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Use current state if storage is unavailable. */
  }
}
function knownRoom(code: string) {
  return !!readLocal(`brainbreak.room.${code}`);
}
const icons = {
  code: CircleHelp,
  sets: Sparkles,
  connections: Link2,
  wavelength: Target,
  memory: Brain,
  wordle: ListOrdered,
  countries: Globe2,
  association: Link2,
  geography: Globe2,
  mixed: Shuffle,
  drawing: Pencil,
  trivia: Lightbulb,
  logic: Brain,
  estimate: Target,
  arithmetic: Calculator,
  truth: CircleHelp,
  order: ListOrdered,
};
function answerText(
  question: PublicQuestion | undefined,
  answer: string | number | null | undefined,
  language: Language,
): string {
  if (answer === null || answer === undefined || answer === "")
    return copy[language].notSubmitted;
  if (answer === "captain")
    return language === "de" ? "Hinweis gegeben" : "Clue given";
  if (question?.category === "sets")
    return language === "de"
      ? "Drei Karten ausgewählt"
      : "Three cards selected";
  if (question?.category === "connections")
    return `${String(answer).split(",").filter(Boolean).length} ${language === "de" ? "Gruppen" : "groups"}`;
  if (
    isPuzzleCategory(question?.category ?? "") &&
    question?.category !== "countries"
  )
    return String(answer);
  if (question?.category === "drawing" && answer === "artist")
    return copy[language].drawingArtistContribution;
  if (question?.category === "geography") {
    try {
      const point = JSON.parse(String(answer)) as { lat: number; lng: number };
      return `${number(point.lat, language)}°, ${number(point.lng, language)}°`;
    } catch {
      return String(answer);
    }
  }
  if (answer === "association-captain")
    return language === "de" ? "Hinweis gegeben" : "Clue given";
  if (question?.category === "association")
    return String(answer)
      .split(",")
      .map((id) => question.options?.find((o) => o.id === id)?.text ?? id)
      .join(" · ");
  if (typeof answer === "number") return number(answer, language);
  if (question?.category === "order")
    return answer
      .split(",")
      .map((id) => question.options?.find((o) => o.id === id)?.text ?? id)
      .join(" → ");
  return question?.options?.find((o) => o.id === answer)?.text ?? answer;
}
function CategoryIcon({
  category,
  size = 26,
}: {
  category: GameMode;
  size?: number;
}) {
  const Icon = icons[category];
  return <Icon size={size} strokeWidth={1.65} />;
}
function BrainArt() {
  return (
    <div className="brain-art" aria-hidden="true">
      <span className="orbit orbit-one" />
      <span className="orbit orbit-two" />
      <span className="art-spark spark-one">✳</span>
      <span className="art-spark spark-two">✧</span>
      <svg viewBox="0 0 240 230" className="brain-drawing">
        <g transform="rotate(-9 120 115)">
          <path
            d="M120 54C101 31 64 35 61 66 39 66 25 92 40 114 20 137 37 164 61 163 55 190 94 202 120 177 145 202 184 190 180 163 205 164 222 137 202 114 217 92 202 66 180 66 177 35 139 31 120 54Z"
            fill="#d9ee8a"
            stroke="#273b32"
            strokeWidth="5"
          />
          <path
            d="M120 54v123M61 66c0 21 29 16 26 40M40 114c22-9 35 8 29 28m-8 21c3-14 19-16 27-7m92-90c0 21-29 16-26 40m48 8c-22-9-35 8-29 28m7 21c-3-14-19-16-27-7M86 47c-5 18 17 17 14 36m54-36c5 18-17 17-14 36"
            fill="none"
            stroke="#273b32"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M84 118c3 6 10 6 13 0m46 0c3 6 10 6 13 0m-44 21c5 7 13 7 18 0"
            fill="none"
            stroke="#273b32"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </svg>
      <span className="art-sticker">AHA!</span>
    </div>
  );
}
function Countdown({
  endsAt,
  offset,
  label,
}: {
  endsAt: number | null;
  offset: number;
  label: string;
}) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(timer);
  }, [endsAt]);
  if (!endsAt) return null;
  const seconds = Math.max(0, Math.ceil((endsAt - now - offset) / 1000));
  return (
    <div
      className={`countdown ${seconds <= 10 ? "urgent" : ""}`}
      role="timer"
      aria-label={`${seconds} ${label}`}
    >
      <Clock3 size={19} />
      <span>{seconds.toString().padStart(2, "0")}</span>
      <small>s</small>
    </div>
  );
}
function Ranking({
  rows,
  language,
  me,
  showSessions = true,
}: {
  rows: LeaderboardRow[];
  language: Language;
  me?: string;
  showSessions?: boolean;
}) {
  const t = copy[language];
  if (!rows.length)
    return (
      <div className="ranking-empty">
        <Trophy size={28} />
        <p>{t.emptyRanking}</p>
      </div>
    );
  return (
    <div className="ranking">
      <div className="ranking-head">
        <span>{t.rank}</span>
        <span>{t.name}</span>
        <span>{t.points}</span>
      </div>
      {rows.map((row) => (
        <div
          className={`ranking-row ${row.id === me ? "is-me" : ""}`}
          key={row.id}
        >
          <span className={`rank-num rank-${row.rank}`}>
            {row.rank === 1 ? (
              <Trophy size={18} />
            ) : (
              row.rank.toString().padStart(2, "0")
            )}
          </span>
          <span className="ranking-name">
            {row.name}
            {row.id === me && <small>{t.you}</small>}
            {showSessions && (
              <em>
                {number(row.sessions, language)} {t.sessions}
              </em>
            )}
          </span>
          <strong>{number(row.score, language)}</strong>
        </div>
      ))}
    </div>
  );
}
function Rules({ language, close }: { language: Language; close: () => void }) {
  const t = copy[language];
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="rules-dialog"
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      aria-labelledby="rules-heading"
    >
      <div className="dialog-inner">
        <button
          className="icon-button close"
          onClick={close}
          aria-label={t.close}
        >
          <X />
        </button>
        <span className="eyebrow">{t.rulesEyebrow}</span>
        <h2 id="rules-heading">{t.rulesTitle}</h2>
        <p>{t.ruleChoice}</p>
        <p>{t.rulePuzzles}</p>
        <p>
          {language === "de"
            ? "Wenn alle abgegeben haben, endet die Runde sofort. Beim Zeichnen müssen alle Ratenden richtig liegen. Im Spiele-Mix kommt jede Runde ein anderes Spiel. Start ab zwei Personen."
            : "The round ends as soon as everyone submits. In drawing, every guesser must find the word. Game mix uses a different game each round. Start with two players."}
        </p>
        <p>
          {language === "de"
            ? "Wortassoziation: 15 Sekunden für einen Hinweis auf Deutsch und Englisch, danach wählt jeder die Wörter seines Teams. Ohne Hinweis hilft ein vorbereiteter Begriff. Für den vollständig richtigen Wörtersatz gibt es 1.000 Punkte. Zu zweit oder dritt spielt ihr kooperativ, ab vier in zwei Teams. Hinweisgeber wechseln; sie punkten bei einem eigenen Hinweis und mindestens einer richtigen Teamauswahl."
            : "Word association: 15 seconds for a clue in German and English, then each guesser selects their team’s words. A prepared clue fills in if needed. The complete correct set earns 1,000 points. Two or three players cooperate; four or more play in two teams. Clue givers rotate and score for a human clue with at least one correct teammate."}
        </p>
        <p>{t.ruleEstimate}</p>
        <p>{t.ruleDrawing}</p>
        <p>{t.ruleAdaptive}</p>
        <div className="formula">{t.ruleFormula}</div>
        <p>{t.ruleSecret}</p>
        <p>{t.ruleLanguage}</p>
        <p>{t.ruleWeekly}</p>
        <p className="muted">{t.ruleIdentity}</p>
        <button className="button primary" onClick={close}>
          {t.close}
          <Check size={18} />
        </button>
      </div>
    </dialog>
  );
}
function AnswerPanel({
  state,
  language,
  online,
  offset,
  send,
}: {
  state: RoomView;
  language: Language;
  online: boolean;
  offset: number;
  send: ReturnType<typeof useRoom>["send"];
}) {
  const t = copy[language];
  const q = state.question!;
  const [selected, setSelected] = useState("");
  const [estimate, setEstimate] = useState("");
  const [sorting, setSorting] = useState(false);
  const [order, setOrder] = useState(() => q.options?.map((o) => o.id) ?? []);
  const [pending, setPending] = useState(false);
  const [inputLanguage, setInputLanguage] = useState(language);
  const [invalidDraft, setInvalidDraft] = useState(false);
  useEffect(() => {
    if (!isNumericCategory(q.category) || inputLanguage === language) return;
    if (!estimate.trim()) {
      setInputLanguage(language);
      return;
    }
    const translated = convertNumberDraft(estimate, inputLanguage, language);
    if (translated !== null) {
      setEstimate(translated);
      setInputLanguage(language);
    }
  }, [language, inputLanguage, estimate, q.category]);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (state.me.answer !== undefined) setPending(false);
  }, [state.me.answer]);
  useEffect(() => {
    if (pending) {
      const timer = setTimeout(() => setPending(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [pending]);
  const locked = state.me.answer !== undefined;
  const ended = state.endsAt !== null && now + offset >= state.endsAt;
  function submit(e: FormEvent) {
    e.preventDefault();
    if (locked || pending || ended || !online || sorting) return;
    let value = isNumericCategory(q.category)
      ? estimate
      : q.category === "order"
        ? order.join(",")
        : selected;
    if (isNumericCategory(q.category)) {
      const translated = convertNumberInput(estimate, inputLanguage, language);
      if (translated === null) {
        setInvalidDraft(true);
        return;
      }
      value = translated;
    }
    if (send({ type: "answer", questionId: q.id, value })) setPending(true);
  }
  const answerDisplay = answerText(q, state.me.answer, language);
  const shownOrder = locked ? String(state.me.answer).split(",") : order;
  return (
    <form onSubmit={submit} className="answer-panel">
      {isNumericCategory(q.category) ? (
        <div className="estimate-wrap">
          <label htmlFor="estimate">
            {q.category === "arithmetic" ? t.arithmeticHint : t.estimateHint}
          </label>
          <div className="estimate-input">
            <input
              id="estimate"
              inputMode="decimal"
              autoComplete="off"
              placeholder={
                q.category === "arithmetic"
                  ? t.arithmeticPlaceholder
                  : t.estimatePlaceholder
              }
              value={locked ? String(answerDisplay) : estimate}
              onChange={(e) => {
                setEstimate(e.target.value);
                if (!estimate.trim() || !e.target.value.trim())
                  setInputLanguage(language);
                setInvalidDraft(false);
              }}
              disabled={locked || pending || ended || !online}
              maxLength={40}
            />
            {q.unit && <span>{q.unit}</span>}
          </div>
          <p className="small">
            {q.category === "arithmetic" ? t.exactRule : t.estimateRule}
          </p>
          {inputLanguage !== language && estimate && (
            <p className="small">
              {t.draftLanguageHint}{" "}
              {inputLanguage === "de" ? "1.234,5" : "1,234.5"}
            </p>
          )}
          {invalidDraft && (
            <p className="error-message" role="alert">
              {errors[language].INVALID_ANSWER}
            </p>
          )}
        </div>
      ) : q.category === "order" ? (
        <OrderInput
          question={q}
          order={shownOrder}
          onChange={setOrder}
          onDraggingChange={setSorting}
          disabled={locked || pending || ended || !online}
          language={language}
        />
      ) : (
        <fieldset
          className="answer-options"
          disabled={locked || pending || ended || !online}
        >
          <legend className="sr-only">{t.yourAnswer}</legend>
          {q.options?.map((option, i) => (
            <label
              key={option.id}
              className={`answer-option ${selected === option.id || state.me.answer === option.id ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="answer"
                value={option.id}
                checked={(locked ? state.me.answer : selected) === option.id}
                onChange={() => setSelected(option.id)}
              />
              <span className="option-letter">
                {String.fromCharCode(65 + i)}
              </span>
              <span>{option.text}</span>
              {(locked ? state.me.answer : selected) === option.id && (
                <Check size={20} />
              )}
            </label>
          ))}
        </fieldset>
      )}
      {locked ? (
        <div className="answer-confirmation" role="status">
          <CheckCircle2 size={23} />
          <div>
            <strong>{t.locked}</strong>
            <span>{t.answerSaved}</span>
          </div>
        </div>
      ) : (
        <div className="submit-row">
          <p>{online ? t.answerHint : t.connectionWarning}</p>
          <button
            className="button primary"
            disabled={
              pending ||
              sorting ||
              ended ||
              !online ||
              !(isNumericCategory(q.category)
                ? estimate.trim()
                : q.category === "order"
                  ? order.length
                  : selected)
            }
          >
            {pending ? t.joining : ended ? t.timeUp : t.submit}
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </form>
  );
}
export default function App() {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const t = copy[language];
  const initialCode = roomFromUrl();
  const [roomCode, setRoomCode] = useState<string | null>(() =>
    initialCode && knownRoom(initialCode) ? initialCode : null,
  );
  const [mode, setMode] = useState<"create" | "join">(
    initialCode ? "join" : "create",
  );
  const [name, setName] = useState(readLocal("brainbreak.name"));
  const [code, setCode] = useState(initialCode);
  const [storageAvailable] = useState(persistentStorageAvailable);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<ErrorCode | null>(null);
  const [rules, setRules] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFallback, setCopyFallback] = useState(false);
  const [rankingTab, setRankingTab] = useState<
    "weekly" | "allTime" | "session"
  >("weekly");
  const [ranking, setRanking] = useState<{
    week: string;
    weekly: LeaderboardRow[];
    allTime: LeaderboardRow[];
  } | null>(null);
  const [rankingError, setRankingError] = useState(false);
  const room = useRoom(roomCode, language);
  const state = room.state;
  const sound = useSounds(state, room.status === "connected");
  const [games, setGames] = useState<GameMode[]>(
    CATEGORIES.filter((c) => c !== "geography"),
  );
  useEffect(() => {
    void api<{ modes: GameMode[] }>("/api/games")
      .then((result) => setGames(result.modes))
      .catch(() => {});
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    writeLocal("brainbreak.language", language);
  }, [language]);
  useEffect(() => {
    if (!roomCode) {
      setRankingError(false);
      void api<typeof ranking>("/api/leaderboard")
        .then(setRanking)
        .catch(() => setRankingError(true));
    }
  }, [roomCode]);
  useEffect(() => {
    const onPop = () => {
      const current = roomFromUrl();
      setRoomCode(current && knownRoom(current) ? current : null);
      setCode(current);
      if (current) setMode("join");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => {
    if (state?.phase === "results") setRankingTab("session");
  }, [state?.phase]);
  async function enter(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setFormError(null);
    try {
      const player = await identity();
      const result = await api<{ code: string }>(
        mode === "create"
          ? "/api/rooms"
          : `/api/rooms/${code.trim().toUpperCase()}/join`,
        { name: name.trim() },
        player.token,
      );
      writeLocal("brainbreak.name", name.trim());
      writeLocal(`brainbreak.room.${result.code}`, "1");
      history.pushState({}, "", `/room/${result.code}`);
      setRoomCode(result.code);
      setCopied(false);
      setCopyFallback(false);
    } catch (e) {
      setFormError(errorCode(e));
    } finally {
      setBusy(false);
    }
  }
  function home() {
    history.pushState({}, "", "/");
    setRoomCode(null);
    setMode("create");
    setCode("");
    setFormError(null);
    setRankingTab("weekly");
  }
  async function copyInvite() {
    try {
      await navigator.clipboard.writeText(
        `${location.origin}/room/${roomCode}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyFallback(true);
    }
  }
  const online = room.status === "connected";
  const currentRows =
    state?.phase === "results"
      ? rankingTab === "session"
        ? state.results || []
        : rankingTab === "weekly"
          ? state.weekly || []
          : state.allTime || []
      : rankingTab === "allTime"
        ? ranking?.allTime || []
        : ranking?.weekly || [];
  return (
    <div
      className="app-shell"
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest(".sound-toggle"))
          void sound.arm();
      }}
      onKeyDown={(event) => {
        if (!(event.target as HTMLElement).closest(".sound-toggle"))
          void sound.arm();
      }}
    >
      <header className="site-header">
        <a
          className="brand"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            home();
          }}
          aria-label="Brainbreak"
        >
          <span className="brand-icon">
            <Brain size={25} strokeWidth={1.7} />
          </span>
          <span>
            brainbreak<span className="brand-dot">.</span>
          </span>
        </a>
        <button
          className="sound-toggle"
          type="button"
          onClick={() => void sound.toggle()}
          aria-pressed={sound.enabled && sound.ready}
          aria-label={
            language === "de"
              ? sound.enabled && sound.ready
                ? "Ton ausschalten"
                : "Ton aktivieren"
              : sound.enabled && sound.ready
                ? "Mute sound"
                : "Enable sound"
          }
        >
          {sound.enabled && sound.ready ? (
            <Volume2 size={18} />
          ) : (
            <VolumeX size={18} />
          )}
          <span>
            {language === "de"
              ? sound.enabled && sound.ready
                ? "Ton an"
                : "Ton aus"
              : sound.enabled && sound.ready
                ? "Sound on"
                : "Sound off"}
          </span>
        </button>
        <div className="language-picker">
          <Globe2 size={17} />
          <label className="sr-only" htmlFor="language">
            {t.language}
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
          </select>
        </div>
      </header>
      <main>
        {!roomCode ? (
          <>
            <section className="hero">
              <div className="hero-copy">
                <h1>
                  {language === "de"
                    ? "Zeit für eine Kopfpause."
                    : "Time for a brain break."}
                </h1>
                <p className="hero-intro">{t.intro}</p>
                <div className="hero-facts">
                  <span>
                    <Clock3 size={17} />
                    {t.minutes}
                  </span>
                  <span>
                    <Users size={17} />
                    {t.players}
                  </span>
                  <span>
                    <CheckCircle2 size={17} />
                    {t.noAccount}
                  </span>
                </div>
                <div className="category-peek">
                  <div>
                    <Shuffle size={20} />
                    <span>
                      {language === "de"
                        ? "Zufälliger Mix aus "
                        : "Random mix of "}
                      {games.filter((game) => game !== "mixed").length}
                      {language === "de" ? " Spielarten" : " game types"}
                    </span>
                  </div>
                  <div>
                    <CircleHelp size={20} />
                    <span>
                      {language === "de"
                        ? "Erklärung vor jeder Runde"
                        : "Instructions before every round"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="entry-card">
                <div className="entry-art">
                  <BrainArt />
                </div>
                <div className="entry-form">
                  <div
                    className="entry-tabs"
                    role="tablist"
                    aria-label={t.room}
                  >
                    <button
                      role="tab"
                      aria-selected={mode === "create"}
                      onClick={() => {
                        setMode("create");
                        setFormError(null);
                      }}
                    >
                      {t.create}
                    </button>
                    <button
                      role="tab"
                      aria-selected={mode === "join"}
                      onClick={() => {
                        setMode("join");
                        setFormError(null);
                      }}
                    >
                      {t.join}
                    </button>
                  </div>
                  <form onSubmit={enter}>
                    <label htmlFor="player-name">{t.yourName}</label>
                    <input
                      id="player-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      required
                      maxLength={24}
                      autoComplete="nickname"
                      disabled={busy}
                    />
                    {mode === "join" && (
                      <>
                        <label htmlFor="room-code">{t.code}</label>
                        <input
                          id="room-code"
                          className="code-input"
                          value={code}
                          onChange={(e) =>
                            setCode(
                              e.target.value
                                .toUpperCase()
                                .replace(/[^A-Z0-9]/g, "")
                                .slice(0, 6),
                            )
                          }
                          placeholder={t.codePlaceholder}
                          required
                          minLength={6}
                          maxLength={6}
                          autoComplete="off"
                          disabled={busy}
                        />
                      </>
                    )}
                    {formError && (
                      <p className="error-message" role="alert">
                        {errors[language][formError]}
                      </p>
                    )}
                    {formError === "UNAUTHORIZED" && (
                      <div className="identity-recovery">
                        <p>{t.resetNote}</p>
                        <button
                          type="button"
                          className="button secondary"
                          onClick={() => {
                            resetIdentity();
                            setFormError(null);
                          }}
                        >
                          {t.resetIdentity}
                        </button>
                      </div>
                    )}
                    <button
                      className="button primary entry-submit"
                      disabled={busy}
                    >
                      {busy
                        ? t.joining
                        : mode === "create"
                          ? t.createCta
                          : t.joinCta}
                      <ArrowRight size={19} />
                    </button>
                    <p className="identity-note">
                      {storageAvailable ? t.identityNote : t.storageBlocked}
                    </p>
                  </form>
                </div>
              </div>
            </section>
            <section className="home-ranking">
              <div className="section-heading">
                <span className="eyebrow">{t.friendly}</span>
                <h2>{t.weekly}</h2>
                <p className="muted">{ranking?.week}</p>
              </div>
              <div className="ranking-card">
                <div className="ranking-tabs">
                  <button
                    className={rankingTab === "weekly" ? "active" : ""}
                    onClick={() => setRankingTab("weekly")}
                  >
                    {t.weekly}
                  </button>
                  <button
                    className={rankingTab === "allTime" ? "active" : ""}
                    onClick={() => setRankingTab("allTime")}
                  >
                    {t.allTime}
                  </button>
                </div>
                {rankingError ? (
                  <p className="ranking-empty" role="status">
                    {t.rankingError}
                  </p>
                ) : !ranking ? (
                  <p className="ranking-empty">{t.loadingRanking}</p>
                ) : (
                  <Ranking rows={currentRows} language={language} />
                )}
              </div>
            </section>
          </>
        ) : (
          <div className="game-shell">
            <div className="game-topline">
              <button className="text-button" onClick={home}>
                <X size={15} />
                {t.leave}
              </button>
              <div
                className={`connection-status ${online ? "online" : ""}`}
                role="status"
              >
                <span />
                {online
                  ? t.connected
                  : room.status === "connecting"
                    ? t.reconnecting
                    : t.offline}
              </div>
              <span className="room-badge">
                {t.room} <strong>{roomCode}</strong>
              </span>
            </div>
            {room.error && (
              <div className="error-message game-error" role="alert">
                {errors[language][room.error]}
                <button className="text-button" onClick={room.retry}>
                  {t.retry}
                </button>
              </div>
            )}
            {!state ? (
              <div className="connecting-card">
                <Brain size={50} />
                <h2>{t.connecting}</h2>
                <button className="button secondary" onClick={room.retry}>
                  {t.retry}
                </button>
              </div>
            ) : (
              <>
                <div className="pack-line">
                  <span>
                    {t.pack} · {state.pack.title} · {state.pack.week}
                  </span>
                  {state.pack.reused && (
                    <span className="reused-tag">{t.reused}</span>
                  )}
                </div>
                {(state.pack.fallback ||
                  state.question?.fallback ||
                  state.reveal?.fallback) && (
                  <p className="fallback-note" role="status">
                    {t.fallback}
                  </p>
                )}
                {state.phase === "lobby" ? (
                  <div className="lobby-layout">
                    <section className="lobby-main">
                      <span className="eyebrow">{t.gather}</span>
                      <h1>{t.roomReady}</h1>
                      <p className="muted">{t.inviteIntro}</p>
                      <div className="invite-box">
                        <span>{t.code}</span>
                        <strong>{state.code}</strong>
                        <button
                          className="button secondary"
                          onClick={copyInvite}
                        >
                          {copied ? <Check size={18} /> : <Copy size={18} />}{" "}
                          {copied ? t.copied : t.copyLink}
                        </button>
                        {copyFallback && (
                          <label className="copy-fallback">
                            {t.copyFailed}
                            <input
                              readOnly
                              value={`${location.origin}/room/${roomCode}`}
                              onFocus={(e) => e.target.select()}
                            />
                          </label>
                        )}
                      </div>
                      <div className="lobby-rules">
                        <span>
                          <Clock3 size={18} />
                          {language === "de"
                            ? "6 Spiele mit Erklärung"
                            : "6 games with instructions"}
                        </span>
                        <span>
                          <Trophy size={18} />
                          {number(1000, language)} {t.points}
                        </span>
                        <button
                          className="text-button"
                          onClick={() => setRules(true)}
                        >
                          {t.rules}
                          <ChevronRight size={16} />
                        </button>
                      </div>
                      {state.hostId === state.me.id ? (
                        <>
                          <button
                            className="button primary start-button"
                            onClick={() =>
                              room.send(
                                (
                                  state.availableModes ??
                                  state.availableCategories
                                ).includes("mixed")
                                  ? {
                                      type: "start",
                                      mode: "mixed",
                                      tutorials: true,
                                    }
                                  : { type: "start" },
                              )
                            }
                            disabled={
                              state.players.filter((p) => p.connected).length <
                                2 || !online
                            }
                          >
                            {t.start}
                            <ArrowRight size={19} />
                          </button>
                          <p className="small muted">{t.minimum}</p>
                        </>
                      ) : (
                        <p className="waiting-host">
                          <Radio size={18} />
                          {t.waitingHost}
                        </p>
                      )}
                    </section>
                    <aside className="players-card">
                      <div className="players-heading">
                        <h3>{t.lobby}</h3>
                        <span>{state.players.length}/30</span>
                      </div>
                      <div className="player-list">
                        {state.players.map((p, i) => (
                          <div className="player-row" key={p.id}>
                            <span className={`avatar avatar-${i % 4}`}>
                              {Array.from(p.name)[0]?.toUpperCase()}
                            </span>
                            <div>
                              <strong>{p.name}</strong>
                              <small>
                                {p.id === state.me.id
                                  ? t.you
                                  : p.id === state.hostId
                                    ? t.host
                                    : ""}
                              </small>
                            </div>
                            <span
                              className={`presence ${p.connected ? "here" : ""}`}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="small muted">
                        {state.players.length} {t.people}
                      </p>
                    </aside>
                  </div>
                ) : state.phase === "tutorial" ? (
                  <Tutorial
                    key={`${state.code}-${state.round}`}
                    state={state}
                    language={language}
                    online={online}
                    offset={room.clockOffset.current}
                    send={room.send}
                  />
                ) : state.phase === "voting" ? (
                  <section className="voting-stage">
                    <div className="stage-heading">
                      <div>
                        <span className="eyebrow">{t.pick}</span>
                        <h1>{t.voting}</h1>
                        <p>{t.voteHint}</p>
                      </div>
                      <Countdown
                        endsAt={state.endsAt}
                        offset={room.clockOffset.current}
                        label="s"
                      />
                    </div>
                    <div className="voting-cards">
                      {(state.availableModes ?? state.availableCategories).map(
                        (cat) => (
                          <button
                            className={`vote-card vote-${cat} ${state.me.vote === cat ? "chosen" : ""}`}
                            key={cat}
                            disabled={!online}
                            onClick={() =>
                              room.send({ type: "vote", category: cat })
                            }
                          >
                            <span className="vote-icon">
                              <CategoryIcon category={cat} size={36} />
                            </span>
                            <span className="eyebrow">
                              {categories[language][cat].label}
                            </span>
                            <h2>{categories[language][cat].title}</h2>
                            <p>{categories[language][cat].description}</p>
                            <span className="vote-bottom">
                              <span>
                                {number(state.votes[cat], language)} {t.votes}
                              </span>
                              {state.me.vote === cat ? (
                                <span>
                                  <Check size={16} />
                                  {t.voted}
                                </span>
                              ) : (
                                <ArrowRight size={20} />
                              )}
                            </span>
                          </button>
                        ),
                      )}
                    </div>
                    <p className="vote-tie">
                      <Sparkles size={16} />
                      {t.tied}
                    </p>
                  </section>
                ) : state.phase === "question" || state.phase === "reveal" ? (
                  <section className="question-stage">
                    <div className="question-top">
                      <span className={`category-pill pill-${state.category}`}>
                        <CategoryIcon category={state.category!} size={19} />
                        {categories[language][state.category!].title}
                      </span>
                      <div
                        className="round-dots"
                        aria-label={`${t.question} ${state.round + 1} ${t.of} ${state.totalRounds}`}
                      >
                        {Array.from({ length: state.totalRounds }, (_, i) => (
                          <span
                            key={i}
                            className={
                              i === state.round
                                ? "current"
                                : i < state.round
                                  ? "done"
                                  : ""
                            }
                          />
                        ))}
                      </div>
                      <Countdown
                        endsAt={state.endsAt}
                        offset={room.clockOffset.current}
                        label="s"
                      />
                    </div>
                    <div className="question-card">
                      <span className="eyebrow">
                        {state.phase === "reveal"
                          ? t.reveal
                          : `${t.round} ${String(state.round + 1).padStart(2, "0")} / ${String(state.totalRounds).padStart(2, "0")}`}
                      </span>
                      <h1>{state.question?.prompt}</h1>
                      {state.question?.difficulty && (
                        <p
                          className={`difficulty-badge difficulty-${state.question.difficulty}`}
                        >
                          {t.difficulty}:{" "}
                          <strong>{t.levels[state.question.difficulty]}</strong>
                        </p>
                      )}
                      {state.question?.category === "drawing" && (
                        <DrawingGame
                          key={state.question.id}
                          state={state}
                          language={language}
                          online={online}
                          offset={room.clockOffset.current}
                          send={room.send}
                          feedback={room.guessFeedback}
                        />
                      )}
                      {state.question?.category === "association" && (
                        <AssociationGame
                          key={state.question.id}
                          state={state}
                          language={language}
                          online={online}
                          offset={room.clockOffset.current}
                          send={room.send}
                        />
                      )}
                      {state.puzzle && state.question && (
                        <PuzzleGame
                          key={state.question.id}
                          state={state}
                          language={language}
                          online={online}
                          offset={room.clockOffset.current}
                          send={room.send}
                          error={room.error}
                        />
                      )}
                      {state.phase === "question" &&
                        state.question?.category === "geography" && (
                          <GeoGame
                            key={state.question.id}
                            state={state}
                            language={language}
                            online={online}
                            offset={room.clockOffset.current}
                            send={room.send}
                          />
                        )}
                      {state.phase === "question" && state.question
                        ? !isPuzzleCategory(state.question.category) &&
                          !["drawing", "association", "geography"].includes(
                            state.question.category,
                          ) && (
                            <AnswerPanel
                              key={state.question.id}
                              state={state}
                              language={language}
                              online={online}
                              offset={room.clockOffset.current}
                              send={room.send}
                            />
                          )
                        : state.reveal && (
                            <div className="reveal-panel">
                              <span className="solution-label">
                                <CheckCircle2 size={19} />
                                {t.solution}
                              </span>
                              <h2>
                                {state.category === "sets"
                                  ? language === "de"
                                    ? "Eine passende Gruppe"
                                    : "A matching group"
                                  : state.category === "connections"
                                    ? language === "de"
                                      ? "Die Wortgruppen"
                                      : "The word groups"
                                    : state.category === "association"
                                      ? language === "de"
                                        ? "Die Wortverbindungen"
                                        : "The word connections"
                                      : answerText(
                                          state.question,
                                          state.reveal.answer,
                                          language,
                                        )}
                                {state.question?.unit && (
                                  <small> {state.question.unit}</small>
                                )}
                              </h2>
                              <p className="explanation">
                                {state.reveal.explanation}
                              </p>
                              <div className="reveal-score">
                                <Trophy size={23} />
                                <strong>
                                  +
                                  {number(
                                    state.reveal.scores.find(
                                      (s) => s.playerId === state.me.id,
                                    )?.points || 0,
                                    language,
                                  )}
                                </strong>
                                <span>
                                  {t.points} · {t.thisRound}
                                </span>
                              </div>
                              <div className="reveal-answers">
                                {state.reveal.scores.map((s) => {
                                  const p = state.players.find(
                                    (p) => p.id === s.playerId,
                                  );
                                  return (
                                    <div key={s.playerId}>
                                      <span>{p?.name}</span>
                                      <span>
                                        {answerText(
                                          state.question,
                                          s.answer,
                                          language,
                                        )}
                                      </span>
                                      <strong>
                                        +{number(s.points, language)}
                                      </strong>
                                    </div>
                                  );
                                })}
                              </div>
                              <p className="auto-next">
                                {state.round === state.totalRounds - 1
                                  ? t.lastReveal
                                  : t.nextRound}
                              </p>
                              {state.adaptation &&
                                state.round < state.totalRounds - 1 && (
                                  <p className="adaptation-note">
                                    <span>
                                      {state.adaptation.successCount}/
                                      {state.adaptation.eligibleCount}{" "}
                                      {t.groupSuccess}
                                    </span>
                                    <strong>
                                      {t.nextDifficulty}:{" "}
                                      {
                                        t.levels[
                                          state.adaptation.nextDifficulty
                                        ]
                                      }
                                    </strong>
                                  </p>
                                )}
                            </div>
                          )}
                    </div>
                    <div className="question-footer">
                      <span>
                        <Users size={17} />
                        {
                          state.players.filter(
                            (p) =>
                              p.answered &&
                              (state.category !== "drawing" ||
                                p.id !== state.drawing?.artistId) &&
                              !Object.values(
                                state.association?.teams ?? {},
                              ).some((team) => team.captainId === p.id),
                          ).length
                        }
                        /
                        {state.players.length -
                          (state.category === "drawing"
                            ? 1
                            : state.association
                              ? Object.values(state.association.teams).filter(
                                  (team) => team.captainId,
                                ).length
                              : 0)}{" "}
                        {state.category === "drawing"
                          ? t.drawingGuessed
                          : t.answered}
                      </span>
                      <span>
                        {t.yourScore}:{" "}
                        <strong>{number(state.me.score, language)}</strong>
                      </span>
                    </div>
                  </section>
                ) : (
                  <section className="result-stage">
                    <div className="result-title">
                      <span className="trophy-art">
                        <Trophy size={48} strokeWidth={1.4} />
                        <Sparkles size={21} />
                      </span>
                      <span className="eyebrow">{t.finish}</span>
                      <h1>{t.results}</h1>
                      <p>{t.resultsHint}</p>
                      <div className="personal-score">
                        <span>{t.yourScore}</span>
                        <strong>{number(state.me.score, language)}</strong>
                        <small>{t.points}</small>
                      </div>
                    </div>
                    {state.saving && (
                      <p className="save-status" role="status">
                        {t.saving}
                      </p>
                    )}
                    {state.saveError && (
                      <p className="error-message" role="alert">
                        {t.saveError}
                      </p>
                    )}
                    <div className="ranking-card results-ranking">
                      <div className="ranking-tabs">
                        {(["session", "weekly", "allTime"] as const).map(
                          (tab) => (
                            <button
                              key={tab}
                              className={rankingTab === tab ? "active" : ""}
                              onClick={() => setRankingTab(tab)}
                            >
                              {tab === "session"
                                ? t.sessionRanking
                                : tab === "weekly"
                                  ? t.weekly
                                  : t.allTime}
                            </button>
                          ),
                        )}
                      </div>
                      <Ranking
                        rows={currentRows}
                        language={language}
                        me={state.me.id}
                        showSessions={rankingTab !== "session"}
                      />
                    </div>
                    <button
                      className="button primary another-button"
                      onClick={home}
                    >
                      {t.another}
                      <ArrowRight size={18} />
                    </button>
                  </section>
                )}
              </>
            )}
          </div>
        )}
      </main>
      <footer className="site-footer">
        <span>
          <Brain size={17} />
          {t.footer}
        </span>
        <button className="text-button" onClick={() => setRules(true)}>
          {t.rules}
          <Link2 size={15} />
        </button>
      </footer>
      {rules && <Rules language={language} close={() => setRules(false)} />}
    </div>
  );
}
