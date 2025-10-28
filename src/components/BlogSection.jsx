import { useEffect, useState } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import { fetchHashnodePosts } from "@/lib/hashnode";

export const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const host = import.meta.env.VITE_HASHNODE_HOST;
    const username = import.meta.env.VITE_HASHNODE_USERNAME;
    const token = import.meta.env.VITE_HASHNODE_TOKEN; // optional

    if (!host && !username) {
      setError("Set VITE_HASHNODE_HOST or VITE_HASHNODE_USERNAME in .env");
      setLoading(false);
      return;
    }

    fetchHashnodePosts({ host, username, token, limit: 6 })
      .then(setPosts)
      .catch((e) => setError(e.message || "Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="blog" className="py-24 px-4 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Latest{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Blogs
              </span>
            </h2>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Fresh articles from my Hashnode publication.
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="relative bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl animate-pulse"
              >
                {/* Skeleton cover image */}
                <div className="relative h-44 bg-gradient-to-r from-gray-300/20 via-gray-200/30 to-gray-300/20 dark:from-gray-700/20 dark:via-gray-600/30 dark:to-gray-700/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                </div>

                {/* Skeleton content */}
                <div className="p-6">
                  {/* Title skeleton */}
                  <div className="space-y-2 mb-4">
                    <div className="h-5 bg-gradient-to-r from-gray-300/30 via-gray-200/40 to-gray-300/30 dark:from-gray-700/30 dark:via-gray-600/40 dark:to-gray-700/30 rounded-md relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    </div>
                    <div className="h-5 bg-gradient-to-r from-gray-300/30 via-gray-200/40 to-gray-300/30 dark:from-gray-700/30 dark:via-gray-600/40 dark:to-gray-700/30 rounded-md w-3/4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    </div>
                  </div>

                  {/* Brief skeleton */}
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gradient-to-r from-gray-300/20 via-gray-200/30 to-gray-300/20 dark:from-gray-700/20 dark:via-gray-600/30 dark:to-gray-700/20 rounded relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    </div>
                    <div className="h-4 bg-gradient-to-r from-gray-300/20 via-gray-200/30 to-gray-300/20 dark:from-gray-700/20 dark:via-gray-600/30 dark:to-gray-700/20 rounded relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    </div>
                    <div className="h-4 bg-gradient-to-r from-gray-300/20 via-gray-200/30 to-gray-300/20 dark:from-gray-700/20 dark:via-gray-600/30 dark:to-gray-700/20 rounded w-2/3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    </div>
                  </div>

                  {/* Read more skeleton */}
                  <div className="h-4 bg-gradient-to-r from-gray-300/25 via-gray-200/35 to-gray-300/25 dark:from-gray-700/25 dark:via-gray-600/35 dark:to-gray-700/25 rounded w-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {error && !loading && (
          <div className="text-center text-red-500">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="group relative bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
              >
                <div className="relative h-44 overflow-hidden">
                  {post.coverImage?.url ? (
                    <img
                      src={post.coverImage.url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 via-purple-500/10 to-cyan-500/10" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div className="p-6 text-left">
                  <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.brief}
                  </p>
                  <div className="mt-4 inline-flex items-center text-primary text-sm font-medium">
                    <span>Read on Hashnode</span>
                    <ExternalLink className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
