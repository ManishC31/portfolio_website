import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BLOGS, PUBLICATION_LABELS } from "@/data/blogs";
import Navbar from "@/components/Navbar";

const AllBlogs = () => {
  const [filter, setFilter] = useState<string>("All");
  const navigate = useNavigate();

  const filtered = filter === "All" ? BLOGS : BLOGS.filter((p) => p.publication === filter);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="section-container">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/#blog")}
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
              All <span className="neon-text">Blog Posts</span>
            </h1>
            <p className="section-subtitle">
              Thoughts on software engineering, AI, and building at scale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {["All", ...PUBLICATION_LABELS].map((label) => (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === label
                    ? "btn-primary-glow !py-2 !px-4"
                    : "glass text-muted-foreground hover:text-foreground border border-glass-border"
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, idx) => (
              <motion.a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="card-futuristic group flex flex-col"
              >
                <div className="mb-3">
                  <span className="skill-tag !text-xs !py-0.5 !px-2">{post.publication}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-4 mb-4 flex-1">
                  {post.description}
                </p>
                <span className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300 mt-auto">
                  Read article <ExternalLink size={12} />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
