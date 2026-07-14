import { ActivityList } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SoftCard } from "@/components/dashboard/soft-card";
import { PreviewBadge } from "@/components/dashboard/activity-list";
import { fetchCustomerDashboard, formatNaira, formatWhen } from "@/lib/dashboard";

export const metadata = { title: "Orders" };

export default async function OrdersPage() {
  const data = await fetchCustomerDashboard();

  return (
    <DashboardShell role="customer" title="Orders" subtitle="Multi-vendor cart history, shipping, and returns.">
      <SectionHeader title="Recent purchases" actionHref="/shop" actionLabel="Continue shopping" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <ActivityList
          items={data.orders.map((o) => ({
            id: o.id,
            title: o.title,
            meta: `${formatNaira(o.amountMinor)} · ${formatWhen(o.createdAt)}`,
            status: o.status,
            tone: o.status === "processing" ? "coral" : "mint",
          }))}
        />
        <SoftCard className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold">Returns & disputes</h3>
            <PreviewBadge />
          </div>
          <p className="text-sm text-[var(--dash-muted)]">Open a return from order history. Admins mediate when vendors need support.</p>
        </SoftCard>
      </div>
    </DashboardShell>
  );
}
