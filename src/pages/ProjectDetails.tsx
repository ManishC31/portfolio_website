import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import ProjectLinks from "@/components/ProjectLinks";
import ProjectMock from "@/components/mocks/ProjectMock";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";
import { NotFoundBody } from "@/pages/NotFound";

/** One labelled row of the write-up: mono label on the left, prose on the right. */
const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <Reveal
    as="section"
    className="grid gap-x-10 gap-y-3 border-t border-line py-9 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)]"
  >
    <h2 className="label pt-1.5">{label}</h2>
    <div className="max-w-[720px] text-pretty text-[18px] leading-[1.6] text-body">
      {children}
    </div>
  </Reveal>
);

const ProjectDetails = () => {
  const { id } = useParams();
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];

  if (!project) {
    return (
      <Layout>
        <NotFoundBody
          title="Project not found"
          message="There is no project at that address."
        />
      </Layout>
    );
  }

  const next = projects[(index + 1) % projects.length];

  return (
    <Layout>
      <article className="px-6 pt-[clamp(116px,15vw,156px)]">
        <div className="container-site">
          <Link to="/projects" className="btn btn-chip btn-sm">
            <ArrowLeft size={14} strokeWidth={2.2} aria-hidden="true" />
            All projects
          </Link>

          <header className="mt-9 grid items-center gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <div className="flex min-w-0 flex-col items-start">
              <span className="chip">{project.category}</span>
              <h1 className="h-page mt-5">{project.title}</h1>
              <p className="mt-6 max-w-[620px] text-pretty text-[clamp(17px,1.9vw,20px)] leading-[1.5] text-muted">
                {project.summary}
              </p>
              <ProjectLinks project={project} size="lg" on="page" className="mt-9" />
            </div>

            {/* Renders nothing for a project without an illustration. */}
            <ProjectMock id={project.id} framed className="mx-auto max-w-[440px]" />
          </header>

          <div className="mt-[clamp(64px,9vw,112px)] border-b border-line">
            <Row label="Overview">
              <p>{project.overview}</p>
            </Row>
            <Row label="Role">
              <p>{project.role}</p>
            </Row>
            <Row label="The hard part">
              <p>{project.hardPart}</p>
            </Row>
            <Row label="Architecture">
              <p>{project.architecture}</p>
            </Row>
            <Row label="Stack">
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <li key={tech} className="token bg-surface">
                    {tech}
                  </li>
                ))}
              </ul>
            </Row>

            {project.testCredentials && (
              <Row label="Test credentials">
                <p className="text-[15px] text-muted">
                  Throwaway accounts for the live demo.
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {project.testCredentials.map((cred) => (
                    <li
                      key={cred.username}
                      className="flex flex-wrap items-center gap-x-6 gap-y-1 rounded-2xl bg-surface px-4 py-3 font-mono text-[14px] text-ink"
                    >
                      <span className="break-all">{cred.username}</span>
                      <span className="text-subtle">{cred.password}</span>
                    </li>
                  ))}
                </ul>
              </Row>
            )}
          </div>

          {next && next.id !== project.id && (
            <Reveal className="mt-[clamp(56px,8vw,96px)]">
              <Link
                to={`/project/${next.id}`}
                className="card group flex-row items-center justify-between gap-6 transition-colors duration-200 hover:bg-surface-hover"
              >
                <span className="flex min-w-0 flex-col gap-2">
                  <span className="eyebrow">Next project</span>
                  <span className="text-balance text-[clamp(24px,3vw,38px)] font-semibold leading-[1.15] tracking-[-0.035em]">
                    {next.title}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-200 ease-out group-hover:translate-x-1"
                >
                  <ArrowRight size={20} strokeWidth={2} />
                </span>
              </Link>
            </Reveal>
          )}
        </div>
      </article>
    </Layout>
  );
};

export default ProjectDetails;
