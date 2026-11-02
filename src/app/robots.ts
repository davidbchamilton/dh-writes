import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(siteUrl ? { allow: "/" } : { disallow: "/" }),
    },
    ...(siteUrl ? { sitemap: new URL("/sitemap.xml", siteUrl).href } : {}),
  };
}
