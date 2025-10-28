export const NotFound = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-background text-foreground overflow-hidden">
      {/* Soft cosmic backdrop without meteors */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <main className="relative z-10 px-6 text-center">
        <p className="mb-4 text-sm tracking-widest uppercase text-foreground/60">
          Error
        </p>
        <h1 className="text-7xl md:text-9xl font-black leading-none gradient-text-secondary drop-shadow-2xl">
          404
        </h1>
        <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-xl mx-auto">
          The page you’re looking for drifted into space. Let’s navigate back
          home.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <a href="/" className="cosmic-button">
            Go Home
          </a>
          <a
            href="/#projects"
            className="px-8 py-3 rounded-full border border-border/60 text-foreground/90 hover-glow hover-lift"
          >
            View Projects
          </a>
        </div>

        <div className="mt-12 text-xs text-foreground/50">
          Or use the navigation menu to explore
        </div>
      </main>
    </div>
  );
};
