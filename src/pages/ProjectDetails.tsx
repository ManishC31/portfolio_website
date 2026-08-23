import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github, KeyRound } from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

/** The long-form sections, in the order a reviewer wants them. */
const detailSections = (project: (typeof projects)[number]) => [
  { label: "Overview", body: project.overview },
  { label: "Role", body: project.role },
  { label: "The hard part", body: project.hardPart },
  { label: "Architecture", body: project.architecture },
];

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <Layout>
        <div className="measure py-24 text-center">
          <h1 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight">
            Project not found
          </h1>
          <p className="mt-6">
            <Link to="/projects" className="link">
              See all projects
            </Link>
          </p>
        </div>
      </Layout>
    );
  }

  const repos =
    project.githubLinks ??
    (project.githubLink ? [{ label: "Source", url: project.githubLink }] : []);

  return (
    <Layout>
      <article className="measure py-12 sm:py-16">
        <Link
          to="/projects"
          className="link-quiet inline-flex items-center gap-1.5 text-[0.9375rem]"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          All projects
        </Link>

        <Reveal>
          <p className="mt-8">
            <span className="chip">{project.category}</span>
          </p>

          <h1 className="mt-4 text-balance text-[clamp(2rem,5.5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em]">
            {project.title}
          </h1>

          <p className="prose-measure mt-5 text-pretty text-[1.0625rem] text-muted sm:text-[1.125rem]">
            {project.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Live demo
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}

            {repos.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Github size={16} aria-hidden="true" />
                {repo.label === "Source" ? "Source" : `Source · ${repo.label}`}
              </a>
            ))}

            {project.proprietaryNote && (
              <span className="tag">{project.proprietaryNote}</span>
            )}
          </div>
        </Reveal>

        {project.image && (
          <Reveal delay={80} className="mt-12">
            <figure className="card overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                width={1920}
                height={1200}
                className="w-full"
              />
            </figure>
          </Reveal>
        )}

        {/* Prose in the left column, the stack pinned alongside it on wide
            screens so it stays visible while the text is being read. */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="space-y-12">
            {detailSections(project).map((section, i) => (
              <Reveal key={section.label} delay={i * 50}>
                <h2 className="eyebrow">{section.label}</h2>
                <p className="prose-measure mt-3 text-pretty">{section.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <h2 className="eyebrow">Stack</h2>
              <ul className="mt-3.5 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>

            {project.testCredentials && (
              <Reveal delay={60}>
                <div className="card p-5">
                  <h2 className="eyebrow flex items-center gap-2">
                    <KeyRound size={13} aria-hidden="true" />
                    Test credentials
                  </h2>
                  <p className="mt-2.5 text-[0.875rem] text-muted">
                    Throwaway accounts for the live demo.
                  </p>
                  <ul className="mt-3 space-y-2">
                    {project.testCredentials.map((cred) => (
                      <li
                        key={cred.username}
                        className="rounded-lg bg-elevated px-3 py-2 font-mono text-[0.75rem] leading-relaxed"
                      >
                        <span className="block truncate">{cred.username}</span>
                        <span className="block text-muted">{cred.password}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ProjectDetails;
