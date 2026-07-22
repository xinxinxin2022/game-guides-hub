import { getTranslations } from 'next-intl/server';
import { getAllGuides } from '@/lib/guides';
import { GuideCard } from '@/components/ui/GuideCard';
import { generateSEO } from '@/components/seo/SEO';
import { AdSlot } from '@/components/ads/AdSlot';

export async function generateMetadata() {
  const t = await getTranslations('home.categories');

  return generateSEO({
    title: `Palworld ${t('server')} Guide — Docker Server Setup & Multiplayer`,
    description: 'Complete Palworld server setup guide: Docker deployment, cloud server configuration, multiplayer hosting, and troubleshooting.',
    url: '/server-setup',
  });
}

export default async function ServerSetupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('home.categories');

  const guides = getAllGuides(locale).filter(
    g => g.category === 'server'
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white">
          {t('server')} Setup Guides
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Everything you need to set up and run your own Palworld multiplayer server — from Docker deployment to performance tuning.
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
          <p className="text-xl">No server setup guides available yet.</p>
          <p className="mt-2">Check back soon for more content!</p>
        </div>
      )}

      <AdSlot size="rectangle" className="mt-12" />
    </div>
  );
}
