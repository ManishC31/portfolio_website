import { ArrowUpRight, Github, Lock } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Normalises the two ways a project can declare its repositories. */
const reposOf = (project: Project) =>
  project.githubLinks ??
  (project.githubLink ? [{ label: "Source", url: project.githubLink }] : []);

/*
 * The outbound actions for a project: live demo, source repositories, or the
 * note explaining why there are none. Shared by the project list and the
 * project page so the two can never disagree.
 */
const ProjectLinks = ({
  project,
  size = "md",
  on = "card",
  className,
}: {
  project: Project;
  size?: "md" | "lg";
  /** What the buttons sit on: a grey card, or the white page. */
  on?: "card" | "page";
  className?: string;
}) => {
  const repos = reposOf(project);
  const button = size === "lg" ? "btn-lg" : "btn-md";
  // A secondary button has to contrast with its background, so it is white on
  // a card and grey on the page.
  const secondary = on === "card" ? "btn-white" : "btn-chip";
  const icon = size === "lg" ? 17 : 16;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {project.liveLink && (
        <a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("btn btn-dark", button)}
        >
          Live demo
          <ArrowUpRight size={icon} strokeWidth={2} aria-hidden="true" />
        </a>
      )}

      {repos.map((repo) => (
        <a
          key={repo.url}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("btn", secondary, button)}
        >
          <Github size={icon} strokeWidth={1.9} aria-hidden="true" />
          {repo.label === "Source" ? "Source" : `Source: ${repo.label}`}
        </a>
      ))}

      {project.proprietaryNote && (
        <p className="flex items-center gap-2 text-[14px] text-muted">
          <Lock size={14} strokeWidth={2} aria-hidden="true" className="shrink-0" />
          {project.proprietaryNote}
        </p>
      )}
    </div>
  );
};

export default ProjectLinks;
