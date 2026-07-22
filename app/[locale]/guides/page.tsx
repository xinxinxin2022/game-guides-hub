import { getTranslations } from 'next-intl/server';
import { getAllGuides, getAllCategories } from '@/lib/guides';
import { GuideCard } from '@/components/ui/GuideCard';
import { generateSEO } from '@/components/seo/SEO';
import { AdSlot } from '@/components/ads/AdSlot';

export async function generateMetadata() {
  const t = await getTranslations('guides');

  return generateSEO({
    title: t('title'),
    description: t('description'),
    url: '/guides',
  });
}

export default async function GuidesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  const t = await getTranslations('guides');

  let guides = getAllGuides(locale);

  if (category) {
    guides = guides.filter(g => g.category === category);
  }

  const categories = getAllCategories(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white">{t('title')}</h1>
        <p className="mt-4 text-lg text-zinc-400">{t('description')}</p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <a
          href={`/${locale}/guides`}
          className={`badge ${!category ? 'bg-primary-500/20 text-primary-400' : 'bg-zinc-800 text-zinc-400'}`}
        >
          All
        </a>
        {categories.map(cat => (
          <a
            key={cat}
            href={`/${locale}/guides?category=${cat}`}
            className={`badge ${category === cat ? 'bg-primary-500/20 text-primary-400' : 'bg-zinc-800 text-zinc-400'}`}
          >
            {cat}
          </a>
        ))}
      </div>

      {/* Top Ad */}
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

      {/* Bottom Ad */}
      <AdSlot size="rectangle" className="mt-12" />
    </div>
  );
}
