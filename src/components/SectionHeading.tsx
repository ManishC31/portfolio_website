import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** id for the <h2>, so the section can point aria-labelledby at it. */
  id: string;
  eyebrow: string;
  /** First clause, in ink. */
  title: string;
  /** Second clause, in grey. The two-tone split is the house heading style. */
  accent?: string;
  lead?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

const SectionHeading = ({
  id,
  eyebrow,
  title,
  accent,
  lead,
  align = "center",
  className,
}: SectionHeadingProps) => (
  <div className={cn(align === "center" && "text-center", className)}>
    <p className="eyebrow">{eyebrow}</p>
    <h2 id={id} className="h-section mt-2.5">
      {title}
      {accent && (
        <>
          {" "}
          {/* Centred headings wrap wherever balance puts the break. Left-aligned
              ones share a row with a button, so the grey clause takes its own
              line rather than leaving a stray word behind. */}
          <span className={cn("text-faint", align === "left" && "block")}>
            {accent}
          </span>
        </>
      )}
    </h2>
    {lead && (
      <p
        className={cn(
          "lead mt-6 max-w-[560px]",
          align === "center" && "mx-auto",
        )}
      >
        {lead}
      </p>
    )}
  </div>
);

export default SectionHeading;
