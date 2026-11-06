import { preload } from "react-dom";
import { heroImage } from "@/lib/hero-image";
import { Arrow, Button, MetaRow, TagChip } from "./ui";

export function BookFeature() {
  preload(heroImage.src, {
    as: "image",
    imageSrcSet: heroImage.srcSet,
    imageSizes: heroImage.sizes,
    fetchPriority: "high",
  });
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
            {/* Pre-encoded responsive WebP avoids runtime optimization and image hydration. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...heroImage}
              alt="Original Bois illustration: a young person carrying a wooden staff past hillside homes and dense foliage, with windows glowing in the dark."
              loading="eager"
              fetchPriority="high"
              decoding="async"
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
