import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { projects, categories } from "@/data/projects";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Projects = () => {
  const navigate = useNavigate();
  const displayed = projects.slice(0, 3);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-title mb-4">
            Featured <span className="neon-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Production-grade applications spanning full-stack development, generative AI, and machine learning.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayed.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                layout
                className="card-futuristic group cursor-pointer"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="skill-tag text-xs uppercase tracking-widest">
                    {project.category}
                  </span>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn-primary-glow !py-1.5 !px-4 !text-xs flex items-center gap-1.5">
                      <ExternalLink size={14} /> Visit Live
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300">
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {projects.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 text-center"
          >
            <button
              onClick={() => navigate("/projects")}
              className="btn-outline-glow inline-flex items-center gap-2"
            >
              Explore All Projects <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
