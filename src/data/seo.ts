import { profile, stack } from "./profile";
import { projects } from "./projects";
import { posts, publications } from "./writing";
import { roles, education } from "./experience";

/*
 * Single source of truth for everything a crawler reads.
 *
 * The build (scripts/prerender.mjs) calls metaForPath() for each route and
 * bakes the result into static HTML, so the tags are present before any
 * JavaScript runs. The client calls the same function on route change to keep
 * the tab title and canonical honest during in-app navigation. One function,
 * both paths — the two can never drift.
 */

export const SITE_URL = "https://manishchavan.in";
export const SITE_NAME = `${profile.name}`;
export const OG_IMAGE = "/og.png";
export const OG_IMAGE_ALT = `${profile.name}, ${profile.role}`;

/** max-snippet:-1 lets Google use a full-length snippet rather than a clipped one. */
export const INDEXABLE_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1";
export const NOINDEX_ROBOTS = "noindex, follow";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const absolute = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path}`;

/**
 * Meta descriptions get truncated by search engines around 155–160 characters.
 * Cut on a word boundary so the snippet never ends mid-word.
 */
const clamp = (text: string, max = 158) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

export interface PageSeo {
  /** Canonical path, no trailing slash (except root). */
  path: string;
  title: string;
  description: string;
  /** Open Graph object type for this page. */
  ogType: string;
  /** Emitted as one <script type="application/ld+json"> block per entry. */
  jsonLd: Record<string, unknown>[];
  /** Excluded from the sitemap and marked noindex. */
  noindex?: boolean;
}

/* ---------------------------------------------------------------- entities */

// profile.location is "City, Country". Kept derived so a move only needs
// editing in one place.
const [locality, country] = profile.location.split(", ");

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: profile.name,
  url: `${SITE_URL}/`,
  image: absolute(OG_IMAGE),
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: locality,
    addressCountry: country,
  },
  // Links out to the profiles Google uses to reconcile identity across the web.
  sameAs: profile.links.map((link) => link.href),
  knowsAbout: stack.flatMap((group) => [...group.items]),
  // "English C1 · German A2 · Marathi (native)" -> the language names alone.
  knowsLanguage: profile.languages
    .split(" · ")
    .map((entry) => entry.split(" ")[0]),
  alumniOf: education.map((study) => ({
    "@type": "CollegeOrUniversity",
    name: study.institution,
  })),
  // roles is ordered most recent first, so index 0 is the current employer.
  worksFor: { "@type": "Organization", name: roles[0].company },
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

const authorRef = { "@id": PERSON_ID };

const graph = (...nodes: Record<string, unknown>[]) => [
  { "@context": "https://schema.org", "@graph": nodes },
];

/** Crumbs are [name, path] pairs, root first. */
const breadcrumbs = (trail: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: absolute(path),
  })),
});

/* ------------------------------------------------------------------- pages */

const home = (): PageSeo => ({
  path: "/",
  title: `${profile.name} — ${profile.role}`,
  description: clamp(
    `Full-stack engineer in ${profile.location}. Three years building production web systems in React, Node.js, TypeScript and PostgreSQL, plus generative AI features.`,
  ),
  ogType: "profile",
  jsonLd: graph(person, website, {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: `${SITE_URL}/`,
    name: `${profile.name} — ${profile.role}`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    inLanguage: "en",
  }),
});

const projectsIndex = (): PageSeo => ({
  path: "/projects",
  title: `Projects — ${profile.name}`,
  description: clamp(
    `Every public project by ${profile.name}: generative AI, full-stack and machine learning work, each with the architecture and the hard problem behind it.`,
  ),
  ogType: "website",
  jsonLd: graph(
    person,
    website,
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/projects#page`,
      url: `${SITE_URL}/projects`,
      name: `Projects — ${profile.name}`,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      inLanguage: "en",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: project.title,
          url: absolute(`/project/${project.id}`),
        })),
      },
    },
    breadcrumbs([
      [profile.name, "/"],
      ["Projects", "/projects"],
    ]),
  ),
});

const writingIndex = (): PageSeo => ({
  path: "/blogs",
  title: `Writing — ${profile.name}`,
  description: clamp(
    `Notes on system design and applied AI by ${profile.name}, published on Hashnode, alongside peer-reviewed publications.`,
  ),
  ogType: "website",
  jsonLd: graph(
    person,
    website,
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/blogs#page`,
      url: `${SITE_URL}/blogs`,
      name: `Writing — ${profile.name}`,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      inLanguage: "en",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: posts.length,
        itemListElement: posts.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: post.title,
          // Articles live on Hashnode; the list points at the canonical host.
          url: post.link,
        })),
      },
    },
    ...publications.map((pub) => ({
      "@type": "ScholarlyArticle",
      name: pub.title,
      headline: pub.title,
      author: authorRef,
      datePublished: pub.year,
      description: pub.description,
      publisher: { "@type": "Organization", name: pub.venue },
      ...(pub.link ? { url: pub.link } : {}),
    })),
    breadcrumbs([
      [profile.name, "/"],
      ["Writing", "/blogs"],
    ]),
  ),
});

const projectPage = (id: string): PageSeo | null => {
  const project = projects.find((p) => p.id === id);
  if (!project) return null;

  const repos =
    project.githubLinks?.map((r) => r.url) ??
    (project.githubLink ? [project.githubLink] : []);
  const path = `/project/${project.id}`;

  return {
    path,
    title: `${project.title} — ${profile.name}`,
    description: clamp(project.summary),
    ogType: "article",
    jsonLd: graph(
      person,
      website,
      {
        // Open source work is SoftwareSourceCode; the one closed-source entry
        // has no repository to point at, so it stays a plain CreativeWork.
        "@type": repos.length ? "SoftwareSourceCode" : "CreativeWork",
        "@id": `${SITE_URL}${path}#project`,
        url: absolute(path),
        name: project.title,
        headline: project.title,
        description: project.summary,
        abstract: project.overview,
        author: authorRef,
        creator: authorRef,
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en",
        keywords: project.techStack.join(", "),
        genre: project.category,
        ...(repos.length ? { codeRepository: repos } : {}),
        ...(project.liveLink ? { sameAs: [project.liveLink] } : {}),
      },
      breadcrumbs([
        [profile.name, "/"],
        ["Projects", "/projects"],
        [project.title, path],
      ]),
    ),
  };
};

const notFound = (path: string): PageSeo => ({
  path,
  title: `Page not found — ${profile.name}`,
  description: "That URL doesn't exist on this site.",
  ogType: "website",
  jsonLd: [],
  noindex: true,
});

/* -------------------------------------------------------------- public API */

/**
 * Every indexable URL, in sitemap order. The prerender step renders exactly
 * this list; anything absent from it is served by the 404 page.
 */
export const routes: string[] = [
  "/",
  "/projects",
  "/blogs",
  ...projects.map((p) => `/project/${p.id}`),
];

/** Resolves any pathname to its metadata. Unknown paths get the 404 record. */
export const metaForPath = (pathname: string): PageSeo => {
  // Tolerate a trailing slash on the way in; canonical output never has one.
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";

  if (path === "/") return home();
  if (path === "/projects") return projectsIndex();
  if (path === "/blogs") return writingIndex();

  const match = path.match(/^\/project\/([^/]+)$/);
  if (match) {
    const page = projectPage(decodeURIComponent(match[1]));
    if (page) return page;
  }

  return notFound(path);
};
