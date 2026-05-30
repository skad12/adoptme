# AdoptMe — Pet & Animal Marketplace

Monorepo on your Desktop for a Next.js storefront and Express API backed by local JSON starter data.

## Quick start

**1. Install dependencies**

```bash
cd ~/Desktop/Project/personal/pawhub-marketplace
npm install
```

**2. Start API and web together**

```bash
npm run dev
```

Or run them separately:

```bash
cd ~/Desktop/Project/personal/pawhub-marketplace/apps/api
cp .env.example .env
npm run dev
```

```bash
cd ~/Desktop/Project/personal/pawhub-marketplace/apps/web
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The marketplace reads from [http://localhost:4000](http://localhost:4000). Demo logins: `seller@adoptme.local` / `ChangeMeNow!1`, `admin@adoptme.local` / `ChangeMeNow!1`.

## Documentation

| Doc | Contents |
|-----|----------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design, services, scaling |
| [docs/API.md](docs/API.md) | REST endpoints |
| [docs/FRONTEND.md](docs/FRONTEND.md) | Pages & components |
| [docs/SECURITY.md](docs/SECURITY.md) | Auth, RBAC, hardening |
| [docs/PAYMENT-FLOWS.md](docs/PAYMENT-FLOWS.md) | Escrow & donations |
| [docs/ADMIN-DASHBOARD.md](docs/ADMIN-DASHBOARD.md) | Admin UX & modules |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Production & scale |

## Apps

- **apps/web** — Next.js (App Router), TypeScript, Tailwind CSS v4
- **apps/api** — Express, TypeScript, Zod, JWT-ready auth layer, JSON file data store

## Product surface

Marketplace (buy/sell), exchanges, adoption workflows, donations, escrow checkout, user/seller/admin dashboards, help center — see `docs/FRONTEND.md`.
