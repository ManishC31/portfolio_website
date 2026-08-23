export const profile = {
  name: "Manish Chavan",
  role: "Full-stack Software Engineer",
  location: "Germany",
  email: "manishchavan80@gmail.com",
  // Lowercase deliberately: this is the path git tracks and the URL the
  // previous site already published. A case-sensitive host would 404 on any
  // other spelling, and macOS will not surface that locally.
  cv: "/manish_chavan_cv.pdf",

  /*
   * Rotated by the hero typewriter. Kept short, because each one has to read
   * as a complete answer to "what are you" while it is on screen alone. The
   * first entry is what the prerendered HTML contains and what a crawler or a
   * reduced-motion reader sees, so it has to be the strongest of the four.
   */
  headlines: [
    "Full-stack Software Engineer",
    "Backend and API design",
    "Generative AI in production",
    "M.Sc. Web and Data Science",
  ],

  /*
   * The hero paragraph. Three sentences, because nobody reads four paragraphs
   * above the fold. The longer version below is what the About section shows
   * once someone has decided to keep going.
   */
  headline:
    "I have spent three years building web products that people use every day. Most of my work sits on the backend: designing APIs, shaping database schemas, and keeping things quick once traffic picks up. I am based in Germany, building generative AI tools at Absora while I finish my master's at Universität Koblenz.",

  // Both shapes are wanted, so both get named.
  availability: "Open to full time and part time opportunities.",
  availabilityShort: "Open to full time and part time opportunities",

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

  // Every sentence is backed by the CV or by a project in projects.ts. Keep it
  // that way.
  intro: [
    "I am a full-stack engineer with a bit over three years of experience. At Assesshub I led a team of two to four engineers on an assessment platform, owned three products end to end, and got comfortable with what breaks when a few thousand people use something at the same time.",
    "Right now I work as a Werkstudent at Absora. My time there splits between integrating Odoo with how the company actually operates, building internal AI tools that take routine work off people's hands, and looking after the company website.",
    "The part of the job I enjoy most is the layer nobody sees: how an API is shaped, how a schema will hold up in two years, where a cache belongs. Lately a lot of that has meant putting generative AI into systems where the output has to be trustworthy, not just impressive.",
    "I am studying for an M.Sc. in Web and Data Science at Universität Koblenz, and I hold a German work permit.",
  ],
} as const;

/*
 * What I can be handed on day one. This replaces the business metrics that
 * used to sit here (monthly actives, uptime, record counts): those numbers
 * describe an employer's product rather than an engineer's ability, and a
 * reader skimming the top of the page wants to know the second thing.
 *
 * The supporting numbers still exist where they belong, as outcomes on the
 * roles in experience.ts.
 */
export const capabilities = [
  {
    icon: "stack",
    title: "Full stack delivery",
    detail:
      "React and Next.js on top, Node.js and FastAPI underneath. Empty repository to something running in production.",
  },
  {
    icon: "data",
    title: "APIs and data",
    detail:
      "REST API design, PostgreSQL and MongoDB schemas, and the indexes and caching that keep them quick as they grow.",
  },
  {
    icon: "ai",
    title: "Generative AI",
    detail:
      "Retrieval pipelines with LangChain and LangGraph, and the work of making model output dependable enough to ship.",
  },
  {
    icon: "ship",
    title: "Shipping and running it",
    detail:
      "Docker, CI/CD and Azure, plus the logging and monitoring that tell you something is wrong before a user does.",
  },
] as const;

/*
 * Tools evidenced by the CV, by a shipped project in projects.ts, or confirmed
 * directly by Manish. The AI group is the last kind: LangChain is already in
 * DocRAG's stack, and the rest were added on his say-so in August 2026. Worth
 * getting them onto the CV too, so both documents agree.
 */
export const stack = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    label: "AI",
    items: [
      "LangChain",
      "LangGraph",
      "RAG pipelines",
      "Vector databases",
      "Embeddings",
      "Prompt engineering",
    ],
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

/**
 * Flattened for the marquee, which wants one continuous run of names rather
 * than the labelled groups the Stack section renders. Derived, so the two can
 * never disagree.
 */
export const allTools = stack.flatMap((group) => [...group.items]);
