import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Lightbulb, Users } from "lucide-react";
import type { Language, RoomView, Team } from "../shared/types";
import type { useRoom } from "./useRoom";

const text = {
  de: {
    cooperative: "Gemeinsam rätseln",
    competitive: "Zwei Teams",
    green: "Team Grün",
    purple: "Team Violett",
    yourTeam: "Euer Team",
    captain: "Du gibst den Hinweis",
    guesser: "Du errätst die Wörter",
    captainRule:
      "Verbinde alle Wörter eures Teams mit einem einzigen Hinweiswort. Die Farbkarte ist nur für die Hinweisgeber sichtbar.",
    clueRule:
      "Ein Wort je Sprache, höchstens 30 Zeichen. Kein Wort von der Karte. Bindestriche sind erlaubt.",
    german: "Hinweis auf Deutsch",
    english: "Hinweis auf Englisch",
    submitClue: "Hinweis senden",
    sending: "Wird gesendet …",
    automaticRule:
      "Nach 15 Sekunden erscheint ein vorbereiteter Hinweis. Für diesen automatischen Hinweis erhältst du keine Hinweisgeber-Punkte.",
    waiting: "Euer Hinweis wird vorbereitet …",
    automatic: "Vorbereiteter Hinweis",
    clue: "Euer Hinweis",
    seconds: "Sekunden für den Hinweis",
    choose: "Wähle genau",
    words: "Wörter",
    selected: "ausgewählt",
    submitGuess: "Auswahl bestätigen",
    locked: "Auswahl gespeichert",
    lockedRule: "Die Auflösung folgt am Ende der Runde.",
    fullSet:
      "Nur die vollständige richtige Auswahl bringt 1.000 Punkte. Deine Auswahl zählt für dich und für euer Team.",
    ownWords: "Diese Wörter gehören zu eurem Team:",
    captainName: "Hinweisgeber",
    clueSent: "Dein Hinweis ist veröffentlicht. Jetzt rät dein Team.",
    noClueTime: "Der vorbereitete Hinweis erscheint gleich.",
    neutral: "Neutral",
    other: "Andere Wörter",
    complete: "Die Runde ist beendet.",
  },
  en: {
    cooperative: "Solve together",
    competitive: "Two teams",
    green: "Team Green",
    purple: "Team Purple",
    yourTeam: "Your team",
    captain: "You give the clue",
    guesser: "You guess the words",
    captainRule:
      "Connect all your team's words with a single clue word. Only clue-givers can see the colour key.",
    clueRule:
      "One word per language, up to 30 characters. No word from the board. Hyphens are allowed.",
    german: "Clue in German",
    english: "Clue in English",
    submitClue: "Send clue",
    sending: "Sending …",
    automaticRule:
      "After 15 seconds, a prepared clue appears. You earn no clue-giver points for this automatic clue.",
    waiting: "Your clue is being prepared …",
    automatic: "Prepared clue",
    clue: "Your clue",
    seconds: "seconds to give the clue",
    choose: "Choose exactly",
    words: "words",
    selected: "selected",
    submitGuess: "Confirm selection",
    locked: "Selection saved",
    lockedRule: "The solution appears at the end of the round.",
    fullSet:
      "Only the complete correct set earns 1,000 points. Your selection counts for you and your team.",
    ownWords: "These words belong to your team:",
    captainName: "Clue-giver",
    clueSent: "Your clue is published. Your team can now guess.",
    noClueTime: "The prepared clue will appear shortly.",
    neutral: "Neutral",
    other: "Other words",
    complete: "The round has ended.",
  },
};

function normalized(value: string): string {
  return value.normalize("NFKC").trim().toLowerCase();
}

