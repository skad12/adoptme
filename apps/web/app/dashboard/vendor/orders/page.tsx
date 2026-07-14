import { ActivityList, PreviewBadge } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SoftCard } from "@/components/dashboard/soft-card";
import { fetchVendorDashboard, formatNaira, formatWhen } from "@/lib/dashboard";

export const metadata = { title: "Vendor orders" };

export default async function VendorOrdersPage() {
  const data = await fetchVendorDashboard();

  return (
    <DashboardShell role="vendor" title="Orders" subtitle="Fulfilment queue with buyer messaging and shipping statuses.">
      <SectionHeader title="Open and recent orders" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <ActivityList
          items={data.orders.map((o) => ({
            id: o.id,
            title: `${o.buyer} · ${o.items} items`,
            meta: `${formatNaira(o.amountMinor)} · ${formatWhen(o.createdAt)}`,
            status: o.status,
            tone: o.status === "pending" ? "coral" : "mint",
          }))}
        />
        <SoftCard className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold">Dispute center</h3>
            <PreviewBadge />
          </div>
          <p className="text-sm text-[var(--dash-muted)]">Respond to returns and refunds from one thread. Admin mediation available when needed.</p>
        </SoftCard>
      </div>
    </DashboardShell>
  );
}
