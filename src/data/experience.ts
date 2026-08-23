export interface Role {
  company: string;
  title: string;
  location: string;
  period: string;
  summary: string;
  points: string[];
}

/*
 * Each bullet says what the work was and what changed because of it. Where a
 * number exists it goes in the same sentence as the work that produced it,
 * rather than in a separate list of achievements, because a number with no
 * action attached to it reads as decoration.
 *
 * Nothing here is invented. Every figure comes from the CV.
 */
export const roles: Role[] = [
  {
    company: "Absora GmbH",
    // Labelled Werkstudent deliberately. It is a part-time working-student
    // role held alongside the M.Sc., and saying so is what makes "open to full
    // time" read as a natural next step rather than leaving a job after a few
    // weeks. The CV currently says only "Software Developer", so it is worth
    // aligning it and having both documents tell the same story.
    title: "Software Developer (Werkstudent)",
    // Was "Berlin, Germany", from the CV. Manish confirmed he is not in
    // Berlin, so this says Germany rather than contradicting the location
    // given at the top of the page. If Absora's office is in Berlin and you
    // want that on the record, put the city back on this line only.
    location: "Germany",
    period: "Jun 2026 to present",
    summary:
      "Internal systems and AI tooling, plus the company's public website.",
    points: [
      "Set up and customised Odoo so it fits how the company actually works. I configured the modules the team uses daily and extended the ones that did not match the business process, instead of asking people to change the way they work to suit the software.",
      "Built internal generative AI applications that handle routine, repetitive work, so the team spends its time on the parts of the job that genuinely need a person.",
      "Built the company website from scratch in TypeScript and Tailwind CSS. That covered the interface design, the responsive layout, and the on-page SEO, so the site is fast on a phone and legible to a search engine.",
      // TODO: this is the newest role and still the thinnest on outcomes.
      // Anything measurable would strengthen it a lot: hours saved per week by
      // the internal AI tooling, how many Odoo modules or workflows were
      // migrated, or a search-visibility change after the SEO work.
    ],
  },
  {
    company: "Assesshub",
    title: "Software Developer",
    location: "Mumbai, India",
    period: "Jul 2022 to Aug 2025",
    summary:
      "Technical lead on an online assessment platform. Three years, a small team, and three products taken from idea to production.",
    points: [
      "Led a team of two to four engineers and delivered three full-stack products. I owned each one from the first architecture conversation through to the production deployment, which meant I was also the person on the hook when something went wrong at night.",
      "Grew the React and Next.js applications, running on a Node.js backend, to more than 25,000 monthly active users while holding 99.9% uptime. Structured logging and monitoring were what made that possible: we usually found problems ourselves rather than hearing about them from a customer.",
      "Designed and looked after the PostgreSQL and MongoDB schemas behind more than a million records. As the data grew I reworked indexes and rewrote the queries that had quietly become slow, so pages kept loading at the speed people were used to.",
      // TODO: a before and after latency or throughput number here would land
      // much harder than the qualitative claim. Add one if you have it.
      "Introduced caching and reworked the API design so the platform stayed responsive with thousands of candidates sitting assessments at the same time.",
      "Took generative AI from a prototype to something running in production: an interview platform that writes technical questions on the fly and scores the answers automatically, so assessments could cover far more ground without someone authoring every question by hand.",
    ],
  },
  {
    company: "FutureKraft",
    title: "Software Developer Intern",
    location: "Mumbai, India",
    period: "Oct to Dec 2020",
    summary: "Internal tooling for the operations team.",
    points: [
      "Built and shipped a Django and PostgreSQL admin portal that the operations team used to manage their day to day data. I wrote the backend logic, designed the schema, and deployed it to Heroku.",
    ],
  },
  {
    company: "Indian Register of Shipping",
    title: "Summer Intern",
    location: "Mumbai, India",
    period: "Jun to Jul 2019",
    summary: "Cross-platform mobile development.",
    points: [
      "Worked on a cross-platform mobile application in Angular and Ionic, and helped migrate the ageing codebase to Ionic 4 and Angular 7. The upgrade brought the app back to a usable speed and made it far easier to change.",
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
    // Was "Berlin, Germany", which is not where the university is. Universität
    // Koblenz is in Koblenz, and the institution's own city is the honest
    // thing to list here.
    location: "Koblenz, Germany",
    period: "Oct 2025 to present",
    // The Jul 2026 CV dropped the "(Expected 2027)" qualifier the previous one
    // carried, so it is no longer asserted here either.
  },
  {
    institution: "University of Mumbai",
    qualification: "B.E. Computer Engineering",
    location: "Mumbai, India",
    period: "2017 to 2021",
    note: "7.5 CGPA",
  },
];
