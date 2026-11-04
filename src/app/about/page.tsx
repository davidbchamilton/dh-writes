import { Breadcrumbs, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "About",
  "/about",
  "David Hamilton is an award-winning Trinidadian writer, anthology contributor, and author of Bois.",
  true,
);
export default function AboutPage() {
  return (
    <div className="site-container placeholder-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <PageHero eyebrow="The author" title="About David Hamilton" />
      <div className="prose">
        <p>
          <strong>
            David Hamilton is a Trinidadian writer whose passion for storytelling
            has taken him from the pages of childhood adventure novels to the
            worlds of music, theatre, and Caribbean fiction.
          </strong>
        </p>
        <p>
          His love affair with writing began in primary school, where, inspired
          by his favourite Hardy Boys mysteries, he attempted to recreate the
          adventures that had captured his imagination. What began as a childhood
          fascination gradually evolved into a lifelong creative pursuit, finding
          expression in stage plays, music journalism, short stories, and
          songwriting.
        </p>
        <p>
          As a hip-hop artist performing under the moniker <em>Da Face</em>,
          David further developed his storytelling instincts through lyricism,
          using rhythm, wordplay, and narrative to explore ideas and experiences.
          His diverse creative background continues to influence his approach to
          fiction, where character, voice, and the distinctive rhythms of
          Caribbean life play central roles.
        </p>
        <p>
          David’s literary work has earned recognition in regional writing
          competitions. In 2022, he won first place in the{" "}
          <strong>Caribbean Magazine Plus Short Story Competition</strong> with
          his story <em>Kyle</em>, distinguishing himself among writers from
          across the Caribbean. He was also a finalist in the{" "}
          <strong>Island Voices Short Story Competition</strong>, with his work
          subsequently published in the <em>Island Voices</em> anthology.
        </p>
        <p>
          Drawing inspiration from Caribbean culture, folklore, and the
          complexities of human relationships, David is particularly interested
          in telling stories that place Caribbean characters and experiences at
          the centre of compelling narratives. His writing explores the
          intersection of the familiar and the extraordinary, blending authentic
          regional voices with themes that resonate beyond the Caribbean.
        </p>
        <p>
          He is currently preparing to publish his debut novel, <em>Bois</em>, a
          young adult fantasy set in contemporary Trinidad that draws upon the
          island’s rich supernatural folklore. Scheduled for independent
          publication in 2027, the novel represents a new chapter in his
          creative journey and his ambition to bring distinctly Caribbean stories
          to a wider international audience.
        </p>
        <p>
          For David, storytelling has never been confined to a single medium or
          genre. Whether through music, theatre, short fiction, or novels, his
          passion remains the same: creating memorable characters, exploring the
          human experience, and telling stories worth sharing.
        </p>
      </div>
    </div>
  );
}