export function AssociationGame({
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
  const t = text[language];
  const association = state.association;
  const question = state.question;
  const [now, setNow] = useState(Date.now());
  const [selected, setSelected] = useState<string[]>([]);
  const [clueDe, setClueDe] = useState("");
  const [clueEn, setClueEn] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    setSelected([]);
    setPending(false);
    setClueDe(association?.suggestion?.de ?? "");
    setClueEn(association?.suggestion?.en ?? "");
  }, [question?.id, association?.suggestion?.de, association?.suggestion?.en]);
  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(() => setPending(false), 1500);
    return () => clearTimeout(timer);
  }, [pending]);

  if (!association || !question) return null;
  const team = association.teams[association.team];
  const captain = association.captain;
  const clue = team.clue;
  const ended = state.endsAt !== null && now + offset >= state.endsAt;
  const seconds = Math.max(
    0,
    Math.ceil((association.clueEndsAt - now - offset) / 1000),
  );
  const clueOpen = !clue && seconds > 0 && !ended && state.phase === "question";
  const locked = state.me.answer !== undefined;
  const boardWords = new Set(
    question.options?.map((option) => normalized(option.text)),
  );
  const validClue = [clueDe.trim(), clueEn.trim()].every(
    (word) =>
      word.length <= 30 &&
      /^\p{L}+(?:-\p{L}+)*$/u.test(word) &&
      !boardWords.has(normalized(word)),
  );
  const guessOpen =
    !captain &&
    Boolean(clue) &&
    online &&
    !locked &&
    !pending &&
    !ended &&
    state.phase === "question";
  const chosen =
    locked && typeof state.me.answer === "string"
      ? state.me.answer.split(",")
      : selected;
  const ownWords =
    question.options?.filter(
      (option) => association.key?.[option.id] === association.team,
    ) ?? [];
  const captainName = state.players.find(
    (player) => player.id === team.captainId,
  )?.name;

  function submitClue(event: FormEvent) {
    event.preventDefault();
    if (!question || !clueOpen || !captain || !validClue || !online || pending)
      return;
    if (
      send({
        type: "associationClue",
        questionId: question.id,
        clue: { de: clueDe.trim(), en: clueEn.trim() },
      })
    )
      setPending(true);
  }
  function toggle(id: string) {
    if (!guessOpen) return;
    setSelected((current) =>
      current.includes(id)
        ? current.filter((word) => word !== id)
        : current.length < association!.targetCount
          ? [...current, id]
          : current,
    );
  }
  function submitGuess() {
    if (!question || !guessOpen || selected.length !== association?.targetCount)
      return;
    if (
      send({
        type: "answer",
        questionId: question.id,
        value: [...selected].sort().join(","),
      })
    )
      setPending(true);
  }
  function colourLabel(colour: Team | "neutral"): string {
    if (colour === "neutral") return t.neutral;
    if (association!.cooperative && colour !== association!.team)
      return t.other;
    return t[colour];
  }

  return (
    <div className="association-game">
      <div className="association-role">
        <Users size={18} aria-hidden="true" />
        <strong>
          {association.cooperative ? t.cooperative : t.competitive}
        </strong>
        <span>{captain ? t.captain : t.guesser}</span>
      </div>
      <div
        className="association-team-scores"
        aria-label={association.cooperative ? t.cooperative : t.competitive}
      >
        {(["green", "purple"] as Team[])
          .filter((colour) => !association.cooperative || colour === "green")
          .map((colour) => (
            <div className={`association-team is-${colour}`} key={colour}>
              <strong>
                {association.cooperative ? t.yourTeam : t[colour]}
              </strong>
              {colour === association.team && !association.cooperative && (
                <small>{t.yourTeam}</small>
              )}
              <span>
                {association.teams[colour].score.toLocaleString(
                  language === "de" ? "de-DE" : "en-GB",
                )}
              </span>
              {colour !== association.team &&
                association.teams[colour].clue && (
                  <p className="association-team-clue">
                    {association.teams[colour].clue![language]} ·{" "}
                    {association.targetCount}
                    {association.teams[colour].automatic && (
                      <small> · {t.automatic}</small>
                    )}
                  </p>
                )}
            </div>
          ))}
      </div>

      {captain && (
        <div className="association-captain">
          <p>{t.captainRule}</p>
          <p className="association-own-words">
            <strong>{t.ownWords}</strong>{" "}
            {ownWords.map((option) => option.text).join(" · ")}
          </p>
          {clueOpen ? (
            <form className="association-clue-form" onSubmit={submitClue}>
              <p className="association-clue-timer" role="timer">
                {seconds} {t.seconds}
              </p>
              <div className="association-clue-fields">
                <label>
                  {t.german}
                  <input
                    aria-label={t.german}
                    value={clueDe}
                    onChange={(event) => setClueDe(event.target.value)}
                    maxLength={30}
                    autoComplete="off"
                    lang="de"
                    disabled={!online || pending}
                  />
                </label>
                <label>
                  {t.english}
                  <input
                    aria-label={t.english}
                    value={clueEn}
                    onChange={(event) => setClueEn(event.target.value)}
                    maxLength={30}
                    autoComplete="off"
                    lang="en"
                    disabled={!online || pending}
                  />
                </label>
              </div>
              <p className="hint">{t.clueRule}</p>
              <button
                className="button primary"
                type="submit"
                disabled={!validClue || !online || pending}
              >
                {pending ? t.sending : t.submitClue}
              </button>
            </form>
          ) : (
            <p>
              {clue
                ? team.automatic
                  ? t.automatic
                  : t.clueSent
                : t.noClueTime}
            </p>
          )}
          {!clue && <p className="hint">{t.automaticRule}</p>}
        </div>
      )}

      <div className="association-clue" aria-live="polite">
        <Lightbulb size={20} aria-hidden="true" />
        <div>
          <span>
            {clue ? (team.automatic ? t.automatic : t.clue) : t.waiting}
          </span>
          {clue && (
            <strong>
              {clue[language]} · {association.targetCount}
            </strong>
          )}
          {!clue && !captain && (
            <small>
              {captainName ? `${t.captainName}: ${captainName}` : t.noClueTime}
              {seconds > 0 ? ` · ${seconds}s` : ""}
            </small>
          )}
        </div>
      </div>

      {!captain && (
        <p className="association-progress">
          {t.choose} {association.targetCount} {t.words} · {chosen.length}/
          {association.targetCount} {t.selected}
        </p>
      )}
      <div className="association-board" aria-label={t.words}>
        {question.options?.map((option) => {
          const colour = association.key?.[option.id];
          const picked = chosen.includes(option.id);
          const className = `association-card${colour ? ` is-${colour}` : ""}${picked ? " is-selected" : ""}`;
          return captain ? (
            <div className={className} key={option.id}>
              <strong>{option.text}</strong>
              {colour && <small>{colourLabel(colour)}</small>}
            </div>
          ) : (
            <button
              key={option.id}
              type="button"
              className={className}
              aria-pressed={picked}
              disabled={
                !guessOpen ||
                (!picked && chosen.length >= association.targetCount)
              }
              onClick={() => toggle(option.id)}
            >
              <strong>{option.text}</strong>
              {picked && <CheckCircle2 size={18} aria-hidden="true" />}
              {colour && <small>{colourLabel(colour)}</small>}
            </button>
          );
        })}
      </div>

      {!captain && (
        <div className="association-answer">
          {locked ? (
            <p className="association-locked" role="status">
              <CheckCircle2 size={20} aria-hidden="true" />
              <strong>{t.locked}</strong> {t.lockedRule}
            </p>
          ) : (
            <button
              className="button primary"
              type="button"
              onClick={submitGuess}
              disabled={
                !guessOpen || selected.length !== association.targetCount
              }
            >
              {pending ? t.sending : t.submitGuess}
            </button>
          )}
          <p className="hint">{t.fullSet}</p>
        </div>
      )}
      {ended && <p role="status">{t.complete}</p>}
    </div>
  );
}
