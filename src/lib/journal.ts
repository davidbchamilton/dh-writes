import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type JournalPost = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  category: string;
  coverImage?: string;
  canonical?: string;
  draft: boolean;
  source: string;
};

export function parsePost(raw: string, filename: string): JournalPost {
  const { data, content } = matter(raw);
  for (const field of [
    "title",
    "slug",
    "description",
    "publishedAt",
    "category",
  ] as const) {
    if (typeof data[field] !== "string" || !data[field].trim())
      throw new Error(`${filename}: ${field} must be a nonempty string.`);
  }
  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug) ||
    `${data.slug}.mdx` !== filename
  )
    throw new Error(
      `${filename}: slug must match the filename and use lowercase kebab case.`,
    );
  if (typeof data.draft !== "boolean")
    throw new Error(`${filename}: draft must be explicitly true or false.`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(data.publishedAt) ||
    !Number.isFinite(Date.parse(data.publishedAt)) ||
    new Date(data.publishedAt).toISOString().slice(0, 10) !== data.publishedAt
  )
    throw new Error(
      `${filename}: publishedAt must be a valid YYYY-MM-DD string.`,
    );
  if (
    data.coverImage !== undefined &&
    (typeof data.coverImage !== "string" ||
      !data.coverImage.startsWith("/images/") ||
      data.coverImage.includes(".."))
  )
    throw new Error(`${filename}: coverImage must be a local /images/ path.`);
  if (
    data.canonical !== undefined &&
    (typeof data.canonical !== "string" ||
      !URL.canParse(data.canonical) ||
      new URL(data.canonical).protocol !== "https:")
  )
    throw new Error(`${filename}: canonical must be an absolute HTTPS URL.`);
  return {
    title: data.title,
    slug: data.slug,
    description: data.description,
    publishedAt: data.publishedAt,
    category: data.category,
    draft: data.draft,
    coverImage: data.coverImage,
    canonical: data.canonical,
    source: content,
  };
}

export async function readPosts(): Promise<JournalPost[]> {
  const files = (
    await readdir(path.join(process.cwd(), "content/journal"))
  ).filter((file) => file.endsWith(".mdx"));
  return Promise.all(
    files.map(async (file) =>
      parsePost(
        await readFile(
          path.join(process.cwd(), "content/journal", file),
          "utf8",
        ),
        file,
      ),
    ),
  );
}

export function publishedPosts(posts: JournalPost[]): JournalPost[] {
  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPublishedPosts(): Promise<JournalPost[]> {
  return publishedPosts(await readPosts());
}
