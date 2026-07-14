import { SimpleChart } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { KpiStat } from "@/components/dashboard/kpi-stat";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SoftCard } from "@/components/dashboard/soft-card";
import { ChartColumn, Percent, ShoppingBag, Store } from "lucide-react";
import { fetchAdminDashboard, formatNaira } from "@/lib/dashboard";

export const metadata = { title: "Admin metrics" };

export default async function AdminMetricsPage() {
  const data = await fetchAdminDashboard();
  const s = data.summary;

  return (
    <DashboardShell role="admin" title="Metrics" subtitle="Executive analytics from the product KPI model.">
      <SectionHeader title="Core marketplace KPIs" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiStat icon={ChartColumn} label="GMV" value={formatNaira(s.gmvMinor)} />
        <KpiStat icon={ShoppingBag} label="Orders / day" value={String(s.ordersToday)} />
        <KpiStat icon={Percent} label="Conversion" value={`${s.conversionRate}%`} />
        <KpiStat icon={Store} label="Retention" value={`${s.retentionRate}%`} tone="coral" />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SimpleChart label="Sales by category" values={s.salesByCategory} />
        <SoftCard className="space-y-3">
          <h3 className="font-extrabold">Operational ratios</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-[var(--dash-muted)]">Active vendors</span>
              <strong>{s.activeVendors}</strong>
            </li>
            <li className="flex justify-between">
              <span className="text-[var(--dash-muted)]">Average order value</span>
              <strong>{formatNaira(s.aovMinor)}</strong>
            </li>
            <li className="flex justify-between">
              <span className="text-[var(--dash-muted)]">Verified vets</span>
              <strong>{s.verifiedVetsPct}%</strong>
            </li>
          </ul>
        </SoftCard>
      </div>
    </DashboardShell>
  );
}
