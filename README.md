# 🇦🇫 KaarYab Afghanistan

A **trilingual portfolio project** inspired by the idea of bringing jobs, internships, scholarships, remote work, courses, and training opportunities together in one searchable platform.

Built with **Next.js 15 (App Router), TypeScript, Supabase, and Tailwind CSS**.

> **Note:** KaarYab is an educational/portfolio project. All opportunities, users, and other content are demo data created for development and testing. It is not a production service.

## 🌐 Links

- **Live Demo:** https://kaaryab-gules.vercel.app/
- **Repository:** https://github.com/Fatima-Rahmani79/Kaaryab

---

## 🎯 Why I Built It

I built KaarYab to practice developing a complete web application with **Next.js, TypeScript, and Supabase** around a real-world use case.

The project allowed me to work with authentication, database operations, role-based access, multilingual interfaces, form validation, search and filtering, and database security.

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center" width="50%">
      <strong>Home</strong><br><br>
      <img src="./public/screenshotes/home.jpg" alt="Home" width="100%">
    </td>
    <td align="center" width="50%">
      <strong>Home — Translated</strong><br><br>
      <img src="./public/screenshotes/homeTranslate.jpg" alt="Translated Home" width="100%">
    </td>
  </tr>

  <tr>
    <td align="center">
      <strong>Dark Mode</strong><br><br>
      <img src="./public/screenshotes/homeDark.jpg" alt="Dark Mode" width="100%">
    </td>
    <td align="center">
      <strong>Opportunities</strong><br><br>
      <img src="./public/screenshotes/opportunities.jpg" alt="Opportunities" width="100%">
    </td>
  </tr>

  <tr>
    <td align="center">
      <strong>Submit Opportunity</strong><br><br>
      <img src="./public/screenshotes/submit.jpg" alt="Submit Opportunity" width="100%">
    </td>
    <td align="center">
      <strong>Dashboard</strong><br><br>
      <img src="./public/screenshotes/dashboard.jpg" alt="Dashboard" width="100%">
    </td>
  </tr>
</table>

---

## ✨ Features

### Opportunity Platform

- Browse jobs, internships, scholarships, remote work, courses, volunteering, and training opportunities
- Search and filter opportunities
- Dynamic opportunity detail pages
- Save opportunities with LocalStorage
- Featured and expiring opportunities
- Deadline countdowns

### Authentication & Admin

- Supabase Authentication
- User registration and login
- Role-based admin access
- Protected routes and API endpoints
- Opportunity submission and approval workflow
- CRUD operations
- Pending / approved opportunity status

### Dashboard

- Statistics overview
- Category breakdown
- Pending approval queue
- Opportunity management
- Edit and delete actions

### User Experience

- Responsive design
- Light / dark mode
- English, Dari, and Pashto
- RTL / LTR support
- Loading and empty states
- Toast notifications
- Confirmation dialogs
- Framer Motion animations

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15, React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend & Database:** Supabase
- **Authentication:** Supabase Auth
- **Localization:** next-intl
- **Forms & Validation:** React Hook Form, Zod
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Test:** Vitest + React Testing Library (automated tests)

---

## 🔐 Security & Data Handling

The project uses **Supabase Row Level Security (RLS)** alongside application-level authorization.

The database policies ensure that:

- Public users can only read approved opportunities.
- Pending submissions are not publicly visible.
- Only authorized administrators can update or delete opportunities.
- Profile permissions cannot be escalated directly by regular users.

The security policies are available in:

```text
supabase/rls_hardening.sql
```

---

# Testing

This project uses [Vitest](https://vitest.dev) and
[React Testing Library](https://testing-library.com/react) for automated tests.

```bash
npm test          # run once
npm run test:watch # re-run on file changes while developing
```

Current coverage:

- `lib/utils.test.ts` — unit tests for the pure filtering, date, and stats
  logic in `lib/utils.ts` (26 tests): deadline calculations, every filter
  combination in `filterOpportunities`, `calculateStats`, and
  `categoryBreakdown`
- `components/cards/OpportunityCard.test.tsx` — renders correctly, links to
  the right URL, and shows the expired badge at the right time
- `components/forms/SearchFilter.test.tsx` — search input fires `onChange`,
  the location dropdown is built correctly from the given opportunities, and
  "Clear filters" resets everything

Not covered yet (see Future Improvements): API routes and Supabase-backed
data flows, which would need mocking the database layer.

---

## 🧩 Project Structure

```text
├── app/
├── components/
├── context/
├── data/
├── lib/
├── messages/
├── scripts/
├── supabase/
└── types/
```

The application uses the **Next.js App Router**, with Server Components for rendering and Client Components where interactivity is required.

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

Create a Supabase project and run the SQL files in this order:

```text
supabase/schema.sql
supabase/auth.sql
supabase/status_column.sql
supabase/rls_hardening.sql
```

### 3. Configure environment variables

Create `.env.local` based on `.env.local.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Seed demo data

```bash
node --env-file=.env.local scripts/migrate-to-supabase.mjs
```

### 5. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🔑 Demo Account

Want to explore the admin dashboard?

Use the demo account below:

Email: admin@gmail.com
Password: asop12

You can use this account to explore the authentication flow,
admin dashboard, opportunity management, and approval workflow.

> This is a demo account created specifically for portfolio evaluation.
> Please do not use it for any personal or sensitive information.

---

## 🌱 Future Improvements

- User profile management
- Opportunity analytics
- PDF CV builder
- Email delivery for contact forms
- In-app admin management

---

## 💡 What I Learned

Building KaarYab gave me hands-on experience with:

- Structuring a Next.js App Router application
- TypeScript in a larger frontend project
- Supabase authentication and PostgreSQL
- Row Level Security
- Role-based authorization
- Multilingual and RTL interfaces
- Form validation with React Hook Form and Zod
- Building reusable components
- Managing loading, error, and empty states
- Designing a responsive application from end to end
