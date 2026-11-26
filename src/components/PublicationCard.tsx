import { ArrowUpRight } from "lucide-react";
import type { Publication } from "@/data/writing";
import { cn } from "@/lib/utils";

/** The dark tile for a peer-reviewed publication. */
const PublicationCard = ({
  publication,
  heading: Heading = "h3",
  className,
}: {
  publication: Publication;
  heading?: "h2" | "h3";
  className?: string;
}) => (
  <article className={cn("card card-dark on-dark items-start", className)}>
    <span className="chip">Publication · {publication.year}</span>

    <Heading className="h-card mt-auto pt-10">{publication.title}</Heading>
    <p className="copy mt-2.5 max-w-[560px] text-[#a8a8a8]">
      {publication.description}
    </p>
    <p className="mt-3 text-[13px] leading-[1.45] text-white/60">
      {publication.venue}
    </p>

    {publication.link && (
      <a
        href={publication.link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost-dark btn-md mt-6"
      >
        Read the paper
        <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
      </a>
    )}
  </article>
);

export default PublicationCard;
