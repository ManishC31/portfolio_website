import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import CVModal from "./CVModal";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-16">
        <button onClick={() => handleClick("#home")} className="neon-text font-display font-bold text-xl tracking-tight">
          MC
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleClick(item.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setCvOpen(true)}
            className="btn-primary-glow text-sm !px-4 !py-2"
          >
            View CV
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground p-2">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-border"
          >
            <div className="section-container py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleClick(item.href)}
                  className="text-sm text-muted-foreground hover:text-foreground text-left py-2"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { setMobileOpen(false); setCvOpen(true); }}
                className="btn-primary-glow text-sm text-center !py-2"
              >
                View CV
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
};

export default Navbar;
