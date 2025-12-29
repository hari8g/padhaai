import Link from "next/link";
import programs from "../../../content/programs.json";

export default function ProgramsIndex() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Programs</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {programs.map((p) => (
          <Link key={p.slug} href={`/programs/${p.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="mt-2 text-white/70">{p.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
