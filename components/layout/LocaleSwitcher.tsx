'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, Locale } from '@/i18n/config';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-primary-500/50 hover:text-white">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {localeNames[locale as Locale]}
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className="absolute right-0 top-full hidden group-hover:block z-50">
        <div className="rounded-b-lg border border-t-0 border-zinc-700 bg-dark-50 shadow-xl py-1 min-w-[120px]">
          {locales.map(l => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                l === locale ? 'bg-primary-500/10 text-primary-400' : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
