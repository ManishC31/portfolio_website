import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
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
