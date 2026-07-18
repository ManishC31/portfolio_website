import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";

/** Renders the five things a reviewer needs: what, role, stack, hard part, links. */
const ProjectEntry = ({ project }: { project: Project }) => {
  const links = project.githubLinks ?? (
    project.githubLink ? [{ label: "Source", url: project.githubLink }] : []
  );

  return (
    <article className="border-t border-border pt-6">
      <h3 className="text-[1.0625rem] font-semibold">
        <Link to={`/project/${project.id}`} className="link">
          {project.title}
        </Link>
      </h3>

      <p className="mt-2">{project.summary}</p>

      <dl className="mt-4 space-y-3">
        <div>
          <dt className="eyebrow">Role</dt>
          <dd className="mt-1 text-muted">{project.role}</dd>
        </div>
        <div>
          <dt className="eyebrow">Hard part</dt>
          <dd className="mt-1 text-muted">{project.hardPart}</dd>
        </div>
        <div>
          <dt className="eyebrow">Stack</dt>
          <dd className="mt-1 tag">{project.techStack.join(" · ")}</dd>
        </div>
      </dl>

      <p className="mt-4 text-[0.9375rem]">
        {project.liveLink && (
          <>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Live demo
            </a>
            {(links.length > 0 || project.proprietaryNote) && (
              <span className="text-muted"> · </span>
            )}
          </>
        )}
        {links.map((link, i) => (
          <span key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {link.label === "Source" ? "Source" : `Source: ${link.label}`}
            </a>
            {i < links.length - 1 && <span className="text-muted"> · </span>}
          </span>
        ))}
        {project.proprietaryNote && (
          <span className="text-muted">{project.proprietaryNote}</span>
        )}
      </p>
    </article>
  );
};

export default ProjectEntry;
