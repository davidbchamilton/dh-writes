import { PlaceholderPage } from "@/components/placeholder-page";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Privacy",
  "/privacy",
  "Privacy information for the David Hamilton author website.",
  true,
);
export default function PrivacyPage() {
  return (
    <PlaceholderPage
      title="Privacy"
      description="A reviewed privacy policy will be added once the hosting and newsletter configuration are confirmed."
    />
  );
}
