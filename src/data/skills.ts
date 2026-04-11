export interface SkillGroup {
  title: string;
  icon: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend",
    icon: "Server",
    skills: ["Node.js", "Express", "FastAPI", "Django", "REST APIs", "GraphQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    title: "Frontend",
    icon: "Monitor",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux", "HTML/CSS"],
  },
  {
    title: "GenAI & ML",
    icon: "Brain",
    skills: ["LLM Integration", "Prompt Engineering", "OpenAI API", "LangChain", "TensorFlow", "CNN", "Computer Vision"],
  },
  {
    title: "DevOps & Tools",
    icon: "Wrench",
    skills: ["Docker", "CI/CD", "Azure", "Git", "Linux", "Heroku", "Vercel", "Agile/Scrum"],
  },
];

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    role: "Software Developer",
    company: "Assesshub",
    location: "Mumbai, India",
    period: "Jul 2022 – Aug 2025",
    highlights: [
      "Led a team of 2–4 devs to ship 3+ full-stack products end-to-end — from architecture whiteboard to production deploy",
      "Scaled React + Node.js apps to 25K+ monthly active users with 99.9% uptime",
      "Designed PostgreSQL & MongoDB schemas handling 1M+ records with optimized indexing and query performance",
      "Integrated generative AI into live products — dynamic question generation, automated evaluation, and smart content pipelines",
      "Built an AI-powered interview platform (Next.js + TypeScript) that auto-generates & scores technical interviews",
      "Implemented caching strategies and efficient API design to support thousands of concurrent sessions",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "FutureKraft",
    location: "Mumbai, India",
    period: "Oct 2020 – Dec 2020",
    highlights: [
      "Solo-built the entire company website and admin portal from scratch using Django & PostgreSQL",
      "Owned the full development lifecycle — architecture, backend logic, database design, and Heroku deployment",
      "Designed backend schemas for scalable, maintainable application architecture",
    ],
  },
  {
    role: "Summer Intern",
    company: "Indian Register of Shipping",
    location: "Mumbai, India",
    period: "Jun 2019 – Jul 2019",
    highlights: [
      "Contributed to IRClass Maritime app — a cross-platform Angular + Ionic application",
      "Modernized the codebase by upgrading to Ionic 4 & Angular 7, improving stability and performance",
      "Collaborated with senior engineers on debugging and feature integration across mobile & web",
    ],
  },
];
