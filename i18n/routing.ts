export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const routing = {
  locales: ['en', 'zh'] as const,
  defaultLocale: 'en' as const,
};
