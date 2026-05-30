# Security model

## Authentication

- **JWT access tokens** (short TTL) issued at login/register. Refresh tokens and rotation should be added for production (httpOnly cookies + rotation table).
- Passwords hashed with **bcrypt** (cost factor 12+).
- **Email verification** and **password reset** should use signed, single-use tokens (implementation placeholder in routes).

## Authorization (RBAC)

Roles live in `UserRole`. Route guards use `requireRoles("ADMIN","MODERATOR")` patterns. **Principle of least privilege**: default new users are `BUYER`; seller tools require `SELLER`; admin routes require `ADMIN` or `MODERATOR`.

## Transport & headers

- **Helmet** for secure defaults.
- **CORS** locked to configured origins.
- **Rate limiting** (global) + stricter limits on auth and uploads in production.

## Input validation

- **Zod** on all mutating handlers; reject unknown fields where appropriate.
- File uploads: size caps, MIME allowlist, **scan + store in private bucket**, serve via signed URLs.

## Web threats

| Threat | Mitigation |
|--------|------------|
| XSS | React escaping; CSP in production; sanitize rich text if added |
| CSRF | JWT in `Authorization` header for API; if cookie sessions are added, use CSRF tokens |
| Injection | Zod validation today; use parameterized queries when a production database is introduced |
| Abuse | Rate limits, fraud scoring, device fingerprinting (future), captcha on auth |
| IDOR | Always scope queries by `req.auth.sub` or explicit admin checks |

## Escrow & payments

- **Never trust client amounts** — prices taken from authoritative `Listing` / `Order` rows.
- **Webhooks** verify provider signatures; process idempotently with stored event IDs.
- **AuditLog** for release/refund/dispute resolutions.

## Compliance

- Log retention policy, data residency, GDPR/CCPA deletion workflows (implement as `UserStatus.DELETED` + anonymization jobs).
- Jurisdictional rules for animal sales: enforce via listing metadata, geo, and legal review flags (future module).
