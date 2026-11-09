import type { MetadataRoute } from "next";
import { indexablePaths, siteUrl } from "@/lib/site";
import { getPublishedPosts } from "@/lib/journal";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!siteUrl) return [];
  const posts = await getPublishedPosts();
  // Include completed public pages, without inventing a production origin.
  return [
    ...indexablePaths.filter((path) => path !== "/journal" || posts.length > 0).map((path) => ({
        url: new URL(path, siteUrl).href,
        changeFrequency: "monthly" as const,
        priority: path === "/" ? 1 : 0.5,
    })),
    ...posts.map((post) => ({ url: new URL(`/journal/${post.slug}`, siteUrl).href, lastModified: post.publishedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
