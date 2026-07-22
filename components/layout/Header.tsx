'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localeNames, Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface HeaderProps {
  locale: string;
}

const navLabels: Record<string, Record<string, string>> = {
  en: { home: 'Home', guides: 'Guides', breeding: 'Breeding', serverSetup: 'Server Setup' },
  zh: { home: '首页', guides: '攻略', breeding: '配种', serverSetup: '服务器搭建' },
};

export function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const labels = navLabels[locale] || navLabels.en;

  const navItems = [
    { href: `/${locale}`, label: labels.home },
    { href: `/${locale}/guides`, label: labels.guides },
    { href: `/${locale}/breeding`, label: labels.breeding },
    { href: `/${locale}/server-setup`, label: labels.serverSetup },
  ];

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    window.location.href = segments.join('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-dark-50/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-[2px] rounded-md bg-dark-50 flex items-center justify-center">
              <span className="text-lg font-bold text-gradient">P</span>
            </div>
          </div>
          <span className="text-lg font-bold text-white hidden sm:block">
            Palworld<span className="text-primary-400">Guides</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className={cn('rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                pathname === item.href ? 'bg-primary-500/10 text-primary-400' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50')}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-primary-500/50 hover:text-white">
              {localeNames[locale as Locale]}
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 top-full hidden group-hover:block z-50">
              <div className="rounded-b-lg border border-t-0 border-zinc-700 bg-dark-50 shadow-xl py-1 min-w-[120px]">
                {(['en', 'zh'] as const).map(l => (
                  <button key={l} onClick={() => switchLocale(l)}
                    className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                      l === locale ? 'bg-primary-500/10 text-primary-400' : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }`}>
                    {localeNames[l]}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-lg p-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
            aria-label="Toggle menu">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-dark-50">
          <div className="px-4 py-3 space-y-1">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                className={cn('block rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  pathname === item.href ? 'bg-primary-500/10 text-primary-400' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50')}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
