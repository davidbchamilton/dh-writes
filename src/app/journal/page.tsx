import { PlaceholderPage } from "@/components/placeholder-page";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Journal",
  "/journal",
  "The journal of author David Hamilton.",
  true,
);
export default function JournalPage() {
  return (
    <PlaceholderPage
      title="Journal"
      description="Essays and field notes will appear here once approved for publication. No articles have been published yet."
    />
  );
}
