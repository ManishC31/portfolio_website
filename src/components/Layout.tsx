import { LazyMotion, domMin } from "motion/react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { useSeo } from "@/hooks/use-seo";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // Every page renders through Layout, so this is the one place head tags need
  // to be refreshed on client-side navigation. Note that Layout is remounted on
  // each navigation (it sits inside the page components), which is why scroll
  // handling lives in ScrollManager, above the routes, instead of here.
  useSeo();

  return (
    /*
     * The animated components import `m` rather than `motion`, which ships no
     * animation code of its own; LazyMotion supplies it. `domMin` is the
     * smallest feature set (animate, initial, exit) and is all this site uses.
     * A component that needs whileHover, whileTap or whileInView wants
     * `domAnimation` here instead; layout animation and drag want `domMax`.
     *
     * `strict` turns an accidental `motion.*` import, which would silently
     * pull the full library back in, into an error.
     */
    <LazyMotion features={domMin} strict>
      <a
        href="#main"
        className="sr-only rounded-md bg-ink px-3 py-2 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100]"
      >
        Skip to content
      </a>

      <div className="flex min-h-dvh flex-col">
        <SiteNav />

        <main id="main" className="flex-1">
          {children}
        </main>

        <SiteFooter />
      </div>
    </LazyMotion>
  );
};

export default Layout;
