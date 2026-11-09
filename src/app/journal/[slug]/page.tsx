import { notFound } from "next/navigation";
import { Breadcrumbs, Button } from "@/components/ui";
import { NewsletterCTA } from "@/components/newsletter-cta";
import { getJournalCover, getPublishedPosts } from "@/lib/journal";
import { compileLocalMdx } from "@/lib/mdx";
import { pageMetadata, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export async function generateStaticParams() {
  return (await getPublishedPosts()).map(({ slug }) => ({ slug }));
}

async function findPost(params: Props["params"]) {
  const { slug } = await params;
  const post = (await getPublishedPosts()).find((post) => post.slug === slug);
  if (!post) notFound();
  return post;
}

export async function generateMetadata({ params }: Props) {
  const post = await findPost(params);
  const base = pageMetadata(
    post.title,
    `/journal/${post.slug}`,
    post.description,
  );
  const cover = await getJournalCover(post);
  return {
    ...base,
    ...(post.canonical ? { alternates: { canonical: post.canonical } } : {}),
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [site.name],
      ...(post.canonical ? { url: post.canonical } : {}),
      ...(cover ? { images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }] } : {}),
    },
    ...(cover ? { twitter: { card: "summary_large_image" as const, title: post.title, description: post.description, images: [cover.src] } } : {}),
  };
}

export default async function JournalArticle({ params }: Props) {
  const post = await findPost(params);
  const [Content, cover] = await Promise.all([compileLocalMdx(post.source), getJournalCover(post)]);
  return (
    <div className="site-container journal-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Journal", href: "/journal" }, { label: post.title }]} />
      <article aria-labelledby="article-title">
        <header className="article-header">
          <p className="eyebrow lavender">{post.category}</p>
          <h1 id="article-title">{post.title}</h1>
          <p className="article-meta">By {site.name} <span aria-hidden="true">·</span> <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.publishedAt))}</time></p>
          <p className="page-intro">{post.description}</p>
        </header>
        {cover && (
          <figure className="article-cover">
            {/* Pre-encoded local WebP; native image keeps the article server rendered. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...cover} loading="eager" fetchPriority="high" decoding="async" />
          </figure>
        )}
        <div className="prose journal-prose">
          <Content />
        </div>
      </article>
      <div className="article-navigation"><Button href="/journal" variant="text"><span aria-hidden="true">←</span> Back to the Journal</Button></div>
      <NewsletterCTA />
    </div>
  );
}
