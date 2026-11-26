import type { CSSProperties, Key, ReactNode } from "react";
import { cn } from "@/lib/utils";

const DURATION = { fast: "30s", normal: "55s", slow: "90s" } as const;

/*
 * Infinite Moving Cards — https://ui.aceternity.com/components/infinite-moving-cards
 *
 * Adapted from the Aceternity source. What changed, and why:
 *
 *   - Upstream doubles the list by cloning DOM nodes in an effect. Here the
 *     second copy is rendered by React and marked aria-hidden, so assistive
 *     tech reads each item once, the markup is the same on the server and the
 *     client, and the strip is already moving in the prerendered page.
 *   - Items are generic: the caller supplies `renderItem` instead of the
 *     component hard-coding a testimonial card.
 *   - Direction, speed and gap are CSS custom properties set inline rather than
 *     written through a ref after mount.
 *   - With reduced motion the track stops, wraps onto several centred lines and
 *     drops the duplicate copy, so every item is still there to read.
 *
 * The `animate-scroll` keyframes live in tailwind.config.ts.
 */
export const InfiniteMovingCards = <T,>({
  items,
  renderItem,
  getKey,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  gap = 16,
  className,
  itemClassName,
}: {
  items: readonly T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => Key;
  direction?: "left" | "right";
  speed?: keyof typeof DURATION;
  pauseOnHover?: boolean;
  /** Space between items, in px. */
  gap?: number;
  className?: string;
  itemClassName?: string;
}) => (
  <div
    className={cn(
      "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:[mask-image:none]",
      className,
    )}
    style={
      {
        "--animation-duration": DURATION[speed],
        "--animation-direction": direction === "left" ? "forwards" : "reverse",
        "--marquee-gap": `${gap}px`,
      } as CSSProperties
    }
  >
    <ul
      className={cn(
        "flex w-max min-w-full shrink-0 animate-scroll flex-nowrap items-center gap-[var(--marquee-gap)]",
        "motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3",
        pauseOnHover && "hover:[animation-play-state:paused]",
      )}
    >
      {items.map((item) => (
        <li key={getKey(item)} className={cn("shrink-0", itemClassName)}>
          {renderItem(item)}
        </li>
      ))}
      {items.map((item) => (
        <li
          key={`copy-${getKey(item)}`}
          aria-hidden="true"
          className={cn("shrink-0 motion-reduce:hidden", itemClassName)}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  </div>
);
