import type { Config } from "tailwindcss";

export default {
  // src/components/ui/* is the shadcn kit left over from an earlier design.
  // Nothing imports it any more and it references tokens this theme does not
  // define, so it is excluded from the scan — it was generating ~40kB of dead
  // CSS. Safe to delete the directory (and its Radix deps) outright.
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "!./src/components/ui/**",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        // One step up from the page: cards, the sticky header, code blocks.
        surface: "hsl(var(--surface))",
        // Two steps up, for something sitting on a surface.
        elevated: "hsl(var(--elevated))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        faint: "hsl(var(--faint))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
        // Second gradient stop. Never used alone — always with accent, so the
        // page still reads as single-accent rather than two competing colours.
        accent2: "hsl(var(--accent-2))",
      },
      fontFamily: {
        // Variable Geist, self-hosted (see main.tsx). A geometric grotesque:
        // slightly wider apertures and a taller x-height than the platform UI
        // faces, which is what buys the extra legibility at 17px. The
        // fallbacks are those platform faces, so a font failure degrades to
        // the old look rather than to Times New Roman.
        sans: [
          "Geist Variable",
          "Geist",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        // Geist Mono is the matching monospace — same skeleton as the sans, so
        // dates and handles set in it sit next to body copy without reading as
        // a different voice.
        mono: [
          "Geist Mono Variable",
          "Geist Mono",
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
      keyframes: {
        // The hero background. Three blurred blobs on long, prime-ish
        // durations so the loop never visibly repeats.
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6%, -8%, 0) scale(1.12)" },
          "66%": { transform: "translate3d(-7%, 5%, 0) scale(0.92)" },
        },
        // Halves the track and translates by exactly -50%, so the duplicated
        // second half lands where the first started. No visible seam.
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        // The "available" indicator. Deliberately slow — a fast blink reads
        // as an alert rather than a status.
        breathe: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.82)" },
        },
        caret: {
          "0%, 45%": { opacity: "1" },
          "55%, 100%": { opacity: "0" },
        },
      },
      animation: {
        drift: "drift 26s ease-in-out infinite",
        "drift-slow": "drift 37s ease-in-out infinite reverse",
        "drift-slower": "drift 43s ease-in-out infinite",
        marquee: "marquee var(--marquee-duration, 42s) linear infinite",
        breathe: "breathe 2.8s ease-in-out infinite",
        caret: "caret 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
