import { ActivityList, PreviewBadge } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SoftCard } from "@/components/dashboard/soft-card";
import { fetchVetDashboard, formatWhen } from "@/lib/dashboard";

export const metadata = { title: "Vet schedule" };

export default async function VetSchedulePage() {
  const data = await fetchVetDashboard();

  return (
    <DashboardShell role="vet" title="Schedule" subtitle="In-person clinic slots and telemedicine follow-ups.">
      <SectionHeader title="Upcoming consults" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <ActivityList
          items={data.schedule.map((s) => ({
            id: s.id,
            title: `${s.petName} with ${s.ownerName}`,
            meta: `${formatWhen(s.at)} · ${s.type}`,
            status: s.status,
            tone: s.status === "pending" ? "coral" : "mint",
          }))}
        />
        <SoftCard className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold">Availability & tele slots</h3>
            <PreviewBadge />
          </div>
          <p className="text-sm text-[var(--dash-muted)]">Publish weekly hours and telemedicine windows. Owners book from Services.</p>
        </SoftCard>
      </div>
    </DashboardShell>
  );
}
