import { PlaceholderPage } from "@/components/placeholder-page";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "About",
  "/about",
  "About David Hamilton, author of Bois.",
  true,
);
export default function AboutPage() {
  return (
    <PlaceholderPage
      title="About David Hamilton"
      description="David Hamilton is the author of Bois. His full biography will be added here after author review."
    />
  );
}
