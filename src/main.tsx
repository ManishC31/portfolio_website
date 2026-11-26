import { createRoot, hydrateRoot } from "react-dom/client";
// Self-hosted, variable-weight Geist. Imported here rather than in index.css so
// the build-time render (entry-server.tsx) never touches a stylesheet.
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
