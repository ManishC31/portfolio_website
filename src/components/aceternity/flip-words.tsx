import { useEffect, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

/*
 * Flip Words — https://ui.aceternity.com/components/flip-words
 *
 * Adapted from the Aceternity source. What changed, and why:
 *
 *   - AnimatePresence gets initial={false}. Upstream animates the first word in
 *     from opacity 0, and because this site is prerendered that opacity:0 was
 *     being baked into the HTML: the middle of the headline was invisible
 *     until JavaScript arrived.
 *   - Incoming and outgoing words share one grid cell instead of the outgoing
 *     one switching to position:absolute, so the line never changes height or
 *     nudges its neighbours mid-transition.
 *   - The exit is a short rise and blur. Upstream scales the word to 2x and
 *     throws it sideways, which is louder than anything else on this page.
 *   - Words animate whole rather than letter by letter. Splitting into
 *     per-letter inline-blocks disables kerning, which shows at display size.
 *   - The timer is cleared on unmount, and stops for `paused` and for readers
 *     who prefer reduced motion.
 *   - `motion` became `m` so the features can be lazy-loaded (see Layout).
 *
 * Purely visual: the caller is expected to hide it from assistive tech and
 * provide the full list of phrases as real text alongside.
 */
export const FlipWords = ({
  words,
  duration = 3000,
  paused = false,
  className,
}: {
  words: readonly string[];
  duration?: number;
  paused?: boolean;
  className?: string;
}) => {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const still = paused || reduced || words.length < 2;

  useEffect(() => {
    if (still) return;
    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % words.length),
      duration,
    );
    return () => window.clearTimeout(timer);
  }, [index, still, duration, words.length]);

  const phrase = words[index];

  return (
    <span className={cn("inline-grid justify-items-center", className)}>
      <AnimatePresence initial={false}>
        <m.span
          key={phrase}
          className="inline-block whitespace-nowrap [grid-area:1/1]"
          exit={{ opacity: 0, y: "-0.3em", filter: "blur(6px)" }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          {phrase.split(" ").map((word, wordIndex, all) => (
            <m.span
              key={`${word}-${wordIndex}`}
              className="inline-block whitespace-pre"
              initial={{ opacity: 0, y: "0.3em", filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 16,
                delay: 0.12 + wordIndex * 0.09,
              }}
            >
              {wordIndex < all.length - 1 ? `${word} ` : word}
            </m.span>
          ))}
        </m.span>
      </AnimatePresence>
    </span>
  );
};
