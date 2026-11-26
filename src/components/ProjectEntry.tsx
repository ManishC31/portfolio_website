import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProjectLinks from "@/components/ProjectLinks";
import ProjectMock from "@/components/mocks/ProjectMock";
import type { Project } from "@/data/projects";

/**
 * A project on the list page. Renders the five things a reviewer needs: what
 * it is, the role, the stack, the hard part, and the links.
 */
const ProjectEntry = ({ project }: { project: Project }) => (
  <article className="card gap-8 lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
    <div className="flex min-w-0 flex-col items-start">
      <span className="chip">{project.category}</span>

      <h2 className="mt-4 text-[clamp(26px,2.8vw,34px)] font-semibold leading-[1.15] tracking-[-0.03em]">
        <Link
          to={`/project/${project.id}`}
          className="transition-colors duration-150 hover:text-body"
        >
          {project.title}
        </Link>
      </h2>
      <p className="mt-3 text-[17px] leading-[1.55] text-body [text-wrap:pretty]">
        {project.summary}
      </p>

      <dl className="mt-6 w-full">
        <div className="border-t border-line py-4">
          <dt className="label">Role</dt>
          <dd className="copy mt-1.5">{project.role}</dd>
        </div>
        <div className="border-t border-line py-4">
          <dt className="label">Hard part</dt>
          <dd className="copy mt-1.5">{project.hardPart}</dd>
        </div>
        <div className="border-t border-line pt-4">
          <dt className="label">Stack</dt>
          <dd className="mt-2.5">
            <ul className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li key={tech} className="token">
                  {tech}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <div className="mt-7 flex flex-wrap items-center gap-2">
        <ProjectLinks project={project} />
        <Link to={`/project/${project.id}`} className="btn btn-md px-3 text-ink hover:bg-ink/[0.06]">
          Read more
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </div>

    <ProjectMock id={project.id} className="mx-auto w-full max-w-[440px]" />
  </article>
);

export default ProjectEntry;
