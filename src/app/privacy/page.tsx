import { Breadcrumbs, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Privacy",
  "/privacy",
  "Privacy information for the David Hamilton author website.",
  true,
);
export default function PrivacyPage() {
  return (
    <div className="site-container placeholder-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <PageHero title="Privacy" eyebrow="David Hamilton" />
      <div className="prose">
        <h2>Website analytics</h2>
        <p>
          This website uses Google Analytics to understand page visits and clicks
          on newsletter, contact, social media, and book links. Google Analytics
          uses cookies and collects information about your browser, device, and
          use of this website. Advertising personalization and Google signals
          are disabled in this website’s tracking configuration.
        </p>
        <p>
          Custom click events do not include email addresses, phone numbers, or
          form contents. This website currently has no contact form.
        </p>
        <p>
          Newsletter subscriptions are handled on Substack. Following links to
          Substack, social media, or book retailers takes you to services with
          their own privacy policies. A click on a subscription or book link does
          not confirm a subscription or purchase.
        </p>
        <p>
          Read <a href="https://policies.google.com/privacy">Google’s privacy policy</a>{" "}
          or learn about the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics opt-out browser add-on</a>.
        </p>
      </div>
    </div>
  );
}
