import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import type { Project } from "@/data/projects";
import { useSpotlight } from "@/hooks/use-spotlight";

/*
 * One card, two densities.
 *
 *   "grid" — the home page bento. Screenshot, summary, stack, links.
 *   "list" — /projects. Adds the role and the hard part, because that page is
 *            read by someone who has already decided to look properly.
 *
 * The card is entirely clickable: the title link is stretched over the whole
 * article with ::after, and the external links are lifted above it. That keeps
 * a single, correctly-labelled link in the accessibility tree instead of the
 * onClick-on-a-div pattern, which is invisible to a keyboard.
 */

/** Hostname only — "docrag.manishchavan.in" reads better than the full URL. */
const hostOf = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};

/** Chrome around the screenshot, so it reads as an application, not a JPEG. */
const Preview = ({ project }: { project: Project }) => (
  <div className="relative overflow-hidden border-b border-border bg-elevated">
    <div className="flex items-center gap-2 border-b border-border/70 bg-surface px-3.5 py-2.5">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
      </span>
      <span className="truncate font-mono text-[0.6875rem] text-muted">
        {project.liveLink ? hostOf(project.liveLink) : project.title}
      </span>
    </div>

    {/*
      A fixed height rather than an aspect ratio. The bento puts cards of two
      different widths in the same row, and `aspect-[16/9]` would make each
      preview a different height; capping that with max-height does not help,
      because a box with both an aspect-ratio and a height limit satisfies the
      ratio by narrowing itself, leaving a stripe of bare card beside it.
      A height plus object-cover crops instead, which is what was wanted.

      The image is anchored top-left: the interesting part of a UI capture is
      the top of the page, never the bottom.
    */}
    <div className="relative h-56 overflow-hidden sm:h-64">
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading="lazy"
        decoding="async"
        width={1920}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      {/* Ties the screenshot's own palette back into the page. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/45 via-transparent to-transparent" />
    </div>
  </div>
);

/*
 * Stand-in for a project with no usable capture — either because it is closed
 * source, or because the live demo was unreachable when the shots were taken.
 * A designed panel rather than a placeholder box: an obvious "image missing"
 * slot reads as an unfinished site, whereas this reads as a choice.
 *
 * The lock only appears for genuinely closed-source work. Showing it on an
 * open-source project that merely lacks a screenshot would be a lie told in
 * iconography.
 */
const NoPreview = ({ project }: { project: Project }) => (
  <div className="relative overflow-hidden border-b border-border bg-elevated">
    <div className="relative flex h-56 items-center justify-center overflow-hidden px-6 sm:h-64">
      {/*
        The grid gets its own layer. .bg-grid carries a mask-image, and a mask
        applies to an element's whole subtree — putting it on this flex
        container instead would fade the wordmark and the label below with it.
      */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid" />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 20% 0%, hsl(var(--accent) / 0.26), transparent 62%), radial-gradient(90% 80% at 90% 100%, hsl(var(--accent-2) / 0.18), transparent 62%)",
        }}
      />

      {/* Oversized wordmark: gives the panel a subject without competing with
          the real title directly beneath it. */}
      <p
        aria-hidden="true"
        className="relative select-none text-balance text-center text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.04em] text-foreground/35"
      >
        {project.title}
      </p>

      {/* The category is already a chip beside the title, so this corner says
          the one thing the panel itself explains: why there is no screenshot. */}
      {project.proprietaryNote && (
        <span className="absolute bottom-4 left-5 flex items-center gap-1.5 text-muted">
          <Lock size={12} strokeWidth={2} aria-hidden="true" />
          <span className="eyebrow">Closed source</span>
        </span>
      )}
    </div>
  </div>
);

const ProjectCard = ({
  project,
  variant = "grid",
}: {
  project: Project;
  variant?: "grid" | "list";
}) => {
  const spotlight = useSpotlight<HTMLElement>();

  const repos =
    project.githubLinks ??
    (project.githubLink ? [{ label: "Source", url: project.githubLink }] : []);

  return (
    <article
      {...spotlight}
      className="card card-spotlight group flex h-full flex-col transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/35"
    >
      {project.image ? (
        <Preview project={project} />
      ) : (
        <NoPreview project={project} />
      )}

      <div className="relative flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[1.125rem] font-semibold tracking-tight">
            {/* Stretched: the ::after covers the whole card. */}
            <Link
              to={`/project/${project.id}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </h3>
          <span className="chip shrink-0">{project.category}</span>
        </div>

        <p className="mt-2.5 text-muted text-pretty">{project.summary}</p>

        {variant === "list" && (
          <dl className="mt-5 space-y-4 border-t border-border pt-5">
            <div>
              <dt className="eyebrow">Role</dt>
              <dd className="mt-1 text-muted">{project.role}</dd>
            </div>
            <div>
              <dt className="eyebrow">The hard part</dt>
              <dd className="mt-1 text-muted">{project.hardPart}</dd>
            </div>
          </dl>
        )}

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        {/* mt-auto pins the link row to the bottom, so cards of different text
            lengths still align across a grid row. */}
        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6 text-[0.9375rem]">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-accent no-underline hover:underline underline-offset-4"
            >
              Live demo
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}

          {repos.map((repo) => (
            <a
              key={repo.url}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-quiet inline-flex items-center gap-1.5"
            >
              <Github size={15} aria-hidden="true" />
              {repo.label}
            </a>
          ))}

          {project.proprietaryNote && (
            <span className="tag">{project.proprietaryNote}</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
