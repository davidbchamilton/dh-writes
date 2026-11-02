import { PlaceholderPage } from "@/components/placeholder-page";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Bois",
  "/books/bois",
  "Bois, a contemporary Caribbean YA fantasy by David Hamilton.",
  true,
);
export default function BoisPage() {
  return (
    <PlaceholderPage
      title="Bois"
      description="A contemporary Caribbean young adult fantasy involving August, his brother Kwame, and supernatural elements inspired by Trinidad and Tobago folklore."
      book
    />
  );
}
