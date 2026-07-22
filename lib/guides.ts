import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  featured: boolean;
  content: string;
  coverImage?: string;
}

const guidesDirectory = path.join(process.cwd(), 'content/guides');

export function getGuideBySlug(slug: string, locale: string = 'en'): Guide | null {
  const filePath = path.join(guidesDirectory, locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    // Fallback to English
    const enFilePath = path.join(guidesDirectory, 'en', `${slug}.mdx`);
    if (!fs.existsSync(enFilePath)) return null;
    return parseGuide(fs.readFileSync(enFilePath, 'utf-8'), slug);
  }

  return parseGuide(fs.readFileSync(filePath, 'utf-8'), slug);
}

function parseGuide(fileContent: string, slug: string): Guide {
  const { data, content } = matter(fileContent);
  const words = content.split(/\s+/).length;

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    category: data.category || 'general',
    tags: data.tags || [],
    publishedAt: data.publishedAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
    readingTime: Math.ceil(words / 200),
    featured: data.featured || false,
    content,
    coverImage: data.coverImage || `/images/${slug}-cover.jpg`,
  };
}

export function getAllGuides(locale: string = 'en'): Guide[] {
  const localePath = path.join(guidesDirectory, locale);
  const enPath = path.join(guidesDirectory, 'en');

  // Use locale dir only if it exists AND has MDX files, otherwise fall back to English
  const hasLocaleContent = fs.existsSync(localePath) &&
    fs.readdirSync(localePath).some(f => f.endsWith('.mdx'));
  const primaryPath = hasLocaleContent ? localePath : enPath;

  if (!fs.existsSync(primaryPath)) return [];

  const files = fs.readdirSync(primaryPath).filter(f => f.endsWith('.mdx'));

  return files
    .map(filename => {
      const slug = filename.replace('.mdx', '');
      return getGuideBySlug(slug, locale)!;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getGuidesByCategory(category: string, locale: string = 'en'): Guide[] {
  return getAllGuides(locale).filter(g => g.category === category);
}

export function getFeaturedGuides(locale: string = 'en'): Guide[] {
  return getAllGuides(locale).filter(g => g.featured);
}

export function getAllCategories(locale: string = 'en'): string[] {
  const guides = getAllGuides(locale);
  return [...new Set(guides.map(g => g.category))];
}

export function getRelatedGuides(currentSlug: string, locale: string = 'en', limit: number = 3): Guide[] {
  const current = getGuideBySlug(currentSlug, locale);
  if (!current) return [];

  return getAllGuides(locale)
    .filter(g => g.slug !== currentSlug && g.category === current.category)
    .slice(0, limit);
}
