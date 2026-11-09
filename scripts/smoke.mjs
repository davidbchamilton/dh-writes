import assert from "node:assert/strict";

const origin = process.argv[2] ?? "http://127.0.0.1:3100";
const routes = [
  "/",
  "/books",
  "/books/bois",
  "/about",
  "/journal",
  "/newsletter",
  "/contact",
  "/privacy",
];

for (const route of routes) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, `${route} must load`);
  const html = await response.text();
  assert.match(
    html,
    /<title>[^<]*David Hamilton/,
    `${route} needs a branded title`,
  );
  assert.match(html, /id="main-content"/, `${route} needs a main landmark`);
  assert.match(html, /property="og:image" content="[^"]*\/opengraph-image\.webp"/);
  assert.doesNotMatch(html, /href="#"/, `${route} must not contain fake links`);
  if (route === "/newsletter") {
    assert.match(html, /data-kit-embed="1f64be7eb2"/);
    assert.match(html, /https:\/\/david-hamilton-2\.kit\.com\/1f64be7eb2/);
    assert.doesNotMatch(html, /Subscriptions will open|Coming in a subsequent phase/);
  } else {
    assert.doesNotMatch(html, /data-kit-embed=/, "Kit embed must be isolated to the newsletter page");
  }
  assert.doesNotMatch(
    html,
    /<form[\s>]/,
    `${route} must not present a fake form`,
  );
  if (route === "/") {
    const hero = html.match(/<img[^>]*>/)?.[0] ?? "";
    assert.match(hero, /fetchPriority="high"/i);
    assert.match(hero, /loading="eager"/);
    assert.match(hero, /width="1280" height="1920"/);
    assert.doesNotMatch(hero, /\/_next\/image\?/);
    const src = hero.match(/src="([^"]+)"/)?.[1];
    assert.ok(src?.endsWith(".webp"), "hero must use static WebP");
    const preload = html.match(/<link[^>]*as="image"[^>]*>/)?.[0] ?? "";
    assert.match(preload, /imageSrcSet=/i);
    assert.match(preload, /fetchPriority="high"/i);
    for (const [, candidate] of hero.matchAll(/([^\s",]+\.webp) \d+w/g)) {
      const image = await fetch(new URL(candidate, origin));
      assert.equal(image.status, 200);
      assert.match(image.headers.get("content-type"), /image\/webp/);
      assert.match(image.headers.get("cache-control"), /immutable/);
    }
  }
  if (route !== "/")
    assert.match(
      html,
      /name="robots" content="noindex, follow"/,
      `${route} must stay noindex during Phase 1`,
    );
  console.log(`PASS ${route}`);
}

for (const route of [
  "/journal/internal-example",
  "/journal/not-published",
  "/not-a-page",
]) {
  assert.equal(
    (await fetch(new URL(route, origin))).status,
    404,
    `${route} must not be public`,
  );
  console.log(`PASS ${route} → 404`);
}

const sitemap = await fetch(new URL("/sitemap.xml", origin));
assert.equal(sitemap.status, 200);
const sitemapXml = await sitemap.text();
assert.doesNotMatch(
  sitemapXml,
  /internal-example|\/about|\/books|\/journal|\/contact|\/newsletter|\/privacy/,
);
assert.equal((await fetch(new URL("/robots.txt", origin))).status, 200);
const og = await fetch(new URL("/opengraph-image.webp", origin));
assert.equal(og.status, 200);
assert.match(og.headers.get("content-type"), /image\/webp/);
const icon = await fetch(new URL("/icon.webp", origin));
assert.equal(icon.status, 200);
assert.match(icon.headers.get("content-type"), /image\/webp/);
console.log("PASS sitemap, robots, Open Graph image");
