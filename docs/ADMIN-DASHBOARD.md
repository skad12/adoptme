# Admin dashboard design

## Information architecture

1. **Overview** — KPIs: GMV, active listings, open disputes, donation volume, trust incidents.
2. **Moderation** — Queue of `PENDING_REVIEW` listings, reported content, velocity limits on new sellers.
3. **Users** — Search/filter, suspend/reinstate, role grants, KYC document viewer (private storage links).
4. **Transactions** — Orders + escrow timeline, manual release/refund tools (dual-control optional).
5. **Disputes** — Evidence attachments, message threads, SLA timers, resolution templates.
6. **Donations** — Campaign oversight, payout reconciliation to beneficiaries.
7. **Audit** — Immutable `AuditLog` stream with CSV export.
8. **Settings** — Feature flags, fee BPS, legal banners, category taxonomy.

## UX principles

- **High-signal tables** with saved views; bulk actions behind confirmation modals.
- **Risk highlighting** for new accounts, high-value species, or abnormal pricing.
- **Mobile-friendly** for on-call moderators (read-mostly, limited actions).

## Implementation map

- API: `/admin/*` routes (expand beyond starter metrics/queue).
- Web: `apps/web/app/admin/page.tsx` shell links to future subroutes (`/admin/moderation`, etc.).
