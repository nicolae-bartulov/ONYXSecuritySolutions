// Generates the favicons in public/ from the trimmed panther icon logo.
// favicon.ico (16, 32, 48) and favicon.png (48) put the panther on a white circle, so it reads
// in both light and dark tab bars; apple-touch-icon.png (180) sits on a white square, which iOS rounds itself.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "src/assets/brand/logos/onyx-icon-on-light.png");
const out = (name) => path.join(root, "public", name);
const clear = { r: 0, g: 0, b: 0, alpha: 0 };
const white = "#ffffff";

/** The icon fitted into a `box` px square on a transparent ground. */
const fitted = (box) =>
  sharp(src).resize(box, box, { fit: "contain", background: clear }).png().toBuffer();

/** `size` px PNG: a white `shape` ("circle" or "square") with the icon centered at `scale` of its width. */
const badge = async (size, shape, scale) => {
  const ground =
    shape === "circle"
      ? `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${white}" />`
      : `<rect width="${size}" height="${size}" fill="${white}" />`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${ground}</svg>`;
  return sharp(Buffer.from(svg))
    .composite([{ input: await fitted(Math.round(size * scale)), gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
};

// The panther needs a larger share of the circle at 16 px to stay recognisable.
const circle = (size) => badge(size, "circle", size <= 16 ? 0.84 : 0.78);

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
await writeFile(out("apple-touch-icon.png"), await badge(180, "square", 0.8));
console.log("Wrote favicon.ico, favicon.png, apple-touch-icon.png");
