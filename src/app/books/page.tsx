import { Arrow, Breadcrumbs, Button, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Books",
  "/books",
  "Explore Bois, David Hamilton’s debut novel, and Island Voices, an anthology featuring his work.",
  true,
);
export default function BooksPage() {
  return (
    <div className="site-container placeholder-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Books" }]} />
      <PageHero eyebrow="David Hamilton" title="Books" />
      <div className="grid gap-6 md:grid-cols-2">
        <article className="content-card">
          <p className="eyebrow lavender">Debut novel</p>
          <h2 className="my-3">Bois</h2>
          <p>A contemporary Caribbean young adult fantasy.</p>
          <Button href="/books/bois" variant="text" className="mt-4">
            Discover Bois <Arrow />
          </Button>
        </article>
        <article className="content-card">
          <p className="eyebrow lavender">Anthology contribution</p>
          <h2 className="my-3">Island Voices</h2>
          <p>An anthology featuring work by David Hamilton.</p>
          <a
            className="button button--text mt-4"
            href="https://www.amazon.com/dp/B0CLKZ34WP"
          >
            View on Amazon <Arrow diagonal />
          </a>
        </article>
      </div>
    </div>
  );
}
