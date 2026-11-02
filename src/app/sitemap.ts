import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Only the homepage is complete in Phase 1. Never invent a production origin.
  return siteUrl
    ? [{ url: siteUrl.href, changeFrequency: "monthly", priority: 1 }]
    : [];
}
