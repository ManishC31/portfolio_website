import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("theme");
    return stored ? stored === "dark" : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((d) => !d) };
}
