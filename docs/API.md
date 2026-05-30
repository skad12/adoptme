# REST API (`/v1`)

Base URL: `http://localhost:4000/v1` (configure via reverse proxy in production).

## Conventions

- JSON request/response bodies, UTF-8.
- Errors: `{ "error": "CODE", "message"?: string, "details"?: ... }`
- Auth: `Authorization: Bearer <access_token>` for protected routes.
- Pagination: query `page`, `pageSize` where applicable.

## Auth

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register` | Create user + default buyer role, returns JWT |
| POST | `/auth/login` | Email/password → JWT |
| POST | `/auth/password-reset-request` | Always 202 (anti-enumeration) |

## Listings & discovery

| Method | Path | Description |
|--------|------|-------------|
| GET | `/listings` | Search: `q`, `type`, `category` (slug), `sort`, pagination |
| GET | `/listings/:id` | Public detail |

## Orders & escrow

| Method | Path | Description |
|--------|------|-------------|
| POST | `/orders` | Create order + escrow shell (`AWAITING_PAYMENT`) |
| GET | `/orders/:id` | Buyer order + escrow snapshot |

## Adoption

| Method | Path | Description |
|--------|------|-------------|
| POST | `/adoption/applications` | Submit JSON application for adoption listing |

## Donations

| Method | Path | Description |
|--------|------|-------------|
| GET | `/donations/campaigns` | Active campaigns |
| POST | `/donations/checkout` | Create pending donation + return PSP session URL (stub) |

## Messaging

| Method | Path | Description |
|--------|------|-------------|
| GET | `/messages/threads` | Threads for current user |
| POST | `/messages/threads/:threadId/messages` | Send message |

## Admin / moderation

| Method | Path | Auth | Description |
|--------|------|------|---------------|
| GET | `/admin/metrics/summary` | Admin/Mod | Counts |
| GET | `/admin/moderation/queue` | Admin/Mod | Pending listings |

## Uploads

| Method | Path | Description |
|--------|------|-------------|
| POST | `/uploads/pet-asset` | Multipart `file` (+ optional `listingId`); returns CDN URL (stub) |

## Health

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Liveness |

Future endpoints (stubs implied in schema): favorites, disputes transitions, webhook receivers, KYC document upload, analytics exports.
