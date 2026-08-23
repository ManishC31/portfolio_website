import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { categories, projects } from "@/data/projects";

const AllProjects = () => {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const shown =
    active === "All"
      ? projects
      : projects.filter((project) => project.category === active);

  return (
    <Layout>
      <div className="measure py-12 sm:py-16">
        <Link
          to="/#projects"
          className="link-quiet inline-flex items-center gap-1.5 text-[0.9375rem]"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back
        </Link>

        <h1 className="mt-8 text-balance text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-[-0.02em]">
          Projects
        </h1>
        <p className="prose-measure mt-3 text-pretty text-muted">
          Everything public, with what it does, what was mine, and the part
          that was actually hard.
        </p>

        {/*
          Radio group rather than buttons: this is a single choice among a fixed
          set, which is what a radio group means, and it gets arrow-key movement
          from the browser for free.
        */}
        <div
          role="radiogroup"
          aria-label="Filter by category"
          className="mt-8 flex flex-wrap gap-2"
        >
          {categories.map((category) => {
            const selected = category === active;
            return (
              <button
                key={category}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setActive(category)}
                className={`rounded-full border px-4 py-1.5 text-[0.875rem] transition-colors ${
                  selected
                    ? "border-accent/50 bg-accent/10 text-foreground"
                    : "border-border text-muted hover:border-accent/35 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/*
          Keyed on the filter so the whole grid remounts on change: the cards
          replay their entrance instead of silently swapping in place, which is
          the only feedback that the click did anything when the result set
          happens to look similar.
        */}
        <div key={active} className="mt-10 grid gap-5 md:grid-cols-2">
          {shown.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 70}>
              <ProjectCard project={project} variant="list" />
            </Reveal>
          ))}
        </div>

        {shown.length === 0 && (
          <p className="mt-10 text-muted">Nothing in this category yet.</p>
        )}
      </div>
    </Layout>
  );
};

export default AllProjects;
