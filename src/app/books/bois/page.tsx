import { Breadcrumbs, Button, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Bois",
  "/books/bois",
  "When Kwame becomes entangled in a supernatural world, sixteen-year-old August discovers that the creatures of Trinidadian folklore are real.",
  true,
);
export default function BoisPage() {
  return (
    <div className="site-container placeholder-page">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Books", href: "/books" },
          { label: "Bois" },
        ]}
      />
      <PageHero eyebrow="Caribbean young adult fantasy" title="Bois" />
      <div className="prose">
        <p><strong>Some legends are better left undisturbed.</strong></p>
        <p>
          Sixteen-year-old August never imagined that the creatures of
          Trinidadian folklore were real. But when his brother Kwame becomes
          entangled in a terrifying supernatural world, August discovers that
          the stories whispered across the island are more than just old
          superstitions.
        </p>
        <p>
          With his brother’s soul hanging in the balance, August is thrust into a
          dangerous world of soucouyants, ancient magic, and powerful beings
          lurking beyond the boundaries of the living world.
        </p>
        <p>
          Armed with mysterious abilities he barely understands, August must
          navigate uneasy alliances, uncover hidden truths, and confront enemies
          who are far more cunning than he could have imagined.
        </p>
        <p>
          But as the danger escalates, August discovers that his greatest
          obstacle may not be the monsters hunting him, but the anger burning
          within himself.
        </p>
        <p>
          Set against the vibrant backdrop of contemporary Trinidad, <em>Bois</em>{" "}
          is a Caribbean young adult fantasy adventure about brotherhood,
          courage, identity, and the extraordinary power of learning to control
          oneself.
        </p>
        <div className="mt-8">
          <Button href="/newsletter" variant="secondary">Get Book Updates</Button>
        </div>
      </div>
    </div>
  );
}
