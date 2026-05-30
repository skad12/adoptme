import { Card } from "@/components/ui/card";

export default function SellerDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Seller workspace</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Manage listings, verification documents, buyer messages, and payouts. The JSON starter data already models seller profiles, listing moderation states, and reviews.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Listing pipeline</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Draft → pending review → active. Automations can notify moderators via the notifications module.
          </p>
        </Card>
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Reputation</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Completed orders feed into reviews and `reputationScore` on `SellerProfile` for trust surfacing in the UI.
          </p>
        </Card>
      </div>
    </div>
  );
}
