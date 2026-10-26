// Generates public/og-default.png (1200x630), the link-preview image used by every page:
// the landscape logo centered on onyx.
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const logo = path.join(root, "src/assets/brand/logos/onyx-landscape-on-dark.png");
const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_WIDTH = 840;

const art = await sharp(logo).resize({ width: LOGO_WIDTH }).toBuffer({ resolveWithObject: true });
const left = Math.round((WIDTH - art.info.width) / 2);
const top = Math.round((HEIGHT - art.info.height) / 2);

await sharp({ create: { width: WIDTH, height: HEIGHT, channels: 3, background: "#0f0f0f" } })
  .composite([{ input: art.data, left, top }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "public/og-default.png"));
console.log("Wrote public/og-default.png");
