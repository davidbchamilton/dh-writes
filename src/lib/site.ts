import type { Metadata } from "next";

export const site = {
  name: "David Hamilton",
  title: "David Hamilton — Author & Novelist",
  description:
    "The author website of David Hamilton. Discover Bois, a contemporary Caribbean young adult fantasy inspired by Trinidad and Tobago folklore.",
};

export const socialImage = {
  url: "/opengraph-image.webp",
  width: 1200,
  height: 630,
  alt: "David Hamilton — Author & Novelist. Discover Bois, a Caribbean young adult fantasy.",
};

// Only completed pages belong in the sitemap. Empty journal and other
// preparation pages retain their explicit noindex metadata until published.
export const indexablePaths = ["/", "/newsletter", "/privacy"] as const;

export function parsePublicUrl(
  value: string | undefined,
  name: string,
): URL | undefined {
  if (!value?.trim()) return undefined;
  const url = new URL(value);
  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password
  ) {
    throw new Error(`${name} must be an HTTP(S) URL without credentials.`);
  }
  return url;
}

const configuredSite = parsePublicUrl(
  process.env.NEXT_PUBLIC_SITE_URL,
  "NEXT_PUBLIC_SITE_URL",
);
export const siteUrl = configuredSite
  ? new URL(configuredSite.origin)
  : undefined;
export const substackUrl = parsePublicUrl(
  process.env.NEXT_PUBLIC_SUBSTACK_URL,
  "NEXT_PUBLIC_SUBSTACK_URL",
);
if (substackUrl && substackUrl.protocol !== "https:") {
  throw new Error("NEXT_PUBLIC_SUBSTACK_URL must use HTTPS.");
}

export function pageMetadata(
  title: string,
  path: string,
  description: string,
  placeholder = false,
): Metadata {
  const canonical = siteUrl ? new URL(path, siteUrl).href : undefined;
  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: { index: !placeholder && Boolean(siteUrl), follow: true },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: canonical,
      images: [socialImage],
    },
  };
}

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;
