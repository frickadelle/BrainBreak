import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { ArrowDown, ArrowUp, GripVertical } from "lucide-react";
import type { Language, PublicQuestion } from "../shared/types";
import { copy } from "./i18n";

export function OrderInput({
  question,
  order,
  onChange,
  disabled,
  language,
  onDraggingChange,
}: {
  question: PublicQuestion;
  order: string[];
  onChange: (order: string[]) => void;
  disabled: boolean;
  language: Language;
  onDraggingChange: (active: boolean) => void;
}) {
  const t = copy[language];
  const list = useRef<HTMLOListElement>(null);
  const drag = useRef<{
    id: string;
    pointerId: number;
    centers: number[];
    startY: number;
    moved: boolean;
    preview: string[];
  } | null>(null);
  const [previewOrder, setPreviewOrder] = useState<string[] | null>(null);
  const [dragged, setDragged] = useState<string | null>(null);
  useEffect(() => {
    if (disabled) {
      if (drag.current) onDraggingChange(false);
      drag.current = null;
      setDragged(null);
      setPreviewOrder(null);
    }
  }, [disabled, onDraggingChange]);
  function moveTo(id: string, index: number) {
    if (disabled || drag.current) return;
    const from = order.indexOf(id);
    if (from < 0 || from === index || index < 0 || index >= order.length)
      return;
    const next = [...order];
    next.splice(from, 1);
    next.splice(index, 0, id);
    onChange(next);
  }
  function begin(event: PointerEvent<HTMLButtonElement>, id: string) {
    if (
      disabled ||
      drag.current ||
      !event.isPrimary ||
      (event.pointerType === "mouse" && event.button !== 0)
    )
      return;
    event.preventDefault();
    const rows = Array.from(list.current?.children ?? []);
    drag.current = {
      id,
      pointerId: event.pointerId,
      centers: rows.map((row) => {
        const rect = row.getBoundingClientRect();
        return rect.top + rect.height / 2;
      }),
      startY: event.clientY,
      moved: false,
      preview: [...order],
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragged(id);
    onDraggingChange(true);
  }
  function move(event: PointerEvent<HTMLButtonElement>) {
    const current = drag.current;
    if (disabled || !current || current.pointerId !== event.pointerId) return;
    if (!current.moved && Math.abs(event.clientY - current.startY) < 5) return;
    current.moved = true;
    const target = current.centers.reduce(
      (best, center, index) =>
        Math.abs(center - event.clientY) <
        Math.abs(current.centers[best] - event.clientY)
          ? index
          : best,
      0,
    );
    const from = current.preview.indexOf(current.id);
    if (from !== target) {
      const next = [...current.preview];
      next.splice(from, 1);
      next.splice(target, 0, current.id);
      current.preview = next;
      setPreviewOrder(next);
    }
  }
  function end(event: PointerEvent<HTMLButtonElement>, cancel = false) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const next = current.preview;
    onDraggingChange(false);
    drag.current = null;
    setDragged(null);
    setPreviewOrder(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    if (!cancel && !disabled && current.moved) onChange(next);
  }
  return (
    <fieldset className="order-options" disabled={disabled}>
      <legend>{t.orderHint}</legend>
      <ol ref={list}>
        {order.map((id, index) => {
          const option = question.options?.find((option) => option.id === id);
          return (
            <li
              key={id}
              style={{ order: (previewOrder ?? order).indexOf(id) }}
              className={dragged === id ? "order-dragging" : ""}
            >
              <button
                type="button"
                className="order-drag-handle"
                aria-label={`${language === "de" ? "Karte ziehen" : "Drag card"}: ${option?.text}`}
                onPointerDown={(event) => begin(event, id)}
                onPointerMove={move}
                onPointerUp={(event) => end(event)}
                onPointerCancel={(event) => end(event, true)}
                onLostPointerCapture={(event) => end(event, true)}
              >
                <GripVertical size={20} />
              </button>
              <span className="order-position">
                {(previewOrder ?? order).indexOf(id) + 1}
              </span>
              <span className="order-text">{option?.text}</span>
              <div className="order-controls">
                <button
                  type="button"
                  disabled={Boolean(dragged) || index === 0}
                  aria-label={`${t.moveUp}: ${option?.text}`}
                  onClick={() => moveTo(id, index - 1)}
                >
                  <ArrowUp size={19} />
                </button>
                <button
                  type="button"
                  disabled={Boolean(dragged) || index === order.length - 1}
                  aria-label={`${t.moveDown}: ${option?.text}`}
                  onClick={() => moveTo(id, index + 1)}
                >
                  <ArrowDown size={19} />
                </button>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="small">{t.orderRule}</p>
      <p className="sr-only" role="status" aria-live="polite">
        {order
          .map(
            (id) => question.options?.find((option) => option.id === id)?.text,
          )
          .join(", ")}
      </p>
    </fieldset>
  );
}
