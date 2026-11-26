/*
 * Builds the hero portrait from the studio headshot.
 *
 *   node scripts/generate-portrait.mjs      (npm run portrait)
 *
 * Source: Manish_Image.jpg at the repo root — a passport-style shot on a pure
 * white backdrop, with the shoulders running off the bottom edge.
 *
 * Two outputs, for two different jobs:
 *
 *   public/portrait-halftone.svg
 *     What the page actually shows. A 45-degree halftone screen: the subject
 *     redrawn as dots whose size follows local brightness. Vector, so it is
 *     resolution-independent — which matters, because the source photograph is
 *     only 354px wide and any straight crop of it is visibly soft the moment
 *     it is displayed larger than a thumbnail. Dots are drawn in currentColor,
 *     so the accent is set in CSS rather than baked into the file.
 *
 *   public/portrait.webp and public/portrait.png
 *     The plain cutout on transparency. Not rendered anywhere; it is the
 *     photograph referenced by Person.image in the JSON-LD, where a search
 *     engine wants an actual likeness rather than a stylised one.
 *
 * Not part of `npm run build`. The output is committed; rerun this only when
 * the photograph changes.
 *
 * Runs through the Chromium that @playwright/test already installs, same as
 * scripts/generate-assets.mjs, so there is no image toolchain to add.
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(root, "Manish_Image.jpg");
const OUT_DIR = path.join(root, "public");

/*
 * Two encodings of the same cutout. WebP with alpha is roughly a quarter the
 * size of the PNG at this quality and is what virtually every visitor will
 * actually download; the PNG stays as the <picture> fallback and costs nothing
 * to anyone whose browser takes the WebP.
 */
const FORMATS = [
  { file: "portrait.webp", type: "image/webp", quality: 0.9 },
  { file: "portrait.png", type: "image/png" },
];

/*
 * Matting thresholds, in 0–255.
 *
 * OPAQUE_BELOW / CLEAR_ABOVE define the ramp used at the subject's edge: a
 * pixel at least as bright as CLEAR_ABOVE is backdrop, one at or below
 * OPAQUE_BELOW is subject, and everything between gets partial alpha. That
 * band is what keeps stray hair from turning into a jagged white fringe.
 */
const CLEAR_ABOVE = 236;
const OPAQUE_BELOW = 194;
/** How far the ramp may reach in from the flood-filled region, in pixels. */
const EDGE_BAND = 4;
/** Transparent margin kept around the subject after cropping. */
const PADDING = 8;

/*
 * Halftone settings.
 *
 * HEAD_CROP frames head-and-shoulders rather than the whole cutout: at full
 * length the geometric print on the shirt carries as much dot detail as the
 * face and the eye has nowhere to settle. Values are in source pixels.
 */
const HEAD_CROP = { x: 52, y: 0, w: 250, h: 344 };
/*
 * Lattice spacing, in the SVG's own units (= source pixels). Smaller means
 * more dots and a larger file; below about 2.5 the dots stop reading as a
 * screen and it just looks like a grainy photo again.
 */
const CELL = 2.7;
/** Dot radius at full brightness, as a fraction of CELL. Above ~0.6 midtone
 *  dots merge and the face fills in solid. */
const DOT = 0.56;
/** Contrast curve applied before the dots are sized. The photograph is evenly
 *  lit and flat; without this the whole face lands in one dot size. */
const CONTRAST = 1.45;
const LIFT = 0.03;
/*
 * Fraction of the height over which dots shrink to nothing at the bottom. The
 * portrait is rendered unframed, so this ramp is the only thing ending it —
 * too short and the shoulders stop on a visible horizontal line, which is
 * most obvious on the light screen where the dark shirt carries the largest
 * dots right up to the cut.
 */
const DISSOLVE = 0.26;

/*
 * Two screens, because a halftone's tone is carried by dot *size* and there is
 * no way to invert that in CSS the way a colour can be inverted.
 *
 *   on-dark  — dots follow brightness. Lit skin becomes dense dots, hair falls
 *              away into the background. Correct as light ink on a dark ground.
 *   on-light — dots follow darkness, the way ink works on paper.
 *
 * Using the on-dark screen against white produces a convincing photographic
 * negative: the hair disappears and the face reads as a shadow. Hence two
 * files, picked by --portrait-screen in index.css, so a browser only ever
 * fetches the one its current theme is using.
 */
const SCREENS = [
  { file: "portrait-halftone-on-dark.svg", inkFollowsBrightness: true },
  { file: "portrait-halftone-on-light.svg", inkFollowsBrightness: false },
];

const source = `data:image/jpeg;base64,${(await readFile(SOURCE)).toString("base64")}`;

const browser = await chromium.launch();
const page = await browser.newPage();

