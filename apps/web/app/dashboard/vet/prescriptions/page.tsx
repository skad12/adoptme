import { ActivityList } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionHeader } from "@/components/dashboard/section-header";
import { fetchVetDashboard } from "@/lib/dashboard";

export const metadata = { title: "Prescriptions" };

export default async function VetPrescriptionsPage() {
  const data = await fetchVetDashboard();

  return (
    <DashboardShell role="vet" title="Prescriptions" subtitle="Medications and diet plans issued to patients.">
      <SectionHeader title="Recent Rx" />
      <div className="mt-6">
        <ActivityList
          items={data.prescriptions.map((rx) => ({
            id: rx.id,
            title: `${rx.petName} · ${rx.medication}`,
            meta: `${rx.dosage} · issued ${rx.issuedAt}`,
            status: "issued",
            tone: "mint",
          }))}
        />
      </div>
    </DashboardShell>
  );
}
