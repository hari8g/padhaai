import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content", "pages");

export type RenderedPage = { title: string; html: string; data: any };

export async function readMarkdownPage(slug: string): Promise<RenderedPage | null> {
  const p = path.join(CONTENT_DIR, `${slug}.md`);
  try {
    const raw = await fs.readFile(p, "utf-8");
    const { data, content } = matter(raw);
    const processed = await remark().use(html).process(content);
    return {
      title: (data?.title as string) ?? slug,
      html: processed.toString(),
      data
    };
  } catch {
    return null;
  }
}
