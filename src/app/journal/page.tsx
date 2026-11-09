import { Breadcrumbs, PageHero } from "@/components/ui";
import { JournalCard } from "@/components/content-card";
import { getPublishedPosts } from "@/lib/journal";
import { pageMetadata } from "@/lib/site";
export async function generateMetadata() {
  const posts = await getPublishedPosts();
  return pageMetadata(
  "Journal",
  "/journal",
  "The journal of author David Hamilton.",
  posts.length === 0,
  );
}
export default async function JournalPage() {
  const posts = await getPublishedPosts();
  return (
    <div className="site-container journal-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Journal" }]} />
      <PageHero title="Journal" eyebrow="From the author’s desk">
        <p>Stories behind the stories. Essays, field notes, and reflections on writing.</p>
      </PageHero>
      {posts.length ? (
        <section className="journal-grid" aria-labelledby="journal-list-heading">
          <h2 id="journal-list-heading" className="sr-only">Published articles</h2>
          {posts.map((post) => <JournalCard key={post.slug} category={post.category} title={post.title} description={post.description} date={post.publishedAt} href={`/journal/${post.slug}`} coverImage={post.coverImage} coverAlt={post.coverAlt} />)}
        </section>
      ) : <p className="empty-journal">No articles have been published yet. Check back for new writing.</p>}
    </div>
  );
}
