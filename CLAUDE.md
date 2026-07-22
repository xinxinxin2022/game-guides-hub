# PalworldGuides — Project Guide for AI Assistants

## Project Overview
Commercial-grade Palworld game guide website targeting the overseas (English-first) market.
Built for Google Ads monetization with extreme focus on SEO, performance, and UX.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4 with dark gaming theme
- **3D:** @react-three/fiber + @react-three/drei (lazy loaded)
- **i18n:** next-intl (en/zh)
- **Content:** MDX files in `content/guides/{locale}/`
- **Deployment:** Vercel primary, GitHub Pages fallback

## Key Architecture Decisions
1. **i18n via URL prefix** — `/en/guides/...` and `/zh/guides/...`
2. **Content as MDX** — Frontmatter YAML + markdown body
3. **Dynamic 3D** — Three.js imported via `next/dynamic` with `ssr: false`
4. **Ad slots** — Strategic placement: hero top, between sections, sidebar
5. **SEO** — Schema.org JSON-LD, auto-sitemap, meta tags per page

## Directory Conventions
- `app/[locale]/` — All route pages (i18n-prefixed)
- `components/3d/` — Three.js 3D scene components
- `components/ads/` — Google Ad slot components
- `components/seo/` — Metadata and structured data helpers
- `content/guides/{locale}/` — MDX article files
- `lib/` — Utilities (utils.ts, guides.ts)
- `messages/` — i18n JSON translation files

## Adding a New Guide
1. Create `.mdx` file in `content/guides/en/`
2. Include required frontmatter (title, description, category, tags, dates, featured)
3. Use markdown H2 (##) for sections
4. Include FAQ section at end
5. Restart dev server

## SEO Requirements
- Every page needs unique title + description
- Schema.org: Article, FAQ, BreadcrumbList
- All images need alt text
- Long-tail keyword in title and first paragraph
- Internal links between related guides
- Reading time shown on every guide

## Ad Placement Rules
- Never interrupt first paragraph
- Max 1 ad per 500 words
- Sidebar ads on desktop only
- Mobile: in-article only (no sidebar)
- All ads use `.ad-slot` class with min-height

## Performance Rules
- Three.js must be dynamically imported (no SSR)
- Images: WebP/AVIF with fallbacks
- Fonts: preconnect to Google Fonts
- No blocking scripts in head
- Target: LCP < 2.5s, CLS < 0.1

## Deployment
- Vercel: auto-deploy from main branch
- GitHub Pages: static export via `output: 'export'`
- Environment variables in `.env.local`
