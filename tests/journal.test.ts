import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  getPublishedPosts,
  parsePost,
  publishedPosts,
  readPosts,
} from "../src/lib/journal";
import { compileLocalMdx } from "../src/lib/mdx";

test("the repository sample stays draft-only and compiles as MDX", async () => {
  const drafts = await readPosts();
  assert.equal(drafts.length, 1);
  assert.equal(drafts[0].draft, true);
  assert.deepEqual(await getPublishedPosts(), []);
  const Content = await compileLocalMdx(drafts[0].source);
  assert.match(
    renderToStaticMarkup(createElement(Content)),
    /<strong>internal draft<\/strong>/,
  );
});

const fixture = (slug: string, draft: boolean, date: string) =>
  `---\ntitle: "Test"\nslug: "${slug}"\ndescription: "Internal test"\npublishedAt: "${date}"\ncategory: "Test"\ndraft: ${draft}\n---\nTest body.`;

test("publication filtering excludes drafts and sorts published posts", () => {
  const posts = [
    parsePost(fixture("older", false, "2026-01-01"), "older.mdx"),
    parsePost(fixture("newer", false, "2026-02-01"), "newer.mdx"),
    parsePost(
      fixture("private-draft", true, "2026-03-01"),
      "private-draft.mdx",
    ),
  ];
  assert.deepEqual(
    publishedPosts(posts).map((post) => post.slug),
    ["newer", "older"],
  );
});

test("invalid frontmatter fails closed before publication", () => {
  assert.throws(
    () => parsePost(fixture("wrong", false, "2026-01-01"), "actual.mdx"),
    /slug/,
  );
  assert.throws(
    () => parsePost(fixture("test", false, "2026-02-30"), "test.mdx"),
    /publishedAt/,
  );
  assert.throws(
    () =>
      parsePost(
        fixture("test", false, "2026-01-01").replace(
          "draft: false",
          "draft: no",
        ),
        "test.mdx",
      ),
    /draft/,
  );
});
