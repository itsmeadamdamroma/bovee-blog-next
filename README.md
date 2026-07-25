# Bovée & Thill Blog — Next.js + Framer Motion

Rebuilt version of blog.businesscommunicationnetwork.com with modern stack.

## Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Vercel
- **Content:** 23 legitimate posts (migrated from WordPress REST API)

## Local Development
```bash
npm install
npm run dev
# http://localhost:3000
```

## Deploy to Vercel
```bash
npm install -g vercel
vercel
# Follow prompts — Vercel assigns a free *.vercel.app domain
```

## Structure
```
app/
  page.tsx              → Homepage (Hero + Featured + Categories + CTA)
  blog/page.tsx         → Blog listing
  blog/[slug]/page.tsx  → Individual post
  about/page.tsx        → Author bios
  tools/page.tsx        → 48+ AI tools directory
  textbooks/page.tsx    → Pearson textbooks
  category/[slug]/      → Category filter
components/
  layout/Header.tsx     → Sticky header with glass morphism
  layout/Footer.tsx     → Footer with social links
  ui/Hero.tsx           → Animated hero with gradient
  ui/animations.tsx    → Reusable Framer Motion components
  blog/PostCard.tsx     → Post card with hover effects
lib/
  posts.ts              → Post queries
  posts-data.ts         → 23 posts (auto-generated from WordPress API)
  utils.ts              → Utilities
```

## What's Better
- ⚡ **Performance:** Next.js SSG/ISR, zero WordPress bloat
- 🎨 **Animations:** Framer Motion throughout — fade-up, stagger, scale, hover
- 📱 **Responsive:** Mobile-first, glass morphism, gold accent system
- 🔍 **AEO:** Built-in JSON-LD schema, semantic HTML, llms.txt ready
- 🧹 **Clean:** No spam, no BuddyBoss bloat, no AIOSEO conflicts
- 🚀 **Deploy:** One command to Vercel with free domain

## Colors
- Navy: `#102a43` (primary)
- Gold: `#fbbf24` (accent)
- Teal: `#0d9488` (links)
- Background: `#fafafa`

## Data Source
Posts migrated from `blog.businesscommunicationnetwork.com/wp-json/wp/v2/posts` via WordPress REST API on 25 July 2026. Spam posts filtered out (7 removed).