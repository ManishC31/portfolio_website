import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  absolute,
  INDEXABLE_ROBOTS,
  metaForPath,
  NOINDEX_ROBOTS,
  OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_NAME,
} from "@/data/seo";

/*
 * Keeps <head> in step with the route during client-side navigation.
 *
 * On first load these tags are already correct — the prerender step wrote them
 * into the HTML — so the first pass rewrites them to identical values. The
 * work only matters once the reader moves between pages without a reload,
 * which is when a crawler-friendly document would otherwise go stale.
 */

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

// A noindex page passes href = null, which drops the tag entirely: pointing a
// 404 at itself as canonical would be a claim we don't want to make.
const setCanonical = (href: string | null) => {
  const existing = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (href === null) {
    existing?.remove();
    return;
  }
  const el = existing ?? document.createElement("link");
  el.rel = "canonical";
  el.href = href;
  if (!existing) document.head.appendChild(el);
};

// Marks the blocks this hook owns so it replaces its own output and leaves
// anything else in <head> alone.
const JSONLD_FLAG = "data-seo-jsonld";

const setJsonLd = (blocks: Record<string, unknown>[]) => {
  document.head
    .querySelectorAll(`script[${JSONLD_FLAG}]`)
    .forEach((node) => node.remove());

  for (const block of blocks) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(JSONLD_FLAG, "");
    script.textContent = JSON.stringify(block);
    document.head.appendChild(script);
  }
};

export const useSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = metaForPath(pathname);
    const url = absolute(meta.path);
    const image = absolute(OG_IMAGE);

    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("name", "robots", meta.noindex ? NOINDEX_ROBOTS : INDEXABLE_ROBOTS);
    setCanonical(meta.noindex ? null : url);

    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", meta.ogType);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:alt", OG_IMAGE_ALT);

    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", image);

    setJsonLd(meta.jsonLd);
  }, [pathname]);
};
