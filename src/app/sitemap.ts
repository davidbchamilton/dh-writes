import type { MetadataRoute } from "next";
import { indexablePaths, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Include completed public pages, without inventing a production origin.
  return siteUrl
    ? indexablePaths.map((path) => ({
        url: new URL(path, siteUrl).href,
        changeFrequency: "monthly" as const,
        priority: path === "/" ? 1 : 0.5,
      }))
    : [];
}
