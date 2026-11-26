import { Pause, Play } from "lucide-react";
import { toggleMotionPaused, useMotionPaused } from "@/lib/motion-pref";
import { cn } from "@/lib/utils";

/*
 * Stops and restarts every looping animation on the page. See motion-pref.ts
 * for why this exists. Hidden for readers who prefer reduced motion: nothing
 * is moving for them in the first place.
 */
const PauseMotionButton = ({ className }: { className?: string }) => {
  const paused = useMotionPaused();

  return (
    <button
      type="button"
      onClick={toggleMotionPaused}
      aria-pressed={paused}
      className={cn("btn btn-chip btn-sm motion-reduce:hidden", className)}
    >
      {paused ? (
        <Play size={13} strokeWidth={2.2} aria-hidden="true" />
      ) : (
        <Pause size={13} strokeWidth={2.2} aria-hidden="true" />
      )}
      {/* The label stays put and aria-pressed carries the state, which is what
          screen readers expect of a toggle. */}
      Pause animations
    </button>
  );
};

export default PauseMotionButton;
