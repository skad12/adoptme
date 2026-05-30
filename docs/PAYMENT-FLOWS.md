# Payment flows

## Escrow (purchases & exchanges)

1. **Buyer** creates `Order` in `AWAITING_PAYMENT`; linked `EscrowTransaction` starts in `PENDING_FUNDING`.
2. Client obtains **PaymentIntent** (Stripe-style) from PSP; funds **captured** to platform or connected account per regulatory model.
3. On `payment_intent.succeeded` webhook → transition `Order` to `IN_ESCROW`, `EscrowState` to `FUNDED`, set `fundedAt`.
4. Seller marks fulfillment milestones (carrier integration later) → `IN_TRANSIT` → `DELIVERED_PENDING_RELEASE`.
5. **Auto-release window** (e.g., 48h after delivery confirmation) or explicit buyer release → `RELEASED`, `Order` `CLOSED`, schedule payout minus `feeCents` (`ESCROW_PLATFORM_FEE_BPS`).
6. **Dispute** freezes auto-release; moderator resolves → partial/full release or `REFUNDED`.

> Starter code persists escrow rows and returns a demo `clientSecret`; wire PSP webhooks in `apps/api/src/modules/payments.webhooks.ts` (add when integrating).

## Donations

1. **Donor** selects campaign or one-off cause → `Donation` row `PENDING`.
2. Redirect / embedded checkout session with **501(c) messaging** as required by jurisdiction.
3. Webhook `checkout.session.completed` → mark `Donation` `COMPLETED`, increment `DonationCampaign.raisedCents`, issue **receipt** (email worker).
4. Refunds rare; if initiated, `REFUNDED` and adjust aggregates idempotently.

## PCI scope

- Use **hosted fields / checkout sessions** — API never stores raw card data.
- Log only non-sensitive PSP identifiers.
