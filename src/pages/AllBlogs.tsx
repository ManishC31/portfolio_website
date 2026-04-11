import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useHashnodePosts, publicationLabels } from "@/hooks/useHashnodePosts";
import Navbar from "@/components/Navbar";

const AllBlogs = () => {
  const { posts, loading } = useHashnodePosts();
  const [filter, setFilter] = useState<string>("All");
  const navigate = useNavigate();

  const filtered = filter === "All" ? posts : posts.filter((p) => p.publication === filter);

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

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {["All", ...publicationLabels].map((label) => (
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

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card-futuristic animate-pulse">
                  <div className="h-40 bg-muted rounded-lg mb-4" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-full mb-1" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, idx) => (
                <motion.a
                  key={`${post.publication}-${post.slug}`}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
