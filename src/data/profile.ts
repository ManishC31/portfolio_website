export const profile = {
  name: "Manish Chavan",
  role: "Full-stack Software Engineer",
  location: "Berlin, Germany",
  email: "manishchavan80@gmail.com",
  // Lowercase deliberately: this is the path git tracks and the URL the
  // previous site already published. A case-sensitive host would 404 on any
  // other spelling, and macOS will not surface that locally.
  cv: "/manish_chavan_cv.pdf",
  // Every sentence below is backed by the CV. Keep it that way.
  intro: [
    "Full-stack engineer with more than three years building and scaling production web systems. At Assesshub I led a team of two to four engineers and owned 3+ full-stack products from architecture through deployment, running at 25,000+ monthly active users on 99.9% uptime.",
    "Currently a Werkstudent at Absora GmbH in Berlin, working across Odoo ERP integration, the company's web presence, and generative AI applications built for internal use.",
    "My work sits mostly on the backend: API design, PostgreSQL and MongoDB schemas over a million-plus records, and caching under concurrent load, alongside shipping generative AI features into systems people depend on.",
    "Pursuing an M.Sc. in Web and Data Science at Universität Koblenz. German work permit holder.",
  ],
  availability: "Looking for full-time engineering roles, remote or on-site.",
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
