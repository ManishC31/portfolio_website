import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Database,
  Download,
  Github,
  Layers,
  Linkedin,
  Mail,
  Users,
} from "lucide-react";
import AboutBento from "@/components/AboutBento";
import Layout from "@/components/Layout";
import PauseMotionButton from "@/components/PauseMotionButton";
import PostCard from "@/components/PostCard";
import ProjectTile from "@/components/ProjectTile";
import PublicationCard from "@/components/PublicationCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { FlipWords } from "@/components/aceternity/flip-words";
import { InfiniteMovingCards } from "@/components/aceternity/infinite-moving-cards";
import { Timeline } from "@/components/aceternity/timeline";
import { education, roles } from "@/data/experience";
import { profile, stack, stats } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { posts, publications } from "@/data/writing";
import { useMotionPaused } from "@/lib/motion-pref";
import { cn } from "@/lib/utils";

const { hero } = profile;

/** "a, b and c", for readers who get the phrases as text rather than motion. */
const phraseList = `${hero.phrases.slice(0, -1).join(", ")} and ${hero.phrases[hero.phrases.length - 1]}`;

const CV_FILENAME = `${profile.name.replace(/\s+/g, "_")}_CV.pdf`;

const STAT_ICONS = {
  Scale: Users,
  Reliability: Activity,
  Data: Database,
  Experience: Layers,
} as const;

const LINK_ICONS = { GitHub: Github, LinkedIn: Linkedin } as const;

/*
 * Bento placement for the featured projects, by position. The grid is four
 * columns on desktop: one large tile on the left, a wide tile top right, and
 * two small ones beneath it. A fifth featured project would fall through to a
 * plain single-column tile and start a new row.
 */
const BENTO: {
  className: string;
  dark?: boolean;
  split?: boolean;
  showDetail?: boolean;
}[] = [
  {
    className: "min-h-[440px] sm:col-span-2 lg:row-span-2 lg:min-h-[520px]",
    showDetail: true,
  },
  { className: "min-h-[250px] sm:col-span-2", split: true },
  { className: "min-h-[250px]" },
  { className: "min-h-[250px]", dark: true },
];

/** Every tool across the stack groups, for the strip under the hero. */
const tools = stack.flatMap((group) => [...group.items]);

