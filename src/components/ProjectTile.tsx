import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProjectMock from "@/components/mocks/ProjectMock";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectTileProps {
  project: Project;
  /** Grid placement and minimum height, supplied by the bento layout. */
  className?: string;
  dark?: boolean;
  /**
   * Put the copy and the illustration side by side. For the wide, short tile.
   * Only where the tile is actually wide: that is the two-column grid from
   * `md`, and the four-column grid from `xl`. Between `lg` and `xl` the same
   * tile is half the container and too narrow to share, so it stacks again.
   */
  split?: boolean;
  /** Show the stack and the hard part. Only the large tile has room for them. */
  showDetail?: boolean;
}

/*
 * One tile in the home page bento grid.
 *
 * The whole tile is clickable, but the link is only the title: its ::after is
 * stretched over the card. Wrapping the entire card in an <a> would make a
 * screen reader announce the tagline, the tokens and everything else as one
 * long link name.
 */
const ProjectTile = ({
  project,
  className,
  dark,
  split,
  showDetail,
}: ProjectTileProps) => (
  <article
    className={cn(
      "card group relative transition-colors duration-200",
      "[&:has(:focus-visible)]:outline [&:has(:focus-visible)]:outline-2 [&:has(:focus-visible)]:outline-offset-[3px] [&:has(:focus-visible)]:outline-ink",
      dark ? "card-dark on-dark hover:bg-ink-2" : "hover:bg-surface-hover",
      className,
    )}
  >
    <div className="flex items-start justify-between gap-3">
      <span className="chip">{project.category}</span>
      <span
        aria-hidden="true"
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
          dark ? "bg-white/10 text-white" : "bg-white text-ink",
        )}
      >
        <ArrowUpRight size={17} strokeWidth={2} />
      </span>
    </div>

    <div
      className={cn(
        "mt-5 flex flex-1 flex-col",
        split &&
          "md:max-lg:flex-row md:max-lg:items-end md:max-lg:gap-8 xl:flex-row xl:items-end xl:gap-8",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-2.5",
          split && "md:max-lg:flex-1 md:max-lg:self-start xl:flex-1 xl:self-start",
        )}
      >
        <h3 className="h-card">
          <Link
            to={`/project/${project.id}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>
        <p className={cn("copy max-w-[420px]", dark && "text-[#a8a8a8]")}>
          {project.tagline}
        </p>

        {showDetail && (
          <>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li key={tech} className="token">
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-5 max-w-[520px] border-t border-line pt-4">
              <p className="label">The hard part</p>
              <p className="copy mt-1.5">{project.hardPart}</p>
            </div>
          </>
        )}
      </div>

      <ProjectMock
        id={project.id}
        tone={dark ? "dark" : "light"}
        detailed={showDetail}
        className={cn(
          "mt-auto pt-8",
          split &&
            "md:max-lg:mt-0 md:max-lg:w-[56%] md:max-lg:shrink-0 md:max-lg:pt-0 xl:mt-0 xl:w-[56%] xl:shrink-0 xl:pt-0",
        )}
      />
    </div>
  </article>
);

export default ProjectTile;
