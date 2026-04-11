import { useState, useEffect } from "react";

export interface BlogPost {
  title: string;
  brief: string;
  slug: string;
  dateAdded: string;
  coverImage?: string;
  url: string;
  publication: string;
}

const HASHNODE_API = "https://gql.hashnode.com";

const PUBLICATIONS = [
  { host: "generative-ai-handbook.hashnode.dev", label: "Artificial Intelligence" },
  { host: "system-design-journey.hashnode.dev", label: "System Design" },
];

export const publicationLabels = PUBLICATIONS.map((p) => p.label);

export function useHashnodePosts(limit?: number) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts: BlogPost[] = [];

        for (const pub of PUBLICATIONS) {
          const res = await fetch(HASHNODE_API, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": import.meta.env.VITE_HASHNODE_TOKEN || "",
            },
            body: JSON.stringify({
              query: `
                query {
                  publication(host: "${pub.host}") {
                    posts(first: 50) {
                      edges {
                        node {
                          title
                          brief
                          slug
                          publishedAt
                          coverImage { url }
                          url
                        }
                      }
                    }
                  }
                }
              `,
            }),
          });
          const data = await res.json();
          const edges = data?.data?.publication?.posts?.edges || [];
          allPosts.push(
            ...edges.map((e: any) => ({
              title: e.node.title,
              brief: e.node.brief,
              slug: e.node.slug,
              dateAdded: e.node.publishedAt,
              coverImage: e.node.coverImage?.url,
              url: e.node.url,
              publication: pub.label,
            }))
          );
        }

        allPosts.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        setPosts(limit ? allPosts.slice(0, limit) : allPosts);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [limit]);

  return { posts, loading };
}
