/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 3D stacked-card banner carousel — the active banner sits in front,
 * with the next couple of banners fanned out behind it (like a deck of
 * cards), receding in scale/opacity/depth. Autoplays every 15s.
 */

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Banner } from '../store/AppStore';

const AUTOPLAY_MS = 15000;
const STACK_DEPTH = 3; // how many cards behind the active one are visible

interface BannerCarouselProps {
  banners: Banner[];
  onNavigate?: (link: string) => void;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners, onNavigate }) => {
  const sorted = [...banners].sort((a, b) => a.order - b.order);
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (sorted.length > 1) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % sorted.length);
      }, AUTOPLAY_MS);
    }
  };

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorted.length]);

  if (sorted.length === 0) return null;

  const goTo = (i: number) => {
    setIndex(((i % sorted.length) + sorted.length) % sorted.length);
    restartTimer();
  };

  const handleClick = (banner: Banner) => {
    if (!banner.link) return;
    if (banner.link.startsWith('http')) {
      window.open(banner.link, '_blank', 'noreferrer');
    } else if (onNavigate) {
      onNavigate(banner.link);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-4 sm:pt-6 sm:pb-5">
      <div
        className="relative w-full h-[220px] sm:h-[280px] lg:h-[340px]"
        style={{ perspective: '1400px' }}
      >
        {sorted.map((banner, i) => {
          // Circular distance from the active card, 0 = front, 1,2,... = behind
          let dist = i - index;
          if (dist < 0) dist += sorted.length;
          if (dist > STACK_DEPTH) return null;

          const isActive = dist === 0;
          const scale = 1 - dist * 0.06;
          const translateY = dist * -14;
          const translateZ = -dist * 90;
          const opacity = 1 - dist * 0.28;
          const rotate = dist === 0 ? 0 : (i % 2 === 0 ? 1 : -1) * dist * 1.5;

          return (
            <div
              key={banner.id}
              onClick={() => (isActive ? handleClick(banner) : goTo(i))}
              className={`absolute inset-0 rounded-2xl overflow-hidden bg-[#191c1e] transition-all duration-700 ease-out ${
                isActive && banner.link ? 'cursor-pointer' : dist > 0 ? 'cursor-pointer' : ''
              }`}
              style={{
                transform: `translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale}) rotate(${rotate}deg)`,
                opacity: Math.max(opacity, 0),
                zIndex: STACK_DEPTH - dist,
                transformStyle: 'preserve-3d',
                boxShadow: isActive ? '0 20px 45px -12px rgba(0,0,0,0.35)' : '0 10px 25px -8px rgba(0,0,0,0.25)',
                pointerEvents: dist > STACK_DEPTH ? 'none' : 'auto',
              }}
            >
              {banner.videoUrl ? (
                <video
                  src={banner.videoUrl}
                  autoPlay={isActive}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : banner.imageUrl ? (
                <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#dc2626] to-[#7f1d1d]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

              {isActive && (
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-7 sm:right-7 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h2 className="text-white text-[17px] sm:text-[24px] font-extrabold tracking-tight drop-shadow leading-tight max-w-xl">
                    {banner.title}
                  </h2>
                  {banner.subtitle && (
                    <p className="text-white/85 text-[12px] sm:text-[14px] mt-1 drop-shadow max-w-lg line-clamp-2">
                      {banner.subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {sorted.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goTo(index - 1);
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
              aria-label="Sebelumnya"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goTo(index + 1);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
              aria-label="Berikutnya"
            >
              <ChevronRight size={16} />
            </button>

            <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5">
              {sorted.map((b, i) => (
                <button
                  key={b.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(i);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
