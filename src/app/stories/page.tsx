import Link from "next/link";
import stories from "../../../content/stories.json";

export default function StoriesIndex() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Our Stories</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {stories.map((s) => (
          <Link key={s.slug} href={`/stories/${s.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10">
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <p className="mt-2 text-white/70">{s.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
