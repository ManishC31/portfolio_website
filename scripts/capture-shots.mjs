/*
 * Screenshots the live project demos into public/shots/.
 *
 * The project cards and detail pages show a real screen from each app rather
 * than a stock mockup. Regenerating them by hand is tedious and the images go
 * stale as the apps change, so this drives a headless browser instead:
 *
 *   node scripts/capture-shots.mjs
 *
 * Demo logins are not hardcoded here. They are read out of src/data/projects.ts,
 * which already publishes them on the site as throwaway accounts for reviewers —
 * so this file adds no new secret, and a credential rotation only has to happen
 * in one place.
 *
 * Not wired into `npm run build`: it needs network and the live demos up, and a
 * deploy should never fail because someone's VPS was rebooting. Run it by hand
 * when an app's UI changes, and commit the PNGs.
 */

import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "public", "shots");

/** Pull the demo logins straight out of the data file that publishes them. */
async function credentialsFor(projectId) {
  const src = await readFile(path.join(root, "src/data/projects.ts"), "utf8");
  const block = src.slice(src.indexOf(`id: "${projectId}"`));
  const entry = block.slice(0, block.indexOf("\n  {")); // stop at the next project
  const match = entry.match(
    /username:\s*"([^"]+)",\s*password:\s*"([^"]+)"/,
  );
  if (!match) throw new Error(`no test credentials for ${projectId}`);
  return { username: match[1], password: match[2] };
}

/*
 * Each demo needs a different path to something worth showing — the signed-in
 * application, not its login form. `visit` gets there; everything else is
 * shared.
 */
const TARGETS = [
  {
    id: "docrag",
    url: "https://docrag.manishchavan.in/login",
    async visit(page) {
      const { username, password } = await credentialsFor("docrag");
      await page.fill("#email", username);
      await page.fill("#password", password);
      await page.click('button:has-text("Sign in")');
      await page.waitForTimeout(10000);
    },
  },
  {
    id: "lumochat",
    url: "https://lumochat-app.manishchavan.in/",
    async visit(page) {
      const { username, password } = await credentialsFor("lumochat");
      await page.fill("input[type=email]", username);
      await page.fill("input[type=password]", password);
      await page.click('button:has-text("Sign In")');
      await page.waitForTimeout(8000);
      // Land on the empty state otherwise. Open a thread so the capture shows
      // the message view, which is the part of the app worth showing.
      await page.click("text=Second User", { timeout: 15000 }).catch(() => {});
    },
  },
  {
    // Invoicer is behind Google OAuth, which cannot be scripted, so this is the
    // sign-in screen. It is the only one of the three where the captured frame
    // is not the application itself.
    id: "invoicer",
    url: "https://invoicer.manishchavan.in/login",
    async visit() {},
  },
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();

for (const target of TARGETS) {
  const context = await browser.newContext({
    // 16:10 at 1.5x. The cards render these around 640px wide, so this is
    // still comfortably retina-sharp while keeping each file small enough that
    // four of them on the home page do not dominate the page weight.
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1.5,
  });
  const page = await context.newPage();

  try {
    await page.goto(target.url, { waitUntil: "networkidle", timeout: 45000 });
    await target.visit(page);
    // Let entry animations and any late-loading data settle.
    await page.waitForTimeout(4000);
    // JPEG, not PNG: these are photographic screenshots of full UIs, and PNG
    // was costing well over a megabyte each for no visible gain.
    await page.screenshot({
      path: path.join(OUT, `${target.id}.jpg`),
      type: "jpeg",
      quality: 80,
    });
    console.log(`✓ ${target.id}  ${page.url()}`);
  } catch (error) {
    // One unreachable demo should not lose the other two.
    console.error(`✗ ${target.id}  ${error.message.split("\n")[0]}`);
  }

  await context.close();
}

await browser.close();
