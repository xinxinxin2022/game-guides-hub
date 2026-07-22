'use client';

import { useState } from 'react';
import { GuideCard } from '@/components/ui/GuideCard';
import { AdSlot } from '@/components/ads/AdSlot';
import type { Guide } from '@/lib/guides';

interface GuidesClientProps {
  locale: string;
  initialGuides: Guide[];
  categories: string[];
}

export function GuidesClient({ locale, initialGuides, categories }: GuidesClientProps) {
  const [category, setCategory] = useState<string | null>(null);

  const filteredGuides = category
    ? initialGuides.filter(g => g.category === category)
    : initialGuides;

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory(null)}
          className={`badge cursor-pointer ${!category ? 'bg-primary-500/20 text-primary-400' : 'bg-zinc-800 text-zinc-400'}`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`badge cursor-pointer ${category === cat ? 'bg-primary-500/20 text-primary-400' : 'bg-zinc-800 text-zinc-400'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <AdSlot size="leaderboard" className="mb-8" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGuides.map(guide => (
          <GuideCard
            key={guide.slug}
            slug={guide.slug}
            title={guide.title}
            description={guide.description}
            category={guide.category}
            publishedAt={guide.publishedAt}
            readingTime={guide.readingTime}
            coverImage={guide.coverImage}
            locale={locale}
          />
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="py-20 text-center text-zinc-500">
          <p className="text-xl">No guides found for this category.</p>
        </div>
      )}
    </>
  );
}
