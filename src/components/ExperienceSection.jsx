import { useState } from "react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    name: "Full-stack Developer",
    company: "Assesshub",
    description:
      "Working as a full-stack developer with 3 years of experience in building web applications. Responsible for both front-end and back-end development. Led multiple projects from start to finish, ensuring smooth delivery and performance. Created several applications aimed at solving real-world problems and improving user experience.",
    start: "August 2022",
    end: "Present",
  },
  {
    name: "Full-stack Developer Intern",
    company: "FutureKraft",
    description:
      "Responsible for complete development of website and deployment of the website.Solely completed entire development process of admin portal required for business.Developed an admin portal using Django framework along with PostgreSQL database and deployed on Heroku platform.",
    start: "October 2020",
    end: "December 2020",
  },
  {
    name: "Summer Intern",
    company: "Indian Register of Shipping",
    description:
      "Worked on the IRClass Maritime app, a cross‐platform app built using Angular and the Ionic Framework.Upgraded the Ionic Framework version to V4 and Angular to V7.Responsible for integrating new features and improving the user experience of the app.",
    start: "June 2019",
    end: "July 2020",
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Experience</span>
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {experiences.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="flex flex-col gap-2 text-start">
                <div className="flex justify-between">
                  <h3 className="font-bold text-2xl mb-4"> {skill.name}</h3>
                  <p className="text-lg font-bold">{skill.company}</p>
                </div>
                <p className="text-muted-foreground">{skill.description}</p>
                <p className="text-lg font-semibold">
                  {skill.start} - {skill.end}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
