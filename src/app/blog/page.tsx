import Link from "next/link";
import Image from "next/image";
import blogPosts from "../../../content/blog.json";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl w-full px-6 md:px-8 py-12 md:py-20">
      <div className="mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 relative inline-block">
          Blog
          <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-red-600 mt-2"></span>
        </h1>
      </div>

      <div className="space-y-8 md:space-y-12">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <div className="grid md:grid-cols-3 gap-6 pb-8 border-b border-neutral-200 group-hover:border-neutral-900 transition-colors">
              <div className="relative w-full h-48 md:h-full md:min-h-[200px] overflow-hidden rounded-sm">
                <Image
                  src={(post as any).image || "/legacy/donation1.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover program-image transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="md:col-span-2 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-sm text-neutral-500">{post.date}</div>
                  <h2 className="text-2xl font-medium group-hover:text-neutral-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
                <div className="flex items-center mt-4 text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                  Read More
                  <svg 
                    className="w-4 h-4 ml-2"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

