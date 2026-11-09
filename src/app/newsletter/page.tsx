import { NewsletterCTA } from "@/components/newsletter-cta";
import { Breadcrumbs, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Newsletter",
  "/newsletter",
  "Book news and updates from David Hamilton.",
  true,
);
export default function NewsletterPage() {
  return (
    <div className="site-container placeholder-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Book Updates" }]} />
      <PageHero eyebrow="From the author’s desk" title="Get Book Updates">
        <p>Stay close to the stories, beginning with <em>Bois</em>.</p>
      </PageHero>
      <NewsletterCTA direct />
    </div>
  );
}
