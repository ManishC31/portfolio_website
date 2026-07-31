import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { useSeo } from "@/hooks/use-seo";
import { profile } from "@/data/profile";

const NAV = [
  { label: "Experience", hash: "#experience" },
  { label: "Projects", hash: "#projects" },
  { label: "Writing", hash: "#writing" },
  { label: "Contact", hash: "#contact" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  // Every page renders through Layout, so this is the one place head tags need
  // to be refreshed on client-side navigation.
  useSeo();

  // On the home page a bare hash scrolls natively. From a sub-page we need a
  // real navigation to "/" so the browser resolves the fragment on arrival.
  // No scroll-restoration JS is required either way.
  const href = (hash: string) => (onHome ? hash : `/${hash}`);

  return (
    <>
      <a
        href="#main"
        className="link sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <div className="flex min-h-screen flex-col">
        <header className="measure flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-8 pb-4 sm:pt-12">
          <Link to="/" className="link-quiet font-semibold text-foreground">
            {profile.name}
          </Link>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <nav aria-label="Sections">
              <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
                {NAV.map((item) => (
                  <li key={item.hash}>
                    <a href={href(item.hash)} className="link-quiet">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <ThemeToggle />
          </div>
        </header>

        <main id="main" className="flex-1">
          {children}
        </main>

        <footer className="measure border-t border-border py-8 mt-24">
          {/*
            The year is baked in at build time and recomputed on hydration, so
            these disagree in the window between a December build and a January
            visit. The client value is the correct one; suppress the notice
            rather than freeze the year.
          */}
          <p className="text-muted text-[0.875rem]" suppressHydrationWarning>
            © {new Date().getFullYear()} {profile.name} · {profile.languages}
          </p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
