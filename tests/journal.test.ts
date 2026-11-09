import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  getPublishedPosts,
  parsePost,
  publishedPosts,
  readPosts,
  getJournalCover,
} from "../src/lib/journal";
import { compileLocalMdx } from "../src/lib/mdx";
import JournalArticle, { generateMetadata, generateStaticParams } from "../src/app/journal/[slug]/page";
import { siteUrl } from "../src/lib/site";

test("the repository sample stays draft-only and compiles as MDX", async () => {
  const sample = (await readPosts()).find((post) => post.slug === "internal-example");
  assert.ok(sample);
  assert.equal(sample.draft, true);
  assert.ok(!(await getPublishedPosts()).some((post) => post.slug === sample.slug));
  const Content = await compileLocalMdx(sample.source);
  assert.match(
    renderToStaticMarkup(createElement(Content)),
    /<strong>internal draft<\/strong>/,
  );
});

test("published articles render their body, clickable links, cover, and search metadata", async () => {
  const posts = await getPublishedPosts();
  assert.deepEqual(await generateStaticParams(), posts.map(({ slug }) => ({ slug })));
  for (const post of posts) {
    const props = { params: Promise.resolve({ slug: post.slug }) };
    const html = renderToStaticMarkup(await JournalArticle(props));
    assert.match(html, /id="article-title"/);
    assert.match(html, /class="prose journal-prose"/);
    assert.doesNotMatch(html, /article layout will be implemented/);
    for (const [, href] of post.source.matchAll(/\]\((https?:\/\/[^\s)]+)\)/g)) {
      assert.ok(html.includes(`href="${href.replaceAll("&", "&amp;")}"`));
    }
    const cover = await getJournalCover(post);
    if (cover) {
      assert.ok(html.includes(`src="${cover.src}"`));
      assert.ok(html.includes(`width="${cover.width}" height="${cover.height}"`));
    }
    const metadata = await generateMetadata(props);
    assert.deepEqual(metadata.robots, { index: Boolean(siteUrl), follow: true });
    assert.equal(metadata.openGraph.type, "article");
  }
});

test("draft and missing articles remain unavailable", async () => {
  for (const slug of ["internal-example", "not-published"]) {
    await assert.rejects(JournalArticle({ params: Promise.resolve({ slug }) }), /NEXT_HTTP_ERROR_FALLBACK;404/);
  }
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
