import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BLOGS } from "@/data/blogs";

const Blog = () => {
  const navigate = useNavigate();
  const preview = BLOGS.slice(0, 3);

  return (
    <section id="blog" className="relative py-24 sm:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-title mb-4">
            Latest <span className="neon-text">Blog Posts</span>
          </h2>
          <p className="section-subtitle">
            Thoughts on software engineering, AI, and building at scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preview.map((post, idx) => (
            <motion.a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="card-futuristic group flex flex-col"
            >
              <div className="mb-3">
                <span className="skill-tag !text-xs !py-0.5 !px-2">{post.publication}</span>
              </div>
              <h3 className="font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                {post.description}
              </p>
              <span className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300 mt-auto">
                Read article <ExternalLink size={12} />
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <button
            onClick={() => navigate("/blogs")}
            className="btn-outline-glow inline-flex items-center gap-2"
          >
            Explore All Articles <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
