Project Name:
KaarYab Afghanistan

Project Description:
KaarYab Afghanistan is a modern, trilingual opportunity-finder platform that helps
Afghan youth discover jobs, internships, scholarships, online courses, remote work,
and training programs — all in one place. Built with Next.js 15 (App Router) and
TypeScript.

> Demo Data — all opportunity listings in this project are for demonstration
> purposes only.

Problem It Solves:
Many young people in Afghanistan need better access to opportunities such as jobs,
internships, scholarships, online work, and training programs, but this information
is scattered across many different websites and social media pages. KaarYab solves
this by bringing everything into one clean, searchable, filterable platform where
people can browse, save, and submit opportunities.

Features:

- Full opportunity listings with title, organization, category, location, type,
  deadline, description, requirements, apply link, and tags
- Search by title, plus filters for category, location, remote/on-site type, and
  deadline range
- Dynamic opportunity details page (`/opportunities/[id]`)
- Save opportunities to a personal list, persisted with LocalStorage via Context API
- Add Opportunity form with full validation (React Hook Form + Zod)
- Full CRUD: create, read, edit, and delete opportunities (file-backed mock API)
- Dashboard with live stats (total, jobs, scholarships, internships, remote,
  expiring soon), a category breakdown chart, and a management table
- Fully responsive layout (mobile, tablet, desktop) with a mobile navigation menu
- Light and dark mode, with system-preference detection and no flash on load
- Complete English / Dari / Pashto translation, including automatic RTL layout
- Professional UI: navbar, footer, cards, buttons, forms, confirmation modals,
  badges (category, expiring soon, expired), empty states, loading skeletons,
  and error states with retry
- Framer Motion animations throughout, respecting `prefers-reduced-motion`
- Bonus features implemented: multi-language support, deadline countdown,
  Recharts dashboard chart, featured opportunities, expiring-soon badges

Technologies Used:

- Next.js 15 (App Router), React, TypeScript
- Tailwind CSS (custom design system, see `lib/ui.ts`)
- next-intl (English / Dari / Pashto)
- React Hook Form + Zod
- Framer Motion
- Recharts
- Next.js API Routes with a file-backed mock database (`lib/mockDb.ts`)

How to Run Locally:

```bash
npm install
npm run dev
```

Then open http://localhost:3000 — it redirects automatically to `/en` (default
locale). Dari and Pashto are available at `/fa` and `/ps`.

Note on the mock API: `lib/mockDb.ts` reads and writes `data/opportunities.json`
directly, so changes survive page reloads and dev-server restarts locally. This
does **not** work on serverless hosts like Vercel, where the filesystem is
read-only in production — a real database (e.g. Postgres, Supabase) is required
before deploying anywhere beyond local development or a persistent server.

Screenshots:

---

## Project structure

```
middleware.ts               Locale detection and routing (en/fa/ps)
i18n.ts                     next-intl request config

messages/                   Translation files — keys must match across all three
  en.json  fa.json  ps.json

app/
  [locale]/                 All user-facing pages, wrapped in the language layout
    page.tsx                  Home (hero, stats, categories, featured, how-it-works, CTA)
    opportunities/             Listing with search/filter
    opportunities/[id]/        Details (dynamic route)
    opportunities/[id]/edit/   Edit form
    saved/  dashboard/  add-opportunity/  about/  contact/
  api/                       Mock REST API (file-backed, see lib/mockDb.ts)

components/
  layout/        Navbar, Footer, Logo, LanguageSwitcher, ThemeScript
  sections/      Hero, StatsBar, PopularCategories, FeaturedSection,
                 HowItWorks, CtaBanner
  cards/         OpportunityCard, SaveButton, DashboardCard
  forms/         OpportunityForm (shared by add & edit), SearchFilter
  dashboard/     CategoryChart, OpportunityManageTable
  illustrations/ HeroIllustration, LatticePattern (hand-built SVG, on brand)
  ui/            Button, ButtonLink, FormField, Modal, EmptyState,
                 SkeletonCard, Toast

context/
  SavedContext.tsx   Saved-opportunities state (LocalStorage)
  ThemeContext.tsx   Light/dark/system theme state (LocalStorage + media query)

data/opportunities.json   Seed data (20 opportunities across 7 categories)
lib/mockDb.ts             File-backed mock database (persists across restarts)
lib/utils.ts              Filtering, stats, date helpers
lib/ui.ts                 Shared Tailwind class tokens and motion variants
types/index.ts            All TypeScript types — the single source of truth
```
