import { generateSEO } from '@/components/seo/SEO';
import { HeroSection } from './HeroSection';
import { FeaturedGuides } from './FeaturedGuides';
import { AdSlot } from '@/components/ads/AdSlot';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const enMessages = require('@/messages/en.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const zhMessages = require('@/messages/zh.json');

const msgs: Record<string, Record<string, unknown>> = { en: enMessages, zh: zhMessages };

function t(locale: string, key: string): string {
  const keys = key.split('.');
  let cur: unknown = msgs[locale] || msgs.en;
  for (const k of keys) {
    if (cur && typeof cur === 'object') cur = (cur as Record<string, unknown>)[k];
    else return key;
  }
  return typeof cur === 'string' ? cur : key;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEO({
    title: t(locale, 'common.seo.defaultTitle'),
    description: t(locale, 'common.seo.defaultDescription'),
    url: '/',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tCat = (key: string) => t(locale, `home.categories.${key}`);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdSlot size="leaderboard" />
      </section>
      <FeaturedGuides locale={locale} />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdSlot size="rectangle" />
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">{t(locale, 'home.browseByCategory') || 'Browse by Category'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { key: 'beginner', icon: '' },
            { key: 'breeding', icon: '🧬' },
            { key: 'combat', icon: '⚔️' },
            { key: 'server', icon: '️' },
            { key: 'endgame', icon: '👑' },
            { key: 'tips', icon: '' },
          ].map(cat => (
            <a key={cat.key} href={`/${locale}/guides?category=${cat.key}`} className="card flex flex-col items-center gap-3 p-6 text-center hover:scale-105 transition-transform">
              <span className="text-4xl">{cat.icon}</span>
              <span className="text-sm font-medium text-zinc-300">{tCat(cat.key)}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
