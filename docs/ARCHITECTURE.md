# Architecture

## Overview

AdoptMe is a **modular monolith API** (`apps/api`) paired with a **Next.js App Router** storefront (`apps/web`). Starter data lives in `apps/api/data/db.json` through a small JSON store. This keeps the project lightweight while preserving clean boundaries for a future database.

```
┌─────────────┐     HTTPS      ┌──────────────────┐
│   Users     │ ─────────────► │  Next.js (web)   │
└─────────────┘                │  SSR / RSC / CDN │
                               └────────┬─────────┘
                                        │ REST /v1
                                        ▼
                               ┌──────────────────┐
                               │ Express (api)    │
                               │ Auth · RBAC ·     │
                               │ Escrow · Payments │
                               └────────┬─────────┘
                                        │
                                        ▼
                               ┌──────────────────┐
                               │  JSON data file  │
                               └──────────────────┘
```

## Bounded contexts

| Context | Responsibility |
|--------|----------------|
| Identity | Registration, login, sessions/JWT, email verification, password reset, profiles |
| Catalog | Pets, listings, categories, moderation states, media metadata |
| Commerce | Orders, escrow states, disputes, fees, payout scheduling |
| Welfare | Adoption applications, donation campaigns, receipts |
| Trust | Seller verification tiers, reviews, reports, audit trail |
| Comms | Threads, messages, notifications (email/push adapters later) |
| Admin | Moderation queues, user actions, analytics exports |

## Scaling path

- **Web**: Deploy on Vercel or similar; static assets on CDN; ISR for listing pages where legal/policy allows caching.
- **API**: Horizontally scaled stateless containers behind a load balancer; sticky sessions **not** required if JWT auth.
- **Data**: Local JSON for the starter; move to PostgreSQL, MySQL, or document storage when persistence and concurrency requirements grow.
- **Async work**: Outbox pattern for webhooks, escrow releases, emails — **SQS / PubSub / NATS** workers (future).
- **Search**: OpenSearch/Elastic for full-text + facets at high scale (placeholder hooks in listing metadata).
- **Files**: S3-compatible object storage + short-lived signed URLs; virus scan queue.
- **Future**: Subscriptions, vet bookings, insurance, logistics — model as separate services or modules with clear API contracts.

## Repository layout

- `apps/web` — Next.js 15, Tailwind v4, React Query, premium marketing UI.
- `apps/api` — Express 5, Zod validation, Helmet, rate limits, JSON file store.

See also: `API.md`, `SECURITY.md`, `PAYMENT-FLOWS.md`, `DEPLOYMENT.md`.
