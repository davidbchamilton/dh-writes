import { PlaceholderPage } from "@/components/placeholder-page";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Contact",
  "/contact",
  "Contact information for author David Hamilton.",
  true,
);
export default function ContactPage() {
  return (
    <PlaceholderPage
      title="Contact"
      description="Confirmed contact details for reader, press, bookseller, and event enquiries will be added here."
    />
  );
}
