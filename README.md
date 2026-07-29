Project Name:
KaarYab Afghanistan

Project Description:
KaarYab Afghanistan is a modern, trilingual opportunity-finder platform that helps
Afghan youth discover jobs, internships, scholarships, online courses, remote work,
and training programs — all in one place. Built with Next.js 15 (App Router),
TypeScript, and Supabase.

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
- Full CRUD: create, read, edit, and delete opportunities, backed by a real
  Postgres database via Supabase
- User accounts (Supabase Auth) with an admin role
- Admin approval workflow: every new submission starts as `pending` and is
  hidden from the public site until an admin approves it from the Dashboard's
  "Pending approval" queue (approve or reject)
- Route protection: the Dashboard and Edit pages — and the underlying API
  routes themselves — require a signed-in admin session
- Dashboard with live stats (total, jobs, scholarships, internships, remote,
  pending review, expiring soon), a category breakdown chart, a pending
  approval queue, and a management table (edit/delete)
- Fully responsive layout (mobile, tablet, desktop) with a mobile navigation menu
- Light and dark mode, with system-preference detection and no flash on load
- Complete English / Dari / Pashto translation, including automatic RTL layout
- Professional UI: navbar, footer, cards, buttons, forms, confirmation modals,
  badges (category, expiring soon, expired, pending), empty states, loading
  skeletons, and error states with retry
- Framer Motion animations throughout, respecting `prefers-reduced-motion`
- Bonus features implemented: multi-language support, authentication, admin
  approval workflow, deadline countdown, Recharts dashboard chart, featured
  opportunities, expiring-soon badges

Technologies Used:

- Next.js 15 (App Router), React, TypeScript
- Supabase (Postgres database + Authentication)
- Tailwind CSS (custom design system, see `lib/ui.ts`)
- next-intl (English / Dari / Pashto)
- React Hook Form + Zod
- Framer Motion
- Recharts

How to Run Locally:

```bash
npm install
```

Database & auth setup (Supabase) — required even for local development, since
opportunities and accounts live in a real database, not a local file:

1. Create a free project at https://supabase.com
2. In the Supabase SQL Editor, run these three files **in order**:
   `supabase/schema.sql`, then `supabase/auth.sql`, then
   `supabase/status_column.sql`
3. In **Authentication → Providers → Email**, turn **off** "Confirm email".
   Supabase's free tier has a very low limit on confirmation emails, and
   disabling this lets accounts (including yours) activate instantly instead
   of waiting on an email that may not arrive
4. Copy `.env.local.example` to `.env.local` and fill in your project's URL and
   anon key (Project Settings → API in the Supabase dashboard)
5. Run the one-time seed migration:
   ```bash
   node --env-file=.env.local scripts/migrate-to-supabase.mjs
   ```
6. `npm run dev`, then sign up for an account at `/login`
7. Make that account an admin — in the SQL Editor:
   ```sql
   alter table profiles disable row level security;
   update profiles set is_admin = true where email = 'your-email@example.com';
   alter table profiles enable row level security;
   ```
   (RLS has to be toggled off/on around this one query because the current
   `profiles` policies only let a user read or update _their own_ row — see
   "Known limitations" below.)
8. When deploying to Vercel, add `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` under Project Settings → Environment
   Variables with the same values, then redeploy

Then open http://localhost:3000 — it redirects automatically to `/en` (default
locale). Dari and Pashto are available at `/fa` and `/ps`.

Demo Admin Access (for grading):

```
Email:    admin@gmail.com
Password: asop12
```

Sign in at `/login` with these credentials to see the admin-only Dashboard,
including the pending-approval queue and the edit/delete management table.

Note: Supabase's free tier automatically pauses a project after 7 days with no
API requests. If the live demo looks broken after a period of inactivity, open
the Supabase dashboard and click "Resume" — this does not affect your data.

Screenshots:
[Home Page](screenshotes/home.jpg)

