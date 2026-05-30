# Data model

The starter data model is stored in `apps/api/data/db.json` and accessed through `apps/api/src/lib/jsonStore.ts`. This keeps AdoptMe easy to run locally without a database while preserving clear entities for a future migration.

## Entity groups

### Identity & trust

- **User**, **UserRole** — multi-role RBAC (`BUYER`, `SELLER`, `ADOPTER`, `DONOR`, `ADMIN`, `MODERATOR`).
- **UserProfile** — display name, avatar, contact (PII minimization in API responses).
- **SellerProfile** — KYC timestamps, **VerificationTier**, reputation score.

### Catalog

- **Pet** — species, breed, age, sex, health notes, microchip (optional).
- **Listing** — `ListingType` (`SALE` | `EXCHANGE` | `ADOPTION`), price, geo, moderation, `metadata` JSON for future logistics/vet flags.
- **ListingImage**, **Category**, **ListingCategory** — taxonomy and gallery.

### Commerce

- **Order** — buyer, listing, totals, `OrderStatus` lifecycle.
- **EscrowTransaction** — parallel state machine (`EscrowState`) with PSP references.
- **Dispute** — ties to order; resolution fields for moderators.

### Welfare

- **AdoptionApplication** — JSON questionnaire for flexible jurisdictional forms.
- **DonationCampaign**, **Donation** — campaigns + one-off gifts; PSP references.

### Social & safety

- **Review** — post-transaction ratings.
- **MessageThread**, **ThreadParticipant**, **Message** — buyer/seller chat.
- **Notification** — in-app feed (push/email via workers later).
- **Favorite** — wishlist.
- **Report** — user-generated safety reports.
- **AuditLog** — admin/moderation actions and sensitive mutations.

## Production database recommendations

When moving to PostgreSQL, MySQL, or another production datastore, add indexes on: `Listing(status, type, createdAt)`, `Order(buyerId, status)`, `Donation(campaignId, status)`, `Message(threadId, createdAt)`, `User(email)`.

## Local data

Edit `apps/api/data/db.json` for seed content. New listings submitted through `/sell` are appended to that JSON file by the API.
