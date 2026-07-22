import { notFound } from 'next/navigation';
import { getGuideBySlug, getAllGuides, getRelatedGuides } from '@/lib/guides';
import { generateSEO, generateArticleSchema, generateBreadcrumbSchema } from '@/components/seo/SEO';
import { GuideCard } from '@/components/ui/GuideCard';
import { AdSlot, InArticleAd } from '@/components/ads/AdSlot';
import { formatDate } from '@/lib/utils';
import { getT } from '@/lib/i18n-simple';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

function renderMarkdown(md: string): string {
  return marked.parse(md) as string;
}

export async function generateStaticParams() {
  const guides = getAllGuides('en');
  return guides.map(guide => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const guide = getGuideBySlug(slug, locale);
  if (!guide) return {};

  return generateSEO({
    title: guide.title,
    description: guide.description,
    url: `/guides/${slug}`,
    type: 'article',
    image: guide.coverImage,
    publishedTime: guide.publishedAt,
    modifiedTime: guide.updatedAt,
    tags: guide.tags,
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const guide = getGuideBySlug(slug, locale);

  if (!guide) notFound();

  const relatedGuides = getRelatedGuides(slug, locale);
  const t = getT(locale, 'guides');
  const tNav = getT(locale, 'common.nav');

  const articleSchema = generateArticleSchema(
    guide.title, guide.description, `/guides/${slug}`,
    guide.coverImage || '', guide.publishedAt, guide.updatedAt
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: guide.title, url: `/guides/${slug}` },
  ]);

  const contentSections = guide.content.split(/\n## /);
  const intro = contentSections[0];
  const sections = contentSections.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="mb-8 text-sm text-zinc-400">
        <a href={`/${locale}`} className="hover:text-primary-400">{tNav('home')}</a>
        <span className="mx-2">/</span>
        <a href={`/${locale}/guides`} className="hover:text-primary-400">{tNav('guides')}</a>
        <span className="mx-2">/</span>
        <span className="text-zinc-200">{guide.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <article className="prose-custom max-w-none">
          {guide.coverImage && (
            <div className="mb-8 overflow-hidden rounded-xl border border-zinc-800">
              <img src={guide.coverImage} alt={guide.title} className="w-full" />
            </div>
          )}

          <header className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="badge-category">{guide.category}</span>
              {guide.tags.slice(0, 3).map(tag => (
                <span key={tag} className="badge bg-zinc-800 text-zinc-400">{tag}</span>
              ))}
            </div>
            <h1 className="text-4xl font-bold text-white">{guide.title}</h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-zinc-400">
              <time dateTime={guide.publishedAt}>{formatDate(guide.publishedAt, locale)}</time>
              <span>•</span>
              <span>{guide.readingTime} {t('readTime')}</span>
            </div>
          </header>

          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(intro) }} />

          <div className="my-8 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4">{t('tableOfContents')}</h2>
            <ul className="space-y-2">
              {sections.map((section, idx) => {
                const title = section.split('\n')[0];
                const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                return (
                  <li key={idx}>
                    <a href={`#${id}`} className="text-primary-400 hover:text-primary-300">{title}</a>
                  </li>
                );
              })}
            </ul>
          </div>

          {sections.map((section, idx) => {
            const title = section.split('\n')[0];
            const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            const content = section.split('\n').slice(1).join('\n');

            return (
              <div key={idx}>
                <h2 id={id} className="text-2xl font-bold text-white mt-12 mb-4 border-b border-zinc-800 pb-2">{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
                {(idx === 1 || idx === 3) && <InArticleAd />}
              </div>
            );
          })}
        </article>

        <aside className="hidden lg:block">
          <AdSlot size="skyscraper" />
        </aside>
      </div>

      {relatedGuides.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8">{t('relatedGuides')}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedGuides.map(related => (
              <GuideCard key={related.slug} slug={related.slug} title={related.title}
                description={related.description} category={related.category}
                publishedAt={related.publishedAt} readingTime={related.readingTime}
                coverImage={related.coverImage} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
