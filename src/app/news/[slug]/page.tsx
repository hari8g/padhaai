import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import initiatives from "../../../../content/initiatives.json";

export default async function InitiativePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const initiative = initiatives.find((i) => i.slug === slug);
  
  if (!initiative) return notFound();

  return (
    <div className="mx-auto max-w-4xl w-full px-6 md:px-8 py-12 md:py-20">
      <Link 
        href="/"
        className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors mb-8"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>

      <article className="space-y-8">
        <div className="space-y-4">
          <div className="text-sm text-neutral-500">{initiative.date}</div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
            {initiative.title}
          </h1>
        </div>

        {(initiative as any).image && (
          <div className="relative w-full h-80 md:h-[32rem] overflow-hidden rounded-sm">
            <Image
              src={(initiative as any).image}
              alt={initiative.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
        )}

        <div className="prose prose-neutral max-w-none">
          <div className="text-neutral-700 leading-relaxed whitespace-pre-line">
            {initiative.content.split('\n\n').map((paragraph, index) => {
              // Check if paragraph is a heading
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-medium tracking-tight mt-8 mb-4 text-neutral-900">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              } else if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-medium tracking-tight mt-6 mb-3 text-neutral-900">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              } else if (paragraph.startsWith('- ') || paragraph.startsWith('a) ') || paragraph.startsWith('b) ') || paragraph.startsWith('c) ')) {
                // Handle list items
                const items = paragraph.split('\n').filter(item => item.trim());
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 my-4 ml-4">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-neutral-700">
                        {item.replace(/^[-abc]\)\s*/, '')}
                      </li>
                    ))}
                  </ul>
                );
              } else {
                return (
                  <p key={index} className="mb-4 text-neutral-700 leading-relaxed">
                    {paragraph}
                  </p>
                );
              }
            })}
          </div>
        </div>
      </article>
    </div>
  );
}

