import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Database,
  Download,
  Github,
  Linkedin,
  Mail,
  Rocket,
  Sparkles,
} from "lucide-react";
import Layout from "@/components/Layout";
import Aurora from "@/components/Aurora";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import TechMarquee from "@/components/TechMarquee";
import Typewriter from "@/components/Typewriter";
import Portrait from "@/components/Portrait";
import SpotlightCard from "@/components/SpotlightCard";
import { allTools, capabilities, profile, stack } from "@/data/profile";
import { roles, education } from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import { posts, publications } from "@/data/writing";

/** Icon per capability, so profile.ts carries no presentation detail. */
const CAPABILITY_ICONS: Record<string, typeof Github> = {
  stack: Boxes,
  data: Database,
  ai: Sparkles,
  ship: Rocket,
};

/** Icon per link label, so the footer data stays free of presentation. */
const LINK_ICONS: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
};

/*
 * Tailwind cannot see a class name assembled at runtime, so the span variants
 * are written out in full for the scanner to find.
 */
const SPAN_CLASS: Record<number, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  6: "lg:col-span-6",
};

const Hero = () => (
  /*
   * Fills the first screen. 100svh rather than 100vh so mobile browsers
   * measure it against the small viewport and the hero is not pushed under the
   * address bar; the header is a fixed 4rem, hence the subtraction. min-h, not
   * h, so a short window scrolls instead of clipping the portrait.
   */
  <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden py-12 sm:py-16">
    <Aurora />

    <div className="measure">
      {/* Legacy anchors: both were linkable on the previous site. */}
      <span id="home" aria-hidden="true" />

      {/*
        Text and portrait sit side by side from lg up; below that the portrait
        drops under the buttons, so the name still leads on a phone.
      */}
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 py-1.5 pl-3 pr-4 text-[0.8125rem] text-muted backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-breathe rounded-full bg-accent" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.availabilityShort}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-7 text-balance text-[clamp(2.5rem,7.5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              <span className="gradient-text">{profile.name}</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            {/* min-h holds the line's height so the page does not reflow as the
                typewriter shortens and lengthens the text. */}
            <p className="mt-4 flex min-h-[1.8em] items-center text-[clamp(1.125rem,2.6vw,1.5rem)] font-medium text-muted">
              <Typewriter phrases={profile.headlines} />
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="prose-measure mt-7 text-pretty text-[1.0625rem] leading-relaxed sm:text-[1.125rem]">
              {profile.headline}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                <Mail size={16} aria-hidden="true" />
                Get in touch
              </a>
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Download size={16} aria-hidden="true" />
                Download CV
              </a>

              <span className="mx-1 hidden h-6 w-px bg-border sm:block" aria-hidden="true" />

              {profile.links.map((link) => {
                const Icon = LINK_ICONS[link.label];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="link-quiet rounded-full border border-border p-2.5 transition-colors hover:border-accent/40 hover:bg-elevated"
                  >
                    {Icon ? <Icon size={17} aria-hidden="true" /> : link.label}
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={280}>
          <Portrait />
        </Reveal>
      </div>

    </div>

    <Reveal delay={340} className="mt-16 sm:mt-20">
      <TechMarquee items={allTools} />
    </Reveal>
  </section>
);

/*
 * What used to be a row of business metrics (monthly actives, uptime, record
 * counts). Those numbers describe an employer's product rather than what I can
 * be handed on day one, so they moved down into the roles that earned them and
 * this says what I actually do instead.
 */
const Capabilities = () => (
  <section className="measure py-16 sm:py-20">
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {capabilities.map((capability, i) => {
        const Icon = CAPABILITY_ICONS[capability.icon];
        return (
          <Reveal as="li" key={capability.title} delay={i * 70} className="bg-surface">
            <div className="h-full p-6 lg:p-7">
              {Icon && (
                <Icon
                  size={20}
                  strokeWidth={1.6}
                  className="text-accent"
                  aria-hidden="true"
                />
              )}
              <h2 className="mt-4 text-[1.0625rem] font-semibold tracking-tight">
                {capability.title}
              </h2>
              <p className="mt-2 text-[0.9375rem] text-pretty text-muted">
                {capability.detail}
              </p>
            </div>
          </Reveal>
        );
      })}
    </ul>
  </section>
);

/** The contact panel, which is the one place the spotlight runs full-width. */
const ContactPanel = () => (
  <SpotlightCard className="p-8 sm:p-12">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(90% 120% at 15% 0%, hsl(var(--accent) / 0.14), transparent 55%), radial-gradient(80% 120% at 100% 100%, hsl(var(--accent-2) / 0.12), transparent 55%)",
      }}
    />

    <div className="relative">
      <p className="text-balance text-[clamp(1.5rem,3.6vw,2.125rem)] font-semibold leading-tight tracking-tight">
        Looking for someone who can own a system end to end?
      </p>
      <p className="prose-measure mt-4 text-pretty text-muted">
        {profile.availability}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href={`mailto:${profile.email}`} className="btn-primary">
          <Mail size={16} aria-hidden="true" />
          {profile.email}
        </a>
        <a
          href={profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <Download size={16} aria-hidden="true" />
          CV (PDF)
        </a>
      </div>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
        {profile.links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-quiet inline-flex items-center gap-1.5"
            >
              {link.label}
              <span className="text-muted">·</span>
              <span className="font-mono text-[0.8125rem]">{link.handle}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </SpotlightCard>
);

const Index = () => (
  <Layout>
    <Hero />
    <Capabilities />

    <Section
      id="about"
      label="About"
      title="Mostly backend, with the frontend to prove it works."
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Reveal className="space-y-5 text-pretty">
          {profile.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={80}>
          <dl className="card divide-y divide-border">
            {[
              { term: "Based in", detail: profile.location },
              { term: "Studying", detail: education[0].qualification },
              { term: "Languages", detail: profile.languages },
              { term: "Status", detail: "German work permit holder" },
            ].map((row) => (
              <div key={row.term} className="px-6 py-4">
                <dt className="eyebrow">{row.term}</dt>
                <dd className="mt-1.5 text-[0.9375rem]">{row.detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>

    <Section
      id="experience"
      label="Experience"
      title="Where I have worked, and what came of it."
    >
      {/*
        Two columns from lg up: the company and dates on the left, the work
        itself on the right. The previous single narrow column ran the role,
        the dates, the summary and five bullets down one 68ch measure, which
        left no gap between one job and the next.
      */}
      <ol className="space-y-14 sm:space-y-16">
        {roles.map((role, i) => (
          <Reveal as="li" key={role.company} delay={i * 60}>
            <article className="grid gap-6 border-t border-border pt-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
              <div>
                <p className="flex items-center gap-2.5 font-mono text-[0.8125rem] text-muted">
                  {/* Only the current role gets the live indicator. */}
                  {i === 0 && (
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 animate-breathe rounded-full bg-accent"
                    />
                  )}
                  {role.period}
                </p>
                <h3 className="mt-3 text-[1.25rem] font-semibold tracking-tight">
                  {role.company}
                </h3>
                <p className="mt-1 text-[0.9375rem] text-muted">{role.location}</p>
              </div>

              <div>
                <p className="text-[1.0625rem] font-medium">{role.title}</p>
                <p className="prose-measure mt-2 text-pretty text-muted">
                  {role.summary}
                </p>

                <ul className="mt-7 space-y-5">
                  {role.points.map((point) => (
                    <li
                      key={point.slice(0, 32)}
                      className="prose-measure relative pl-6 text-pretty"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.65em] h-1.5 w-1.5 rounded-full bg-accent/70"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>

    <Section
      id="projects"
      label="Selected projects"
      title="Things I built, and the part that was actually hard."
      intro="Every one of these is live or open source. Two ship with throwaway logins so you can go straight in."
    >
      {/* Six columns on large screens; each project declares its own span. */}
      <div className="grid gap-5 lg:grid-cols-6">
        {featuredProjects.map((project, i) => (
          <Reveal
            key={project.id}
            delay={(i % 2) * 80}
            className={SPAN_CLASS[project.span ?? 3]}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <Link
          to="/projects"
          className="link-quiet inline-flex items-center gap-1.5 text-[0.9375rem]"
        >
          All projects
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </Reveal>
    </Section>

    <Section label="Stack" title="What I reach for.">
      {/*
        Separate cards rather than one hairline-gapped block. With seven groups
        in a three-column grid the old version left two cells with no child in
        them, which rendered as a solid slab of border colour.
      */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group, i) => (
          <Reveal key={group.label} delay={(i % 3) * 60}>
            <div className="card h-full p-6">
              <h3 className="eyebrow">{group.label}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>

    <Section
      id="writing"
      label="Writing"
      title="Notes on system design and applied AI."
    >
      {/* Legacy anchor: the previous site linked this section as "/#blog". */}
      <span id="blog" aria-hidden="true" />

      <ul className="grid gap-5 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal as="li" key={post.link} delay={i * 60}>
            <SpotlightCard
              as="article"
              glow="border"
              className="group h-full p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="eyebrow">{post.topic}</p>
              <h3 className="mt-3 text-[1.0625rem] font-semibold leading-snug tracking-tight">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline after:absolute after:inset-0 after:content-['']"
                >
                  {post.title}
                </a>
              </h3>
              <p className="mt-2.5 text-[0.9375rem] text-pretty text-muted">
                {post.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-[0.875rem] text-accent">
                Read
                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </SpotlightCard>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-10">
        <Link
          to="/blogs"
          className="link-quiet inline-flex items-center gap-1.5 text-[0.9375rem]"
        >
          All writing
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </Reveal>

      <Reveal className="mt-16">
        <div className="flex items-center gap-4">
          <h3 className="eyebrow whitespace-nowrap">Publications</h3>
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </div>
      </Reveal>

      <ul className="mt-8 space-y-6">
        {publications.map((pub) => (
          <Reveal as="li" key={pub.title}>
            <article className="card p-6">
              <h4 className="text-[1.0625rem] font-semibold tracking-tight">
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
              </h4>
              <p className="mt-1.5 tag">
                {pub.venue}, {pub.year}
              </p>
              <p className="mt-3 text-pretty text-muted">{pub.description}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>

    <Section id="education" label="Education">
      <div className="grid gap-5 sm:grid-cols-2">
        {education.map((study, i) => (
          <Reveal key={study.qualification} delay={i * 60}>
            <div className="card h-full p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[1.0625rem] font-semibold tracking-tight">
                  {study.qualification}
                </h3>
                <p className="tag whitespace-nowrap font-mono">{study.period}</p>
              </div>
              <p className="mt-2 tag">
                {study.institution} · {study.location}
                {study.note && ` · ${study.note}`}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>

    <Section id="contact" label="Contact">
      <Reveal>
        <ContactPanel />
      </Reveal>
    </Section>
  </Layout>
);

export default Index;
