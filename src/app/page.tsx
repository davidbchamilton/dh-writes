import { BookFeature } from "@/components/book-feature";
import { JournalCard } from "@/components/content-card";
import { NewsletterCTA } from "@/components/newsletter-cta";
import {
  Arrow,
  Button,
  EditorialSection,
  SectionHeading,
} from "@/components/ui";
import { getPublishedPosts } from "@/lib/journal";
import { pageMetadata, site } from "@/lib/site";

export const metadata = {
  ...pageMetadata("Author & Novelist", "/", site.description),
  title: { absolute: site.title },
};

export default async function HomePage() {
  const posts = await getPublishedPosts();
  return (
    <>
      <div className="home-atmosphere">
        <BookFeature />
      </div>
      <EditorialSection>
        <div className="premise-grid">
          <div>
            <p className="eyebrow">Inside the novel</p>
            <h2>
              Trinidad. Two brothers.
              <br />
              <em>The supernatural.</em>
            </h2>
          </div>
          <div className="premise-copy">
            <p>
              Meet August and his brother Kwame in a contemporary Caribbean
              fantasy inspired by the supernatural folklore of Trinidad and
              Tobago.
            </p>
            <Button href="/books/bois" variant="text">
              Explore Bois <Arrow />
            </Button>
          </div>
        </div>
      </EditorialSection>
      <section
        className="site-container about-section"
        aria-labelledby="about-heading"
      >
        <div className="author-monogram" aria-hidden="true">
          <span>dh.</span>
          <div className="monogram-rule" />
          <small>David Hamilton · Author</small>
        </div>
        <div className="about-copy">
          <p className="eyebrow lavender">The author</p>
          <h2 id="about-heading">David Hamilton</h2>
          <p>
            David Hamilton is a Trinidadian writer whose passion for storytelling
            began in primary school, inspired by his love of{" "}
            <em>The Hardy Boys</em> novels. His creative journey has spanned
            theatre, music journalism, and hip-hop, releasing music under the
            moniker <em>Da Face</em>.
          </p>
          <p className="mt-4">
            In 2022, he won the Caribbean Magazine Plus Short Story Competition
            with his story <em>Kyle</em> and was a finalist in the Island Voices
            Short Story Competition, with his work published in the{" "}
            <em>Island Voices</em> anthology.
          </p>
          <p className="mt-4">
            Drawing inspiration from Caribbean culture and folklore, David is
            preparing to independently publish his debut novel, <em>Bois</em>,
            a young adult fantasy set in contemporary Trinidad, in 2027.
          </p>
          <Button href="/about" variant="text">
            About David <Arrow />
          </Button>
        </div>
      </section>
      <EditorialSection className="thematic-section">
        <SectionHeading
          eyebrow="The world of Bois"
          title="Contemporary life. Supernatural folklore."
        />
        <div className="thematic-panel">
          <p className="serif-note">
            Set in Trinidad, <em>Bois</em> brings August and Kwame into a
            contemporary story shaped by Caribbean folklore.
          </p>
          <Button href="/books/bois" variant="text">
            Read the full synopsis <Arrow />
          </Button>
        </div>
      </EditorialSection>
      <section
        className="site-container journal-section"
        aria-labelledby="journal-title"
      >
        <SectionHeading
          eyebrow="From the author’s desk"
          title="Essays & Field Notes"
        >
          <Button href="/journal" variant="text">
            Visit the Journal <Arrow diagonal />
          </Button>
        </SectionHeading>
        <div id="journal-title" className="sr-only">
          Journal previews
        </div>
        {posts.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <JournalCard
                key={post.slug}
                category={post.category}
                title={post.title}
                description={post.description}
                date={post.publishedAt}
                href={`/journal/${post.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="empty-journal">
            <div>
              <p className="empty-label">The journal · Coming soon</p>
              <h3>A space for the stories behind the stories.</h3>
              <p>No articles have been published yet.</p>
            </div>
            <p className="empty-description">
              Future journal entries will appear here. Get book updates to
              follow the next chapter of <em>Bois</em>.
            </p>
          </div>
        )}
      </section>
      <div className="site-container newsletter-wrap">
        <NewsletterCTA />
      </div>
    </>
  );
}
