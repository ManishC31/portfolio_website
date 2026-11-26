import type { Config } from "tailwindcss";

export default {
  // src/components/ui/* is the shadcn kit left over from the first design.
  // Nothing imports it any more and it references tokens this theme no longer
  // defines, so it is excluded from the scan — it was generating ~40kB of dead
  // CSS. Safe to delete the directory (and its Radix deps) outright.
  //
  // This is also why the Aceternity components live in
  // src/components/aceternity/ rather than the CLI's default of ui/: anything
  // dropped into ui/ would be skipped here and render unstyled.
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "!./src/components/ui/**",
  ],
  prefix: "",
  theme: {
    extend: {
      /*
       * Light only, greyscale only. The single exception is `ok`, the green
       * availability dot. Every text colour below clears WCAG AA on both white
       * and `surface`, except `faint`, which is reserved for display-size type
       * (it clears the 3:1 large-text threshold) and decoration.
       */
      colors: {
        ink: { DEFAULT: "#111111", 2: "#2a2a2a" },
        body: "#555555",
        muted: "#666666",
        subtle: "#6f6f6f",
        faint: "#8d8d8d",
        surface: { DEFAULT: "#f4f4f4", hover: "#eeeeee" },
        chip: { DEFAULT: "#f2f2f2", hover: "#e8e8e8" },
        line: { DEFAULT: "#e5e5e5", soft: "#efefef", strong: "#d4d4d4" },
        ok: "#3ecf5c",
      },
      borderColor: {
        DEFAULT: "#e5e5e5",
      },
      fontFamily: {
        // "Geist Fallback" is a metrics-adjusted Arial declared in index.css,
        // so the swap from fallback to web font does not shift the layout.
        sans: [
          '"Geist Variable"',
          '"Geist Fallback"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Helvetica Neue"',
          "sans-serif",
        ],
        mono: [
          '"Geist Mono Variable"',
          "ui-monospace",
          '"SF Mono"',
          "Menlo",
          "monospace",
        ],
      },
      maxWidth: {
        site: "1240px",
      },
      keyframes: {
        // Marquee. The list holds two copies of its items, so one full cycle is
        // half the track plus half a gap.
        scroll: {
          to: {
            transform: "translate(calc(-50% - var(--marquee-gap, 1rem) / 2))",
          },
        },
        ring: {
          "0%": { opacity: "0.7", transform: "scale(1)" },
          "70%, 100%": { opacity: "0", transform: "scale(3.2)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        sweep: {
          "0%": { transform: "translateX(-120%)" },
          "60%, 100%": { transform: "translateX(320%)" },
        },
        fill: {
          "0%": { transform: "scaleX(0)" },
          "70%, 100%": { transform: "scaleX(1)" },
        },
        typing: {
          "0%, 60%, 100%": { transform: "translateY(0)", opacity: "0.45" },
          "30%": { transform: "translateY(-3px)", opacity: "1" },
        },
        eq: {
          "0%, 100%": { transform: "scaleY(0.35)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        ring: "ring 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) infinite",
        blink: "blink 1.6s ease-in-out infinite",
        sweep: "sweep 4s ease-in-out infinite",
        fill: "fill 3.6s ease-in-out infinite",
        typing: "typing 1.2s ease-in-out infinite",
        eq: "eq 1.1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
