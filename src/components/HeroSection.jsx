import { ArrowDown, Sparkles, Code, Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Animated background elements - theme-aware */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating icons */}
      <div className="absolute top-1/4 left-1/4 animate-float">
        <Code className="h-8 w-8 text-primary/40 dark:text-primary/60" />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float delay-1000">
        <Zap className="h-8 w-8 text-purple-500/40 dark:text-purple-500/60" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float delay-2000">
        <Sparkles className="h-8 w-8 text-cyan-500/40 dark:text-cyan-500/60" />
      </div>

      <div className="container max-w-6xl mx-auto text-center z-10 relative">
        <div className="space-y-8">
          {/* Main heading with 3D effect */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              <span className="opacity-0 animate-fade-in block">
                <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                  Hi, I'm
                </span>
              </span>
              <span className="text-primary opacity-0 animate-fade-in-delay-1 block">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Manish
                </span>
              </span>
              <span className="opacity-0 animate-fade-in-delay-2 block">
                <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Chavan
                </span>
              </span>
            </h1>
          </div>

          {/* Subtitle with enhanced styling */}
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed opacity-0 animate-fade-in-delay-3">
              <span>
                I create stellar web experiences with modern technologies.
              </span>
              <br />
              <span>
                Specializing in both front-end & back-end development, I build
                applications that are both beautiful and functional.
              </span>
            </p>
          </div>

          {/* CTA Button with enhanced effects */}
          <div className="pt-8 opacity-0 animate-fade-in-delay-4">
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary via-purple-600 to-cyan-600 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-cyan-600 opacity-100 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 flex items-center space-x-2">
                <span>View My Work</span>
                <ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
