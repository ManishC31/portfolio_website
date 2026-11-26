import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

interface RevealProps {
  as?: ElementType;
  /** Milliseconds to wait after entering the viewport. Use to stagger siblings. */
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
  style?: CSSProperties;
}

/*
 * Fades its content up as it scrolls into view.
 *
 * The hidden starting state is CSS-only and conditional (see "Scroll reveal" in
 * index.css), so this component renders plain, visible markup at build time and
 * for anyone without JavaScript. All it does on the client is flip
 * data-revealed once, then stop observing.
 *
 * Do not wrap anything above the fold on first load: the largest paint would
 * wait on hydration. The hero is intentionally not revealed.
 */
const Reveal = ({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  id,
  style,
}: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Also reveal anything already scrolled past: arriving on a #fragment
        // or restoring a position should not leave blanks above the viewport.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      data-revealed={shown ? "" : undefined}
      className={className}
      style={
        delay
          ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties)
          : style
      }
    >
      {children}
    </Tag>
  );
};

export default Reveal;
