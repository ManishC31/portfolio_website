import { ArrowUp, Sparkles, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-16 px-4 relative border-t border-border/50 mt-12">
      {/* Background decoration - theme-aware */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Manish Chavan
              </span>
            </div>
            <p className="text-muted-foreground/80 max-w-xs leading-relaxed">
              Full-stack developer passionate about creating innovative web
              experiences and cutting-edge applications.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">
              Quick Links
            </h4>
            <div className="space-y-2">
              <a
                href="#about"
                className="block text-muted-foreground/80 hover:text-primary transition-colors duration-300"
              >
                About
              </a>
              <a
                href="#skills"
                className="block text-muted-foreground/80 hover:text-primary transition-colors duration-300"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="block text-muted-foreground/80 hover:text-primary transition-colors duration-300"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="block text-muted-foreground/80 hover:text-primary transition-colors duration-300"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">
              Get In Touch
            </h4>
            <div className="space-y-2">
              <a
                href="mailto:manishchavan80@gmail.com"
                className="block text-muted-foreground/80 hover:text-primary transition-colors duration-300"
              >
                manishchavan80@gmail.com
              </a>
              <span className="block text-muted-foreground/80">
                Mumbai, Maharashtra, India
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-muted-foreground/80">
            <span>
              &copy; {new Date().getFullYear()} Manish Chavan. All rights
              reserved.
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline flex items-center space-x-1">
              Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" />{" "}
              in India
            </span>
          </div>

          {/* Back to top button */}
          <a
            href="#hero"
            className="group relative p-3 rounded-full glass-theme hover:scale-110 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <ArrowUp className="h-5 w-5 text-primary relative z-10 transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
};
