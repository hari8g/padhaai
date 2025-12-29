"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface ParticipationMode {
  id: string;
  title: string;
  description: string;
  details: string;
  action?: string;
  actionLink?: string;
}

const participationModes: ParticipationMode[] = [
  {
    id: "donate",
    title: "Donate",
    description: "Support Padhaai's mission with financial contributions",
    details: "Donate by cash, cheque, or electronic transfer. Your contributions help us provide educational assistance to children who need it most.",
    action: "Donate Now",
    actionLink: "/donate"
  },
  {
    id: "collect-books",
    title: "Help in Collection of Books",
    description: "Facilitate notebook collection drives in your community",
    details: "Start a notebook collection drive at home and spread the word among neighbours, friends, and others. Every notebook collected helps ensure no child goes without educational materials.",
    action: "Get Started",
    actionLink: "/contact"
  },
  {
    id: "identify-communities",
    title: "Help in Identification of Communities/Schools/Individuals",
    description: "Help us reach those who need support the most",
    details: "Identify schools, communities, or students deserving of help for school books and stationery. You can refer communities from anywhere – not just Bangalore. If you're aware of needs in your village or town, you can recommend them to Padhaai.",
    action: "Contact Us",
    actionLink: "/contact"
  }
];

export default function ParticipatePage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const createObserver = (ref: React.RefObject<HTMLDivElement | null>, id: string) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(id));
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: "-50px 0px -50px 0px",
        }
      );

      observer.observe(ref.current);
      observers.push(observer);
    };

    createObserver(headerRef, "header");
    createObserver(cardsRef, "cards");
    createObserver(footerRef, "footer");

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="mx-auto max-w-7xl w-full px-6 md:px-8 py-12 md:py-20">
      {/* Header Section */}
      <div
        ref={headerRef}
        className={`mb-12 md:mb-16 transition-all duration-700 ${
          visibleSections.has("header")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 relative inline-block">
          PARTICIPATE
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-red-600 mt-2 transition-all duration-700 ${
              visibleSections.has("header") ? "w-16" : "w-0"
            }`}
          ></span>
        </h1>
        <p className="text-neutral-600 leading-relaxed mt-6 max-w-2xl">
          Padhaai provides multiple ways to participate and engage, depending on your ability to contribute with time, money, or in-kind resources.
        </p>
      </div>

      {/* Participation Modes Grid */}
      <div
        ref={cardsRef}
        className={`grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${
          visibleSections.has("cards")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        {participationModes.map((mode, index) => (
          <div
            key={mode.id}
            className={`group border border-neutral-200 rounded-sm bg-white hover:border-neutral-900 transition-all duration-300 cursor-pointer ${
              expandedId === mode.id ? "border-neutral-900 shadow-xl scale-[1.02] ring-2 ring-neutral-900 ring-opacity-10" : "hover:shadow-md"
            } ${
              visibleSections.has("cards")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: visibleSections.has("cards") ? `${index * 100}ms` : "0ms",
            }}
            onClick={() => toggleExpand(mode.id)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-medium tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors pr-4">
                  {mode.title}
                </h2>
                <svg
                  className={`w-5 h-5 text-neutral-400 transition-transform duration-300 flex-shrink-0 ${
                    expandedId === mode.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <p className="text-neutral-600 text-sm mb-0 leading-relaxed">
                {mode.description}
              </p>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedId === mode.id ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pt-4 border-t border-neutral-200 mt-4">
                  <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                    {mode.details}
                  </p>
                  {mode.action && mode.actionLink && (
                    <Link
                      href={mode.actionLink}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-block px-5 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-sm transition-colors"
                    >
                      {mode.action} →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div
        ref={footerRef}
        className={`mt-12 md:mt-16 pt-10 border-t border-neutral-200 section-glow p-6 md:p-8 rounded-lg transition-all duration-700 ${
          visibleSections.has("footer")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-2xl">
          <h2 className="text-2xl font-medium tracking-tight mb-4">
            Your Role Matters
          </h2>
          <div className="space-y-3 text-neutral-700 leading-relaxed text-sm md:text-base">
            <p>
              Every contribution, whether financial, material, or through your time and network, makes a significant impact on a child's educational journey.
            </p>
            <p className="font-medium text-neutral-900">
              Together, we can make a lasting difference. Join us in educating all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

