import { notFound } from "next/navigation";
import stories from "../../../../content/stories.json";
import { readMarkdownPage } from "@/lib/content";

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = stories.find(x => x.slug === slug);
  if (!s) return notFound();
  const page = await readMarkdownPage(`stories/${s.slug}`);
  if (!page) return notFound();

  return (
    <article className="prose prose-invert max-w-none">
      <h1>{s.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </article>
  );
}
