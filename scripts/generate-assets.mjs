/*
 * Generates the raster assets that live in public/: the Open Graph card and
 * the PNG icon fallbacks.
 *
 *   node scripts/generate-assets.mjs
 *
 * Not part of `npm run build`. The output is committed, because it only needs
 * regenerating when the name, role or palette changes — and running a headless
 * browser on every deploy to redraw a static image would be silly.
 *
 * Rendering happens through the Chromium that @playwright/test already
 * installs, so there is no image toolchain to add. Colours below are the
 * light-theme tokens from index.css, resolved to hex.
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

/*
 * public/hacker.png (512x512 RGBA) is the source for every icon size. It is
 * inlined as a data URI because the card is rendered from an in-memory page,
 * which Chromium treats as an opaque origin and refuses to load file:// or
 * http:// subresources into.
 */
const iconSource = `data:image/png;base64,${(
  await readFile(path.join(publicDir, "hacker.png"))
).toString("base64")}`;

const COLOR = {
  background: "#fbfaf9",
  foreground: "#201f1d",
  muted: "#6b6661",
  border: "#e2dfda",
  accent: "#0d52a0",
};

// Matches the body font-family in index.css: no web fonts anywhere on the site.
const FONT = `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;

const NAME = "Manish Chavan";
const ROLE = "Full-stack Software Engineer";
const LOCATION = "Berlin, Germany";
const STACK = "TypeScript · React · Node.js · PostgreSQL · Generative AI";
const DOMAIN = "manishchavan.in";

/*
 * The card mirrors the site: left-aligned, one accent colour, no ornament.
 * Sizes are chosen so the name stays legible in a Slack unfurl, which renders
 * the 1200x630 image at roughly a third of its width.
 */
const ogCard = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: 1200px;
        height: 630px;
        background: ${COLOR.background};
        color: ${COLOR.foreground};
        font-family: ${FONT};
        -webkit-font-smoothing: antialiased;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 88px;
      }
      h1 {
        font-size: 82px;
        font-weight: 700;
        letter-spacing: -0.025em;
        line-height: 1.05;
      }
      .role { margin-top: 20px; font-size: 36px; color: ${COLOR.muted}; }
      hr { margin: 44px 0; border: 0; border-top: 2px solid ${COLOR.border}; }
      .stack { font-size: 27px; color: ${COLOR.muted}; }
      .domain {
        margin-top: 40px;
        font-size: 27px;
        color: ${COLOR.accent};
        font-weight: 600;
        letter-spacing: 0.01em;
      }
    </style>
  </head>
  <body>
    <h1>${NAME}</h1>
    <p class="role">${ROLE} · ${LOCATION}</p>
    <hr />
    <p class="stack">${STACK}</p>
    <p class="domain">${DOMAIN}</p>
  </body>
</html>`;

/*
 * `inset` leaves breathing room inside the square; `background` is null for the
 * tab icons so alpha is preserved, and a solid colour for the iOS tile, which
 * ignores transparency and would otherwise composite the artwork onto black.
 */
const iconPage = (
  size,
  { inset = 0, background = null } = {},
) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * { margin: 0; padding: 0; }
      body {
        width: ${size}px;
        height: ${size}px;
        ${background ? `background: ${background};` : ""}
        display: flex;
        align-items: center;
        justify-content: center;
      }
      img {
        display: block;
        width: ${size - inset * 2}px;
        height: ${size - inset * 2}px;
        /* Chromium's high-quality downscale; the default is noticeably
           harsher at 32px from a 512px source. */
        image-rendering: auto;
      }
    </style>
  </head>
  <body><img src="${iconSource}" /></body>
</html>`;

async function shoot(
  browser,
  html,
  width,
  height,
  file,
  { transparent = false } = {},
) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  await page.setContent(html, { waitUntil: "load" });
  // setContent resolves before a data-URI <img> has necessarily decoded.
  await page.evaluate(() =>
    Promise.all(
      [...document.images].map((i) => (i.complete ? null : i.decode())),
    ),
  );
  const buffer = await page.screenshot({
    type: "png",
    omitBackground: transparent,
  });
  await page.close();
  await writeFile(path.join(publicDir, file), buffer);
  console.log(`  wrote public/${file} (${width}x${height})`);
}

const browser = await chromium.launch();
try {
  await shoot(browser, ogCard, 1200, 630, "og.png");

  // Tab icons, alpha preserved so the artwork sits on whatever the browser
  // chrome is. 32 is what a tab actually renders; 16 is downscaled from it.
  await shoot(browser, iconPage(32), 32, 32, "favicon-32.png", {
    transparent: true,
  });
  await shoot(browser, iconPage(180), 180, 180, "favicon-180.png", {
    transparent: true,
  });

  // iOS home-screen tile: flattened, and inset because iOS crops to a rounded
  // square that would clip artwork running to the edge.
  await shoot(
    browser,
    iconPage(180, { inset: 16, background: COLOR.background }),
    180,
    180,
    "apple-touch-icon.png",
  );
} finally {
  await browser.close();
}
