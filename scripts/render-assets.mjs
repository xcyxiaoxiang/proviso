// Render assets/*.svg to @2x PNG files.
//
// Usage:  node scripts/render-assets.mjs
// Needs:  playwright (resolvable from the repo's node resolution path)
//
// The SVG files are the source of truth for these images; re-run this script
// after editing them. Rendered at deviceScaleFactor 2 for crisp display on
// GitHub and HiDPI screens.

import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const jobs = [
  { svg: 'assets/logo.svg', w: 800, h: 640, out: 'assets/logo.png' },
  { svg: 'assets/workflow.svg', w: 1600, h: 850, out: 'assets/workflow.png' },
];

const browser = await chromium.launch({ channel: 'chromium' });
for (const job of jobs) {
  const context = await browser.newContext({
    viewport: { width: job.w, height: job.h },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto('file://' + path.join(root, job.svg));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(root, job.out) });
  console.log('rendered:', job.out);
  await context.close();
}
await browser.close();
console.log('done');
