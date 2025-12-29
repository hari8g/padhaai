"use client";

import { useState } from "react";

interface SponsorsSectionProps {
  sponsors: string[];
}

export function SponsorsSection({ sponsors }: SponsorsSectionProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate sponsors for seamless loop
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="space-y-8 pt-8 border-t border-neutral-200 overflow-hidden section-glow p-6 md:p-8 rounded-lg">
      <div>
        <h2 className="text-2xl md:text-3xl font-medium mb-4 relative inline-block">
          Sponsors
          <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-red-600 mt-2"></span>
        </h2>
        <p className="text-neutral-600 leading-relaxed mt-4 max-w-2xl">
          We extend our heartfelt gratitude to all our sponsors who support our mission to provide educational opportunities for children in need.
        </p>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative py-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className={`flex gap-6 ${
              isPaused ? "animate-none" : "animate-scroll"
            }`}
            style={{
              animation: isPaused
                ? "none"
                : "scroll 15s linear infinite",
            }}
          >
            {duplicatedSponsors.map((sponsor, index) => (
              <SponsorCard key={`${sponsor}-${index}`} sponsor={sponsor} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicators */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <div className="h-1 w-1 rounded-full bg-neutral-300 animate-pulse" />
        <div className="h-1 w-1 rounded-full bg-neutral-300 animate-pulse" style={{ animationDelay: "0.2s" }} />
        <div className="h-1 w-1 rounded-full bg-neutral-300 animate-pulse" style={{ animationDelay: "0.4s" }} />
      </div>
    </section>
  );
}

function SponsorCard({ sponsor, index }: { sponsor: string; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-48 md:w-56 h-32 md:h-36 
          rounded-lg border-2
          bg-white/90 backdrop-blur-sm
          p-6 text-center
          transition-all duration-700 ease-out
          overflow-hidden
          ${isHovered 
            ? 'border-red-500 shadow-2xl scale-125 transform -translate-y-4 z-20' 
            : 'border-neutral-200 shadow-sm hover:border-neutral-300'
          }
        `}
      >
        {/* Animated background gradient layers */}
        <div
          className={`
            absolute inset-0 rounded-lg 
            bg-gradient-to-br from-red-500 via-red-400 to-orange-400
            opacity-0 transition-opacity duration-700
            ${isHovered ? 'opacity-100 animate-gradient-shift' : ''}
          `}
        />
        
        {/* Animated radial gradient overlay */}
        <div
          className={`
            absolute inset-0 rounded-lg 
            bg-radial-gradient from-white/30 via-transparent to-transparent
            opacity-0 transition-opacity duration-700
            ${isHovered ? 'opacity-100 animate-pulse' : ''}
          `}
          style={{
            background: isHovered 
              ? 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%)' 
              : 'transparent'
          }}
        />

        {/* Multiple floating particles on hover */}
        {isHovered && (
          <>
            {[...Array(8)].map((_, i) => {
              // Use index-based positioning to avoid hydration mismatches
              const positions = [
                [15, 20], [85, 30], [45, 60], [70, 75],
                [25, 50], [60, 25], [35, 80], [80, 55]
              ];
              const [top, left] = positions[i] || [50, 50];
              return (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-white rounded-full opacity-80"
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    animation: `float-particle ${2 + (i * 0.3)}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              );
            })}
            {/* Sparkle effects */}
            {[...Array(6)].map((_, i) => {
              // Use index-based positioning to avoid hydration mismatches
              const positions = [
                [30, 35], [65, 45], [40, 70], [75, 55], [50, 40], [55, 65]
              ];
              const [top, left] = positions[i] || [50, 50];
              return (
                <div
                  key={`sparkle-${i}`}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    animation: `sparkle ${1.5 + (i * 0.2)}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                    boxShadow: '0 0 10px rgba(255, 235, 59, 0.8)',
                  }}
                />
              );
            })}
          </>
        )}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          {/* Sponsor name with dramatic animation */}
          <p
            className={`
              font-bold text-lg md:text-xl
              transition-all duration-700 ease-out
              ${isHovered 
                ? 'text-white transform scale-125 drop-shadow-2xl animate-text-glow' 
                : 'text-neutral-900'
              }
            `}
            style={{
              textShadow: isHovered 
                ? '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)' 
                : 'none',
              filter: isHovered ? 'brightness(1.2)' : 'none',
            }}
          >
            <span
              className={`
                inline-block transition-all duration-700
                ${isHovered ? 'animate-letter-bounce' : ''}
              `}
              style={{
                animation: isHovered 
                  ? `letterWave ${sponsor.length * 0.1}s ease-in-out` 
                  : 'none',
              }}
            >
              {sponsor.split('').map((char, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    animationDelay: isHovered ? `${i * 0.05}s` : '0s',
                    animation: isHovered ? 'letterPop 0.6s ease-out forwards' : 'none',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </p>

          {/* Shine effect - multiple layers */}
          <div
            className={`
              absolute inset-0 rounded-lg
              bg-gradient-to-r from-transparent via-white/60 to-transparent
              -translate-x-full transition-transform duration-1000
              ${isHovered ? 'translate-x-full' : ''}
            `}
          />
          <div
            className={`
              absolute inset-0 rounded-lg
              bg-gradient-to-r from-transparent via-white/40 to-transparent
              -translate-x-full transition-transform duration-1500
              ${isHovered ? 'translate-x-full' : ''}
            `}
            style={{ animationDelay: '0.3s' }}
          />

          {/* Pulsing glow rings */}
          {isHovered && (
            <>
              <div className="absolute inset-0 rounded-lg border-2 border-white/50 animate-ping" />
              <div className="absolute inset-0 rounded-lg border border-white/30 animate-ping" style={{ animationDelay: '0.5s' }} />
            </>
          )}
        </div>

        {/* Outer glow effect */}
        {isHovered && (
          <div 
            className="absolute -inset-4 rounded-lg bg-red-500/30 blur-2xl -z-10 animate-pulse"
            style={{
              animation: 'glow-pulse 1.5s ease-in-out infinite',
            }}
          />
        )}

        {/* Ripple effect on hover */}
        {isHovered && (
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <div 
              className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-white/40 animate-ripple"
              style={{
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
