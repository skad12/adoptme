import Link from "next/link";
import { Pill, Stethoscope, Users, Wallet } from "lucide-react";
import { ActivityList, PetAvatar, PreviewBadge } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { KpiStat } from "@/components/dashboard/kpi-stat";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SoftCard } from "@/components/dashboard/soft-card";
import { fetchVetDashboard, formatNaira, formatWhen } from "@/lib/dashboard";

export const metadata = { title: "Vet dashboard" };

export default async function VetDashboardPage() {
  const data = await fetchVetDashboard();

  return (
    <DashboardShell role="vet" title="Clinic overview" subtitle="Consult load, schedule, prescriptions, and earnings in one place.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiStat icon={Stethoscope} label="Consults this month" value={String(data.summary.consultsThisMonth)} />
        <KpiStat icon={Users} label="Patient load" value={String(data.summary.patientLoad)} />
        <KpiStat icon={Pill} label="Rx issued" value={String(data.summary.prescriptionsIssued)} tone="coral" />
        <KpiStat icon={Wallet} label="Earnings" value={formatNaira(data.summary.earningsMinor)} delta={`${data.summary.averageRating}★`} />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <SectionHeader title="Today & upcoming" actionHref="/dashboard/vet/schedule" actionLabel="Full schedule" />
          <ActivityList
            items={data.schedule.map((s) => ({
              id: s.id,
              title: `${s.petName} · ${s.ownerName}`,
              meta: `${formatWhen(s.at)} · ${s.type}`,
              status: s.status,
              tone: s.type === "tele" ? "coral" : "mint",
            }))}
          />
        </div>
        <div className="space-y-4">
          <SectionHeader title="Recent patients" actionHref="/dashboard/vet/patients" actionLabel="All patients" />
          <div className="space-y-3">
            {data.patients.slice(0, 3).map((p) => (
              <SoftCard key={p.id} className="flex items-center gap-3 p-4">
                <PetAvatar name={p.name} imageUrl={p.imageUrl} />
                <div>
                  <p className="font-extrabold">{p.name}</p>
                  <p className="text-xs text-[var(--dash-muted)]">
                    {p.species} · last visit {p.lastVisit}
                  </p>
                </div>
              </SoftCard>
            ))}
          </div>
          <SoftCard className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold">Telemedicine room</h3>
              <PreviewBadge />
            </div>
            <p className="text-sm text-[var(--dash-muted)]">Join video consults from confirmed tele appointments. WebRTC rooms appear here.</p>
            <Link href="/dashboard/vet/prescriptions" className="text-sm font-bold text-[var(--dash-mint)] hover:underline">
              Review prescriptions
            </Link>
          </SoftCard>
        </div>
      </div>
    </DashboardShell>
  );
}
