import enM from '@/messages/en.json';
import zhM from '@/messages/zh.json';
const _m: Record<string, Record<string, unknown>> = { en: enM, zh: zhM };
function _t(l: string, k: string): string { const ks = k.split('.'); let c: unknown = _m[l] || _m.en; for (const x of ks) { if (c && typeof c === 'object') c = (c as Record<string, unknown>)[x]; else return k; } return typeof c === 'string' ? c : k; }
import { getAllGuides } from '@/lib/guides';
import { GuideCard } from '@/components/ui/GuideCard';
import { generateSEO } from '@/components/seo/SEO';
import { AdSlot } from '@/components/ads/AdSlot';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const breedingLabel = _t(locale, 'home.categories.breeding');

  return generateSEO({
    title: `Palworld ${breedingLabel} Guide — Breeding Combinations & Calculator`,
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
  const breedingLabel = _t(locale, 'home.categories.breeding');

  const guides = getAllGuides(locale).filter(g => g.category === 'breeding');

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white">{breedingLabel} Guides</h1>
        <p className="mt-4 text-lg text-zinc-400">
          Master Palworld breeding: combinations, IV inheritance, cake production, and perfect Pal breeding strategies.
        </p>
      </div>

      <AdSlot size="leaderboard" className="mb-8" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map(guide => (
          <GuideCard key={guide.slug} slug={guide.slug} title={guide.title}
            description={guide.description} category={guide.category}
            publishedAt={guide.publishedAt} readingTime={guide.readingTime}
            coverImage={guide.coverImage} />
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
