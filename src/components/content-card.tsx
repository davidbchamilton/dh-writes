import Link from "next/link";
import { Arrow } from "./ui";

type ContentCardProps = {
  category: string;
  title: string;
  description: string;
  href?: string;
  date?: string;
  coverImage?: string;
  coverAlt?: string;
};

export function ContentCard({
  category,
  title,
  description,
  href,
  date,
  coverImage,
  coverAlt,
}: ContentCardProps) {
  return (
    <article className="content-card">
      {coverImage && (
        /* Cropped previews; full article covers retain their natural proportions. */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className="card-cover" src={coverImage} alt={coverAlt ?? ""} width={1200} height={675} loading="lazy" decoding="async" />
      )}
      <p className="eyebrow lavender">{category}</p>
      {date && (
        <time dateTime={date}>
          {new Intl.DateTimeFormat("en", {
            dateStyle: "long",
            timeZone: "UTC",
          }).format(new Date(date))}
        </time>
      )}
      <h3>{href ? <Link href={href} prefetch={false}>{title}</Link> : title}</h3>
      <p>{description}</p>
      {href && (
        <Link className="card-link" href={href} prefetch={false}>
          Read article <Arrow />
        </Link>
      )}
    </article>
  );
}

export const JournalCard = ContentCard;
