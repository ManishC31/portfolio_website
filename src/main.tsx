import { createRoot, hydrateRoot } from "react-dom/client";
// Geist and Geist Mono, self-hosted through the bundle rather than fetched
// from Google Fonts: no third-party request, no extra DNS round trip, and the
// woff2 lands on the same cache-immutable /assets path as everything else.
// Both are variable builds — one file covers every weight the page uses, and
// the @font-face unicode-ranges mean only the latin subset is ever fetched.
//
// Imported here rather than in index.css so the build-time render
// (entry-server.tsx) never touches a stylesheet.
import "@fontsource-variable/geist/wght.css";
import "@fontsource-variable/geist-mono/wght.css";
import App from "./App.tsx";
import "./index.css";

// Read by the inline script in index.html: if this flag never appears, the
// bundle failed to load and the scroll-reveal styles are switched back off.
window.__appBooted = true;

const container = document.getElementById("root")!;

// Production HTML arrives prerendered, so attach to that markup instead of
// throwing it away. `vite dev` serves the shell untouched, where the only
// child is the <!--app-html--> placeholder comment — hence childElementCount
// rather than firstChild, which a comment node would satisfy.
if (container.childElementCount > 0) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
