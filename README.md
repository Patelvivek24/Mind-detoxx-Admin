# Mind DetoxX Studio Admin — Next.js Application

A production-ready, SSR-first studio management and CMS platform built with **Next.js (App Router)**, **TypeScript**, and **Lucide React**.

---

## 🏗 Architectural Overview

This project strictly adheres to the Clean App Router architecture:
- **Routing & SSR Entry Points** live in `src/app/`
- **Page UI Implementations** live in `src/components/pages/`
- **Server Components by Default** with isolated Client Components only where interactivity is required (modals, forms, schedule calendar grid, search toolbars).

```
src/
├── app/                              # Next.js App Router (Routes, Layout, Metadata, SSR)
│   ├── layout.tsx                    # Root layout (Google Fonts, Providers, StudioShell)
│   ├── page.tsx                      # Dashboard route (/)
│   ├── loading.tsx                   # Global suspense loading fallback
│   ├── error.tsx                     # Global runtime error boundary
│   ├── not-found.tsx                 # 404 page
│   ├── schedule/page.tsx             # /schedule
│   ├── bookings/page.tsx             # /bookings
│   ├── plans/page.tsx                # /plans
│   ├── activities/page.tsx           # /activities
│   ├── events/page.tsx               # /events
│   ├── rentals/page.tsx              # /rentals
│   ├── enquiries/page.tsx            # /enquiries
│   ├── payments/page.tsx             # /payments
│   ├── content/
│   │   ├── home/page.tsx             # /content/home
│   │   ├── about/page.tsx            # /content/about
│   │   ├── retreats/page.tsx         # /content/retreats
│   │   └── rental/page.tsx           # /content/rental
│   ├── media/page.tsx                # /media
│   ├── settings/page.tsx             # /settings
│   └── api/studio/route.ts           # Next.js Route Handler for Studio Data
│
├── components/
│   ├── pages/                        # Page-level UI implementations
│   │   ├── Dashboard/                # DashboardPage + subcomponents
│   │   ├── Schedule/                 # SchedulePage + CalendarGrid
│   │   ├── Bookings/                 # BookingsPage + BookingsTable
│   │   ├── Plans/                    # PlansPage + PlansList
│   │   ├── Activities/               # ActivitiesPage + ActivitiesTable
│   │   ├── Events/                   # EventsPage + EventsGrid
│   │   ├── Rentals/                  # RentalsPage + RentalsList
│   │   ├── Enquiries/                # EnquiriesPage + EnquiriesTable
│   │   ├── Payments/                 # PaymentsPage + PaymentsLedger
│   │   ├── Content/                  # ContentEditor + Section Page UIs
│   │   ├── Media/                    # MediaPage + MediaLibrary
│   │   └── Settings/                 # SettingsPage + SettingsForm
│   │
│   ├── ui/                           # Generic Reusable UI Components
│   │   ├── Button.tsx
│   │   ├── Field.tsx
│   │   ├── Modal.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── MiniMetric.tsx
│   │   ├── Toolbar.tsx
│   │   ├── EmptyState.tsx
│   │   └── Toast.tsx
│   │
│   └── shared/                       # App-level Shared Components
│       ├── Sidebar.tsx
│       ├── Topbar.tsx
│       ├── PageHeading.tsx
│       ├── EntityModal.tsx
│       └── StudioLayoutShell.tsx
│
├── lib/
│   ├── constants/navigation.ts       # Navigation definitions, routes & icons
│   ├── data/initialData.ts           # Typed seed dataset
│   └── utils/formatters.ts           # Currency, date, and ID helpers
│
├── providers/
│   └── StudioProvider.tsx            # SSR-safe state provider + localStorage persistence
│
└── types/
    └── studio.ts                     # Strict TypeScript domain interfaces
```

---

## 🚀 Running the Project

Navigate into the separate Next.js project directory:

```bash
cd mind-detoxx-admin-next
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

To build for production:

```bash
npm run build
npm run start
```
