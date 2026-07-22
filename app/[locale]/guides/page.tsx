import enM from '@/messages/en.json';
import zhM from '@/messages/zh.json';
const _m: Record<string, Record<string, unknown>> = { en: enM, zh: zhM };
function _t(l: string, k: string): string { const ks = k.split('.'); let c: unknown = _m[l] || _m.en; for (const x of ks) { if (c && typeof c === 'object') c = (c as Record<string, unknown>)[x]; else return k; } return typeof c === 'string' ? c : k; }
import { getAllGuides, getAllCategories } from '@/lib/guides';
import { GuideCard } from '@/components/ui/GuideCard';
import { generateSEO } from '@/components/seo/SEO';
import { AdSlot } from '@/components/ads/AdSlot';
import { GuidesClient } from './GuidesClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return generateSEO({
    title: _t(locale, 'guides.title'),
    description: _t(locale, 'guides.description'),
    url: '/guides',
  });
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const guides = getAllGuides(locale);
  const categories = getAllCategories(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white">{_t(locale, 'guides.title')}</h1>
        <p className="mt-4 text-lg text-zinc-400">{_t(locale, 'guides.description')}</p>
      </div>

      <GuidesClient locale={locale} initialGuides={guides} categories={categories} />

      <AdSlot size="rectangle" className="mt-12" />
    </div>
  );
}
