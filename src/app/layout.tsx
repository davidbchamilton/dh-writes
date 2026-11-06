import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { GoogleAnalytics } from "@/components/google-analytics";
import { site, siteUrl, socialImage } from "@/lib/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  // A local preview base resolves the generated social image without inventing
  // a public domain. Canonicals/sitemap still require the configured siteUrl.
  metadataBase: siteUrl ?? new URL("http://localhost:3000"),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.title,
  icons: { icon: "/icon.webp" },
  openGraph: {
    type: "website",
    locale: "en_TT",
    siteName: site.title,
    title: site.title,
    description: site.description,
    images: [socialImage],
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
    images: [socialImage],
  },
  robots: siteUrl
    ? { index: true, follow: true }
    : { index: false, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${jakarta.variable}`}>
      <body>
        <GoogleAnalytics />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
