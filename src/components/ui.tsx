import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "text";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <Link className={`button button--${variant} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children && <div className="page-intro">{children}</div>}
    </div>
  );
}

export function TagChip({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

export function MetaRow({ children }: { children: ReactNode }) {
  return <div className="meta-row">{children}</div>;
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function EditorialSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`editorial-section ${className}`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

export function QuotePanel({
  children,
  source,
}: {
  children: ReactNode;
  source: string;
}) {
  return (
    <figure className="quote-panel">
      <blockquote>{children}</blockquote>
      <figcaption>{source}</figcaption>
    </figure>
  );
}
