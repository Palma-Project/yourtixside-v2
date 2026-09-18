/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Banner } from '../store/AppStore';

const AUTOPLAY_MS = 15000;

interface BannerCarouselProps {
  banners: Banner[];
  onNavigate?: (link: string) => void;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners, onNavigate }) => {
  const sorted = [...banners].sort((a, b) => a.order - b.order);
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (sorted.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % sorted.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sorted.length]);

  if (sorted.length === 0) return null;
  const current = sorted[index % sorted.length];

  const handleClick = () => {
    if (!current.link) return;
    if (current.link.startsWith('http')) {
      window.open(current.link, '_blank', 'noreferrer');
    } else if (onNavigate) {
      onNavigate(current.link);
    }
  };

  const goTo = (i: number) => {
    setIndex(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIndex((prev) => (prev + 1) % sorted.length), AUTOPLAY_MS);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-4 sm:pt-6 sm:pb-5">
      <div
        className={`relative w-full h-[200px] sm:h-[260px] lg:h-[320px] rounded-2xl overflow-hidden bg-[#191c1e] group ${
          current.link ? 'cursor-pointer' : ''
        }`}
        onClick={handleClick}
      >
        {sorted.map((banner, i) => (
          <div
            key={banner.id}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
          >
            {banner.videoUrl ? (
              <video
                src={banner.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-7 sm:right-7">
              <h2 className="text-white text-[17px] sm:text-[24px] font-extrabold tracking-tight drop-shadow leading-tight max-w-xl">
                {banner.title}
              </h2>
              {banner.subtitle && (
                <p className="text-white/85 text-[12px] sm:text-[14px] mt-1 drop-shadow max-w-lg line-clamp-2">
                  {banner.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}

        {sorted.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goTo((index - 1 + sorted.length) % sorted.length);
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              aria-label="Sebelumnya"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goTo((index + 1) % sorted.length);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              aria-label="Berikutnya"
            >
              <ChevronRight size={16} />
            </button>

            <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
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
