import assert from "node:assert/strict";
import { test } from "node:test";
import { pageMetadata, parsePublicUrl, siteUrl } from "../src/lib/site";

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
