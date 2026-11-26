import Layout from "@/components/Layout";
import ProjectEntry from "@/components/ProjectEntry";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

const AllProjects = () => (
  <Layout>
    <div className="px-6 pt-[clamp(128px,17vw,176px)]">
      <div className="container-site">
        <header className="max-w-[900px]">
          <p className="eyebrow">Projects</p>
          <h1 className="h-page mt-2.5">
            Everything public,{" "}
            <span className="text-faint">most recent first.</span>
          </h1>
          <p className="lead mt-6 max-w-[560px]">
            Each one sets out what was mine and the engineering problem worth
            talking about.
          </p>
        </header>

        <div className="mt-14 flex flex-col gap-3">
          {projects.map((project, index) =>
            // The first card is on screen at load, so it is never held back
            // for a reveal. See the note in Reveal.tsx.
            index === 0 ? (
              <ProjectEntry key={project.id} project={project} />
            ) : (
              <Reveal key={project.id}>
                <ProjectEntry project={project} />
              </Reveal>
            ),
          )}
        </div>
      </div>
    </div>
  </Layout>
);

export default AllProjects;
