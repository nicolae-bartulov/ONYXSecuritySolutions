// Crops the transparent padding around the brand logos and writes them back in place.
// The source artwork is exported on 1080x1080 canvases; trimmed, the art fills the image
// so Logo.astro's `height` prop sizes the artwork itself. A small even margin is kept.
// Run once on fresh exports: re-running may shave a pixel off faint antialiased edges.
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve(import.meta.dirname, "../src/assets/brand/logos");
const MARGIN = 0.04; // of the trimmed artwork's shorter side

for (const file of (await readdir(dir)).filter((f) => f.endsWith(".png"))) {
  const src = path.join(dir, file);
  const input = await sharp(src).toBuffer();
  const trimmed = await sharp(input).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  const { width, height } = trimmed.info;
  const pad = Math.round(Math.min(width, height) * MARGIN);
  await sharp(trimmed.data)
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(src);
  console.log(`${file}: ${width + 2 * pad}x${height + 2 * pad}`);
}
