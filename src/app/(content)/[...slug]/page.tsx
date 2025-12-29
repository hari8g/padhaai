import { notFound } from "next/navigation";
import { readMarkdownPage } from "@/lib/content";

export default async function ContentPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugArray } = await params;
  const slug = slugArray?.join("/") || "index";
  const page = await readMarkdownPage(slug);
  if (!page) return notFound();

  return (
    <article className="prose prose-invert max-w-none">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </article>
  );
}
