"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import site from "../../content/site.json";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200/50">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-4 md:py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="/images/paadhai.png"
            alt={site.brand}
            width={180}
            height={60}
            className="h-12 md:h-14 w-auto"
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-600">
          {site.nav.map((n) => (
            <div key={n.href} className="relative group">
              <div className="flex items-center gap-1 section-glow px-3 py-2 rounded-lg">
                <Link 
                  href={n.href} 
                  className="hover:text-neutral-900 transition-colors relative inline-block z-10"
                >
                  {n.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neutral-900 group-hover:w-full transition-all duration-300"></span>
                </Link>
                {n.children && n.children.length > 0 && (
                  <svg 
                    className="w-4 h-4 text-neutral-600 group-hover:text-neutral-900 transition-colors z-10" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
              {n.children && n.children.length > 0 && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="bg-white border border-neutral-200 shadow-lg rounded-sm min-w-[180px] py-1">
                    {n.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/donate" 
            className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-sm transition-colors section-glow relative"
          >
            <span className="relative z-10">Donate</span>
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-900"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-neutral-200 bg-white">
          <div className="px-6 py-4 space-y-4">
            {site.nav.map((n) => (
              <div key={n.href}>
                <Link
                  href={n.href}
                  className="block text-neutral-600 hover:text-neutral-900 transition-colors py-2 font-medium section-glow px-3 py-2 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {n.label}
                </Link>
                {n.children && n.children.length > 0 && (
                  <div className="ml-4 mt-1 space-y-2">
                    {n.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block text-neutral-500 hover:text-neutral-900 transition-colors py-1 text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/donate"
              className="block px-4 py-2 text-sm font-medium text-center text-white bg-neutral-900 hover:bg-neutral-800 rounded-sm transition-colors mt-4 section-glow relative"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="relative z-10">Donate</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
