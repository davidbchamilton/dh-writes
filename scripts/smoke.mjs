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
  assert.doesNotMatch(html, /href="#"/, `${route} must not contain fake links`);
  assert.doesNotMatch(
    html,
    /<form[\s>]/,
    `${route} must not present a fake form`,
  );
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
const og = await fetch(new URL("/opengraph-image", origin));
assert.equal(og.status, 200);
assert.match(og.headers.get("content-type"), /image\/png/);
console.log("PASS sitemap, robots, Open Graph image");
