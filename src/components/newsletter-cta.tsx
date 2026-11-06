import { substackUrl } from "@/lib/site";
import { Arrow, Button } from "./ui";

export function NewsletterCTA({ direct = false }: { direct?: boolean }) {
  return (
    <section className="newsletter-panel" aria-labelledby="newsletter-heading">
      <div>
        <p className="eyebrow">
          <span aria-hidden="true">✉</span> From the author’s desk
        </p>
        <h2 id="newsletter-heading">Stay in the story.</h2>
        <p>
          Book news and updates from David Hamilton, beginning with{" "}
          <em>Bois</em>.
        </p>
      </div>
      <div className="newsletter-action">
        {direct ? (
          substackUrl ? (
            <a className="button button--primary" href={substackUrl.href} data-analytics="substack">
              Subscribe on Substack <Arrow diagonal />
            </a>
          ) : (
            <p className="availability">
              Subscriptions will open here once the newsletter is ready.
            </p>
          )
        ) : (
          <Button href="/newsletter">
            Get Book Updates <Arrow />
          </Button>
        )}
        <p className="small-note">Subscriptions will be managed by Substack.</p>
      </div>
    </section>
  );
}
