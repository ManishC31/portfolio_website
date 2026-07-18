import { Link, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { projects } from "@/data/projects";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <Layout>
        <div className="measure py-12">
          <h1 className="text-[clamp(1.5rem,4vw,2rem)] font-bold tracking-tight">
            Project not found
          </h1>
          <p className="mt-4">
            <Link to="/projects" className="link">
              See all projects
            </Link>
          </p>
        </div>
      </Layout>
    );
  }

  const repos = project.githubLinks ?? (
    project.githubLink ? [{ label: "Source", url: project.githubLink }] : []
  );

  return (
    <Layout>
      <article className="measure py-12">
        <p className="text-[0.9375rem]">
          <Link to="/projects" className="link-quiet">
            ← All projects
          </Link>
        </p>

        <h1 className="mt-6 text-[clamp(1.5rem,4vw,2rem)] font-bold tracking-tight">
          {project.title}
        </h1>
        <p className="mt-1 tag">{project.category}</p>

        <p className="mt-6">{project.summary}</p>

        <p className="mt-6 text-[0.9375rem]">
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
              {repos.length > 0 && <span className="text-muted"> · </span>}
            </>
          )}
          {repos.map((repo, i) => (
            <span key={repo.url}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {repo.label === "Source" ? "Source" : `Source: ${repo.label}`}
              </a>
              {i < repos.length - 1 && <span className="text-muted"> · </span>}
            </span>
          ))}
          {project.proprietaryNote && (
            <span className="text-muted">{project.proprietaryNote}</span>
          )}
        </p>

        <section className="mt-12">
          <h2 className="eyebrow">Overview</h2>
          <p className="mt-3">{project.overview}</p>
        </section>

        <section className="mt-10">
          <h2 className="eyebrow">Role</h2>
          <p className="mt-3">{project.role}</p>
        </section>

        <section className="mt-10">
          <h2 className="eyebrow">The hard part</h2>
          <p className="mt-3">{project.hardPart}</p>
        </section>

        <section className="mt-10">
          <h2 className="eyebrow">Architecture</h2>
          <p className="mt-3">{project.architecture}</p>
        </section>

        <section className="mt-10">
          <h2 className="eyebrow">Stack</h2>
          <p className="mt-3">{project.techStack.join(" · ")}</p>
        </section>

        {project.testCredentials && (
          <section className="mt-10">
            <h2 className="eyebrow">Test credentials</h2>
            <p className="mt-3 text-muted text-[0.9375rem]">
              Throwaway accounts for the live demo.
            </p>
            <ul className="mt-3 space-y-2">
              {project.testCredentials.map((cred) => (
                <li key={cred.username} className="font-mono text-[0.875rem]">
                  {cred.username} · {cred.password}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </Layout>
  );
};

export default ProjectDetails;
