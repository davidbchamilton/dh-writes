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
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 40vw, 450px"
              priority
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
            Contemporary Trinidad.
            <br />
            <em>A world shaped by folklore.</em>
          </p>
          <p className="synopsis">
            <em>Bois</em> is a contemporary Caribbean YA fantasy involving
            August, his brother Kwame, and supernatural elements inspired by
            Trinidad and Tobago folklore.
          </p>
          <p className="muted">
            The debut novel by David Hamilton. Further story and publication
            details will be shared here.
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
