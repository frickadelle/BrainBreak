import { useCallback, useEffect, useRef, useState } from "react";
import type { RoomView } from "../shared/types";

type Cue = "start" | "answer" | "correct" | "reveal" | "result";
const notes: Record<Cue, number[]> = {
  start: [392, 523.25],
  answer: [659.25],
  correct: [523.25, 659.25, 783.99],
  reveal: [392, 329.63],
  result: [523.25, 659.25, 783.99, 1046.5],
};
export function soundCue(
  previous: RoomView | null,
  current: RoomView | null,
  continuousConnection = true,
): Cue | null {
  if (
    !continuousConnection ||
    !previous ||
    !current ||
    previous.code !== current.code ||
    previous.me.id !== current.me.id
  )
    return null;
  if (
    previous.phase !== current.phase ||
    previous.question?.id !== current.question?.id
  ) {
    if (current.phase === "results") return "result";
    if (current.phase === "question" || current.phase === "voting")
      return "start";
    if (current.phase === "reveal")
      return (current.reveal?.scores.find((s) => s.playerId === current.me.id)
        ?.points ?? 0) > 0
        ? "correct"
        : "reveal";
  }
  if (
    current.phase === "question" &&
    previous.me.answer === undefined &&
    current.me.answer !== undefined
  )
    return "answer";
  if (
    current.phase === "question" &&
    current.question?.id === previous.question?.id &&
    current.puzzle &&
    previous.puzzle &&
    (current.puzzle.progress.attempts > previous.puzzle.progress.attempts ||
      (current.puzzle.progress.foundGroups?.length ?? 0) >
        (previous.puzzle.progress.foundGroups?.length ?? 0))
  )
    return "answer";
  return null;
}
export function useSounds(state: RoomView | null, online = true) {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem("brainbreak.sound") !== "off";
    } catch {
      return true;
    }
  });
  const [ready, setReady] = useState(false);
  const context = useRef<AudioContext | null>(null);
  const active = useRef(new Set<OscillatorNode>());
  const allowed = useRef(enabled);
  const previous = useRef<RoomView | null>(null);
  const continuouslyOnline = useRef(false);
  allowed.current = enabled;
  const play = useCallback((cue: Cue) => {
    const audio = context.current;
    if (
      !allowed.current ||
      audio?.state !== "running" ||
      document.visibilityState !== "visible"
    )
      return;
    notes[cue].forEach((frequency, index) => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      const start = audio.currentTime + index * 0.11;
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.045, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.19);
      oscillator.connect(gain).connect(audio.destination);
      active.current.add(oscillator);
      oscillator.onended = () => {
        active.current.delete(oscillator);
        oscillator.disconnect();
        gain.disconnect();
      };
      oscillator.start(start);
      oscillator.stop(start + 0.2);
    });
  }, []);
  const arm = useCallback(async () => {
    if (!allowed.current || typeof AudioContext === "undefined") return;
    try {
      const audio = context.current ?? (context.current = new AudioContext());
      await audio.resume();
      setReady(allowed.current && audio.state === "running");
    } catch {
      setReady(false);
    }
  }, []);
  async function toggle() {
    if (enabled && ready) {
      allowed.current = false;
      setEnabled(false);
      for (const oscillator of active.current) {
        try {
          oscillator.stop();
        } catch {
          /* Already ended. */
        }
      }
      void context.current?.suspend();
      setReady(false);
      try {
        localStorage.setItem("brainbreak.sound", "off");
      } catch {
        /* Session preference remains. */
      }
    } else {
      allowed.current = true;
      setEnabled(true);
      try {
        localStorage.setItem("brainbreak.sound", "on");
      } catch {
        /* Session preference remains. */
      }
      await arm();
      play("answer");
    }
  }
  useEffect(() => {
    const cue = soundCue(
      previous.current,
      state,
      online && continuouslyOnline.current,
    );
    previous.current = state;
    continuouslyOnline.current = online;
    if (cue) play(cue);
  }, [state, online, play]);
  useEffect(
    () => () => {
      void context.current?.close();
      context.current = null;
    },
    [],
  );
  return { enabled, ready, arm, toggle };
}
