import { useEffect, useId, useState } from "react";
import { Check, Delete, Send } from "lucide-react";
import type { FormEvent } from "react";
import type { Language, RoomView } from "../shared/types";
import type { PuzzleAction, PuzzleView } from "../shared/puzzles";
import type { useRoom } from "./useRoom";

const words = {
  de: {
    submit: "Prüfen",
    confirm: "Bestätigen",
    pending: "Wird geprüft …",
    locked: "Deine Runde ist abgeschlossen.",
    solved: "Geschafft!",
    attempts: "Versuche",
    mistakes: "Fehlversuche",
    correct: "richtige Position",
    present: "andere Position",
    absent: "fehlt",
    erase: "Letzte Eingabe löschen",
    guess: "Dein Versuch",
    clueDe: "Hinweis auf Deutsch",
    clueEn: "Hinweis auf Englisch",
    clueSend: "Hinweis senden",
    waiting: "Warte auf den Hinweis.",
    captain: "Du gibst den Hinweis.",
    target: "Dein geheimes Ziel",
    scale: "Deine Position",
    preview: "Merk dir die Folge.",
    recall: "Welche Folge hast du gesehen?",
    countryFlag: "Flagge des gesuchten Landes",
    countryOutline: "Umriss des gesuchten Landes",
    incorrect: "Diese Auswahl passt noch nicht.",
    wordNote:
      "Ein englisches Wort mit fünf Buchstaben. Grün ✓ = richtig, gelb • = vorhanden, grau × = fehlt.",
    codeNote:
      "Ziffern können sich wiederholen. Nutze das Feedback für den nächsten Versuch.",
    neutral: "Noch kein Buchstabe",
    chooseThree: "Wähle drei Karten.",
    chooseFour: "Wähle vier Wörter.",
    matched: "Gefundene Gruppen",
    own: "Deine Folge",
    positions: "Positionen",
    auto: "Vorbereiteter Hinweis",
    doneWaiting:
      "Die anderen spielen noch. Die Auflösung kommt, sobald alle fertig sind.",
    shape: ["Kreis", "Quadrat", "Dreieck"],
    color: ["Grün", "Violett", "Ocker"],
    fill: ["gefüllt", "gestreift", "umrandet"],
    features: "Prüfe diese Merkmale",
    featureNames: ["Form", "Farbe", "Anzahl", "Füllung"],
  },
  en: {
    submit: "Check",
    confirm: "Confirm",
    pending: "Checking …",
    locked: "Your round is complete.",
    solved: "Solved!",
    attempts: "Attempts",
    mistakes: "Wrong attempts",
    correct: "correct position",
    present: "another position",
    absent: "absent",
    erase: "Delete last entry",
    guess: "Your attempt",
    clueDe: "Clue in German",
    clueEn: "Clue in English",
    clueSend: "Send clue",
    waiting: "Wait for the clue.",
    captain: "You give the clue.",
    target: "Your secret target",
    scale: "Your position",
    preview: "Remember the sequence.",
    recall: "What sequence did you see?",
    countryFlag: "Flag of the mystery country",
    countryOutline: "Outline of the mystery country",
    incorrect: "That selection does not match yet.",
    wordNote:
      "A five-letter English word. Green ✓ = correct, yellow • = present, grey × = absent.",
    codeNote: "Digits may repeat. Use the feedback for your next attempt.",
    neutral: "No letter yet",
    chooseThree: "Choose three cards.",
    chooseFour: "Choose four words.",
    matched: "Groups found",
    own: "Your sequence",
    positions: "Positions",
    auto: "Prepared clue",
    doneWaiting:
      "Others are still playing. The reveal starts when everyone is done.",
    shape: ["Circle", "Square", "Triangle"],
    color: ["Green", "Purple", "Ochre"],
    fill: ["solid", "striped", "outlined"],
    features: "Check these features",
    featureNames: ["shape", "colour", "count", "fill"],
  },
};