const { encoded, screens, report } = await page.evaluate(
  async ({
    source, CLEAR_ABOVE, OPAQUE_BELOW, EDGE_BAND, PADDING, FORMATS,
    HEAD_CROP, CELL, DOT, CONTRAST, LIFT, DISSOLVE, SCREENS,
  }) => {
    const img = new Image();
    img.src = source;
    await img.decode();

    const w = img.width;
    const h = img.height;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);

    const image = ctx.getImageData(0, 0, w, h);
    const px = image.data;

    const minOf = (i) => Math.min(px[i], px[i + 1], px[i + 2]);
    const spread = (i) =>
      Math.max(px[i], px[i + 1], px[i + 2]) - Math.min(px[i], px[i + 1], px[i + 2]);

    /*
     * Backdrop test: bright *and* near-neutral. The neutrality check matters —
     * the shirt carries white printed lines, and keying on brightness alone
     * would punch holes straight through them. Those pixels are interior, so
     * the flood fill would not reach them anyway, but this keeps the two
     * defences independent.
     */
    const isBackdrop = (i) => minOf(i) >= CLEAR_ABOVE && spread(i) <= 16;

    /*
     * Flood fill inward from the border rather than keying the whole image.
     * Only backdrop connected to an edge is removed, so an enclosed highlight
     * — an eye catchlight, the print on the shirt — is never touched.
     */
    const bg = new Uint8Array(w * h);
    const stack = [];

    for (let x = 0; x < w; x++) {
      stack.push(x, 0, x, h - 1);
    }
    for (let y = 0; y < h; y++) {
      stack.push(0, y, w - 1, y);
    }

    while (stack.length) {
      const y = stack.pop();
      const x = stack.pop();
      if (x < 0 || y < 0 || x >= w || y >= h) continue;
      const p = y * w + x;
      if (bg[p]) continue;
      if (!isBackdrop(p * 4)) continue;
      bg[p] = 1;
      stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
    }

    // Distance (in pixels, capped) from each pixel to the filled region, so the
    // soft ramp below can be confined to a band around the subject's outline.
    const dist = new Uint8Array(w * h).fill(255);
    const queue = [];
    for (let p = 0; p < w * h; p++) {
      if (bg[p]) {
        dist[p] = 0;
        queue.push(p);
      }
    }
    for (let head = 0; head < queue.length; head++) {
      const p = queue[head];
      const d = dist[p];
      if (d >= EDGE_BAND) continue;
      const x = p % w;
      const y = (p / w) | 0;
      const neighbours = [
        x > 0 ? p - 1 : -1,
        x < w - 1 ? p + 1 : -1,
        y > 0 ? p - w : -1,
        y < h - 1 ? p + w : -1,
      ];
      for (const n of neighbours) {
        if (n < 0 || dist[n] !== 255) continue;
        dist[n] = d + 1;
        queue.push(n);
      }
    }

    const range = CLEAR_ABOVE - OPAQUE_BELOW;

    for (let p = 0; p < w * h; p++) {
      const i = p * 4;

      if (bg[p]) {
        px[i + 3] = 0;
        continue;
      }

      // Interior: leave completely alone.
      if (dist[p] > EDGE_BAND) continue;

      const m = minOf(i);
      if (m <= OPAQUE_BELOW) continue;

      const alpha = Math.max(0, Math.min(1, (CLEAR_ABOVE - m) / range));
      px[i + 3] = Math.round(alpha * 255);

      /*
       * Decontamination. A half-transparent edge pixel is a blend of subject
       * and white backdrop; leaving its colour as-is composites that white a
       * second time and rims the whole figure in grey. Solving the blend for
       * the subject's own colour removes the halo.
       */
      if (alpha > 0.06) {
        for (let c = 0; c < 3; c++) {
          px[i + c] = Math.max(
            0,
            Math.min(255, Math.round((px[i + c] - 255 * (1 - alpha)) / alpha)),
          );
        }
      }
    }

    ctx.putImageData(image, 0, 0);

    // Crop to what actually survived. The subject runs off the bottom of the
    // frame, so that edge is kept flush and only the sides and top are trimmed.
    let minX = w;
    let maxX = 0;
    let minY = h;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (px[(y * w + x) * 4 + 3] <= 8) continue;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
      }
    }

    const cropX = Math.max(0, minX - PADDING);
    const cropY = Math.max(0, minY - PADDING);
    const cropW = Math.min(w, maxX + PADDING) - cropX;
    const cropH = h - cropY;

    const out = document.createElement("canvas");
    out.width = cropW;
    out.height = cropH;
    out
      .getContext("2d")
      .drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    /* ------------------------------------------------------------ halftone */

    /*
     * Sampled from the full-resolution matted pixels rather than from the
     * cropped canvas, so HEAD_CROP stays expressed in the coordinates of the
     * original photograph and stays readable when it needs adjusting.
     */
    const tone = (l) =>
      Math.max(0, Math.min(1, (l - 0.5) * CONTRAST + 0.5 + LIFT));

    const at = (x, y) => {
      x = Math.max(0, Math.min(w - 1, Math.round(x)));
      y = Math.max(0, Math.min(h - 1, Math.round(y)));
      const i = (y * w + x) * 4;
      return {
        l: tone((0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255),
        a: px[i + 3] / 255,
      };
    };

    /*
     * Average over a cell-sized box, not a single pixel. Point-sampling a
     * lattice this coarse aliases badly — individual dots start tracking
     * whatever pixel they happen to land on, and edges crawl.
     */
    const boxAt = (cx, cy, r) => {
      let sumL = 0;
      let sumA = 0;
      let n = 0;
      for (let y = cy - r; y <= cy + r; y++) {
        for (let x = cx - r; x <= cx + r; x++) {
          const { l, a } = at(x, y);
          sumL += l * a;
          sumA += a;
          n++;
        }
      }
      return { l: sumA > 0 ? sumL / sumA : 0, a: sumA / n };
    };

    const { x: hx, y: hy, w: hw, h: hh } = HEAD_CROP;
    // 45 degrees is the conventional screen angle: a grid squared up with the
    // page reads as a grid, while a rotated one reads as tone.
    const COS = Math.SQRT1_2;
    const SIN = Math.SQRT1_2;
    const reach = Math.ceil(Math.hypot(hw, hh) / CELL) + 2;
    const boxRadius = Math.max(1, Math.round(CELL / 2));

    const screens = SCREENS.map(({ file, inkFollowsBrightness }) => {
      const dots = [];

      for (let j = -reach; j <= reach; j++) {
        for (let i = -reach; i <= reach; i++) {
          const lx = (i * COS - j * SIN) * CELL + hw / 2;
          const ly = (i * SIN + j * COS) * CELL + hh / 2;
          if (lx < -CELL || ly < -CELL || lx > hw + CELL || ly > hh + CELL) continue;

          const { l, a } = boxAt(hx + lx, hy + ly, boxRadius);
          if (a < 0.4) continue;

          // Ramp to nothing across the bottom band so the figure dissolves into
          // the frame rather than ending on a cut line.
          const fade = Math.max(0, Math.min(1, (hh - ly) / (hh * DISSOLVE)));

          const ink = inkFollowsBrightness ? l : 1 - l;
          const r = CELL * DOT * Math.pow(ink, 1.1) * a * fade;
          if (r < 0.12) continue;

          dots.push(
            `<circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="${r.toFixed(2)}"/>`,
          );
        }
      }

      /*
       * The group is filled with currentColor, but this is consumed as a CSS
       * mask rather than an <img>: an SVG loaded through <img> has no access to
       * the page's colours, whereas as a mask only its alpha matters and the
       * fill can be any gradient the stylesheet likes.
       */
      const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${hw} ${hh}" ` +
        `width="${hw}" height="${hh}">` +
        `<g fill="currentColor">${dots.join("")}</g></svg>`;

      return { file, svg, dots: dots.length };
    });

    let cleared = 0;
    let soft = 0;
    for (let p = 0; p < w * h; p++) {
      const a = px[p * 4 + 3];
      if (a === 0) cleared++;
      else if (a < 255) soft++;
    }

    return {
      encoded: FORMATS.map(({ file, type, quality }) => ({
        file,
        dataUrl: out.toDataURL(type, quality),
      })),
      screens,
      report: {
        source: [w, h],
        crop: [cropW, cropH],
        clearedPct: Math.round((cleared / (w * h)) * 100),
        softEdgePixels: soft,
      },
    };
  },
  {
    source, CLEAR_ABOVE, OPAQUE_BELOW, EDGE_BAND, PADDING, FORMATS,
    HEAD_CROP, CELL, DOT, CONTRAST, LIFT, DISSOLVE, SCREENS,
  },
);

await browser.close();

for (const { file, svg, dots } of screens) {
  await writeFile(path.join(OUT_DIR, file), svg);
  console.log(
    `wrote public/${file}  ${(Buffer.byteLength(svg) / 1024).toFixed(1)} kB  (${dots} dots)`,
  );
}

for (const { file, dataUrl } of encoded) {
  const bytes = Buffer.from(dataUrl.split(",")[1], "base64");
  await writeFile(path.join(OUT_DIR, file), bytes);
  console.log(`wrote public/${file}  ${(bytes.length / 1024).toFixed(1)} kB`);
}

console.log(
  `  ${report.crop[0]}x${report.crop[1]} from ${report.source[0]}x${report.source[1]}, ` +
    `${report.clearedPct}% cleared, ${report.softEdgePixels} soft edge px`,
);
