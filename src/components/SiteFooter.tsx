import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const SECTIONS = [
  { name: "Work", hash: "#projects" },
  { name: "Experience", hash: "#experience" },
  { name: "Stack", hash: "#stack" },
  { name: "Writing", hash: "#writing" },
  { name: "Contact", hash: "#contact" },
];

const ICONS = { GitHub: Github, LinkedIn: Linkedin } as const;

const columnHeading = "mb-1 text-[13px] font-semibold text-ink";
const columnLink = "text-body transition-colors duration-150 hover:text-ink";

const SiteFooter = () => (
  <footer className="px-6 pb-10 pt-[clamp(88px,11vw,120px)]">
    <div className="container-site">
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-b border-line-soft pb-14 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
        <div className="col-span-2 flex flex-col items-start gap-[18px] lg:col-span-1">
          <Link
            to="/"
            className="flex items-center gap-[9px] text-[20px] font-semibold tracking-[-0.4px] text-ink transition-colors duration-150 hover:text-body"
          >
            <span
              aria-hidden="true"
              className="flex size-[28px] items-center justify-center rounded-[8px] bg-ink text-[14px] font-semibold tracking-normal text-white"
            >
              {profile.name.charAt(0)}
            </span>
            {profile.name}
          </Link>
          <p className="max-w-[300px] text-[15px] leading-[1.55] text-muted">
            {profile.role} in {profile.location}. {profile.availability}
          </p>
          <a href={`mailto:${profile.email}`} className="btn btn-dark btn-md">
            <Mail size={16} strokeWidth={1.9} aria-hidden="true" />
            Email me
          </a>
          <p className="font-mono text-[12px] text-subtle">{profile.languages}</p>
        </div>

        <nav aria-label="Site" className="flex min-w-0 flex-col gap-3 text-[14px]">
          <h2 className={columnHeading}>Site</h2>
          {SECTIONS.map((item) => (
            <Link key={item.hash} to={`/${item.hash}`} className={columnLink}>
              {item.name}
            </Link>
          ))}
        </nav>

        <nav aria-label="Projects" className="flex min-w-0 flex-col gap-3 text-[14px]">
          <h2 className={columnHeading}>Projects</h2>
          {projects.map((project) => (
            <Link key={project.id} to={`/project/${project.id}`} className={columnLink}>
              {project.title}
            </Link>
          ))}
          <Link to="/projects" className={columnLink}>
            All projects
          </Link>
        </nav>

        <nav
          aria-label="Elsewhere"
          className="col-span-2 flex min-w-0 flex-col gap-3 text-[14px] sm:col-span-1"
        >
          <h2 className={columnHeading}>Elsewhere</h2>
          {profile.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={columnLink}
            >
              {link.label}
            </a>
          ))}
          <Link to="/blogs" className={columnLink}>
            Writing
          </Link>
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className={columnLink}
          >
            CV (PDF)
          </a>
        </nav>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-[13px] text-subtle">
        {/*
          The year is baked in at build time and recomputed on hydration, so
          these disagree in the window between a December build and a January
          visit. The client value is the correct one; suppress the notice
          rather than freeze the year.
        */}
        <p suppressHydrationWarning>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-2">
          {profile.links.map((link) => {
            const Icon = ICONS[link.label];
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex size-9 items-center justify-center rounded-full bg-chip text-ink transition-colors duration-150 hover:bg-chip-hover"
              >
                <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>

      {/*
        Decorative sign-off. The sizing lives in .wordmark (index.css).
      */}
      <div
        aria-hidden="true"
        className="wordmark mt-10 select-none whitespace-nowrap text-center"
      >
        {profile.name}
      </div>
    </div>
  </footer>
);

export default SiteFooter;
