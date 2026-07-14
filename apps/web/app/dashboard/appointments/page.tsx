import { ActivityList } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SoftCard } from "@/components/dashboard/soft-card";
import { PreviewBadge } from "@/components/dashboard/activity-list";
import { fetchCustomerDashboard, formatWhen } from "@/lib/dashboard";

export const metadata = { title: "Appointments" };

export default async function AppointmentsPage() {
  const data = await fetchCustomerDashboard();

  return (
    <DashboardShell role="customer" title="Appointments" subtitle="In-clinic and telemedicine bookings for your pets.">
      <SectionHeader title="Schedule" subtitle="Symptom notes and pet profiles travel with every booking." actionHref="/services" actionLabel="Book new visit" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <ActivityList
          items={data.appointments.map((a) => ({
            id: a.id,
            title: `${a.petName} · ${a.vetName}`,
            meta: `${formatWhen(a.appointmentDate)} · ${a.notes}`,
            status: `${a.status} · ${a.type}`,
            tone: a.status === "pending" ? "coral" : "mint",
          }))}
        />
        <SoftCard className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold">Video consult room</h3>
            <PreviewBadge />
          </div>
          <p className="text-sm text-[var(--dash-muted)]">Join secure telehealth sessions after payment confirmation. WebRTC room links appear here.</p>
        </SoftCard>
      </div>
    </DashboardShell>
  );
}
