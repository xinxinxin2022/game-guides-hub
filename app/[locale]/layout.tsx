import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { I18nClientProvider } from './I18nClientProvider';
import '@/styles/globals.css';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return <LayoutContent params={params}>{children}</LayoutContent>;
}

async function LayoutContent({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="google-adsense-account" content="ca-pub-1812733940760212" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1812733940760212" crossOrigin="anonymous"></script>
      </head>
      <body className="min-h-screen bg-dark-50 text-zinc-100 antialiased">
        <div className="flex min-h-screen flex-col">
          <Header locale={locale} />
          <main className="flex-1">
            <I18nClientProvider locale={locale}>
              {children}
            </I18nClientProvider>
          </main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}
