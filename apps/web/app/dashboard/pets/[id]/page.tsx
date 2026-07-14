import Link from "next/link";
import { notFound } from "next/navigation";
import { PreviewBadge, SimpleChart } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SoftCard } from "@/components/dashboard/soft-card";
import { fetchOwnerPet } from "@/lib/dashboard";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const pet = await fetchOwnerPet(id);
  return { title: pet ? `${pet.name} · Pet profile` : "Pet profile" };
}

export default async function PetDetailDashboardPage({ params }: PageProps) {
  const { id } = await params;
  const pet = await fetchOwnerPet(id);
  if (!pet) notFound();

  return (
    <DashboardShell role="customer" title={pet.name} subtitle={`${pet.breed} · born ${pet.birthdate}`}>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <SoftCard className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold">Medical timeline</h2>
            <Link href="/dashboard/appointments" className="text-sm font-bold text-[var(--dash-mint)] hover:underline">
              Request appointment
            </Link>
          </div>
          {pet.vaccinations.length === 0 ? (
            <p className="text-sm text-[var(--dash-muted)]">No vaccination records yet. Add your first shot to unlock reminders.</p>
          ) : (
            <ul className="space-y-3">
              {pet.vaccinations.map((v) => (
                <li key={v.id} className="rounded-2xl border border-[var(--dash-border)] p-4">
                  <p className="font-bold">{v.vaccineName}</p>
                  <p className="mt-1 text-sm text-[var(--dash-muted)]">
                    Given {v.dateGiven} · next due {v.nextDue}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <div className="rounded-2xl bg-[var(--dash-mint-soft)] p-4">
            <div className="flex items-center justify-between">
              <p className="font-bold">Telemedicine consult</p>
              <PreviewBadge />
            </div>
            <p className="mt-1 text-sm text-[var(--dash-muted)]">Start a secure video visit once your vet confirms a tele slot.</p>
          </div>
        </SoftCard>
        <div className="space-y-4">
          <SimpleChart label="Weight history" values={pet.weightHistory} />
          <SoftCard className="space-y-2 text-sm">
            <p>
              <span className="text-[var(--dash-muted)]">Species:</span> <strong>{pet.species}</strong>
            </p>
            <p>
              <span className="text-[var(--dash-muted)]">Microchip:</span> <strong>{pet.microchipId ?? "Not set"}</strong>
            </p>
            <p>
              <span className="text-[var(--dash-muted)]">Current weight:</span> <strong>{pet.weightKg} kg</strong>
            </p>
          </SoftCard>
        </div>
      </div>
    </DashboardShell>
  );
}
