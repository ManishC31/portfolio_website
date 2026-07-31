/*
 * Turns the client bundle into a set of static HTML pages.
 *
 * Runs after `vite build`, which leaves an HTML shell and hashed assets in
 * dist/. This script then:
 *
 *   1. builds src/entry-server.tsx into a Node-loadable SSR bundle,
 *   2. renders every route in src/data/seo.ts to markup,
 *   3. swaps that markup and the route's head tags into the shell,
 *   4. writes dist/<route>/index.html, plus dist/404.html and dist/sitemap.xml.
 *
 * Why bother, on a site this small: without it every URL ships an empty
 * <div id="root"> and one hardcoded <title>. Googlebot executes JavaScript and
 * would eventually cope, but Bing, LinkedIn, Slack, X and Facebook do not —
 * they read the served HTML and nothing else. Prerendering is what makes the
 * per-route titles, descriptions and JSON-LD in src/data/seo.ts actually reach
 * a crawler.
 *
 * The client hydrates this markup rather than replacing it (see main.tsx), so
 * the interactive behaviour is unchanged.
 */

import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDist = path.join(root, "dist-ssr");

/** Path the 404 shell is rendered at. Any unmatched URL resolves to NotFound. */
const NOT_FOUND_PATH = "/404";

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// JSON is embedded in a <script> block, so the one sequence that must not
// survive verbatim is a closing tag. Escaping "<" covers it and stays valid JSON.
const escapeJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

async function buildSsrBundle() {
  await build({
    root,
    mode: "production",
    logLevel: "warn",
    build: {
      ssr: "src/entry-server.tsx",
      outDir: "dist-ssr",
      emptyOutDir: true,
      // Read once by this script and deleted straight after; minifying it
      // would only cost build time.
      minify: false,
    },
  });
  return path.join(ssrDist, "entry-server.js");
}

function headFor(meta, seo) {
  const { absolute, INDEXABLE_ROBOTS, NOINDEX_ROBOTS, OG_IMAGE, OG_IMAGE_ALT, SITE_NAME } = seo;
  const url = absolute(meta.path);
  const image = absolute(OG_IMAGE);

  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? NOINDEX_ROBOTS : INDEXABLE_ROBOTS}" />`,
  ];

  // A noindex page naming itself as canonical is a contradictory signal, so
  // the tag is simply absent there.
  if (!meta.noindex) {
    tags.push(`<link rel="canonical" href="${escapeAttr(url)}" />`);
  }

  tags.push(
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:type" content="${escapeAttr(meta.ogType)}" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />`,
    `<meta property="og:image" content="${escapeAttr(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeAttr(OG_IMAGE_ALT)}" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(image)}" />`,
  );

  for (const block of meta.jsonLd) {
    tags.push(
      `<script type="application/ld+json" data-seo-jsonld>${escapeJson(block)}</script>`,
    );
  }

  return tags.join("\n    ");
}

/** dist/index.html for "/", dist/projects/index.html for "/projects", etc. */
function outputPathFor(routePath) {
  if (routePath === "/") return path.join(dist, "index.html");
  return path.join(dist, routePath.slice(1), "index.html");
}

async function emit(file, html) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html, "utf8");
}

function sitemap(routes, seo) {
  const urls = routes
    .map((route) => `  <url><loc>${escapeAttr(seo.absolute(route))}</loc></url>`)
    .join("\n");

  // loc only, deliberately. Google ignores <priority> and <changefreq>
  // outright, and distrusts <lastmod> unless it is genuinely per-page
  // accurate — which a rebuild timestamp is not.
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function main() {
  const shell = await readFile(path.join(dist, "index.html"), "utf8");

  const seoStart = shell.indexOf("<!--seo:start-->");
  const seoEnd = shell.indexOf("<!--seo:end-->");
  if (seoStart === -1 || seoEnd === -1) {
    throw new Error(
      "index.html is missing the <!--seo:start--> / <!--seo:end--> markers the prerender step writes between.",
    );
  }
  if (!shell.includes("<!--app-html-->")) {
    throw new Error("index.html is missing the <!--app-html--> placeholder inside #root.");
  }

  const entry = await buildSsrBundle();
  const seo = await import(pathToFileURL(entry).href);
  const { render, metaForPath, routes } = seo;

  const before = shell.slice(0, seoStart);
  const after = shell.slice(seoEnd + "<!--seo:end-->".length);

  const page = (routePath) => {
    const meta = metaForPath(routePath);
    const markup = render(routePath);
    return (before + headFor(meta, seo) + after).replace("<!--app-html-->", markup);
  };

  for (const route of routes) {
    await emit(outputPathFor(route), page(route));
    console.log(`  prerendered ${route}`);
  }

  // Vercel serves a top-level 404.html with a real 404 status for anything the
  // filesystem doesn't match, which is what keeps unknown URLs out of the index.
  await emit(path.join(dist, "404.html"), page(NOT_FOUND_PATH));
  console.log("  prerendered 404.html");

  await emit(path.join(dist, "sitemap.xml"), sitemap(routes, seo));
  console.log(`  wrote sitemap.xml (${routes.length} urls)`);

  await rm(ssrDist, { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
