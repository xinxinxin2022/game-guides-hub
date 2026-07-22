import { generateSEO } from '@/components/seo/SEO';
import { HeroSection } from './HeroSection';
import { FeaturedGuides } from './FeaturedGuides';
import { AdSlot } from '@/components/ads/AdSlot';
import { getT } from '@/lib/i18n-simple';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getT(locale, 'common.seo');
  return generateSEO({
    title: t('defaultTitle'),
    description: t('defaultDescription'),
    url: '/',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tCat = getT(locale, 'home.categories');
  const tHome = getT(locale, 'home');

  return (
    <div className="flex flex-col">
      <HeroSection />
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <AdSlot size="leaderboard" />
      </section>
      <FeaturedGuides locale={locale} />
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <AdSlot size="rectangle" />
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">{tHome('browseByCategory') || 'Browse by Category'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { key: 'beginner', icon: '🌱' },
            { key: 'breeding', icon: '🧬' },
            { key: 'combat', icon: '⚔️' },
            { key: 'server', icon: '🖥️' },
            { key: 'endgame', icon: '👑' },
            { key: 'tips', icon: '💡' },
          ].map(cat => (
            <a key={cat.key} href={`/${locale}/guides?category=${cat.key}`}
              className="card flex flex-col items-center gap-3 p-6 text-center hover:scale-105 transition-transform">
              <span className="text-4xl">{cat.icon}</span>
              <span className="text-sm font-medium text-zinc-300">{tCat(cat.key)}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
