# Linkzy — URL Shortener + Ad Monetization

## Live Link
- Add your production URL here: [linkzyy.netlify.app](https://linkzyy.netlify.app/)

## Overview
- Linkzy turns long URLs into short, shareable links and monetizes traffic through an ad funnel. Users create links, drive clicks, and track impressions, clicks, and earnings with real-time analytics.
- Built with TypeScript, React, Vite, Tailwind, shadcn/ui, React Router, TanStack Query, and Supabase for auth, data, and storage.

## Key Features
- URL shortening with redirect flow via `s/:shortCode`.
- 4-step ad funnel pages with countdown and featured offers.
- Admin panel to manage ads, global settings, and users.
- User dashboard with stats, link management, and earnings.
- RLS-safe Supabase RPCs for public redirect and click counting.

## Tech Stack
- Frontend: `react`, `vite`, `typescript`, `tailwindcss`, `shadcn/ui`, `react-router-dom`, `@tanstack/react-query`.
- Backend-as-a-Service: `@supabase/supabase-js` for auth, database, and storage.
- Charts & UI: `recharts`, `lucide-react`, and utility libs.

## App Routes
- `/` — Marketing landing page with CTA.
- `/auth` — Email/password auth using Supabase.
- `/dashboard` — Authenticated user dashboard.
- `/admin` — Admin panel (role-gated).
- `/s/:shortCode` — Short-link resolver and redirect.
- `/ad/:pageId` — Ad funnel step pages.

## Data Model (Supabase)
- `profiles` — Per-user profile and `total_earnings`.
- `user_roles` — Role management (`user`, `admin`).
- `links` — Short links with `original_url`, `short_code`, metrics.
- `analytics` — Per-link daily metrics.
- `config` — Global settings (e.g., CPM/CPC rates).
- `ads` — Ad inventory with `title`, `description`, `url`, `image_url`, `page_number`.

Important functions (RLS-safe RPCs):
- `resolve_short_code(p_code text)` defined in `supabase/migrations/20251110_fix_rpc_rls_bypass.sql:10` — fetches `original_url` by `short_code` for public redirects.
- `increment_link_clicks(p_code text)` defined in `supabase/migrations/20251110_fix_rpc_rls_bypass.sql:39` — increments `links.clicks` safely.

## Environment Variables
- `VITE_SUPABASE_URL` — Supabase project URL.
- `VITE_SUPABASE_PUBLISHABLE_KEY` — Supabase anon/public key.

Configure these in `.env`:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_ANON_KEY
```

## Getting Started
- Install dependencies: `npm install`
- Create `.env` with the Supabase variables above.
- Ensure Supabase has required tables and buckets:
  - Apply migrations in `supabase/migrations/` using Supabase CLI.
  - Create storage bucket `ad-images` and make it public or set appropriate policies.
- Start dev server: `npm run dev`

## Useful Scripts
- `npm run dev` — Start Vite dev server.
- `npm run build` — Production build.
- `npm run preview` — Preview built app.
- `npm run lint` — Lint the project.

## Directory Structure
- `src/App.tsx` — App shell, providers, and route definitions.
- `src/pages/Index.tsx` — Landing page.
- `src/pages/Auth.tsx` — Email/password auth flow.
- `src/pages/Dashboard.tsx` — User dashboard.
- `src/pages/Admin.tsx` — Admin panel.
- `src/pages/ShortLinkRedirect.tsx` — Short code → target resolver.
- `src/pages/AdPage.tsx` — Ad funnel step page.
- `src/components/` — UI components, dashboard and admin modules.
- `src/integrations/supabase/client.ts` — Supabase client initialization.
- `supabase/migrations/` — SQL migrations and RPCs.

## How It Works
- Short-link redirect:
  - User visits `/s/:shortCode` → the app resolves `original_url` via RPC and increments click count.
  - The flow routes users through `/ad/:pageId` steps with a countdown and ad offers, then finally redirects to the target.
- Admin ad management:
  - Upload ad images to `ad-images` storage; create and edit ads assigned to a funnel page.
  - Ads display on the corresponding ad funnel step.
- Role-based access:
  - First registered user is auto-promoted to `admin` via trigger in migrations.
  - Admins access `/admin`; regular users stay on `/dashboard`.

## Deployment Notes
- Host the built frontend (e.g., Netlify/Vercel) and provide `VITE_*` env variables in the hosting platform.
- Ensure Supabase policies are applied and RPC functions are present.
- Confirm `ad-images` bucket exists and public asset URLs resolve.

## License
- Proprietary or add your license details here.

