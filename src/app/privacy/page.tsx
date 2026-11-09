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
          Book update subscriptions are handled by Kit. The embedded signup form
          loads content from Kit and sends the details you submit directly to
          Kit to manage your subscription. You can unsubscribe using the link in
          any update. Read <a href="https://kit.com/privacy">Kit’s privacy policy</a>.
        </p>
        <p>
          Following links to Substack, social media, or book retailers takes you to services with
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
