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

const PUBLICATIONS = [
  { host: "generative-ai-handbook.hashnode.dev", label: "Artificial Intelligence" },
  { host: "system-design-journey.hashnode.dev", label: "System Design" },
];

export const publicationLabels = PUBLICATIONS.map((p) => p.label);

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
}

async function fetchRssPosts(host: string, label: string): Promise<BlogPost[]> {
  const rssUrl = `https://${host}/rss.xml`;
  // allorigins proxies the request server-side to avoid CORS restrictions
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

  const res = await fetch(proxyUrl);
  const { contents } = await res.json();

  const parser = new DOMParser();
  const xml = parser.parseFromString(contents, "text/xml");
  const items = Array.from(xml.querySelectorAll("item"));

  return items.map((item) => {
    const title = item.querySelector("title")?.textContent?.trim() ?? "";
    const url = item.querySelector("link")?.textContent?.trim() ?? "";
    const pubDate = item.querySelector("pubDate")?.textContent?.trim() ?? "";
    const description = item.querySelector("description")?.textContent?.trim() ?? "";
    const enclosureUrl = item.querySelector("enclosure")?.getAttribute("url") ?? "";
    const mediaContent = item.getElementsByTagNameNS(
      "http://search.yahoo.com/mrss/",
      "content"
    )[0];
    const coverImage = mediaContent?.getAttribute("url") || enclosureUrl || undefined;
    const slug = url.split("/").filter(Boolean).pop() ?? "";
    const brief = stripHtml(description).slice(0, 220);

    return { title, brief, slug, dateAdded: pubDate, coverImage, url, publication: label };
  });
}

export function useHashnodePosts(limit?: number) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const results = await Promise.all(
          PUBLICATIONS.map((pub) => fetchRssPosts(pub.host, pub.label))
        );
        const allPosts = results.flat();
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
