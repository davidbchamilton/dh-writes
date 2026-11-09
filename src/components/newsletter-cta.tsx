import { substackUrl } from "@/lib/site";
import { Arrow, Button } from "./ui";
import { KitSignup } from "./kit-signup";

export function NewsletterCTA({ direct = false }: { direct?: boolean }) {
  if (direct) {
    return (
      <section className="newsletter-signup" aria-label="Book updates signup">
        <KitSignup />
        <p className="small-note">Book updates via Kit. Unsubscribe at any time.</p>
        {substackUrl && (
          <p className="small-note newsletter-secondary">
            <a href={substackUrl.href} data-analytics="substack">Read David on Substack <Arrow diagonal /></a>
          </p>
        )}
      </section>
    );
  }
  return (
    <section className="newsletter-panel" aria-labelledby="newsletter-heading">
      <div>
        <p className="eyebrow">
          <span aria-hidden="true">✉</span> From the author’s desk
        </p>
        <h2 id="newsletter-heading">Be part of the story.</h2>
        <p>
          Follow the journey of <em>Bois</em>, a young adult fantasy rooted in
          Trinidad and Tobago folklore. Sign up for book news and writing updates
          from David Hamilton.
        </p>
      </div>
      <div className="newsletter-action">
        <Button href="/newsletter">
          Get Book Updates <Arrow />
        </Button>
        <p className="small-note">Book updates via Kit. Unsubscribe at any time.</p>
        {substackUrl && (
          <p className="small-note newsletter-secondary">
            <a href={substackUrl.href} data-analytics="substack">Read David on Substack <Arrow diagonal /></a>
          </p>
        )}
      </div>
    </section>
  );
}
