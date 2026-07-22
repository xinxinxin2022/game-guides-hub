import { getTranslations, getLocale } from 'next-intl/server';
import { generateSEO } from '@/components/seo/SEO';
import { HeroSection } from './HeroSection';
import { FeaturedGuides } from './FeaturedGuides';
import { AdSlot } from '@/components/ads/AdSlot';

export async function generateMetadata() {
  const t = await getTranslations('common.seo');

  return generateSEO({
    title: t('defaultTitle'),
    description: t('defaultDescription'),
    url: '/',
  });
}

export default async function HomePage() {
  const locale = await getLocale();
  const tCat = await getTranslations('home.categories');
  const tBrowse = await getTranslations('home');

  return (
    <div className="flex flex-col">
      {/* Hero Section with 3D Scene */}
      <HeroSection />

      {/* Top Ad Slot */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdSlot size="leaderboard" />
      </section>

      {/* Featured Guides */}
      <FeaturedGuides />

      {/* Middle Ad Slot */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdSlot size="rectangle" />
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">
          {tBrowse('browseByCategory') || 'Browse by Category'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { key: 'beginner', icon: '🌱' },
            { key: 'breeding', icon: '🧬' },
            { key: 'combat', icon: '⚔️' },
            { key: 'server', icon: '🖥️' },
            { key: 'endgame', icon: '👑' },
            { key: 'tips', icon: '💡' },
          ].map(cat => (
            <a
              key={cat.key}
              href={`/${locale}/guides?category=${cat.key}`}
              className="card flex flex-col items-center gap-3 p-6 text-center hover:scale-105 transition-transform"
            >
              <span className="text-4xl">{cat.icon}</span>
              <span className="text-sm font-medium text-zinc-300">{tCat(cat.key)}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