Live Demo Link:
[Live Demo](https://kaaryab-gules.vercel.app/)

GitHub Link:
[GitHub Link](https://github.com/Fatima-Rahmani79/Kaaryab)

Future Improvements:

- ✅ Authentication (Supabase Auth with email/password) — implemented
- ✅ Admin role via a `profiles.is_admin` flag — implemented
- ✅ Route protection for the Dashboard and Edit pages (page-level and
  API-level) — implemented
- ✅ Admin approval workflow (`pending`/`approved` status, approve/reject
  queue in the Dashboard) — implemented
- Tighten Row Level Security policies on `opportunities` and `profiles` to
  check `auth.uid()` + `is_admin` at the database level, using a
  `service_role` key on the server for admin operations — right now
  admin checks happen only at the application level (API routes), and the
  `profiles` table's own RLS policies are narrow enough to require the
  disable/enable workaround above for manual admin assignment
- PDF CV builder
- Real email delivery for the contact form (currently logs to the server console)

Known limitations:

- The `profiles` RLS policies ("users can read/update their own row") mean
  admin assignment currently has to be done manually via SQL with RLS
  temporarily disabled, rather than through an in-app "manage admins" screen
- Supabase's free-tier email sending is rate-limited; this project disables
  email confirmation to avoid depending on it

---

## Project structure

```
middleware.ts               Locale routing (en/fa/ps) + Supabase session refresh
i18n.ts                     next-intl request config

messages/                   Translation files — keys must match across all three
  en.json  fa.json  ps.json

supabase/                   SQL to run in the Supabase SQL Editor, in order
  schema.sql                 opportunities table + public RLS policies
  auth.sql                   profiles table, is_admin flag, signup trigger
  status_column.sql          pending/approved status column + constraint

scripts/
  migrate-to-supabase.mjs   One-time script to seed data/opportunities.json into Supabase

app/
  [locale]/                 All user-facing pages, wrapped in the language layout
    page.tsx                  Home (hero, stats, categories, featured, how-it-works, CTA)
    login/                     Sign in / sign up
    opportunities/             Listing with search/filter (approved only)
    opportunities/[id]/        Details (dynamic route; pending items are admin-only)
    opportunities/[id]/edit/   Edit form (admin-only)
    saved/  dashboard/  add-opportunity/  about/  contact/
    dashboard/                 Admin-only: stats, pending-approval queue, manage table
  api/                       REST API backed by Supabase (see lib/mockDb.ts)
    opportunities/              GET (approved, or ?status=pending for admins), POST
    opportunities/[id]/         GET, PUT (admin), DELETE (admin)

components/
  layout/         Navbar, Footer, Logo, LanguageSwitcher, ThemeScript
  sections/       Hero, StatsBar, PopularCategories, FeaturedSection,
                  HowItWorks, CtaBanner
  cards/          OpportunityCard, SaveButton, DashboardCard
  forms/          OpportunityForm (shared by add & edit), SearchFilter
  dashboard/      CategoryChart, OpportunityManageTable, PendingApprovalQueue
  illustrations/  HeroIllustration, LatticePattern (hand-built SVG, on brand)
  ui/             Button, ButtonLink, FormField, Modal, EmptyState,
                  SkeletonCard, Toast

context/
  SavedContext.tsx   Saved-opportunities state (LocalStorage)
  ThemeContext.tsx   Light/dark/system theme state (LocalStorage + media query)
  AuthContext.tsx    Current user, profile, and admin status (client-side)

lib/
  auth/client.ts     Browser Supabase client (auth)
  auth/server.ts     Server Supabase client (auth) + getCurrentProfile() helper
  supabase.ts        Anon Supabase client used for opportunities data
  mockDb.ts          All opportunities queries (Supabase-backed)
  utils.ts           Filtering, stats, date helpers
  ui.ts              Shared Tailwind class tokens and motion variants

data/opportunities.json   Seed data used only by the migration script (20 opportunities)
types/index.ts             All TypeScript types — the single source of truth
```

## Adding a translation key

Add the same key, in the same place, to all three files under `messages/`. A key
present in `en.json` but missing from `fa.json` or `ps.json` will throw at runtime
when that locale is viewed.
