export const profile = {
  name: "Manish Chavan",
  role: "Full-stack Software Engineer",
  location: "Berlin, Germany",
  email: "manishchavan80@gmail.com",
  // Lowercase deliberately: this is the path git tracks and the URL the
  // previous site already published. A case-sensitive host would 404 on any
  // other spelling, and macOS will not surface that locally.
  cv: "/manish_chavan_cv.pdf",
  /*
   * The hero headline reads "I build <phrase> people rely on.", cycling through
   * the phrases below. Each one names a kind of work the CV evidences; the
   * closing clause paraphrases the last item of the "Focus" card further down.
   * Keep them short: the longest must fit one line at 320px.
   */
  hero: {
    opening: "I build",
    phrases: ["web platforms", "AI features", "backend systems"],
    closing: "people rely on.",
    lead: "Master's student in Web and Data Science at the University of Koblenz and working student at a Berlin-based company, with more than three years of building and scaling production web systems behind me.",
  },
  /*
   * The About section: four cards, each a short statement with its supporting
   * facts pulled out so they can be scanned rather than read.
   *
   * Every line is backed by the CV. Keep it that way. Each card restates one
   * paragraph of the CV summary; nothing here is new information.
   */
  about: {
    trackRecord: {
      label: "Track record",
      headline:
        "More than three years building and scaling production web systems.",
      text: "At Assesshub I led the team and owned each product from architecture through deployment.",
      facts: [
        { value: "2–4", label: "engineers led" },
        { value: "3+", label: "full-stack products owned" },
        { value: "End to end", label: "architecture through deployment" },
      ],
    },
    now: {
      label: "Right now",
      headline: "Werkstudent at Absora GmbH in Berlin.",
      items: [
        "Odoo ERP integration",
        "The company's web presence",
        "Generative AI applications for internal use",
      ],
    },
    background: {
      label: "Background",
      headline:
        "Pursuing an M.Sc. in Web and Data Science at Universität Koblenz.",
      items: ["German work permit holder"],
    },
    focus: {
      label: "Focus",
      headline: "My work sits mostly on the backend.",
      items: [
        "API design",
        "PostgreSQL and MongoDB schemas over a million-plus records",
        "Caching under concurrent load",
        "Generative AI features in systems people depend on",
      ],
    },
  },
  availability:
    "Looking for part-time or full-time engineering roles, remote or on-site.",
  links: [
    {
      label: "GitHub",
      href: "https://github.com/ManishC31",
      handle: "ManishC31",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/manish-chavan-58676019a/",
      handle: "manish-chavan",
    },
  ],
  languages: "English C1 · German A2 · Marathi (native)",
} as const;

/*
 * The four numbers in the panel under the hero. Each is lifted from a bullet in
 * experience.ts (Assesshub) or from the About cards above; none is new information.
 * Change them there first.
 */
export const stats = [
  {
    field: "Scale",
    value: "25,000+",
    label: "monthly active users",
    detail: "React and Next.js applications on a Node.js backend at Assesshub.",
  },
  {
    field: "Reliability",
    value: "99.9%",
    label: "uptime held",
    detail: "Through structured logging, monitoring and deployment practice.",
  },
  {
    field: "Data",
    value: "1M+",
    label: "records",
    detail: "PostgreSQL and MongoDB schemas, with indexes and queries tuned as volume grew.",
  },
  {
    field: "Experience",
    value: "3+",
    label: "years in production",
    detail: "Leading a team of two to four engineers from architecture through deployment.",
  },
] as const;

// Only tools evidenced by the CV or by a shipped project in projects.ts.
// Redis and the Odoo/GenAI/SEO group arrived with the Jul 2026 CV. GraphQL,
// TensorFlow, OpenAI API, Prompt Engineering and Vercel are still absent from
// it and stay out. Re-add here only alongside a CV update.
export const stack = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Redux", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "FastAPI", "Django", "Redis", "REST APIs"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MongoDB"],
  },
  {
    label: "Infrastructure",
    items: ["Docker", "CI/CD", "Azure", "Linux", "Git"],
  },
  {
    label: "Platforms",
    items: ["Odoo (ERP)", "Generative AI tooling", "SEO"],
  },
] as const;
