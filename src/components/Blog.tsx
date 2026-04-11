import { motion } from "framer-motion";
import { ExternalLink, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useHashnodePosts } from "@/hooks/useHashnodePosts";

const Blog = () => {
  const { posts, loading } = useHashnodePosts(3);
  const navigate = useNavigate();

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-futuristic animate-pulse">
                <div className="h-40 bg-muted rounded-lg mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-full mb-1" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-futuristic text-center py-16"
          >
            <p className="text-muted-foreground mb-2">No blog posts yet.</p>
            <p className="text-sm text-muted-foreground">Posts from Hashnode will appear here automatically.</p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, idx) => (
                <motion.a
                  key={post.slug}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="card-futuristic group block"
                >
                  {post.coverImage && (
                    <div className="overflow-hidden rounded-lg mb-4">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      {new Date(post.dateAdded).toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric",
                      })}
                    </div>
                    <span className="skill-tag !text-xs !py-0.5 !px-2">{post.publication}</span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{post.brief}</p>
                  <span className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
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
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;
