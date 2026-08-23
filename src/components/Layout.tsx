import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useSeo } from "@/hooks/use-seo";
import { profile } from "@/data/profile";

const NAV = [
  { label: "About", hash: "#about" },
  { label: "Experience", hash: "#experience" },
  { label: "Projects", hash: "#projects" },
  { label: "Writing", hash: "#writing" },
  { label: "Contact", hash: "#contact" },
];

/*
 * Highlights the nav item for whichever section is currently on screen.
 *
 * Uses a band across the upper third of the viewport rather than "whatever is
 * visible": with a bottom margin of -60% only one section can qualify at a
 * time, so the highlight moves cleanly instead of flickering between two
 * neighbours mid-scroll. Home page only — there are no sections elsewhere.
 */
const useActiveSection = (enabled: boolean) => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    const sections = NAV.map((item) =>
      document.getElementById(item.hash.slice(1)),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  // Every page renders through Layout, so this is the one place head tags need
  // to be refreshed on client-side navigation.
  useSeo();

  const active = useActiveSection(onHome);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // The header is transparent over the aurora at the top of the page and
  // gains its frosted panel only once content has moved under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A menu left open across a navigation would cover the page it opened.
  useEffect(() => setMenuOpen(false), [pathname]);

  // On the home page a bare hash scrolls natively. From a sub-page we need a
  // real navigation to "/" so the browser resolves the fragment on arrival.
  const href = (hash: string) => (onHome ? hash : `/${hash}`);

  return (
    <>
      <a
        href="#main"
        className="link sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <div className="flex min-h-screen flex-col">
        <header
          className={`sticky top-0 z-50 transition-colors duration-300 ${
            scrolled
              ? "border-b border-border bg-background/75 backdrop-blur-xl"
              : "border-b border-transparent"
          }`}
        >
          <div className="measure flex h-16 items-center justify-between gap-6">
            <Link
              to="/"
              className="font-semibold tracking-tight text-foreground no-underline"
            >
              {profile.name}
            </Link>

            <nav aria-label="Sections" className="hidden md:block">
              <ul className="flex items-center gap-1">
                {NAV.map((item) => {
                  const isActive = onHome && active === item.hash;
                  return (
                    <li key={item.hash}>
                      <a
                        href={href(item.hash)}
                        aria-current={isActive ? "true" : undefined}
                        className={`rounded-full px-3 py-1.5 text-[0.9375rem] no-underline transition-colors ${
                          isActive
                            ? "bg-elevated text-foreground"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />

              <a
                href={`mailto:${profile.email}`}
                className="btn-primary hidden px-4 py-2 sm:inline-flex"
              >
                Get in touch
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="link-quiet -m-1 p-1 md:hidden"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Grid-rows trick: animates to the content's natural height without
              hardcoding a pixel value that would clip a longer menu. */}
          <div
            id="mobile-nav"
            className={`measure grid overflow-hidden border-border transition-[grid-template-rows] duration-300 md:hidden ${
              menuOpen
                ? "grid-rows-[1fr] border-t bg-background/95 backdrop-blur-xl"
                : "grid-rows-[0fr]"
            }`}
          >
            <ul className="min-h-0">
              {NAV.map((item) => (
                <li key={item.hash} className="border-b border-border">
                  <a
                    href={href(item.hash)}
                    onClick={() => setMenuOpen(false)}
                    className="link-quiet block py-3"
                  >
                    {item.label}
                  </a>
                </li>
              ))}

              {/* The header CTA is hidden below sm, so it has to reappear here
                  or a phone visitor never sees a contact button at all. */}
              <li className="py-4">
                <a href={`mailto:${profile.email}`} className="btn-primary w-full">
                  Get in touch
                </a>
              </li>
            </ul>
          </div>
        </header>

        <main id="main" className="flex-1">
          {children}
        </main>

        <footer className="measure mt-28 border-t border-border py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/*
              The year is baked in at build time and recomputed on hydration, so
              these disagree in the window between a December build and a January
              visit. The client value is the correct one; suppress the notice
              rather than freeze the year.
            */}
            <p className="text-[0.875rem] text-muted" suppressHydrationWarning>
              © {new Date().getFullYear()} {profile.name} · {profile.languages}
            </p>

            <ul className="flex gap-5 text-[0.875rem]">
              {profile.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-quiet"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet"
                >
                  CV
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
