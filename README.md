# Drizzle Marketing PM Agent

An autonomous AI agent that integrates Fireflies, Google Drive, Jira, and Slack to fully automate Drizzle's marketing and operations workflow.

## Tech Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS)
- **Supabase** — Auth + PostgreSQL database
- **Lucide React** — Icon library

## Setup

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a project, and grab:
- Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
- Anon/public key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Integrations (for later)
FIREFLIES_API_KEY=...
GOOGLE_DRIVE_CLIENT_ID=...
JIRA_DOMAIN=...
SLACK_BOT_TOKEN=...
```

### 3. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/auth/login`.

### 4. Supabase Auth setup

In your Supabase dashboard:
- Enable **Email** provider in Authentication → Providers
- Set Site URL to `http://localhost:3000` (dev) or your production URL
- Add `http://localhost:3000/auth/callback` to Redirect URLs

---

## App Structure

```
src/
├── app/
│   ├── actions/auth.ts         # Server actions: signIn, signUp, signOut
│   ├── auth/
│   │   ├── login/page.tsx      # Login page
│   │   ├── signup/page.tsx     # Sign up page
│   │   └── callback/route.ts   # OAuth callback handler
│   ├── dashboard/
│   │   ├── page.tsx            # Server component (auth check)
│   │   └── DashboardClient.tsx # Main dashboard UI
│   ├── layout.tsx
│   ├── page.tsx                # Root redirect
│   └── globals.css             # Neon / crypto design tokens
├── lib/supabase/
│   ├── client.ts               # Browser Supabase client
│   └── server.ts               # Server Supabase client
└── proxy.ts                    # Route protection (Next.js 16 proxy)
```

## Features (Auth Flow)

- `/` → redirects to `/dashboard` if logged in, else `/auth/login`
- `/auth/login` — Email/password sign-in with neon crypto UI
- `/auth/signup` — Account creation with email verification flow
- `/dashboard` — Protected, shows overview with stats, activity feed, integrations panel
- Sign out button in sidebar

## Next Steps

- [ ] Fireflies webhook integration
- [ ] Google Drive document sync
- [ ] Jira task automation
- [ ] Slack approval workflow
- [ ] AI agent orchestration engine
