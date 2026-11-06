import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import sharp from "sharp";

test("website and reference images follow the WebP format rule", async () => {
  for (const directory of ["public", "src", "references"]) {
    const files = (await readdir(directory, { recursive: true }))
      .filter((file) => directory !== "references" || !file.startsWith(`stitch${path.sep}`));
    assert.deepEqual(
      files.filter((file) => /\.(?:jpe?g|png|gif|svg|avif|bmp|tiff?|ico)$/i.test(file)),
      [],
      `${directory} must not introduce non-WebP image assets`,
    );
    for (const file of files.filter((file) => file.endsWith(".webp"))) {
      assert.equal((await sharp(path.join(directory, file)).metadata()).format, "webp");
    }
  }
});

test("hero candidates retain the artwork aspect ratio and cover high-density screens", async () => {
  for (const width of [360, 480, 640, 750, 828, 960, 1280]) {
    const image = await sharp(`public/images/bois-artwork-${width}.webp`).metadata();
    assert.equal(image.width, width);
    assert.equal(image.height, width * 1.5);
  }
});
