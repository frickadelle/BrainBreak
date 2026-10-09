import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Language, RoomView } from "../shared/types";
import { categories } from "./i18n";
import { gameGuides } from "./gameGuides";
import type { useRoom } from "./useRoom";

export function Tutorial({
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
  const [now, setNow] = useState(Date.now());
  const [pending, setPending] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    setPending(false);
  }, [state.tutorial?.readyIds.length, online]);
  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(() => setPending(false), 4000);
    return () => clearTimeout(timer);
  }, [pending]);
  const tutorial = state.tutorial;
  if (!tutorial) return null;
  const guide = gameGuides[language][tutorial.category];
  const ready = tutorial.readyIds.includes(state.me.id);
  const gameSeconds = ["code", "wordle", "connections"].includes(
    tutorial.category,
  )
    ? 75
    : tutorial.category === "wavelength"
      ? 60
      : 45;
  const seconds = Math.max(
    0,
    Math.ceil(((state.endsAt ?? now) - now - offset) / 1000),
  );
  return (
    <section className="tutorial-stage" aria-labelledby="tutorial-title">
      <div className="tutorial-topline">
        <span className="eyebrow">
          {language === "de"
            ? "SO GEHT DIE NÄCHSTE RUNDE"
            : "HOW TO PLAY THE NEXT ROUND"}
        </span>
        <span>
          {state.round + 1} / {state.totalRounds}
        </span>
      </div>
      <h1 id="tutorial-title">
        {categories[language][tutorial.category].title}
      </h1>
      <p className="tutorial-goal">{guide.goal}</p>
      <ol className="tutorial-steps">
        {guide.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="tutorial-example">
        <span className="eyebrow">
          {language === "de" ? "BEISPIEL" : "EXAMPLE"}
        </span>
        <p>{guide.example}</p>
      </div>
      <p className="tutorial-scoring">
        {guide.scoring}{" "}
        {language === "de"
          ? `Du hast bis zu ${gameSeconds} Sekunden Spielzeit.`
          : `You have up to ${gameSeconds} seconds to play.`}
      </p>
      <div className="tutorial-footer">
        <button
          className="button primary"
          disabled={!online || ready || pending || seconds === 0}
          onClick={() => {
            if (send({ type: "ready", round: state.round })) setPending(true);
          }}
        >
          {ready ? <CheckCircle2 size={20} /> : <ArrowRight size={20} />}
          {language === "de"
            ? ready
              ? "Du bist bereit"
              : pending
                ? "Wird bestätigt …"
                : "Verstanden, ich bin bereit"
            : ready
              ? "You are ready"
              : pending
                ? "Confirming …"
                : "Got it, I’m ready"}
        </button>
        <p role="status">
          {tutorial.readyIds.length}/{state.players.length}{" "}
          {language === "de"
            ? "bereit. Sobald alle bereit sind, geht’s los."
            : "ready. Start as soon as everyone is ready."}
        </p>
        <small>
          {language === "de"
            ? `Die Spielzeit beginnt danach. Automatischer Start in ${seconds} s.`
            : `The game timer starts afterwards. Automatic start in ${seconds}s.`}
        </small>
      </div>
    </section>
  );
}
