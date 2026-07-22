import { getTranslations } from 'next-intl/server';
import { getAllGuides } from '@/lib/guides';
import { GuideCard } from '@/components/ui/GuideCard';
import { generateSEO } from '@/components/seo/SEO';
import { AdSlot } from '@/components/ads/AdSlot';

export async function generateMetadata() {
  const t = await getTranslations('home.categories');

  return generateSEO({
    title: `Palworld ${t('breeding')} Guide — Breeding Combinations & Calculator`,
    description: 'Complete Palworld breeding guide: breeding combinations, cake recipes, IV inheritance, and how to breed perfect 4-golden Pals.',
    url: '/breeding',
  });
}

export default async function BreedingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('home.categories');

  const guides = getAllGuides(locale).filter(
    g => g.category === 'breeding'
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white">
          {t('breeding')} Guides
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Master Palworld breeding: combinations, IV inheritance, cake production, and perfect Pal breeding strategies.
        </p>
      </div>

      <AdSlot size="leaderboard" className="mb-8" />

      {/* Guides Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map(guide => (
          <GuideCard
            key={guide.slug}
            slug={guide.slug}
            title={guide.title}
            description={guide.description}
            category={guide.category}
            publishedAt={guide.publishedAt}
            readingTime={guide.readingTime}
            coverImage={guide.coverImage}
          />
        ))}
      </div>

      {guides.length === 0 && (
        <div className="py-20 text-center text-zinc-500">
          <p className="text-xl">No breeding guides available yet.</p>
          <p className="mt-2">Check back soon for more content!</p>
        </div>
      )}

      <AdSlot size="rectangle" className="mt-12" />
    </div>
  );
}
