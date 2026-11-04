import Link from "next/link";
import { navigation } from "@/lib/site";
import { SiteNavigation } from "./site-navigation";
import { SocialLinks } from "./social-links";
import { Button, Arrow } from "./ui";

export function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label="David Hamilton — Home">
      <span>David Hamilton</span>
      <small>Author &amp; Novelist</small>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Wordmark />
        <SiteNavigation />
        <Button href="/newsletter" className="header-cta">
          Get Book Updates
        </Button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div>
            <Wordmark />
            <p className="footer-description">
              The author of <em>Bois</em>, a contemporary Caribbean young adult
              fantasy.
            </p>
            <SocialLinks />
          </div>
          <div>
            <p className="eyebrow">Index</p>
            <nav aria-label="Footer">
              <ul>
                {navigation.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div>
            <p className="eyebrow">Stay in the story</p>
            <p>
              Follow the next chapter of <em>Bois</em>.
            </p>
            <Button href="/newsletter" variant="text">
              Get Book Updates <Arrow />
            </Button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} David Hamilton.</p>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
