import Link from "next/link";
import { Arrow } from "./ui";

type ContentCardProps = {
  category: string;
  title: string;
  description: string;
  href?: string;
  date?: string;
};

export function ContentCard({
  category,
  title,
  description,
  href,
  date,
}: ContentCardProps) {
  return (
    <article className="content-card">
      <p className="eyebrow lavender">{category}</p>
      {date && (
        <time dateTime={date}>
          {new Intl.DateTimeFormat("en", {
            dateStyle: "long",
            timeZone: "UTC",
          }).format(new Date(date))}
        </time>
      )}
      <h3>{href ? <Link href={href}>{title}</Link> : title}</h3>
      <p>{description}</p>
      {href && (
        <Link className="card-link" href={href}>
          Read article <Arrow />
        </Link>
      )}
    </article>
  );
}

export const JournalCard = ContentCard;
