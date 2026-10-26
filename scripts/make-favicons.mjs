// Generates the favicons in public/ from the trimmed panther icon logo.
// favicon.ico (16, 32, 48) and favicon.png (48) keep a transparent ground;
// apple-touch-icon.png (180) sits on onyx, since iOS fills transparency with black anyway.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "src/assets/brand/logos/onyx-icon-on-dark.png");
const out = (name) => path.join(root, "public", name);
const clear = { r: 0, g: 0, b: 0, alpha: 0 };
const onyx = { r: 15, g: 15, b: 15, alpha: 1 };

/** Square PNG of `size` px with the icon centered, `inset` px of ground on each side. */
// sharp runs flatten before resize/extend, so the opaque ground is painted in a second pass.
const square = async (size, background, inset = 0) => {
  const icon = await sharp(src)
    .resize(size - 2 * inset, size - 2 * inset, { fit: "contain", background: clear })
    .extend({ top: inset, bottom: inset, left: inset, right: inset, background: clear })
    .png()
    .toBuffer();
  const ground = background.alpha === 1 ? sharp(icon).flatten({ background }) : sharp(icon);
  return ground.png({ compressionLevel: 9 }).toBuffer();
};

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
const icoImages = await Promise.all(icoSizes.map(async (size) => ({ size, data: await square(size, clear) })));
await writeFile(out("favicon.ico"), ico(icoImages));
await writeFile(out("favicon.png"), await square(48, clear));
await writeFile(out("apple-touch-icon.png"), await square(180, onyx, 18));
console.log("Wrote favicon.ico, favicon.png, apple-touch-icon.png");
