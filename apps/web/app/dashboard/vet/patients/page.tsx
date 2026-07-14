import { PetAvatar } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SoftCard } from "@/components/dashboard/soft-card";
import { fetchVetDashboard } from "@/lib/dashboard";

export const metadata = { title: "Vet patients" };

export default async function VetPatientsPage() {
  const data = await fetchVetDashboard();

  return (
    <DashboardShell role="vet" title="Patients" subtitle="Pets with active care relationships in your practice.">
      <SectionHeader title="Patient roster" />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.patients.map((p) => (
          <SoftCard key={p.id} className="space-y-3">
            <div className="flex items-center gap-3">
              <PetAvatar name={p.name} imageUrl={p.imageUrl} size="lg" />
              <div>
                <p className="text-lg font-extrabold">{p.name}</p>
                <p className="text-sm text-[var(--dash-muted)]">{p.species}</p>
              </div>
            </div>
            <p className="text-sm">
              Owner: <strong>{p.ownerName}</strong>
            </p>
            <p className="text-sm text-[var(--dash-muted)]">Last visit {p.lastVisit}</p>
          </SoftCard>
        ))}
      </div>
    </DashboardShell>
  );
}
