import { notFound } from "next/navigation";
import programs from "../../../../content/programs.json";
import { readMarkdownPage } from "@/lib/content";

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = programs.find(x => x.slug === slug);
  if (!p) return notFound();
  const page = await readMarkdownPage(`programs/${p.slug}`);
  if (!page) return notFound();

  return (
    <article className="prose prose-invert max-w-none">
      <h1>{p.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </article>
  );
}
