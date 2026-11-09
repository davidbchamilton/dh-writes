import assert from "node:assert/strict";
import { test } from "node:test";
import { pageMetadata, parsePublicUrl, siteUrl } from "../src/lib/site";
import sitemap from "../src/app/sitemap";
import { metadata as newsletterMetadata } from "../src/app/newsletter/page";
import { metadata as privacyMetadata } from "../src/app/privacy/page";
import { generateMetadata as getJournalMetadata } from "../src/app/journal/page";
import { getPublishedPosts } from "../src/lib/journal";

test("missing configuration does not invent an origin or subscription URL", () => {
  assert.equal(parsePublicUrl("", "TEST_URL"), undefined);
  assert.equal(parsePublicUrl(undefined, "TEST_URL"), undefined);
  assert.throws(
    () => parsePublicUrl("javascript:alert(1)", "TEST_URL"),
    /HTTP/,
  );
  assert.throws(
    () => parsePublicUrl("https://name:secret@example.invalid", "TEST_URL"),
    /credentials/,
  );
});

test("completed pages are indexable only with a configured origin", async () => {
  for (const metadata of [newsletterMetadata, privacyMetadata]) {
    assert.deepEqual(metadata.robots, { index: Boolean(siteUrl), follow: true });
  }
  const posts = await getPublishedPosts();
  assert.deepEqual((await getJournalMetadata()).robots, { index: Boolean(siteUrl) && posts.length > 0, follow: true });
});

test("sitemap includes published articles and excludes drafts", async () => {
  const posts = await getPublishedPosts();
  const paths = ["/", "/newsletter", "/privacy", ...(posts.length ? ["/journal"] : []), ...posts.map((post) => `/journal/${post.slug}`)];
  assert.deepEqual(
    (await sitemap()).map((entry) => entry.url),
    siteUrl ? paths.map((path) => new URL(path, siteUrl).href) : [],
  );
});

test("incomplete pages remain noindex and canonical URLs require configuration", () => {
  const metadata = pageMetadata(
    "Books",
    "/books",
    "Books by David Hamilton.",
    true,
  );
  assert.deepEqual(metadata.robots, { index: false, follow: true });
  if (!siteUrl) assert.equal(metadata.alternates, undefined);
  else
    assert.deepEqual(metadata.alternates, {
      canonical: new URL("/books", siteUrl).href,
    });
});
