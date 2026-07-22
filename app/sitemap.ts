import { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/guides';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://palworldguides.com';

  const staticRoutes = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/guides', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/breeding', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/server-setup', priority: 0.8, changeFrequency: 'weekly' as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Add locale-prefixed static routes
  for (const locale of routing.locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map(l => [l, `${baseUrl}/${l}${route.path}`])
          ),
        },
      });
    }
  }

  // Add all guide pages
  for (const locale of routing.locales) {
    try {
      const guides = getAllGuides(locale);
      for (const guide of guides) {
        entries.push({
          url: `${baseUrl}/${locale}/guides/${guide.slug}`,
          lastModified: new Date(guide.updatedAt || guide.publishedAt),
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              routing.locales.map(l => [l, `${baseUrl}/${l}/guides/${guide.slug}`])
            ),
          },
        });
      }
    } catch {
      // Skip if content directory doesn't exist for this locale
    }
  }

  return entries;
}
