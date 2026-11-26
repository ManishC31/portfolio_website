import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  key: string;
  /** Sticks beside the content on wide screens, sits above it on narrow ones. */
  title: ReactNode;
  content: ReactNode;
}

/*
 * Timeline — https://ui.aceternity.com/components/timeline
 *
 * Adapted from the Aceternity source. The mechanism is upstream's: a sticky
 * label per entry and a rail whose filled portion tracks scroll progress. What
 * changed, and why:
 *
 *   - The built-in heading block is gone; the section supplies its own.
 *   - Each title is rendered once and repositioned with CSS. Upstream renders
 *     it twice (a desktop copy and a mobile copy, toggled with display:none),
 *     which duplicates every date and company name in the prerendered HTML.
 *   - The rail height comes from a ResizeObserver instead of a single
 *     measurement on mount, so it stays correct after fonts load and when the
 *     window is resized.
 *   - The beam is ink fading to transparent, not purple to blue.
 *   - `motion` became `m` so the features can be lazy-loaded (see Layout).
 */
export const Timeline = ({
  data,
  className,
}: {
  data: TimelineEntry[];
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();

    if (!("ResizeObserver" in window)) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 35%", "end 55%"],
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {data.map((item) => (
        <div
          key={item.key}
          className="pt-14 first:pt-0 lg:grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-10 lg:pt-24"
        >
          <div className="relative self-start pl-14 lg:sticky lg:top-28">
            <span
              aria-hidden="true"
              className="absolute -top-1 left-0 flex size-10 items-center justify-center rounded-full bg-white"
            >
              <span className="size-3 rounded-full border border-line-strong bg-surface" />
            </span>
            {item.title}
          </div>

          <div className="mt-5 pl-14 lg:mt-0 lg:pl-0">{item.content}</div>
        </div>
      ))}

      {/* Rail, centred on the 40px marker column. */}
      <div
        aria-hidden="true"
        style={{ height: `${height}px` }}
        className="absolute left-[19px] top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,transparent_0%,#e5e5e5_6%,#e5e5e5_94%,transparent_100%)]"
      >
        <m.div
          style={{ height: beamHeight, opacity: beamOpacity }}
          className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-[linear-gradient(to_top,#111_0%,rgba(17,17,17,0.45)_14%,transparent_100%)]"
        />
      </div>
    </div>
  );
};
