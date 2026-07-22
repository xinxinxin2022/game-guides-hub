import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface GuideCardProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  coverImage?: string;
  locale?: string;
}

const categoryLabels: Record<string, Record<string, string>> = {
  en: { beginner: 'Beginner', breeding: 'Breeding', combat: 'Combat', server: 'Server', endgame: 'Endgame', tips: 'Tips' },
  zh: { beginner: '新手', breeding: '配种', combat: '战斗', server: '服务器', endgame: '后期', tips: '技巧' },
};

export function GuideCard({ slug, title, description, category, publishedAt, readingTime, coverImage, locale = 'en' }: GuideCardProps) {
  const labels = categoryLabels[locale] || categoryLabels.en;

  return (
    <Link href={`/${locale}/guides/${slug}`} className={cn('card card-glow group flex flex-col overflow-hidden')}>
      <div className="relative overflow-hidden rounded-lg bg-zinc-800 h-48">
        {coverImage ? (
          <img src={coverImage} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl font-bold text-gradient">P</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-50/80 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="badge-category">{labels[category] || category}</span>
          </div>
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-primary-400 line-clamp-2">{title}</h3>
          <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
          <span>{formatDate(publishedAt, locale)}</span>
          <span>{readingTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
