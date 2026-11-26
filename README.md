# 🌱 FoodShare — Food Waste Management & Donation System

A modern, full-featured frontend for connecting food donors with NGOs to reduce food waste and fight hunger.

## ✨ Features

- **Landing Page** — Hero, stats, feature cards, and dual CTA for donors/NGOs
- **Auth Page** — Login/Signup with role selection (Donor / NGO)
- **Donor Dashboard** — Stats, donation table with status, create donation CTA
- **NGO Dashboard** — Map view with pins + sidebar list of available donations
- **Create Donation** — 3-step form with image upload, location, expiry picker
- **Donation Details** — Live countdown timer, request pickup, donor info

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** with custom design tokens
- **React** functional components + hooks
- **Google Fonts** — Syne (display) + DM Sans (body)

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run the same checks CI runs

```bash
npm run lint:ci     # ESLint, zero warnings allowed
npm run test:ci     # Jest + coverage thresholds
npm run build       # production build
npm run smoke       # boot the build, assert every route returns 200
```

### 4. Run it as a container

```bash
docker compose up --build   # http://localhost:3000, non-root, healthcheck enabled
```

## 📁 Project Structure

```
foodshare/
├── app/
│   ├── layout.js          # Root layout
│   ├── globals.css        # Tailwind + global styles
│   ├── page.js            # Landing page (/)
│   ├── auth/
│   │   └── page.js        # Auth page (/auth)
│   ├── donor/
│   │   └── page.js        # Donor Dashboard (/donor)
│   ├── ngo/
│   │   └── page.js        # NGO Dashboard (/ngo)
│   ├── donate/
│   │   └── page.js        # Create Donation (/donate)
│   └── donation/
│       └── [id]/
│           └── page.js    # Donation Detail (/donation/:id)
├── components/
│   ├── Navbar.js          # Sticky responsive navbar
│   ├── Button.js          # Multi-variant button
│   ├── Card.js            # Card + StatCard
│   ├── Input.js           # Input, Select, Textarea
│   ├── DonationCard.js    # Reusable donation listing card
│   └── Footer.js          # Footer with links
├── lib/
│   ├── data.js            # Dummy data (donations, stats)
│   └── utils.js           # Helper functions (countdown, status colors)
├── tailwind.config.js
├── next.config.js
├── package.json
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml         # Lint → Test → Build + smoke → Security → Docker
│   │   ├── cd.yml         # Preview (PR) / Production (main) deploy + rollback
│   │   ├── codeql.yml     # CodeQL SAST
│   │   └── rollback.yml   # Manual one-click production rollback
│   ├── dependabot.yml     # Weekly dependency / action / image updates
│   └── PULL_REQUEST_TEMPLATE.md
├── __tests__/             # Jest + React Testing Library suites
├── scripts/
│   ├── smoke-test.mjs     # Route-level smoke test (local build or live URL)
│   └── coverage-summary.mjs
├── docs/
│   └── CI-CD.md           # Pipeline design, stages, secrets, rollback
├── Dockerfile             # Multi-stage production image (standalone output)
├── docker-compose.yml
├── jest.config.js
└── vercel.json
```

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary | `#22C55E` (green-500) |
| Alert | `#F97316` (orange-500) |
| Border radius | `rounded-2xl` (16px), `rounded-3xl` (24px) |
| Shadow | `shadow-soft`, `shadow-card`, `shadow-hover` |
| Display font | Syne (headings) |
| Body font | DM Sans |

## 🔗 Navigation Flow

```
/ (Landing)
├── /auth (Login / Signup)
│   ├── → /donor (if Donor role)
│   └── → /ngo (if NGO role)
├── /donate (Create Donation — donor only)
└── /donation/[id] (Donation Details)
```

## 📱 Responsive

All pages are fully responsive — mobile-first grid layouts, hamburger nav on mobile, card-to-table responsive switching on the donor dashboard.

## 🔁 CI/CD Pipeline

The repository ships a complete pipeline built on GitHub Actions. Full design
doc: [`docs/CI-CD.md`](docs/CI-CD.md).

```
pull request  →  lint → test (Node 20 + 22) → build + smoke → security scans
                                                          → docker build + scan
                       ↓ CI green
              preview deployment + URL commented on the PR

merge to main →  same CI  →  production deploy (Vercel, prebuilt)
                          →  smoke test the live URL
                          →  pass: done   |   fail: automatic rollback
```

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `ci.yml` | PR + push to `main`/`develop` | ESLint, 34 Jest tests with a coverage gate, production build, route smoke test, gitleaks/npm audit/Trivy scans, Docker image build + scan, GHCR push on `main` |
| `cd.yml` | after CI succeeds | Vercel preview deploy per PR; Vercel production deploy on `main`, smoke-tested, auto-rollback on failure |
| `codeql.yml` | PR, `main`, weekly | CodeQL static analysis into the Security tab |
| `rollback.yml` | manual | One-click production rollback |

**Secrets to set** (Settings → Secrets and variables → Actions):
`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
Setup steps, branch-protection rules and the security policy are in
[`docs/CI-CD.md`](docs/CI-CD.md).

## 🔮 Next Steps (Backend Integration)

- Replace `lib/data.js` with real API calls (REST or GraphQL)
- Integrate Google Maps API in the map placeholder divs
- Add real auth with NextAuth.js or Clerk
- Add real-time notifications with WebSockets or Pusher
- Connect image upload to Cloudinary or S3
