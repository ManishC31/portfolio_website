import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ProjectEntry from "@/components/ProjectEntry";
import { projects } from "@/data/projects";

const AllProjects = () => (
  <Layout>
    <div className="measure py-12">
      <p className="text-[0.9375rem]">
        <Link to="/#projects" className="link-quiet">
          ← Back
        </Link>
      </p>

      <h1 className="mt-6 text-[clamp(1.5rem,4vw,2rem)] font-bold tracking-tight">
        Projects
      </h1>
      <p className="mt-2 text-muted">
        Everything public, most recent first.
      </p>

      <div className="mt-10 space-y-10">
        {projects.map((project) => (
          <ProjectEntry key={project.id} project={project} />
        ))}
      </div>
    </div>
  </Layout>
);

export default AllProjects;
