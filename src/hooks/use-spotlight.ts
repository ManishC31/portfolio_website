import { useCallback, useRef } from "react";

/*
 * Cursor-tracked glow for cards.
 *
 * Returns props to spread onto the element. Position is written straight to
 * CSS custom properties rather than React state — a pointermove handler that
 * called setState would re-render the card on every frame for a purely visual
 * effect. The styles that consume --mx/--my/--spot live in index.css under
 * .card-spotlight.
 *
 * Only pointer devices that hover get the effect: `pointerenter` never fires
 * from a tap in a way that would leave a glow stranded, and --spot defaults to
 * 0 so touch and keyboard users see a flat card rather than a half-lit one.
 */
export const useSpotlight = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((event: React.PointerEvent<T>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  const onPointerEnter = useCallback((event: React.PointerEvent<T>) => {
    // Coarse pointers report a single synthetic position on tap, which would
    // light the card and leave it lit. Hover-capable devices only.
    if (event.pointerType === "touch") return;
    event.currentTarget.style.setProperty("--spot", "1");
  }, []);

  const onPointerLeave = useCallback((event: React.PointerEvent<T>) => {
    event.currentTarget.style.setProperty("--spot", "0");
  }, []);

  return { ref, onPointerMove, onPointerEnter, onPointerLeave };
};
