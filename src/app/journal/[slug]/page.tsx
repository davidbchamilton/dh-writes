import { notFound } from "next/navigation";
import { PlaceholderPage } from "@/components/placeholder-page";
import { getPublishedPosts } from "@/lib/journal";
import { pageMetadata } from "@/lib/site";

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
  return pageMetadata(
    post.title,
    `/journal/${post.slug}`,
    post.description,
    true,
  );
}

export default async function JournalArticlePlaceholder({ params }: Props) {
  const post = await findPost(params);
  return (
    <PlaceholderPage
      title={post.title}
      description="The journal article layout will be implemented in a subsequent phase."
    />
  );
}
