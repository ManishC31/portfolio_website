import { useSyncExternalStore } from "react";

/*
 * The "Pause animations" switch.
 *
 * Anything that moves on its own for more than a few seconds (the stack
 * marquee, the rotating hero phrase, the loops inside the project mockups)
 * needs a way to be stopped — WCAG 2.2.2. Hover-to-pause does not count: it is
 * unreachable from a keyboard and useless on touch.
 *
 * State lives outside React so the one button can stop everything:
 *   - CSS animations, via html[data-motion="paused"] in index.css
 *   - JS-driven ones, via useMotionPaused()
 *
 * It is deliberately not persisted. This is a "stop that, I'm reading" control,
 * not a preference; readers who never want motion already say so through the
 * OS setting, which is honoured separately.
 */

let paused = false;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const toggleMotionPaused = () => {
  paused = !paused;
  if (paused) document.documentElement.setAttribute("data-motion", "paused");
  else document.documentElement.removeAttribute("data-motion");
  listeners.forEach((listener) => listener());
};

/** False during the build-time render and on first paint, so markup matches. */
export const useMotionPaused = () =>
  useSyncExternalStore(
    subscribe,
    () => paused,
    () => false,
  );
