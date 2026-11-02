import { PlaceholderPage } from "@/components/placeholder-page";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Books",
  "/books",
  "Books by David Hamilton, beginning with Bois.",
  true,
);
export default function BooksPage() {
  return (
    <PlaceholderPage
      title="Books"
      description="Books by David Hamilton, beginning with his debut novel, Bois."
    />
  );
}
