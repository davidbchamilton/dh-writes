import { Breadcrumbs, Button, PageHero } from "./ui";
import { NewsletterCTA } from "./newsletter-cta";

export function PlaceholderPage({
  title,
  description,
  book = false,
  newsletter = false,
}: {
  title: string;
  description: string;
  book?: boolean;
  newsletter?: boolean;
}) {
  return (
    <div className="site-container placeholder-page">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          ...(book ? [{ label: "Books", href: "/books" }] : []),
          { label: title },
        ]}
      />
      <PageHero eyebrow="Coming in a subsequent phase" title={title}>
        <p>{description}</p>
      </PageHero>
      {newsletter ? (
        <NewsletterCTA direct />
      ) : (
        <div className="placeholder-note">
          <p>
            This page is being prepared. Its full content will follow in a
            subsequent phase.
          </p>
          <Button variant="secondary" href="/">
            Back to Home
          </Button>
        </div>
      )}
    </div>
  );
}
