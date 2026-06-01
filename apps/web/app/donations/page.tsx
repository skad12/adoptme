import Link from "next/link";
import { fetchDonationCampaigns } from "@/lib/listing-data";
import { Card } from "@/components/ui/card";

function money(cents: number | null) {
  if (cents == null) return "Open goal";
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(cents / 100);
}

export default async function DonationsPage() {
  const { items } = await fetchDonationCampaigns();

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Donations</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Support shelters, rescue transport, emergency veterinary care, food drives, and animal welfare campaigns that help pets reach safer homes.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {items.length === 0 ? (
          <p className="col-span-full rounded-2xl border border-dashed border-zinc-300 p-8 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
            No active campaigns are available right now. Please check back for new shelter and rescue fundraisers.
          </p>
        ) : null}
        {items.map((c) => {
          const pct = c.goalCents ? Math.min(100, Math.round((c.raisedCents / c.goalCents) * 100)) : null;
          return (
            <Card key={c.id} className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{c.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{c.description}</p>
              </div>
              <div>
                <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span>Raised {money(c.raisedCents)}</span>
                  <span>Goal {money(c.goalCents)}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: pct != null ? `${pct}%` : "40%" }}
                  />
                </div>
              </div>
              <Link
                href={`/support?topic=donate&campaign=${c.id}`}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Donate to this cause
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
