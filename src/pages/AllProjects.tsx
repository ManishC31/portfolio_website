import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { projects, categories } from "@/data/projects";
import Navbar from "@/components/Navbar";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AllProjects = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const navigate = useNavigate();

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="section-container">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/#projects")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 mb-8"
          >
            <ArrowLeft size={16} /> Back to Home
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="section-title mb-4">
              All <span className="neon-text">Projects</span>
            </h1>
            <p className="section-subtitle">
              Production-grade applications spanning full-stack development, generative AI, and machine learning.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "btn-primary-glow !py-2 !px-4"
                    : "glass text-muted-foreground hover:text-foreground border border-glass-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project) => (
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
                    {project.githubLinks
                      ? project.githubLinks.map((link) => (
                          <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title={link.label}
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors duration-300">
                            <Github size={16} /> {link.label}
                          </a>
                        ))
                      : project.githubLink && (
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
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