function SetCard({
  card,
  features,
  language,
}: {
  card: NonNullable<PuzzleView["cards"]>[number];
  features: number;
  language: Language;
}) {
  const id = useId().replace(/:/g, "");
  const count = features >= 3 ? card.count : 1;
  const fill = features >= 4 ? card.fill : 0;
  const color = ["#476452", "#765683", "#a07628"][card.color];
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true">
      <defs>
        <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 0v6" stroke={color} strokeWidth="2" />
        </pattern>
      </defs>
      {Array.from({ length: count }, (_, i) => {
        const x = 60 + (i - (count - 1) / 2) * 32;
        const props = {
          fill: fill === 2 ? "none" : fill === 1 ? `url(#${id})` : color,
          stroke: color,
          strokeWidth: 2.5,
        };
        return card.shape === 0 ? (
          <circle key={i} cx={x} cy="40" r="12" {...props} />
        ) : card.shape === 1 ? (
          <rect
            key={i}
            x={x - 12}
            y="28"
            width="24"
            height="24"
            rx="2"
            {...props}
          />
        ) : (
          <path key={i} d={`M${x} 26l14 26h-28Z`} {...props} />
        );
      })}
      <title>{words[language].shape[card.shape]}</title>
    </svg>
  );
}

export function PuzzleGame({
  state,
  language,
  online,
  offset,
  send,
  error,
}: {
  state: RoomView;
  language: Language;
  online: boolean;
  offset: number;
  send: ReturnType<typeof useRoom>["send"];
  error: string | null;
}) {
  const t = words[language];
  const p = state.puzzle!;
  const question = state.question!;
  const [now, setNow] = useState(Date.now());
  const [draft, setDraft] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [position, setPosition] = useState(() =>
    Number.isFinite(Number(p.progress.value)) ? Number(p.progress.value) : 50,
  );
  const [clueDe, setClueDe] = useState("");
  const [clueEn, setClueEn] = useState("");
  const [pending, setPending] = useState(false);
  const stamp = JSON.stringify(p.progress);
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    setPending(false);
    setSelected([]);
    setDraft("");
  }, [stamp]);
  useEffect(() => {
    if (error || !online || p.clue) setPending(false);
  }, [error, online, p.clue]);
  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(() => setPending(false), 4000);
    return () => clearTimeout(timer);
  }, [pending]);
  const reveal = state.phase === "reveal";
  const ended = state.endsAt !== null && now + offset >= state.endsAt;
  const disabled = !online || ended || reveal || p.progress.done || pending;
  const preview = p.kind === "memory" && now + offset < (p.previewEndsAt ?? 0);
  const captain = p.captainId === state.me.id;
  const clueEnded = now + offset >= (p.clueEndsAt ?? Infinity);
  function act(action: PuzzleAction) {
    if (disabled) return;
    if (send({ type: "puzzleAction", questionId: question.id, action }))
      setPending(true);
  }
  function guess(event: FormEvent) {
    event.preventDefault();
    if (draft.trim()) act({ kind: "guess", value: draft.trim() });
  }
  function toggle(id: string, limit: number) {
    if (disabled) return;
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : previous.length < limit
          ? [...previous, id]
          : previous,
    );
  }
  const label = pending ? t.pending : t.submit;
  const matchedIds = new Set(p.groups?.flatMap((group) => group.ids));
  const memoryEntry = p.progress.done
    ? (p.progress.selections?.[0] ??
      p.progress.value?.split("→").map((item) => item.trim()) ??
      [])
    : selected;
  const countrySelection = reveal
    ? question.options?.find((option) => option.text === p.solution)?.id
    : p.progress.done
      ? p.progress.value
      : selected[0];
  const setSelection = reveal
    ? (p.solutionIds ?? [])
    : p.progress.done
      ? (p.progress.selections?.at(-1) ?? [])
      : selected;
  const status =
    p.progress.feedback === "incorrect"
      ? t.incorrect
      : p.progress.success
        ? t.solved
        : "";
  return (
    <section className={`puzzle-game puzzle-${p.kind}`}>
      {(p.kind === "code" || p.kind === "wordle") && (
        <>
          <p className="muted">
            {p.kind === "wordle" ? t.wordNote : t.codeNote}
          </p>
          <div className="puzzle-guesses" aria-label={t.attempts}>
            {Array.from({ length: p.maxAttempts ?? 6 }, (_, index) => {
              const attempt = p.progress.guesses?.[index];
              return (
                <div className="puzzle-guess-row" key={index}>
                  <span className="attempt-number">{index + 1}</span>
                  <div className="letter-row">
                    {Array.from({ length: p.length ?? 5 }, (_, i) => {
                      const letter = attempt?.value[i] ?? "";
                      const feedback =
                        p.kind === "wordle" && attempt
                          ? attempt.feedback[i]
                          : undefined;
                      const description =
                        feedback === 2
                          ? t.correct
                          : feedback === 1
                            ? t.present
                            : t.absent;
                      return (
                        <span
                          className={`letter-cell ${feedback === undefined ? "" : `feedback-${feedback}`}`}
                          key={i}
                          aria-label={
                            letter
                              ? `${letter}${feedback === undefined ? "" : `, ${description}`}`
                              : t.neutral
                          }
                        >
                          {letter}
                          {feedback !== undefined && (
                            <small aria-hidden="true">
                              {feedback === 2
                                ? "✓"
                                : feedback === 1
                                  ? "•"
                                  : "×"}
                            </small>
                          )}
                        </span>
                      );
                    })}
                  </div>
                  {p.kind === "code" && attempt && (
                    <span className="code-feedback">
                      <span className="code-exact">
                        {attempt.feedback[0]} ✓ {t.correct}
                      </span>
                      <span className="code-misplaced">
                        {attempt.feedback[1]} • {t.present}
                      </span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {!reveal && !p.progress.done && (
            <form className="puzzle-guess-form" onSubmit={guess}>
              <label htmlFor="puzzle-guess">
                {t.guess}
                <input
                  id="puzzle-guess"
                  value={draft}
                  disabled={disabled}
                  maxLength={p.length ?? 5}
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  inputMode={p.kind === "code" ? "numeric" : "text"}
                  onChange={(event) =>
                    setDraft(
                      p.kind === "wordle"
                        ? event.target.value
                            .replace(/[^a-z]/gi, "")
                            .toUpperCase()
                        : event.target.value.replace(/[^0-9]/g, ""),
                    )
                  }
                />
              </label>
              <button
                className="button primary"
                disabled={disabled || draft.length !== p.length}
              >
                {label}
                <Send size={17} />
              </button>
            </form>
          )}
          {p.kind === "code" && !reveal && !p.progress.done && (
            <div className="symbol-palette">
              {p.symbols?.map((symbol) => (
                <button
                  disabled={disabled || draft.length >= (p.length ?? 0)}
                  key={symbol}
                  onClick={() => setDraft((value) => value + symbol)}
                >
                  {symbol}
                </button>
              ))}
              <button
                disabled={disabled || !draft}
                aria-label={t.erase}
                onClick={() => setDraft((value) => value.slice(0, -1))}
              >
                <Delete size={20} />
              </button>
            </div>
          )}
        </>
      )}
      {p.kind === "sets" && (
        <>
          <p>
            {t.chooseThree}{" "}
            <span className="small muted">
              {t.features}:{" "}
              {t.featureNames.slice(0, p.features ?? 4).join(", ")}.
            </span>
          </p>
          <div className="set-board">
            {p.cards?.map((card) => (
              <button
                key={card.id}
                className={setSelection.includes(card.id) ? "selected" : ""}
                disabled={disabled}
                aria-pressed={setSelection.includes(card.id)}
                aria-label={[
                  t.shape[card.shape],
                  t.color[card.color],
                  ...(p.features! >= 3 ? [String(card.count)] : []),
                  ...(p.features! >= 4 ? [t.fill[card.fill]] : []),
                ].join(", ")}
                onClick={() => toggle(card.id, 3)}
              >
                <SetCard
                  card={card}
                  features={p.features ?? 4}
                  language={language}
                />
                {setSelection.includes(card.id) && (
                  <Check size={16} className="card-check" />
                )}
              </button>
            ))}
          </div>
          {!reveal && !p.progress.done && (
            <button
              className="button primary"
              disabled={disabled || selected.length !== 3}
              onClick={() => act({ kind: "select", ids: selected })}
            >
              {label} · {selected.length}/3
            </button>
          )}
        </>
      )}
      {p.kind === "connections" && (
        <>
          <p>{t.chooseFour}</p>
          {!!p.groups?.length && (
            <div className="connection-groups" aria-label={t.matched}>
              {p.groups.map((group) => (
                <div key={group.id}>
                  <strong>{group.title}</strong>
                  <span>
                    {group.ids
                      .map(
                        (id) =>
                          question.options?.find((option) => option.id === id)
                            ?.text ?? id,
                      )
                      .join(" · ")}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="connection-board">
            {question.options
              ?.filter((option) => !matchedIds.has(option.id))
              .map((option) => (
                <button
                  key={option.id}
                  aria-pressed={selected.includes(option.id)}
                  disabled={disabled}
                  className={selected.includes(option.id) ? "selected" : ""}
                  onClick={() => toggle(option.id, p.groupSize ?? 4)}
                >
                  {option.text}
                </button>
              ))}
          </div>
          {!reveal && !p.progress.done && (
            <button
              className="button primary"
              disabled={disabled || selected.length !== (p.groupSize ?? 4)}
              onClick={() => act({ kind: "select", ids: selected })}
            >
              {label} · {selected.length}/{p.groupSize ?? 4}
            </button>
          )}
        </>
      )}
      {p.kind === "memory" && (
        <>
          <p>{preview ? t.preview : t.recall}</p>
          {preview ? (
            <div className="memory-sequence" aria-label={t.preview}>
              {p.sequence?.map((symbol, index) => (
                <span key={index}>{symbol}</span>
              ))}
              <small>
                {Math.max(
                  0,
                  Math.ceil(((p.previewEndsAt ?? 0) - now - offset) / 1000),
                )}{" "}
                s
              </small>
            </div>
          ) : (
            <>
              <div className="memory-sequence" aria-label={t.own}>
                {Array.from({ length: p.length ?? 4 }, (_, index) => (
                  <span key={index}>{memoryEntry[index] ?? "·"}</span>
                ))}
              </div>
              {!reveal && !p.progress.done && (
                <>
                  <div className="symbol-palette">
                    {p.symbols?.map((symbol) => (
                      <button
                        key={symbol}
                        disabled={
                          disabled || selected.length >= (p.length ?? 0)
                        }
                        onClick={() =>
                          setSelected((previous) => [...previous, symbol])
                        }
                      >
                        {symbol}
                      </button>
                    ))}
                    <button
                      disabled={disabled || !selected.length}
                      aria-label={t.erase}
                      onClick={() =>
                        setSelected((previous) => previous.slice(0, -1))
                      }
                    >
                      <Delete size={20} />
                    </button>
                  </div>
                  <button
                    className="button primary"
                    disabled={disabled || selected.length !== p.length}
                    onClick={() => act({ kind: "select", ids: selected })}
                  >
                    {pending ? t.pending : t.confirm}
                  </button>
                </>
              )}
            </>
          )}
        </>
      )}
      {p.kind === "countries" && (
        <>
          <img
            className={`country-image country-${p.imageKind}`}
            src={p.image}
            alt={p.imageKind === "outline" ? t.countryOutline : t.countryFlag}
          />
          <div className="country-options">
            {question.options?.map((option) => (
              <button
                key={option.id}
                className={countrySelection === option.id ? "selected" : ""}
                aria-pressed={countrySelection === option.id}
                disabled={disabled}
                onClick={() => setSelected([option.id])}
              >
                {option.text}
              </button>
            ))}
          </div>
          {!reveal && !p.progress.done && (
            <button
              className="button primary"
              disabled={disabled || selected.length !== 1}
              onClick={() => act({ kind: "select", ids: selected })}
            >
              {pending ? t.pending : t.confirm}
            </button>
          )}
        </>
      )}
      {p.kind === "wavelength" && (
        <>
          <div className="scale-extremes">
            <strong>{p.left}</strong>
            <strong>{p.right}</strong>
          </div>
          {captain && !reveal && (
            <p className="wavelength-target">
              {t.captain} {t.target}: <strong>{p.target}/100</strong>
            </p>
          )}
          {p.clue ? (
            <div className="wavelength-clue">
              <small>
                {p.automaticClue
                  ? t.auto
                  : language === "de"
                    ? "Der Hinweis"
                    : "The clue"}
              </small>
              <strong>{p.clue}</strong>
            </div>
          ) : captain && !reveal ? (
            <form
              className="wavelength-clue-form"
              onSubmit={(event) => {
                event.preventDefault();
                if (!clueEnded && clueDe.trim() && clueEn.trim())
                  act({ kind: "clue", de: clueDe.trim(), en: clueEn.trim() });
              }}
            >
              <p className="small muted">
                {Math.max(
                  0,
                  Math.ceil(((p.clueEndsAt ?? 0) - now - offset) / 1000),
                )}{" "}
                s
              </p>
              <label>
                {t.clueDe}
                <input
                  value={clueDe}
                  maxLength={80}
                  disabled={disabled || clueEnded}
                  onChange={(event) => setClueDe(event.target.value)}
                />
              </label>
              <label>
                {t.clueEn}
                <input
                  value={clueEn}
                  maxLength={80}
                  disabled={disabled || clueEnded}
                  onChange={(event) => setClueEn(event.target.value)}
                />
              </label>
              <button
                className="button primary"
                disabled={
                  disabled || clueEnded || !clueDe.trim() || !clueEn.trim()
                }
              >
                {pending ? t.pending : t.clueSend}
              </button>
            </form>
          ) : (
            <p role="status">{t.waiting}</p>
          )}
          {!captain && (!reveal || Boolean(p.progress.value)) && (
            <div className="wavelength-control">
              <label htmlFor="wavelength-position">
                {t.scale}: <strong>{position}/100</strong>
              </label>
              <input
                id="wavelength-position"
                type="range"
                min="0"
                max="100"
                step="1"
                value={position}
                disabled={disabled || !p.clue}
                onChange={(event) => setPosition(Number(event.target.value))}
              />
              {!reveal && !p.progress.done && (
                <button
                  className="button primary"
                  disabled={disabled || !p.clue}
                  onClick={() =>
                    act({ kind: "guess", value: String(position) })
                  }
                >
                  {pending ? t.pending : t.confirm}
                </button>
              )}
            </div>
          )}
        </>
      )}
      {p.kind === "wavelength" && reveal && (
        <p>
          {language === "de" ? "Zielposition" : "Target position"}:{" "}
          <strong>{p.target}/100</strong>
        </p>
      )}
      {!!p.maxAttempts && (
        <p className="small muted">
          {p.kind === "connections" ? t.mistakes : t.attempts}:{" "}
          {p.progress.attempts}/{p.maxAttempts}
        </p>
      )}
      <p className="puzzle-feedback" role="status">
        {status}
      </p>
      {!reveal && p.progress.done && (
        <div className="puzzle-done">
          <Check size={20} />
          <div>
            <strong>{t.locked}</strong>
            <p>{t.doneWaiting}</p>
          </div>
        </div>
      )}
      {!online && (
        <p role="status">
          {language === "de"
            ? "Warte auf die Wiederverbindung, bevor du weiterspielst."
            : "Wait for reconnection before continuing."}
        </p>
      )}
    </section>
  );
}
