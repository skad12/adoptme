import Link from "next/link";
import { Package, ShoppingBag, Star, Wallet } from "lucide-react";
import { ActivityList, PreviewBadge, SimpleChart } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { KpiStat } from "@/components/dashboard/kpi-stat";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SoftCard } from "@/components/dashboard/soft-card";
import { fetchVendorDashboard, formatNaira, formatWhen } from "@/lib/dashboard";

export const metadata = { title: "Vendor dashboard" };

export default async function VendorDashboardPage() {
  const data = await fetchVendorDashboard();
  const lowStock = data.products.filter((p) => p.stock <= 8);

  return (
    <DashboardShell role="vendor" title="Seller workspace" subtitle="Catalog health, fulfilment pace, and payouts for your store.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiStat
          icon={Wallet}
          label="Revenue (MTD)"
          value={formatNaira(data.summary.revenueMinor)}
          delta={`${data.summary.conversionRate}% conv.`}
          sparkline={data.summary.salesByDay}
        />
        <KpiStat icon={ShoppingBag} label="Pending orders" value={String(data.summary.ordersPending)} tone="coral" />
        <KpiStat icon={Package} label="Fulfilled" value={String(data.summary.ordersFulfilled)} />
        <KpiStat icon={Star} label="Store rating" value={data.summary.ratingAvg.toFixed(1)} delta={`${data.summary.responseMinutes}m response`} tone="amber" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <SectionHeader title="Recent orders" actionHref="/dashboard/vendor/orders" actionLabel="All orders" />
          <ActivityList
            items={data.orders.slice(0, 5).map((o) => ({
              id: o.id,
              title: `${o.buyer} · ${o.items} items`,
              meta: `${formatNaira(o.amountMinor)} · ${formatWhen(o.createdAt)}`,
              status: o.status,
              tone: o.status === "pending" ? "coral" : "mint",
            }))}
          />
          <SectionHeader title="Bestsellers & stock" actionHref="/dashboard/vendor/products" actionLabel="Manage catalog" />
          <div className="grid gap-3 sm:grid-cols-2">
            {data.products.slice(0, 4).map((p) => (
              <SoftCard key={p.id} className="space-y-1 p-4">
                <p className="font-extrabold">{p.name}</p>
                <p className="text-sm text-[var(--dash-muted)]">
                  {formatNaira(p.priceMinor)} · {p.stock} in stock
                </p>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--dash-coral)]">{p.status.replaceAll("_", " ")}</p>
              </SoftCard>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <SimpleChart label="Sales this week" values={data.summary.salesByDay} />
          <SoftCard className="space-y-3">
            <h3 className="font-extrabold">Stock alerts</h3>
            {lowStock.length === 0 ? (
              <p className="text-sm text-[var(--dash-muted)]">Inventory looks healthy.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {lowStock.map((p) => (
                  <li key={p.id} className="flex justify-between gap-2">
                    <span className="font-semibold">{p.name}</span>
                    <span className="text-[var(--dash-coral)]">{p.stock} left</span>
                  </li>
                ))}
              </ul>
            )}
          </SoftCard>
          <SoftCard className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold">Event booths</h3>
              <PreviewBadge />
            </div>
            <p className="text-sm text-[var(--dash-muted)]">Register for adoption fairs and pop-up markets. Booth bookings open soon.</p>
            <Link href="/dashboard/vendor/payouts" className="text-sm font-bold text-[var(--dash-mint)] hover:underline">
              View payouts
            </Link>
          </SoftCard>
        </div>
      </div>
    </DashboardShell>
  );
}
