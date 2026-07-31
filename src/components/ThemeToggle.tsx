import { useEffect, useLayoutEffect, useState } from "react";

type Theme = "light" | "dark";

// localStorage throws in some privacy modes, so never let that break the page.
const read = (): Theme | null => {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
};

const systemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// The prerender pass runs this component in Node, where neither localStorage
// nor matchMedia exists, and useLayoutEffect is a no-op that React warns about.
const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const ThemeToggle = () => {
  // Starts unresolved so the server and the first client render agree. The
  // layout effect below settles it before the browser paints, so the
  // placeholder is never visible.
  const [theme, setTheme] = useState<Theme | null>(null);

  useBrowserLayoutEffect(() => {
    setTheme(read() ?? systemTheme());
  }, []);

  // While the reader has made no explicit choice, keep following the OS.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!read()) setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* choice just won't persist */
    }
  };

  const target = theme === "dark" ? "light" : "dark";
  const label = theme ? `Switch to ${target} theme` : "Switch theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="link-quiet -m-1 p-1 leading-none"
      suppressHydrationWarning
    >
      {theme === null ? (
        // Unresolved: hold the icon's exact footprint so nothing shifts.
        <span className="block h-[17px] w-[17px]" aria-hidden="true" />
      ) : theme === "dark" ? (
        // Sun icon: clicking returns to light.
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 1.5v2M12 20.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1.5 12h2M20.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      ) : (
        // Moon icon: clicking goes dark.
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.5 14.3A8.8 8.8 0 1 1 9.7 3.5a7 7 0 0 0 10.8 10.8Z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
