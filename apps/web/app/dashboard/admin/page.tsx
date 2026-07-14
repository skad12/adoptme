import Link from "next/link";
import { ChartColumn, ShoppingBag, Store, Users } from "lucide-react";
import { ActivityList, PreviewBadge, SimpleChart } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { KpiStat } from "@/components/dashboard/kpi-stat";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SoftCard } from "@/components/dashboard/soft-card";
import { fetchAdminDashboard, formatNaira, formatWhen } from "@/lib/dashboard";

export const metadata = { title: "Admin dashboard" };

export default async function AdminDashboardPage() {
  const data = await fetchAdminDashboard();

  return (
    <DashboardShell role="admin" title="Platform health" subtitle="GMV, conversion, vendor health, and moderation at a glance.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiStat
          icon={ChartColumn}
          label="GMV"
          value={formatNaira(data.summary.gmvMinor)}
          delta={`${data.summary.retentionRate}% retain`}
          sparkline={data.summary.salesByCategory}
        />
        <KpiStat icon={ShoppingBag} label="Orders today" value={String(data.summary.ordersToday)} />
        <KpiStat icon={Store} label="Active vendors" value={String(data.summary.activeVendors)} tone="amber" />
        <KpiStat icon={Users} label="AOV" value={formatNaira(data.summary.aovMinor)} tone="coral" delta={`${data.summary.conversionRate}% conv.`} />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <SectionHeader title="Moderation queue" actionHref="/dashboard/admin/users" actionLabel="Manage users" />
          <ActivityList
            items={data.moderationQueue.map((m) => ({
              id: m.id,
              title: m.title,
              meta: `${m.reason} · ${formatWhen(m.createdAt)}`,
              status: "review",
              tone: "coral",
            }))}
          />
          <SimpleChart label="Category sales share" values={data.summary.salesByCategory} />
        </div>
        <div className="space-y-4">
          <SoftCard className="space-y-3">
            <h3 className="font-extrabold">Verified vets</h3>
            <p className="dash-kpi-value">{data.summary.verifiedVetsPct}%</p>
            <p className="text-sm text-[var(--dash-muted)]">License-checked veterinarians accepted into Services.</p>
            <Link href="/dashboard/admin/metrics" className="text-sm font-bold text-[var(--dash-mint)] hover:underline">
              Full metrics
            </Link>
          </SoftCard>
          <SoftCard className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold">Multi-currency tax</h3>
              <PreviewBadge />
            </div>
            <p className="text-sm text-[var(--dash-muted)]">NGN primary today. International tax engines and FX admin stay readied for rollout.</p>
          </SoftCard>
        </div>
      </div>
    </DashboardShell>
  );
}
