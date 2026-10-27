// Generates the favicons in public/ from the trimmed panther icon logo.
// favicon.ico (16, 32, 48) and favicon.png (48) put the panther on a brand-gold circle that fills the
// canvas, with the panther centered and as large as the circle allows (its ear tips touch the edge);
// apple-touch-icon.png (180) sits on a gold square, which iOS rounds itself.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "src/assets/brand/logos/onyx-icon-on-light.png");
const out = (name) => path.join(root, "public", name);
const gold = "#e3a600"; // --accent / brand-gold in global.css

const art = await sharp(src).trim().png().toBuffer();
const { width: artWidth, height: artHeight } = await sharp(art).metadata();

/** Radius of the circle centered on the trimmed artwork that just contains it (the ear tips reach farthest). */
const enclosing = async () => {
  const { data, info } = await sharp(art).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const [cx, cy] = [info.width / 2, info.height / 2];
  let r = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 128) r = Math.max(r, Math.hypot(x + 0.5 - cx, y + 0.5 - cy));
    }
  }
  return r;
};
const reach = await enclosing();

/** `size` px PNG: a gold `shape` ("circle" or "square") with the artwork, centered, with its enclosing circle at `fill` of its width. */
const badge = async (size, shape, fill) => {
  const ground =
    shape === "circle"
      ? `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${gold}" />`
      : `<rect width="${size}" height="${size}" fill="${gold}" />`;
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${ground}</svg>`);
  const k = (size * fill) / (2 * reach);
  // Whole-pixel margins, equal on both sides, so small sizes stay exactly centered.
  const left = Math.max(0, Math.round((size - artWidth * k) / 2));
  const top = Math.max(0, Math.round((size - artHeight * k) / 2));
  const panther = await sharp(art)
    .resize(size - 2 * left, size - 2 * top, { fit: "fill" })
    .png()
    .toBuffer();
  return sharp(svg)
    .composite([
      { input: panther, left, top },
      // Clip anything the rounding pushed past the ground.
      { input: svg, blend: "dest-in" },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
};

const circle = (size) => badge(size, "circle", 1);

/** ICO container holding PNG-encoded images (supported by every current browser). */
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size % 256, e); // 256 is stored as 0
    header.writeUInt8(size % 256, e + 1);
    header.writeUInt16LE(1, e + 4); // color planes
    header.writeUInt16LE(32, e + 6); // bits per pixel
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((img) => img.data)]);
}

const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(icoSizes.map(async (size) => ({ size, data: await circle(size) })));
await writeFile(out("favicon.ico"), ico(icoImages));
await writeFile(out("favicon.png"), await circle(48));
await writeFile(out("apple-touch-icon.png"), await badge(180, "square", 0.86));
console.log("Wrote favicon.ico, favicon.png, apple-touch-icon.png");
