import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PetAvatar } from "@/components/dashboard/activity-list";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SoftCard } from "@/components/dashboard/soft-card";
import { fetchOwnerPets } from "@/lib/dashboard";

export const metadata = { title: "My pets" };

export default async function MyPetsPage() {
  const pets = await fetchOwnerPets();

  return (
    <DashboardShell role="customer" title="My pets" subtitle="Central profiles for nutrition, vaccines, microchips, and care reminders.">
      <SectionHeader title="Pet profiles" subtitle="Add health events and request appointments from each profile." />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pets.map((pet) => (
          <SoftCard key={pet.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <PetAvatar name={pet.name} imageUrl={pet.imageUrl} size="lg" />
              <div>
                <p className="text-lg font-extrabold">{pet.name}</p>
                <p className="text-sm text-[var(--dash-muted)]">{pet.breed} · {pet.species}</p>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-[var(--dash-muted)]">Weight</dt>
                <dd className="font-bold">{pet.weightKg} kg</dd>
              </div>
              <div>
                <dt className="text-[var(--dash-muted)]">Vaccines</dt>
                <dd className="font-bold">{pet.vaccinations.length}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[var(--dash-muted)]">Microchip</dt>
                <dd className="font-bold">{pet.microchipId ?? "Not registered"}</dd>
              </div>
            </dl>
            <Link href={`/dashboard/pets/${pet.id}`} className="dash-btn-primary">
              Open health journal
            </Link>
          </SoftCard>
        ))}
      </div>
    </DashboardShell>
  );
}
