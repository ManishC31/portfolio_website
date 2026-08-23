/*
 * The atmospheric background behind the hero: three large, heavily blurred
 * colour fields on slow independent loops, over a faint graph-paper grid.
 *
 * All CSS. No canvas, no WebGL, no per-frame JavaScript — the compositor
 * animates three transforms and nothing touches the main thread. The blur is
 * the expensive part, so each blob is a plain gradient rather than anything
 * with structure to resolve.
 *
 * aria-hidden and pointer-events-none throughout: this is wallpaper, and it
 * sits under real text that has to stay selectable.
 */
const Aurora = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(120vh,1000px)] overflow-hidden"
    style={{ opacity: "var(--aurora-opacity)" }}
  >
    <div className="absolute inset-0 bg-grid" />

    {/* Sized in vw so the blobs stay proportional rather than turning into
        three tight dots on a phone. */}
    <div
      className="absolute -top-[18vh] left-[8%] h-[52vw] w-[52vw] max-h-[620px] max-w-[620px] animate-drift rounded-full blur-[90px]"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.42), transparent 68%)",
      }}
    />
    <div
      className="absolute -top-[6vh] right-[2%] h-[46vw] w-[46vw] max-h-[560px] max-w-[560px] animate-drift-slow rounded-full blur-[90px]"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, hsl(var(--accent-2) / 0.3), transparent 68%)",
      }}
    />
    <div
      className="absolute top-[22vh] left-[38%] h-[40vw] w-[40vw] max-h-[500px] max-w-[500px] animate-drift-slower rounded-full blur-[100px]"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, hsl(310 80% 60% / 0.22), transparent 68%)",
      }}
    />

    {/* Washes the whole thing out into the page colour, so the hero does not
        end at a visible horizon. */}
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-background" />
  </div>
);

export default Aurora;
