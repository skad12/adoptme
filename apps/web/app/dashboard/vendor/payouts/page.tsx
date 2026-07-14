import { ActivityList, PreviewBadge } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SoftCard } from "@/components/dashboard/soft-card";
import { fetchVendorDashboard, formatNaira } from "@/lib/dashboard";

export const metadata = { title: "Vendor payouts" };

export default async function VendorPayoutsPage() {
  const data = await fetchVendorDashboard();

  return (
    <DashboardShell role="vendor" title="Payouts" subtitle="Settlement periods for Paystack and Stripe-ready payouts.">
      <SectionHeader title="Settlement history" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <ActivityList
          items={data.payouts.map((p) => ({
            id: p.id,
            title: p.period,
            meta: formatNaira(p.amountMinor),
            status: p.status,
            tone: p.status === "pending" ? "coral" : "mint",
          }))}
        />
        <SoftCard className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold">Bank & payout rails</h3>
            <PreviewBadge />
          </div>
          <p className="text-sm text-[var(--dash-muted)]">Connect Paystack or Stripe Express to receive automatic weekly settlements.</p>
        </SoftCard>
      </div>
    </DashboardShell>
  );
}
