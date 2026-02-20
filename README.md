# CloudAI Enterprise

Production-ready Next.js 14 website for CloudAI Enterprise — an AI adoption and training consultancy.

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS** with custom dark theme
- **Framer Motion** for animations
- **Resend** for transactional emails
- **Supabase** for lead storage
- **MDX** for blog content

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `NOTIFICATION_EMAIL` | Email to receive contact form notifications |

### 3. Set Up Supabase

Run the migration SQL in your Supabase SQL editor:

```bash
# The migration file is at:
supabase/migrations/001_initial.sql
```

This creates two tables: `quiz_leads` and `contacts`.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx              — Root layout with nav, footer, JSON-LD
  page.tsx                — Homepage (all sections)
  contact/page.tsx        — Dedicated contact page
  blog/page.tsx           — Blog index
  blog/[slug]/page.tsx    — Individual blog posts
  api/
    contact/route.ts      — Contact form → Resend + Supabase
    quiz-lead/route.ts    — Quiz leads → Resend + Supabase
  sitemap.ts              — Auto-generated sitemap
  robots.ts               — Robots.txt

components/
  Nav.tsx                 — Fixed header with mobile menu
  Hero.tsx                — Hero section with staggered animation
  Ticker.tsx              — Scrolling stats marquee
  ProblemSection.tsx      — Pain points grid
  ServicesSection.tsx     — 3-tier pricing cards
  ProcessSection.tsx      — 4-step timeline
  ResultsSection.tsx      — Metrics + testimonials
  AboutSection.tsx        — Company info + credentials
  ContactSection.tsx      — Inline contact form
  QuizModal.tsx           — 4-question AI readiness quiz
  Footer.tsx              — Site footer
  AnimatedSection.tsx     — Scroll-triggered animation wrapper
  JsonLd.tsx              — Schema.org structured data

lib/
  supabase.ts             — Supabase admin client
  resend.ts               — Resend email client
  blog.ts                 — MDX blog post utilities
  quiz-scoring.ts         — Quiz scoring logic + level thresholds

content/blog/             — MDX blog posts
supabase/migrations/      — Database schema SQL
```

## Deployment to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local` to Vercel project settings
4. Deploy

Vercel will auto-detect Next.js and configure the build.

### Custom Domain

After deploying, add your domain (`cloudaienterprise.com`) in Vercel project settings under Domains.

## Blog

Blog posts are MDX files in `/content/blog/`. Each post needs frontmatter:

```mdx
---
title: "Post Title"
date: "2025-01-15"
tag: "AI Strategy"
excerpt: "Brief description for the card."
---

Post content here...
```

## Key Features

- **AI Readiness Quiz** — 4-question assessment with scoring, lead capture, animated results
- **Contact Form** — Saves to Supabase, sends notification + confirmation emails
- **Blog System** — MDX-powered with reading time, tags, and quiz CTAs
- **SEO** — Metadata, OpenGraph, JSON-LD schema, sitemap, robots.txt
- **Animations** — Framer Motion scroll reveals, staggered hero, quiz transitions
- **Dark Theme** — Full dark design with custom color system
- **Mobile Responsive** — Hamburger menu, single column below 900px
