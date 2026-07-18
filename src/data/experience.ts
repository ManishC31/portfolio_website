export interface Role {
  company: string;
  title: string;
  location: string;
  period: string;
  summary: string;
  points: string[];
}

export const roles: Role[] = [
  {
    company: "Absora GmbH",
    // Labelled Werkstudent deliberately. It is a part-time working-student
    // role held alongside the M.Sc., and saying so is what makes "looking for
    // full-time" read as a natural next step rather than leaving a job after a
    // few weeks. The CV currently says only "Software Developer" — worth
    // aligning it so both documents tell the same story.
    title: "Software Developer (Werkstudent)",
    location: "Berlin, Germany",
    period: "Jun 2026 – present",
    summary:
      "Internal systems and AI tooling, alongside the company's public web presence.",
    points: [
      "Integrated and customised the Odoo ERP platform to fit company workflows, configuring and extending modules against internal business requirements.",
      "Designed and built generative AI applications for internal use, automating routine tasks to improve productivity.",
      "Built the company website from scratch in TypeScript and Tailwind CSS, covering UI/UX, responsive layout and on-page SEO.",
      // TODO: this role is the newest and currently the thinnest on outcomes.
      // Anything measurable would strengthen it a lot: hours saved by the
      // internal AI tooling, number of Odoo modules or workflows migrated, or
      // a search-visibility change after the SEO work.
    ],
  },
  {
    company: "Assesshub",
    title: "Software Developer",
    location: "Mumbai, India",
    period: "Jul 2022 – Aug 2025",
    summary:
      "Technical lead on an assessment platform, owning delivery across a small team for three years.",
    points: [
      "Led a team of two to four engineers delivering 3+ full-stack products, owning each from architecture through production deployment.",
      "Scaled React and Next.js applications on a Node.js backend to 25,000+ monthly active users, holding 99.9% uptime through structured logging, monitoring and deployment practice.",
      "Designed and operated PostgreSQL and MongoDB schemas across 1M+ records, tuning indexes and queries as data volume grew.",
      // TODO: a before/after latency or throughput number here would land harder
      // than the qualitative claim. Add one if you have it.
      "Introduced caching strategies and reworked API design to sustain thousands of concurrent users.",
      "Took generative AI from prototype to production, including an interview platform that generates technical questions dynamically and scores responses automatically.",
    ],
  },
  {
    company: "FutureKraft",
    title: "Software Developer Intern",
    location: "Mumbai, India",
    period: "Oct – Dec 2020",
    summary: "Internal tooling for business operations.",
    points: [
      "Built and deployed a Django and PostgreSQL admin portal for business operations and data management, covering backend logic, schema design and release to Heroku.",
    ],
  },
  {
    company: "Indian Register of Shipping",
    title: "Summer Intern",
    location: "Mumbai, India",
    period: "Jun – Jul 2019",
    summary: "Cross-platform mobile development.",
    points: [
      "Contributed to a cross-platform Angular and Ionic mobile application, migrating the legacy codebase to Ionic 4 and Angular 7 to recover performance and maintainability.",
    ],
  },
];

export interface Study {
  institution: string;
  qualification: string;
  location: string;
  period: string;
  note?: string;
}

// Corrected against the CV. The previous site listed "M.Sc. Computer Science"
// and "B.E. Information Technology". Neither matches the degrees on record.
export const education: Study[] = [
  {
    institution: "Universität Koblenz",
    qualification: "M.Sc. Web and Data Science",
    location: "Koblenz, Germany",
    period: "Oct 2025 – present",
    // The Jul 2026 CV dropped the "(Expected 2027)" qualifier the previous one
    // carried, so it is no longer asserted here either.
  },
  {
    institution: "University of Mumbai",
    qualification: "B.E. Computer Engineering",
    location: "Mumbai, India",
    period: "2017 – 2021",
    note: "7.5 CGPA",
  },
];
