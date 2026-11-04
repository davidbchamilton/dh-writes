import { SocialLinks } from "@/components/social-links";
import { Breadcrumbs, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Contact",
  "/contact",
  "Find author David Hamilton on Instagram, TikTok, and Facebook.",
  true,
);
export default function ContactPage() {
  return (
    <div className="site-container placeholder-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <PageHero eyebrow="David Hamilton" title="Contact">
        <p>Connect with me on social media.</p>
      </PageHero>
      <SocialLinks />
    </div>
  );
}
