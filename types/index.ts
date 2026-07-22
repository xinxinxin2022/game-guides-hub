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

export interface GuideFrontmatter {
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  coverImage?: string;
}

export interface Category {
  key: string;
  label: string;
  icon: string;
}

export interface AdConfig {
  client: string;
  slot: string;
  format: string;
}
