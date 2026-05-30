import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function BuyerDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Your dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Track orders, escrow states, adoption applications, and messages. Wire these cards to authenticated API calls (`/v1/orders`, `/v1/messages/threads`, …).
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Commerce</p>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Active purchases</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Placeholder — connect to buyer order list.</p>
        </Card>
        <Card className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Adoption</p>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Applications</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Surface `AdoptionApplication` rows for this user.</p>
        </Card>
        <Card className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Saved</p>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Favorites</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Hook to `Favorite` table and listing cards.</p>
        </Card>
      </div>
      <Link href="/dashboard/seller" className="text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400">
        Go to seller workspace
      </Link>
    </div>
  );
}
