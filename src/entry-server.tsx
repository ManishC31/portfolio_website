import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./App";

/*
 * Build-time entry point. scripts/prerender.mjs imports this bundle once and
 * calls render() for every route, writing each result into the HTML shell Vite
 * produced. Nothing here runs in the browser.
 *
 * The seo re-exports below are the reason this file is the script's only
 * import: they are authored in TypeScript, and going through the SSR bundle
 * means the build reads the exact same metadata the app does, with no parallel
 * plain-JS copy to keep in sync.
 *
 * Deliberately does not import index.css — the client build already emits the
 * stylesheet, and pulling it in here would only make Vite process it twice.
 */

export {
  absolute,
  INDEXABLE_ROBOTS,
  metaForPath,
  NOINDEX_ROBOTS,
  OG_IMAGE,
  OG_IMAGE_ALT,
  routes,
  SITE_NAME,
  SITE_URL,
} from "./data/seo";

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );
}
