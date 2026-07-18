import type { Config } from "tailwindcss";

export default {
  // src/components/ui/* is the shadcn kit left over from the previous design.
  // Nothing imports it any more and it references tokens this theme no longer
  // defines, so it is excluded from the scan — it was generating ~40kB of dead
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
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        faint: "hsl(var(--faint))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
      },
    },
  },
  plugins: [],
} satisfies Config;
