import Image from "next/image";
import boisArt from "../../public/images/bois-artwork.jpg";
import { Arrow, Button, MetaRow, TagChip } from "./ui";

export function BookFeature() {
  return (
    <section
      className="site-container book-spotlight"
      aria-labelledby="book-title"
    >
      <MetaRow>
        <span className="status-label">
          <span className="status-dot" />
          The debut novel
        </span>
        <span className="meta-rule" />
        <span>David Hamilton</span>
      </MetaRow>
      <div className="book-grid">
        <figure className="book-art">
          <div className="art-frame">
            <Image
              src={boisArt}
              alt="Original Bois illustration: a young person carrying a wooden staff past hillside homes and dense foliage, with windows glowing in the dark."
              sizes="(max-width: 469px) calc(100vw - 58px), (max-width: 767px) 412px, (max-width: 900px) calc(40vw - 69.2px), (max-width: 1100px) calc(41.667vw - 74.667px), (max-width: 1199px) calc(41.667vw - 84.667px), (max-width: 1439px) 415.333px, 412px"
              loading="eager"
              fetchPriority="high"
              quality={65}
              placeholder="blur"
            />
          </div>
          <figcaption>
            Original illustration for <em>Bois</em>
          </figcaption>
        </figure>
        <div className="book-copy">
          <p className="eyebrow lavender">Caribbean young adult fantasy</p>
          <h1 id="book-title">BOIS</h1>
          <p className="book-lead">
            <em>Some legends are better left undisturbed.</em>
          </p>
          <p className="synopsis">
            Sixteen-year-old August never imagined that the creatures of
            Trinidadian folklore were real. But when his brother Kwame becomes
            entangled in a terrifying supernatural world, August discovers that
            the stories whispered across the island are more than just old
            superstitions.
          </p>
          <p className="muted">
            The debut novel by David Hamilton.
          </p>
          <div className="book-note">
            <span className="eyebrow">The story begins here</span>
            <p>
              Discover <em>Bois</em> and follow its journey.
            </p>
          </div>
          <div className="button-row">
            <Button href="/books/bois">
              Discover Bois <Arrow />
            </Button>
            <Button href="/newsletter" variant="secondary">
              Get Book Updates
            </Button>
          </div>
          <div className="tag-row">
            <TagChip>Contemporary fantasy</TagChip>
            <TagChip>Trinidad &amp; Tobago folklore</TagChip>
          </div>
        </div>
      </div>
    </section>
  );
}
