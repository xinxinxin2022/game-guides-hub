'use client';

import { I18nProvider, loadMessages } from '@/lib/i18n';

export function I18nClientProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <I18nProvider locale={locale} messages={loadMessages(locale)}>
      {children}
    </I18nProvider>
  );
}
