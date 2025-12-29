import Link from "next/link";
import Image from "next/image";
import site from "../../content/site.json";
import programs from "../../content/programs.json";
import initiatives from "../../content/initiatives.json";
import sponsors from "../../content/sponsors.json";
import { HeroCarousel } from "@/components/HeroCarousel";
import { SponsorsSection } from "@/components/SponsorsSection";

const programImages: Record<string, string> = {
  "stationery-uniforms": "/images/images-3.jpeg",
  "libraries": "/images/26SMlibrary6.jpeg",
  "notebook-donation": "/images/7C3A6735-1-copy.jpg",
  "scholarships": "/images/NGOs-in-Disaster-Management-in-India-1-1.jpg",
};

export default function HomePage() {
  return (
    <div>
      {/* Hero Carousel */}
      {site.hero.slides && site.hero.slides.length > 0 && (
        <HeroCarousel slides={site.hero.slides} />
      )}

      <div className="mx-auto max-w-7xl w-full px-6 md:px-8 space-y-24 md:space-y-32 py-12 md:py-20">

      {/* Programs Grid */}
      <section className="space-y-12 section-glow p-6 md:p-8 rounded-lg">
        <div className="animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-medium mb-6 relative inline-block">
            Our Programs
            <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-red-600 mt-2 transition-all duration-500"></span>
          </h2>
        </div>
        <div className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {programs.map((p, index) => (
            <div 
              key={p.slug} 
              className="space-y-5 card-elegant group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div>
                <h3 className="text-lg md:text-xl font-medium tracking-tight mb-4 relative inline-block uppercase">
                  {p.title}
                  <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-600 mt-1 transition-all duration-500 group-hover:w-full"></span>
                </h3>
              </div>
              <div className="relative w-full aspect-square overflow-hidden rounded-sm group/card scale-on-hover">
                <Image
                  src={programImages[p.slug] || "/images/images-3.jpeg"}
                  alt={p.title}
                  fill
                  className="object-cover program-image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-neutral-900">
                {p.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Initiatives */}
      <section className="space-y-10 section-glow p-6 md:p-8 rounded-lg">
        <div className="flex items-end justify-between border-b border-neutral-200 pb-3 animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-medium">Recent Initiatives</h2>
          <Link 
            className="elegant-link text-sm text-neutral-600 hover:text-neutral-900 font-medium inline-flex items-center gap-1 group" 
            href="/blog"
          >
            See all
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="space-y-8 md:space-y-10">
          {initiatives.slice(0, 4).map((initiative, index) => (
            <Link
              key={initiative.slug}
              href={`/news/${initiative.slug}`}
              className="block group card-elegant animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="grid md:grid-cols-3 gap-8 pb-8 border-b border-neutral-200 group-hover:border-neutral-400 transition-all duration-500">
                <div className="relative w-full h-48 md:h-full md:min-h-[200px] overflow-hidden rounded-sm scale-on-hover">
                  <Image
                    src={(initiative as any).image || "/legacy/donation1.jpg"}
                    alt={initiative.title}
                    fill
                    className="object-cover program-image"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-medium group-hover:text-neutral-600 transition-colors duration-300">
                      {initiative.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
                      {initiative.summary}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    {initiative.date && (
                      <div className="text-sm text-neutral-500 font-medium">{initiative.date}</div>
                    )}
                    <svg 
                      className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-all duration-300 group-hover:translate-x-1"
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
      </section>

      {/* Sponsors Section */}
      <SponsorsSection sponsors={sponsors} />
      </div>
    </div>
  );
}
