// Generates the favicons in public/ from the trimmed panther icon logo.
// favicon.ico (16, 32, 48) and favicon.png (48) put the panther on a brand-gold square, centered and
// as large as the square allows (the whiskers reach the sides); apple-touch-icon.png (180) insets it,
// since iOS rounds the corners and would clip the ears.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "src/assets/brand/logos/onyx-icon-on-light.png");
const out = (name) => path.join(root, "public", name);
const gold = "#e3a600"; // --accent / brand-gold in global.css

const art = await sharp(src).trim().png().toBuffer();
const { width: artWidth, height: artHeight } = await sharp(art).metadata();

/** `size` px PNG: a gold square with the artwork centered, its longer side at `fill` of the width. */
const square = async (size, fill) => {
  const k = (size * fill) / Math.max(artWidth, artHeight);
  // Whole-pixel margins, equal on both sides, so small sizes stay exactly centered.
  const left = Math.round((size - artWidth * k) / 2);
  const top = Math.round((size - artHeight * k) / 2);
  const panther = await sharp(art)
    .resize(size - 2 * left, size - 2 * top, { fit: "fill" })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: gold } })
    .composite([{ input: panther, left, top }])
    .png({ compressionLevel: 9 })
    .toBuffer();
};

const favicon = (size) => square(size, 1);

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
const icoImages = await Promise.all(icoSizes.map(async (size) => ({ size, data: await favicon(size) })));
await writeFile(out("favicon.ico"), ico(icoImages));
await writeFile(out("favicon.png"), await favicon(48));
await writeFile(out("apple-touch-icon.png"), await square(180, 0.8));
console.log("Wrote favicon.ico, favicon.png, apple-touch-icon.png");
