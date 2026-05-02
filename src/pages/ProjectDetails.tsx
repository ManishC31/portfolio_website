import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Globe } from "lucide-react";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Project not found</h1>
          <button onClick={() => navigate("/")} className="btn-primary-glow">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="section-container">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 mb-8"
          >
            <ArrowLeft size={16} /> Back to Projects
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="skill-tag text-xs uppercase tracking-widest mb-4 inline-block">
              {project.category}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech) => (
                <span key={tech} className="skill-tag">{tech}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary-glow flex items-center gap-2 !text-sm">
                  <Globe size={16} /> Visit Live Application
                </a>
              )}
              {project.githubLinks
                ? project.githubLinks.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="btn-outline-glow flex items-center gap-2 !text-sm">
                      <Github size={16} /> {link.label}
                    </a>
                  ))
                : project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-outline-glow flex items-center gap-2 !text-sm">
                      <Github size={16} /> View Source
                    </a>
                  )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="card-futuristic">
                <h2 className="font-display font-semibold text-xl mb-4 neon-text">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </div>

              <div className="card-futuristic">
                <h2 className="font-display font-semibold text-xl mb-4 neon-text">Problem Statement</h2>
                <p className="text-muted-foreground leading-relaxed">{project.problemStatement}</p>
              </div>

              <div className="card-futuristic">
                <h2 className="font-display font-semibold text-xl mb-4 neon-text">Architecture</h2>
                <p className="text-muted-foreground leading-relaxed">{project.architecture}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-6"
            >
              <div className="card-futuristic">
                <h3 className="font-display font-semibold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="skill-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="card-futuristic">
                <h3 className="font-display font-semibold mb-4">Category</h3>
                <span className="skill-tag">{project.category}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
