import sharp from "sharp";
import { fileURLToPath } from "node:url";

const path = (relative) => fileURLToPath(new URL(relative, import.meta.url));
const source = path("../references/bois-artwork-master.webp");

// Encode each size from the lossless master, never from a compressed derivative.
for (const width of [360, 480, 640, 750, 828, 960, 1280]) {
  await sharp(source)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 65, effort: 6 })
    .toFile(path(`../public/images/bois-artwork-${width}.webp`));
}
console.log("Generated seven responsive WebP artwork sizes.");
