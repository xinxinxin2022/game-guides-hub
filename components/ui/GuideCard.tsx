import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { formatDate, getReadingTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface GuideCardProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  coverImage?: string;
  featured?: boolean;
  className?: string;
}

export function GuideCard({
  slug,
  title,
  description,
  category,
  publishedAt,
  readingTime,
  coverImage,
  featured = false,
  className,
}: GuideCardProps) {
  const locale = useLocale();
  const t = useTranslations('home.categories');
  const tGuides = useTranslations('guides');

  const categoryLabels: Record<string, string> = {
    beginner: t('beginner'),
    breeding: t('breeding'),
    combat: t('combat'),
    server: t('server'),
    endgame: t('endgame'),
    tips: t('tips'),
  };

  return (
    <Link
      href={`/${locale}/guides/${slug}`}
      className={cn(
        'card card-glow group flex flex-col overflow-hidden',
        featured && 'md:flex-row md:items-center gap-6',
        className
      )}
    >
      {/* Cover Image */}
      <div className={cn(
        'relative overflow-hidden rounded-lg bg-zinc-800',
        featured ? 'h-48 md:h-64 md:w-1/3 flex-shrink-0' : 'h-48'
      )}>
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl font-bold text-gradient">P</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-50/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="badge-category">
              {categoryLabels[category] || category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-primary-400 line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
          <span>{formatDate(publishedAt, locale)}</span>
          <span>{readingTime} {tGuides('readTime')}</span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Featured Guide Card (larger, horizontal layout)
 */
export function FeaturedGuideCard(props: GuideCardProps) {
  return <GuideCard {...props} featured />;
}
