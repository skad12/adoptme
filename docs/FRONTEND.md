# Frontend structure

## Routing (App Router)

| Path | Purpose |
|------|---------|
| `/` | Premium homepage, trust signals, category entry |
| `/marketplace` | Search, filters, sort, pagination |
| `/pets/[slug]` | Listing detail (slug accepts cuid in MVP) |
| `/adoption` | Adoption center landing |
| `/donations` | Campaigns + CTA |
| `/checkout/escrow/[orderId]` | Escrow checkout & status |
| `/dashboard` | Buyer/adopter hub |
| `/dashboard/seller` | Listings, orders, reputation |
| `/admin` | Admin/moderator console entry |
| `/support` | Help center / policies |

## Layout & UX

- `app/layout.tsx` — fonts, metadata, `Providers`, shell.
- `components/layout/site-header.tsx` — global nav, theme toggle.
- `components/layout/site-footer.tsx` — legal, support, social.
- **Dark/light** via `next-themes` (`class` strategy) + Tailwind `dark:` tokens.

## State & data

- **TanStack Query** for client fetching from `NEXT_PUBLIC_API_URL`.
- Server components where possible for first paint; client islands for interactive filters.

## Components (selected)

- `components/ui/button.tsx` — variants (primary, ghost, outline).
- `components/ui/card.tsx`, `badge.tsx`, `input.tsx`, `select.tsx`.
- `components/marketplace/filters-bar.tsx` — type, sort, query sync to URL.
- `components/marketplace/listing-grid.tsx` — responsive grid, skeletons.
- `components/trust/verification-badge.tsx` — seller tier display.

## SEO & accessibility

- Descriptive `<title>` / OpenGraph per route.
- Semantic landmarks (`header`, `main`, `nav`, `footer`).
- Focus states, color contrast checked in both themes.

## Performance

- `next/image` for optimized media.
- Route-level loading UI; avoid blocking waterfalls in RSC trees.
