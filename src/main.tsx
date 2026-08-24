import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
// Geist and Geist Mono, self-hosted through the bundle rather than fetched
// from Google Fonts: no third-party request, no extra DNS round trip, and the
// woff2 lands on the same cache-immutable /assets path as everything else.
// Both are variable builds — one file covers every weight the page uses, and
// the @font-face unicode-ranges mean only the latin subset is ever fetched.
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./index.css";

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
