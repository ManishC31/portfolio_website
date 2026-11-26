import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/*
 * Scroll position across client-side navigation.
 *
 * BrowserRouter changes the URL and nothing else. Left alone, clicking a
 * project tile halfway down the long home page opens the (much shorter) project
 * page at the same offset, which the browser clamps to the very bottom: you
 * land on the footer. Likewise a link to "/#projects" never reaches its anchor,
 * and Back returns to the right page at the wrong height.
 *
 * This component owns all three cases:
 *
 *   new page            jump to the top, instantly
 *   new page + #anchor  jump to the anchor, instantly
 *   same page + #anchor scroll to the anchor (smoothly, unless the reader
 *                       prefers reduced motion; index.css decides)
 *   back / forward      return to where that history entry was left
 *   reload              left to the browser, which restores it natively
 *
 * It must be mounted once, above <Routes>, and stay mounted. Every page
 * renders its own <Layout>, so anything placed there is torn down and rebuilt
 * on each navigation and can never tell a navigation from a first load.
 */

// The build-time render has no layout phase, and React warns if asked for one.
const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Scroll offset per history entry, for the life of the tab. */
const offsets = new Map<string, number>();

const INSTANT = "instant" as ScrollBehavior;

const anchorFor = (hash: string) => {
  if (!hash) return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null; // malformed escape sequence in the URL
  }
};

const ScrollManager = () => {
  const { key, pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  const current = useRef({ key, pathname });
  const first = useRef(true);
  // Set while a back/forward step is in flight. The browser makes its own
  // attempt at restoring the offset before React has swapped the page in, and
  // that (clamped, wrong) value must not be recorded against the old entry.
  const traversing = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!traversing.current) offsets.set(current.current.key, window.scrollY);
    };
    const onPopState = () => {
      traversing.current = true;
    };

    /*
     * Back and forward are restored here, not by the browser. Left on "auto",
     * the browser runs its own pass after ours: on an entry whose URL carries
     * a #fragment it scrolls to that fragment, overriding the offset we just
     * put back.
     *
     * The mode is stored per history entry, so it is switched off again as the
     * document is left. A reload, or a return from an external link, is then
     * restored natively, which this in-memory map could not do.
     *
     * pageshow rather than mount: it fires after the load event, by which
     * point any native restoration for a reload has already happened. It also
     * fires when the page is revived from the back/forward cache.
     */
    const takeOver = () => {
      window.history.scrollRestoration = "manual";
    };
    const handBack = () => {
      window.history.scrollRestoration = "auto";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);
    window.addEventListener("pageshow", takeOver);
    window.addEventListener("pagehide", handBack);
    if (document.readyState === "complete") takeOver();

    // Record where the page starts. After a reload the browser has usually
    // restored the offset before this listener existed, and if the reader then
    // navigates without scrolling, no scroll event would ever capture it.
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("pageshow", takeOver);
      window.removeEventListener("pagehide", handBack);
      handBack();
    };
  }, []);

  // A layout effect, so the new page is positioned before it is first painted.
  useBrowserLayoutEffect(() => {
    const previous = current.current;
    current.current = { key, pathname };
    traversing.current = false;

    // First load: the browser has already resolved any #anchor, and restores
    // the offset itself on a reload.
    if (first.current) {
      first.current = false;
      return;
    }

    const anchor = anchorFor(hash);

    if (navigationType === "POP") {
      // A history entry the router never wrote is a native fragment jump (the
      // "Skip to content" link). The browser is handling that one.
      if (window.history.state == null) return;

      // Back or forward: put the entry back where it was left. With nothing
      // recorded (the tab was reloaded since), fall back to its anchor or top.
      const top = offsets.get(key);
      if (top !== undefined) window.scrollTo({ top, left: 0, behavior: INSTANT });
      else if (anchor) anchor.scrollIntoView({ behavior: INSTANT });
      else window.scrollTo({ top: 0, left: 0, behavior: INSTANT });
      return;
    }

    // Within a page, defer to the stylesheet's scroll-behavior. Arriving from
    // another page, never animate: the starting offset belongs to the old page.
    const behavior = previous.pathname === pathname ? "auto" : INSTANT;

    if (anchor) anchor.scrollIntoView({ behavior });
    else window.scrollTo({ top: 0, left: 0, behavior });
  }, [key, pathname, hash, navigationType]);

  return null;
};

export default ScrollManager;
