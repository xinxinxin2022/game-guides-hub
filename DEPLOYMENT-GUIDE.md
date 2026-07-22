# PalworldGuides — Deployment Guide

## Vercel Deployment (Recommended)

### Option 1: Git Integration (Easiest)

1. Push your code to GitHub:
   ```bash
   cd palworld-guides
   git init
   git add .
   git commit -m "Initial commit: PalworldGuides website"
   git remote add origin https://github.com/YOUR_USERNAME/palworld-guides.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign up/login

3. Click "New Project" → Import your GitHub repository

4. Configure:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_ADSENSE_CA_ID=ca-pub-xxxxxxxx
   ```

6. Click "Deploy" — Vercel will auto-deploy on every push

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to staging
vercel

# Deploy to production
vercel --prod
```

## Custom Domain Setup

1. In Vercel dashboard → Project Settings → Domains
2. Add your domain (e.g., `palworldguides.com`)
3. Follow DNS instructions:
   - Add A record: `76.76.21.21`
   - Add CNAME: `cname.vercel-dns.com`
4. Wait for DNS propagation (up to 48 hours)

## GitHub Pages Deployment (Static Export)

### Step 1: Enable Static Export

Edit `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
};
```

### Step 2: Build

```bash
npm run build
```

This generates the `out/` directory.

### Step 3: Deploy to GitHub Pages

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

2. Go to GitHub → Repository Settings → Pages
3. Source: "GitHub Actions"
4. Push to main branch — site will auto-deploy

## Post-Deployment Checklist

### SEO Verification

- [ ] Check `robots.txt` is accessible
- [ ] Verify `sitemap.xml` is generated
- [ ] Test Open Graph tags with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter Card with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console)
- [ ] Submit sitemap to [Bing Webmaster Tools](https://www.bing.com/webmasters)

### Performance Testing

- [ ] Test with [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Target scores: Mobile 90+, Desktop 95+
- [ ] Check Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Verify 3D scene loads asynchronously
- [ ] Check image optimization (WebP/AVIF)

### Google Ads Setup

1. Apply for Google AdSense at [google.com/adsense](https://www.google.com/adsense)
2. Get approved (usually 24-48 hours)
3. Add AdSense code to `app/layout.tsx`:

```tsx
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX"
  strategy="afterInteractive"
/>
```

4. Replace placeholder in `components/ads/AdSlot.tsx`:

```tsx
<ins
  className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-client="ca-pub-XXXXXXXX"
  data-ad-slot="YYYYYYYY"
  data-ad-format="auto"
  data-full-width-responsive="true"
/>
```

5. Test ads appear correctly

### Analytics Setup (Optional)

1. Set up Google Analytics at [analytics.google.com](https://analytics.google.com)
2. Add to `app/layout.tsx`:

```tsx
import Script from 'next/script';

<Script
  strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
/>
<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
    `,
  }}
/>
```

## Monitoring

### Uptime Monitoring
- [UptimeRobot](https://uptimerobot.com/) — Free monitoring
- [Better Uptime](https://betteruptime.com/) — Advanced monitoring

### Performance Monitoring
- [Google PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)
- [WebPageTest](https://www.webpagetest.org/)

### SEO Monitoring
- Google Search Console — Search performance
- Ahrefs / SEMrush — Keyword rankings

## Troubleshooting

### 3D Scene Not Loading

- Check browser console for WebGL errors
- Ensure Three.js imports are dynamic (`next/dynamic`)
- Test on different devices/browsers
- Fallback to static image if WebGL unsupported

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### i18n Routes Not Working

- Verify `middleware.ts` is in project root
- Check `i18n/config.ts` has correct locales
- Test with `/en` and `/zh` prefixes

### Images Not Loading

- Check `public/images/` directory
- Verify image paths in frontmatter
- For external images, add domain to `next.config.js`

## Support

For issues or questions:
- Open an issue on GitHub
- Check [Next.js docs](https://nextjs.org/docs)
- Check [Vercel docs](https://vercel.com/docs)

---

Good luck with your PalworldGuides launch! 🚀
