'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from '@/lib/i18n';
import { useLocale } from '@/lib/i18n';
import Link from 'next/link';

// Dynamic import for 3D scene (client-side only)
const HeroScene = dynamic(
  () => import('@/components/3d/HeroScene').then(mod => mod.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] w-full bg-gradient-to-b from-dark-50 to-dark-100 flex items-center justify-center">
        <div className="skeleton h-32 w-32 rounded-full" />
      </div>
    ),
  }
);

export function HeroSection() {
  const t = useTranslations('home.hero');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-50/60 via-transparent to-dark-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-50/80 via-transparent to-dark-50/80" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[600px] items-center justify-center px-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="mt-6 text-xl text-zinc-300 sm:text-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('subtitle')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link
              href={`/${locale}/guides`}
              className="btn-primary"
            >
              {t('cta')}
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-50 to-transparent" />
    </section>
  );
}
