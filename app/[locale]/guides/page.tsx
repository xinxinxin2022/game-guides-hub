import { getAllGuides, getAllCategories } from '@/lib/guides';
import { GuideCard } from '@/components/ui/GuideCard';
import { generateSEO } from '@/components/seo/SEO';
import { AdSlot } from '@/components/ads/AdSlot';
import { getT } from '@/lib/i18n-simple';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getT(locale, 'guides');
  return generateSEO({
    title: t('title'),
    description: t('description'),
    url: '/guides',
  });
}

export default async function GuidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getT(locale, 'guides');
  
  const guides = getAllGuides(locale);
  const categories = getAllCategories(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white">{t('title')}</h1>
        <p className="mt-4 text-lg text-zinc-400">{t('description')}</p>
      </div>
      <AdSlot size="leaderboard" className="mb-8" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map(g => (
          <GuideCard key={g.slug} slug={g.slug} title={g.title} description={g.description}
            category={g.category} publishedAt={g.publishedAt} readingTime={g.readingTime} coverImage={g.coverImage} locale={locale} />
        ))}
      </div>
      <AdSlot size="rectangle" className="mt-12" />
    </div>
  );
}
