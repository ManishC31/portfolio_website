import { cn } from "@/lib/utils";
import { Menu, X, Sparkles, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  // { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Initialize theme
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || !storedTheme) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-500 ease-out",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-xl"
          : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center group"
          href="#hero"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center space-x-2 px-3 py-1 glass-theme rounded-lg">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent font-extrabold">
                Manish
              </span>
              <span className="text-foreground/90 font-medium">Portfolio</span>
            </div>
          </div>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="relative px-4 py-2 text-foreground/80 hover:text-primary transition-all duration-300 group"
            >
              <span className="relative z-10">{item.name}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm group-hover:blur-none"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </a>
          ))}

          {/* Theme toggle integrated in navbar */}
          <button
            onClick={toggleTheme}
            className="relative ml-4 p-2 rounded-lg glass-theme hover:scale-105 transition-all duration-300 group"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-600" />
              )}
            </div>
          </button>
        </div>

        {/* mobile nav */}
        <div className="flex items-center space-x-2 md:hidden">
          {/* Theme toggle for mobile */}
          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-lg glass-theme hover:scale-105 transition-all duration-300 group"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-600" />
              )}
            </div>
          </button>

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="relative p-3 text-foreground z-50 group"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm group-hover:blur-none"></div>
            <div className="relative z-10">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center",
            "transition-all duration-500 ease-out md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="relative px-6 py-3 text-foreground/80 hover:text-primary transition-all duration-300 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
