# 🎮 PalworldGuides

> The ultimate Palworld strategy guide — breeding combos, server setup, boss locations & more.

A commercial-grade, SEO-optimized Palworld game guide website built with Next.js, Three.js, and Tailwind CSS. Designed for the overseas (English-first) market with full i18n support and Google Ads integration.

## 🚀 Features

- **🌐 i18n Support** — Seamless English/Chinese (zh) switching
- **🎨 Dark Gaming Theme** — Modern, high-contrast UI with Tailwind CSS
- **🧊 3D Hero Scene** — Interactive Three.js floating island & Palworld egg
- **📈 SEO Optimized** — Schema.org structured data, auto-sitemap, meta tags
- **💰 Ads Ready** — Strategic ad slots (leaderboard, in-article, sidebar)
- **📱 Responsive** — Perfect on mobile, tablet, and desktop
- **⚡ Fast** — Next.js App Router with SSG/SSR hybrid rendering
- **📝 15+ Guides** — Long-tail keyword-targeted articles with FAQ sections
- **🖼️ OG Images** — Social sharing optimized
- **🔗 GitHub Pages / Vercel Ready** — Deploy anywhere

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| 3D | @react-three/fiber + @react-three/drei |
| i18n | next-intl |
| Content | MDX (gray-matter) |
| Deployment | Vercel / GitHub Pages |

## 📦 Installation

```bash
# Navigate to project
cd palworld-guides

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
palworld-guides/
├── app/
│   ├── [locale]/           # i18n dynamic routes
│   │   ├── layout.tsx      # Root layout with providers
│   │   ├── page.tsx        # Homepage
│   │   ├── guides/
│   │   │   ├── page.tsx    # Guide listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx # Individual guide
│   │   ├── HeroSection.tsx
│   │   └── FeaturedGuides.tsx
│   ├── layout.tsx          # Root redirect
│   ├── page.tsx            # Root redirect
│   └── sitemap.ts          # Sitemap generation
├── components/
│   ├── 3d/                 # Three.js components
│   │   ├── HeroScene.tsx
│   │   ├── PalworldEgg.tsx
│   │   └── FloatingIsland.tsx
│   ├── ads/
│   │   └── AdSlot.tsx      # Google Ads slots
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LocaleSwitcher.tsx
│   ├── seo/
│   │   └── SEO.tsx         # Metadata & Schema.org
│   └── ui/
│       └── GuideCard.tsx
├── content/
│   └── guides/
│       ├── en/             # English articles
│       └── zh/             # Chinese articles
├── i18n/
│   ├── config.ts
│   ├── request.ts
│   └── index.ts
├── lib/
│   ├── guides.ts           # Content loading
│   └── utils.ts            # Utility functions
├── messages/
│   ├── en.json             # English translations
│   └── zh.json             # Chinese translations
├── public/
│   ├── images/
│   └── robots.txt
├── styles/
│   └── globals.css
├── middleware.ts            # i18n routing
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── vercel.json
└── README.md
```

## 📝 Adding a New Guide

1. Create a new `.mdx` file in `content/guides/en/`
2. Add frontmatter:

```yaml
---
title: "Your Guide Title"
description: "SEO meta description"
category: "beginner"
tags: ["palworld", "guide"]
publishedAt: "2025-01-15"
updatedAt: "2025-01-15"
featured: false
coverImage: "/images/your-guide-cover.jpg"
---
```

3. Write your article using markdown
4. Restart the dev server

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo for automatic deployments.

### GitHub Pages (Static Export)

1. Uncomment `output: 'export'` in `next.config.js`
2. Run `npm run build`
3. Upload the `out/` folder to GitHub Pages

## 🔍 SEO Checklist

- [x] Unique title and meta description per page
- [x] Schema.org structured data (Article, FAQ, Breadcrumb)
- [x] Auto-generated sitemap.xml
- [x] robots.txt configured
- [x] Open Graph and Twitter Card tags
- [x] Canonical URLs
- [x] Hreflang tags for i18n
- [x] Semantic HTML (h1-h6, article, nav)
- [x] Image alt text
- [x] Internal linking between guides
- [x] FAQ sections for rich snippets

## 💰 Google Ads Integration

1. Sign up for Google AdSense
2. Get your publisher ID (`ca-pub-xxxxxxxx`)
3. Update `.env.local`:
   ```
   NEXT_PUBLIC_ADSENSE_CA_ID=ca-pub-your-id
   ```
4. Replace the placeholder in `components/ads/AdSlot.tsx` with actual ad code

## 📊 Content Strategy

The 15 guides target these long-tail keywords:

| # | Long-tail Keyword | Category |
|---|------------------|----------|
| 1 | Palworld best starter pals top 5 beginner guide | Beginner |
| 2 | Palworld best breeding combinations calculator guide | Breeding |
| 3 | How to get Pure Crystal Palworld farming guide | Tips |
| 4 | Palworld server Docker setup guide 2025 | Server |
| 5 | Palworld four sacred beasts capture locations guide | Combat |
| 6 | Palworld mid game best team composition guide | Combat |
| 7 | Palworld shiny pal vs alpha boss differences | Tips |
| 8 | Palworld Pal Sphere strategy guide | Tips |
| 9 | Palworld Windswept Islands medal merchant | Tips |
| 10 | Palworld base automation assembly line guide | Endgame |
| 11 | Palworld volcano area exploration heat resistance | Beginner |
| 12 | Palworld endgame best team composition guide | Endgame |
| 13 | Palworld server troubleshooting errors fix | Server |
| 14 | Palworld hidden bosses dungeons speedrun guide | Combat |
| 15 | Palworld 1.0 update Sakurajima DLC preview | Tips |

## 📄 License

MIT License — feel free to use for commercial purposes.

## ⚠️ Disclaimer

This site is not affiliated with Pocketpair, Inc. Palworld is a registered trademark of its respective owner.

---

Built with ❤️ for the Palworld community.
