/// <reference types="vite/client" />

interface Window {
  /** Set by main.tsx once the bundle runs. See the inline script in index.html. */
  __appBooted?: boolean;
}
