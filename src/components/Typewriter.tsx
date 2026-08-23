import { useEffect, useState } from "react";

/*
 * Cycles a short list of phrases with a type/delete effect.
 *
 * Two things it deliberately does not do:
 *
 *   - start empty. State begins at the full first phrase, which is what the
 *     prerendered HTML contains, so hydration matches and the line is never
 *     blank on first paint.
 *   - drive itself with an interval. Each step schedules exactly one timeout,
 *     so typing, deleting and the pause between can all use different speeds
 *     and a re-render can never leave two timers racing.
 *
 * Assistive technology gets the phrase list as static text and skips the
 * animation entirely — a live-updating character-by-character line is
 * unreadable to a screen reader.
 */

const TYPE_MS = 58;
const DELETE_MS = 30;
const HOLD_MS = 2100;
const GAP_MS = 340;

const Typewriter = ({
  phrases,
  className = "",
}: {
  phrases: readonly string[];
  className?: string;
}) => {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(phrases[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Client-only by definition, so reading matchMedia here is safe and saves
    // carrying the preference around in state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const phrase = phrases[index];
    const atEnd = !deleting && count === phrase.length;
    const atStart = deleting && count === 0;

    const timer = setTimeout(
      () => {
        if (atEnd) setDeleting(true);
        else if (atStart) {
          setDeleting(false);
          setIndex((i) => (i + 1) % phrases.length);
        } else setCount((c) => c + (deleting ? -1 : 1));
      },
      atEnd ? HOLD_MS : atStart ? GAP_MS : deleting ? DELETE_MS : TYPE_MS,
    );

    return () => clearTimeout(timer);
  }, [count, deleting, index, phrases]);

  return (
    <span className={className}>
      <span className="sr-only">{phrases.join(". ")}</span>

      <span aria-hidden="true">
        {phrases[index].slice(0, count)}
        <span className="ml-0.5 inline-block h-[1em] w-[2px] -mb-[0.12em] animate-caret bg-accent" />
      </span>
    </span>
  );
};

export default Typewriter;
