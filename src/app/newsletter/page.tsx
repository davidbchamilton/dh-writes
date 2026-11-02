import { PlaceholderPage } from "@/components/placeholder-page";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Newsletter",
  "/newsletter",
  "Book news and updates from David Hamilton.",
  true,
);
export default function NewsletterPage() {
  return (
    <PlaceholderPage
      title="Get Book Updates"
      description="Follow book news and updates from David Hamilton, beginning with Bois."
      newsletter
    />
  );
}
