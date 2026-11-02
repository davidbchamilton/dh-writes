import { Button, PageHero } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="site-container placeholder-page">
      <PageHero eyebrow="404 · Page not found" title="This page isn’t here.">
        <p>The page may have moved, or it may not be published yet.</p>
      </PageHero>
      <Button href="/">Return Home</Button>
    </div>
  );
}
