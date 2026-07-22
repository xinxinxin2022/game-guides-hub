import { getAllGuides } from '@/lib/guides';
import { GuideCard } from '@/components/ui/GuideCard';
import Link from 'next/link';
import enMessages from '@/messages/en.json';
import zhMessages from '@/messages/zh.json';

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

interface FeaturedGuidesProps {
  locale: string;
}

export function FeaturedGuides({ locale }: FeaturedGuidesProps) {
  const allGuides = getAllGuides(locale);
  const featuredGuides = allGuides.filter(g => g.featured).slice(0, 6);
  const latestGuides = featuredGuides.length > 0 ? featuredGuides : allGuides.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">
            {t(locale, 'featuredTitle')}
          </h2>
          <p className="mt-2 text-zinc-400">
            {t(locale, 'featuredDescription')}
          </p>
        </div>
        <Link
          href={`/${locale}/guides`}
          className="btn-secondary text-sm"
        >
          {t(locale, 'viewAll')}
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {latestGuides.map(guide => (
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
    </section>
  );
}
