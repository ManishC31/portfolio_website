import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Resizable Navbar — https://ui.aceternity.com/components/resizable-navbar
 *
 * Adapted from the Aceternity source. The behaviour is upstream's: a bar that
 * tightens into a narrower pill once the page has scrolled. What changed, and
 * why:
 *
 *   - One bar for every width. Upstream ships separate desktop and mobile
 *     bodies; here the links simply drop out below `md` and a menu button
 *     takes their place, so the logo and call to action are never duplicated.
 *   - The scrolled state travels through context, not React.cloneElement.
 *   - It animates max-width in pixels (upstream goes from 100% to 40% with a
 *     hard min-width of 800px, which overflows on tablets).
 *   - The glass is always on, and the pill is always a pill.
 *   - The menu toggle is a real <button> with aria-expanded and aria-controls.
 *     Upstream attaches onClick to a bare SVG, which a keyboard cannot reach.
 *   - Icons come from lucide-react (already a dependency) instead of adding
 *     @tabler/icons-react, and the remote demo logo is gone.
 *   - `motion` became `m` so the features can be lazy-loaded (see Layout).
 */

const CompactContext = createContext(false);

const SPRING = { type: "spring", stiffness: 200, damping: 50 } as const;

export const Navbar = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCompact(latest > 100);
  });

  return (
    <CompactContext.Provider value={compact}>
      {/* The header spans the viewport but only the pill takes pointer events,
          so the page behind its margins stays clickable. */}
      <header
        className={cn("pointer-events-none fixed inset-x-0 top-0 z-50", className)}
      >
        {children}
      </header>
    </CompactContext.Provider>
  );
};

export const NavBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const compact = useContext(CompactContext);

  return (
    <m.div
      // No mount animation: the prerendered bar is already in its resting state.
      initial={false}
      animate={{
        maxWidth: compact ? 860 : 1140,
        boxShadow: compact
          ? "0 16px 36px -22px rgba(0, 0, 0, 0.32)"
          : "0 16px 36px -22px rgba(0, 0, 0, 0)",
      }}
      transition={SPRING}
      className={cn(
        "pointer-events-auto relative mx-auto mt-3.5 flex h-[60px] w-[calc(100%-28px)] items-center gap-0.5 rounded-full bg-[rgba(240,240,240,0.82)] py-2 pl-5 pr-2 backdrop-blur-[20px] backdrop-saturate-[1.8]",
        "max-sm:mt-2.5 max-sm:h-14 max-sm:w-[calc(100%-20px)] max-sm:pl-4",
        className,
      )}
    >
      {children}
    </m.div>
  );
};

export interface NavItem {
  name: string;
  link: string;
}

export const NavItems = ({
  items,
  label,
  className,
  renderLink,
}: {
  items: NavItem[];
  /** Accessible name for the <nav> landmark. */
  label: string;
  className?: string;
  /** Lets the caller decide between a router link and a plain anchor. */
  renderLink: (item: NavItem, className: string) => ReactNode;
}) => (
  <nav aria-label={label} className={cn("hidden md:block", className)}>
    <ul className="flex items-center gap-0.5">
      {items.map((item) => (
        <li key={item.link}>
          {renderLink(
            item,
            "flex h-9 items-center rounded-full px-3 text-[14.5px] font-medium text-[#333] transition-colors duration-150 hover:bg-ink/[0.06] hover:text-ink",
          )}
        </li>
      ))}
    </ul>
  </nav>
);

export const MobileNavToggle = ({
  isOpen,
  onClick,
  controls,
  className,
}: {
  isOpen: boolean;
  onClick: () => void;
  /** id of the menu this button opens. */
  controls: string;
  className?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-expanded={isOpen}
    aria-controls={controls}
    aria-label={isOpen ? "Close menu" : "Open menu"}
    className={cn(
      "flex size-11 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-ink transition-colors duration-150 hover:bg-ink/[0.1] max-sm:size-10 md:hidden",
      className,
    )}
  >
    {isOpen ? (
      <X size={18} strokeWidth={2} aria-hidden="true" />
    ) : (
      <Menu size={18} strokeWidth={2} aria-hidden="true" />
    )}
  </button>
);

export const MobileNavMenu = ({
  id,
  isOpen,
  children,
  className,
}: {
  id: string;
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}) => (
  <AnimatePresence>
    {isOpen && (
      <m.div
        id={id}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
        className={cn(
          "absolute inset-x-0 top-full mt-2 flex max-h-[calc(100dvh-96px)] flex-col overflow-y-auto overscroll-contain rounded-[24px] bg-surface p-1.5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)] md:hidden",
          className,
        )}
      >
        {children}
      </m.div>
    )}
  </AnimatePresence>
);
