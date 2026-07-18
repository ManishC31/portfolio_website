import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ProjectEntry from "@/components/ProjectEntry";
import { profile, stack } from "@/data/profile";
import { roles, education } from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import { posts, publications } from "@/data/writing";

const Index = () => (
  <Layout>
    {/* Intro */}
    <section id="about" className="measure pt-8 pb-16 scroll-mt-8">
      {/* Legacy anchor: "/#home" was linkable on the previous site. */}
      <span id="home" aria-hidden="true" />
      <h1 className="text-[clamp(1.875rem,5vw,2.5rem)] font-bold leading-tight tracking-tight">
        {profile.name}
      </h1>
      <p className="mt-1 text-muted">
        {profile.role} · {profile.location}
      </p>

      <div className="mt-6 space-y-4">
        {profile.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>

      <p className="mt-6 text-muted">{profile.availability}</p>

      <p className="mt-6 text-[0.9375rem]">
        <a href={`mailto:${profile.email}`} className="link">
          {profile.email}
        </a>
        {profile.links.map((link) => (
          <span key={link.href}>
            <span className="text-muted"> · </span>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {link.label}
            </a>
          </span>
        ))}
        <span className="text-muted"> · </span>
        <a
          href={profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          CV (PDF)
        </a>
      </p>
    </section>

    {/* Experience */}
    <section id="experience" className="measure py-12 scroll-mt-8">
      <h2 className="eyebrow">Experience</h2>

      <div className="mt-6 space-y-10">
        {roles.map((role) => (
          <article key={role.company} className="border-t border-border pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-[1.0625rem] font-semibold">
                {role.title}, {role.company}
              </h3>
              <p className="tag whitespace-nowrap">{role.period}</p>
            </div>
            <p className="tag">{role.location}</p>
            <p className="mt-3">{role.summary}</p>
            <ul className="mt-3 space-y-2 pl-5 text-muted list-disc marker:text-border">
              {role.points.map((point) => (
                <li key={point.slice(0, 32)}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>

    {/* Selected projects */}
    <section id="projects" className="measure py-12 scroll-mt-8">
      <h2 className="eyebrow">Selected projects</h2>

      <div className="mt-6 space-y-10">
        {featuredProjects.map((project) => (
          <ProjectEntry key={project.id} project={project} />
        ))}
      </div>

      <p className="mt-8 text-[0.9375rem]">
        <Link to="/projects" className="link">
          All projects
        </Link>
      </p>
    </section>

    {/* Stack */}
    <section className="measure py-12">
      <h2 className="eyebrow">Stack</h2>
      <dl className="mt-6 space-y-3 border-t border-border pt-6">
        {stack.map((group) => (
          <div key={group.label} className="sm:flex sm:gap-4">
            <dt className="tag sm:w-32 sm:shrink-0">{group.label}</dt>
            <dd>{group.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </section>

    {/* Writing & publications */}
    <section id="writing" className="measure py-12 scroll-mt-8">
      {/* Legacy anchor: the previous site linked this section as "/#blog". */}
      <span id="blog" aria-hidden="true" />
      <h2 className="eyebrow">Writing</h2>

      <ul className="mt-6 space-y-6">
        {posts.map((post) => (
          <li key={post.link} className="border-t border-border pt-6">
            <h3 className="text-[1.0625rem] font-semibold">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {post.title}
              </a>
            </h3>
            <p className="mt-2 text-muted">{post.description}</p>
            <p className="mt-2 tag">{post.topic}</p>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[0.9375rem]">
        <Link to="/blogs" className="link">
          All writing
        </Link>
      </p>

      <h2 className="eyebrow mt-12 block">Publications</h2>
      <ul className="mt-6 space-y-6">
        {publications.map((pub) => (
          <li key={pub.title} className="border-t border-border pt-6">
            <h3 className="text-[1.0625rem] font-semibold">
              {pub.link ? (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {pub.title}
                </a>
              ) : (
                pub.title
              )}
            </h3>
            <p className="mt-1 tag">
              {pub.venue}, {pub.year}
            </p>
            <p className="mt-2 text-muted">{pub.description}</p>
          </li>
        ))}
      </ul>
    </section>

    {/* Education */}
    <section id="education" className="measure py-12 scroll-mt-8">
      <h2 className="eyebrow">Education</h2>
      <div className="mt-6 space-y-6">
        {education.map((study) => (
          <div key={study.qualification} className="border-t border-border pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-[1.0625rem] font-semibold">
                {study.qualification}
              </h3>
              <p className="tag whitespace-nowrap">{study.period}</p>
            </div>
            <p className="tag">
              {study.institution} · {study.location}
              {study.note && ` · ${study.note}`}
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* Contact */}
    <section id="contact" className="measure py-12 scroll-mt-8">
      <h2 className="eyebrow">Contact</h2>
      <div className="mt-6 border-t border-border pt-6">
        <p>{profile.availability}</p>
        <p className="mt-4">
          <a href={`mailto:${profile.email}`} className="link">
            {profile.email}
          </a>
        </p>
        <p className="mt-2 text-[0.9375rem]">
          {profile.links.map((link, i) => (
            <span key={link.href}>
              {i > 0 && <span className="text-muted"> · </span>}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {link.label}
              </a>
            </span>
          ))}
          <span className="text-muted"> · </span>
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            CV (PDF)
          </a>
        </p>
      </div>
    </section>
  </Layout>
);

export default Index;
