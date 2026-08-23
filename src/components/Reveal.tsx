import { useEffect, useRef } from "react";

/*
 * Scroll-triggered entrance. Deliberately CSS-driven rather than a motion
 * library:
 *
 *   - the hidden state is a class in index.css, so `prefers-reduced-motion`
 *     can cancel it in one rule and the <noscript> block in index.html can
 *     cancel it too — a reader with JavaScript off sees the page, not blanks;
 *   - the prerendered HTML is identical to the first client render, so there
 *     is nothing for hydration to disagree about;
 *   - it costs an IntersectionObserver instead of ~50kB of runtime.
 *
 * Reveals once and disconnects. Re-animating on the way back up is a novelty
 * that gets annoying the second time someone scrolls past.
 */

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Milliseconds. Use small multiples to stagger siblings. */
  delay?: number;
  /** Element to render. Sections and list items need their own tag. */
  as?: "div" | "section" | "article" | "li" | "ul" | "p" | "h2" | "header";
}

const Reveal = ({ children, className = "", delay = 0, as = "div" }: RevealProps) => {
  // Widened to ElementType so one ref type covers every tag this can render.
  // The union of concrete element interfaces has no common ref type, and the
  // hook only ever calls classList on it.
  const Tag = as as React.ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Anything already on screen at mount (or above it, after a hash jump)
    // intersects immediately, so this needs no separate first-paint branch.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-revealed");
        observer.disconnect();
      },
      // Fire a little before the element reaches the fold, so the movement
      // has finished by the time it is properly in view.
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