const Index = () => {
  const paused = useMotionPaused();

  return (
    <Layout>
      {/* ------------------------------------------------------------- Hero */}
      <section
        aria-labelledby="hero-h"
        className="px-6 pt-[clamp(128px,17vw,176px)] text-center"
      >
        {/* Legacy anchor: "/#home" was linkable on the previous site. */}
        <span id="home" aria-hidden="true" className="block h-0" />

        <h1 id="hero-h" className="display mx-auto max-w-[1000px]">
          <span className="block">{hero.opening}</span>{" "}
          {/* Assistive tech and crawlers get every phrase as one sentence; the
              rotating version is for sighted readers only. */}
          <span className="sr-only">{phraseList}</span>{" "}
          <span
            aria-hidden="true"
            className="block overflow-hidden pb-[0.1em] pt-[0.04em]"
          >
            <FlipWords words={hero.phrases} paused={paused} />
          </span>{" "}
          <span className="ink-fade block pb-[0.08em]">{hero.closing}</span>
        </h1>

        <p className="mx-auto mt-7 max-w-[580px] text-pretty text-[clamp(17px,1.9vw,20px)] leading-[1.5] text-muted">
          {hero.lead}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="btn btn-dark btn-lg max-sm:h-12 max-sm:px-5 max-sm:text-[15px]"
          >
            <Mail size={18} strokeWidth={1.9} aria-hidden="true" />
            Get in touch
          </a>
          <a
            href={profile.cv}
            download={CV_FILENAME}
            className="btn btn-chip btn-lg max-sm:h-12 max-sm:px-5 max-sm:text-[15px]"
          >
            <Download size={18} strokeWidth={1.9} aria-hidden="true" />
            Download CV
          </a>
        </div>

        {/* The dot is inline, not a flex sibling, so it stays beside the first
            word when the sentence wraps on a phone. */}
        <p className="mx-auto mt-6 max-w-[560px] text-balance text-[14px] text-subtle">
          <span
            aria-hidden="true"
            className="relative mr-2.5 inline-block size-2 -translate-y-px align-middle"
          >
            <span className="absolute inset-0 animate-ring rounded-full bg-ok" />
            <span className="absolute inset-0 rounded-full bg-ok" />
          </span>
          {profile.availability}
        </p>
      </section>

      {/* --------------------------------------------------------- Numbers */}
      <section aria-label="At a glance" className="px-6 pt-[clamp(56px,7vw,72px)]">
        <ul className="container-site grid grid-cols-1 gap-[clamp(8px,1vw,12px)] rounded-[28px] bg-surface p-[clamp(8px,1.6vw,20px)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = STAT_ICONS[stat.field];
            const dark = stat.field === "Reliability";

            return (
              <li
                key={stat.field}
                className={cn(
                  "flex flex-col rounded-[20px] p-6 pb-7",
                  dark ? "bg-ink text-white" : "bg-white",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={cn("label", dark && "text-white/60")}>
                    {stat.field}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-10 items-center justify-center rounded-xl",
                      dark ? "bg-white/10" : "bg-surface",
                    )}
                  >
                    <Icon size={18} strokeWidth={1.9} />
                  </span>
                </div>

                {/* Spaced from the top, not pushed to the bottom: the four
                    numbers then share a baseline however each detail wraps. */}
                <p className="mt-[clamp(36px,5vw,64px)] text-[clamp(40px,4.2vw,56px)] font-semibold leading-[0.95] tracking-[-0.05em]">
                  {stat.value}
                </p>
                <p className="mt-2.5 text-[17px] font-medium leading-[1.3]">
                  {stat.label}
                </p>
                <p
                  className={cn(
                    "mt-1.5 text-pretty text-[14px] leading-[1.45]",
                    dark ? "text-[#a8a8a8]" : "text-muted",
                  )}
                >
                  {stat.detail}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ----------------------------------------------------- Stack strip */}
      <section aria-label="Tools" className="px-6 pt-14">
        <div className="container-site flex flex-col items-center gap-5 md:flex-row md:gap-8">
          {/* The same tools are listed properly under Stack; this strip is
              ambience, so it is hidden from assistive tech. */}
          <div aria-hidden="true" className="w-full min-w-0 md:flex-1">
            <InfiniteMovingCards
              items={tools}
              getKey={(tool) => tool}
              renderItem={(tool) => tool}
              speed="slow"
              gap={44}
              itemClassName="text-[19px] font-semibold tracking-[-0.02em] text-subtle"
            />
          </div>
          <PauseMotionButton />
        </div>
      </section>

      {/* ------------------------------------------------------------ About */}
      <section id="about" aria-labelledby="about-h" className="section">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="about-h"
              eyebrow="About"
              title="Backend at heart."
              accent="Full-stack in practice."
            />
          </Reveal>

          <AboutBento />
        </div>
      </section>

      {/* ------------------------------------------------------------- Work */}
      <section id="projects" aria-labelledby="projects-h" className="section">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="projects-h"
              eyebrow="Selected work"
              title="Things I've built,"
              accent="and the hard part of each."
              lead="Each one sets out what was mine and the engineering problem worth talking about."
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProjects.map((project, index) => {
              const { className, ...layout } = BENTO[index] ?? {
                className: "min-h-[250px]",
              };

              return (
                <Reveal key={project.id} delay={index * 70} className={cn("flex", className)}>
                  <ProjectTile project={project} className="w-full" {...layout} />
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-8 flex justify-center">
            <Link to="/projects" className="btn btn-chip btn-md">
              All projects
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- Experience */}
      <section id="experience" aria-labelledby="experience-h" className="section">
        <div className="container-site">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="experience-h"
              align="left"
              eyebrow="Experience"
              title="Where I've worked,"
              accent="and what I owned there."
              className="max-w-[820px]"
            />
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-chip btn-md"
            >
              CV (PDF)
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          </Reveal>

          <Timeline
            className="mt-16"
            data={roles.map((role) => ({
              key: role.company,
              title: (
                <>
                  <h3 className="text-[clamp(26px,3vw,38px)] font-semibold leading-[1.1] tracking-[-0.035em]">
                    {role.company}
                  </h3>
                  <p className="label mt-3">{role.period}</p>
                  <p className="mt-1 text-[15px] text-subtle">{role.location}</p>
                </>
              ),
              content: (
                <>
                  <p className="h-card">{role.title}</p>
                  <p className="mt-2.5 max-w-[680px] text-pretty text-[18px] leading-[1.55] text-body">
                    {role.summary}
                  </p>
                  <ul className="mt-6 max-w-[760px]">
                    {role.points.map((point) => (
                      <li
                        key={point.slice(0, 32)}
                        className="copy border-t border-line py-4"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </>
              ),
            }))}
          />
        </div>
      </section>

      {/* ------------------------------------------------------------ Stack */}
      <section id="stack" aria-labelledby="stack-h" className="section">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="stack-h"
              eyebrow="Stack"
              title="Tools I've shipped with,"
              accent="not just tried."
            />
          </Reveal>

          <ul className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((group, index) => (
              <Reveal
                as="li"
                key={group.label}
                delay={(index % 3) * 70}
                className={cn(
                  "card min-h-[220px] gap-8",
                  // The one dark tile marks where most of the work sits.
                  group.label === "Backend" && "card-dark",
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="h-card">{group.label}</h3>
                  <span aria-hidden="true" className="label">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="token">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- Writing */}
      <section id="writing" aria-labelledby="writing-h" className="section">
        {/* Legacy anchor: the previous site linked this section as "/#blog". */}
        <span id="blog" aria-hidden="true" className="block h-0 scroll-mt-28" />

        <div className="container-site">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="writing-h"
              align="left"
              eyebrow="Writing"
              title="Notes on system design"
              accent="and applied AI."
              className="max-w-[820px]"
            />
            <Link to="/blogs" className="btn btn-chip btn-md">
              All writing
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Link>
          </Reveal>

          <ul className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal as="li" key={post.link} delay={index * 70}>
                <PostCard post={post} index={index} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------- Education and research */}
      <section id="education" aria-labelledby="education-h" className="section">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="education-h"
              eyebrow="Education and research"
              title="Still studying."
              accent="Already published."
            />
          </Reveal>

          {/* Degrees stack in the left column; the publication fills the right
              one, spanning as many rows as there are degrees. */}
          <div className="mt-14 grid grid-cols-1 gap-3 lg:grid-cols-2">
            {education.map((study, index) => (
              <Reveal
                as="article"
                key={study.qualification}
                delay={index * 70}
                className="card min-h-[190px] items-start lg:col-start-1"
              >
                <span className="chip">{study.period}</span>
                <h3 className="h-card mt-auto pt-10">{study.qualification}</h3>
                <p className="copy mt-2.5">
                  {study.institution} · {study.location}
                  {study.note && ` · ${study.note}`}
                </p>
              </Reveal>
            ))}

            {publications.map((publication) => (
              <Reveal
                key={publication.title}
                delay={education.length * 70}
                className="flex lg:col-start-2 lg:row-start-1 lg:[grid-row-end:span_var(--rows)]"
                style={{ "--rows": education.length } as CSSProperties}
              >
                <PublicationCard
                  publication={publication}
                  className="min-h-[300px] w-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Contact */}
      <section id="contact" aria-labelledby="contact-h" className="section">
        <Reveal className="container-site overflow-hidden rounded-[32px] bg-surface px-6 pb-[88px] pt-24 text-center max-sm:rounded-[28px] max-sm:pb-14 max-sm:pt-16">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-h" className="h-cta mx-auto mt-2.5 max-w-[800px]">
            Hiring? <span className="text-faint">Let's talk.</span>
          </h2>
          <p className="lead mx-auto mt-6 max-w-[520px]">
            {profile.availability} Based in {profile.location}, with a German
            work permit.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="btn btn-dark btn-lg max-sm:h-12 max-sm:px-5 max-sm:text-[15px]"
            >
              <Mail size={18} strokeWidth={1.9} aria-hidden="true" />
              Email me
            </a>
            <a
              href={profile.cv}
              download={CV_FILENAME}
              className="btn btn-white btn-lg max-sm:h-12 max-sm:px-5 max-sm:text-[15px]"
            >
              <Download size={18} strokeWidth={1.9} aria-hidden="true" />
              Download CV
            </a>
          </div>

          <p className="mt-6 text-[15px] text-muted">
            or write to{" "}
            <a href={`mailto:${profile.email}`} className="link break-all">
              {profile.email}
            </a>
          </p>

          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {profile.links.map((link) => {
              const Icon = LINK_ICONS[link.label];
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-white btn-md"
                  >
                    <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </section>
    </Layout>
  );
};

export default Index;
