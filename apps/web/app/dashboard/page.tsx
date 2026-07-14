import Link from "next/link";
import { CalendarDays, Gift, HeartHandshake, PawPrint, ShoppingBag, Sparkles } from "lucide-react";
import { ActivityList, PetAvatar, PreviewBadge, SimpleChart } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { KpiStat } from "@/components/dashboard/kpi-stat";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SoftCard } from "@/components/dashboard/soft-card";
import { fetchCustomerDashboard, formatNaira, formatWhen } from "@/lib/dashboard";

export const metadata = { title: "Pet parent dashboard" };

export default async function CustomerDashboardPage() {
  const data = await fetchCustomerDashboard();
  const upcoming = data.appointments.filter((a) => a.status !== "completed").slice(0, 4);
  const dueVaccines = data.pets.flatMap((pet) =>
    pet.vaccinations
      .filter((v) => new Date(v.nextDue) <= new Date(Date.now() + 1000 * 60 * 60 * 24 * 60))
      .map((v) => ({ pet: pet.name, vaccine: v.vaccineName, due: v.nextDue })),
  );

  return (
    <DashboardShell role="customer" title="Good care starts here" subtitle="Vaccines, appointments, orders, and pet health in one calm place.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiStat icon={PawPrint} label="Upcoming vaccines" value={String(data.summary.upcomingVaccines)} delta="Next 60 days" />
        <KpiStat
          icon={ShoppingBag}
          label="Spend this month"
          value={formatNaira(data.summary.spendMinorThisMonth)}
          delta="+12%"
          sparkline={[32, 40, 28, 55, 48, 62, 71]}
        />
        <KpiStat icon={Sparkles} label="PawRewards points" value={data.summary.loyaltyPoints.toLocaleString()} tone="coral" delta="Bestie tier" />
        <KpiStat icon={HeartHandshake} label="Donation impact" value={formatNaira(data.summary.donationImpactMinor)} tone="amber" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <SectionHeader title="Your pets" subtitle="Tap a profile for records and weight trends." actionHref="/dashboard/pets" actionLabel="Manage pets" />
          <div className="grid gap-4 sm:grid-cols-3">
            {data.pets.map((pet) => (
              <Link key={pet.id} href={`/dashboard/pets/${pet.id}`} className="dash-soft-card group block space-y-4 p-4">
                <div className="flex items-center gap-3">
                  <PetAvatar name={pet.name} imageUrl={pet.imageUrl} />
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold tracking-tight">{pet.name}</p>
                    <p className="truncate text-[13px] text-[var(--dash-muted)]">{pet.breed}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[13px] text-[var(--dash-muted)]">
                  <span>
                    {pet.weightKg} kg · {pet.species}
                  </span>
                  <span className="dash-pill bg-[var(--dash-mint-soft)] text-[var(--dash-mint)]">{pet.vaccinations.length} vax</span>
                </div>
              </Link>
            ))}
          </div>

          <SectionHeader title="Upcoming appointments" actionHref="/dashboard/appointments" actionLabel="View all" />
          <ActivityList
            items={upcoming.map((a) => ({
              id: a.id,
              title: `${a.petName} with ${a.vetName}`,
              meta: `${formatWhen(a.appointmentDate)} · ${a.type}`,
              status: a.status,
              tone: a.type === "tele" ? "coral" : "mint",
            }))}
          />
        </div>

        <div className="space-y-4">
          <SimpleChart label="Luna weight trend (kg)" values={data.pets[0]?.weightHistory ?? []} />
          <SoftCard className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-semibold tracking-tight">Vaccine reminders</h3>
              <CalendarDays className="h-4 w-4 text-[var(--dash-mint)]" aria-hidden />
            </div>
            {dueVaccines.length === 0 ? (
              <p className="text-sm leading-relaxed text-[var(--dash-muted)]">No vaccines due soon.</p>
            ) : (
              <ul className="space-y-3">
                {dueVaccines.map((item) => {
                  const due = new Date(item.due);
                  const days = Math.max(0, Math.ceil((due.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
                  const urgency = days <= 14 ? "coral" : "mint";
                  return (
                    <li key={`${item.pet}-${item.vaccine}`} className="rounded-2xl border border-[var(--dash-border)] bg-[color-mix(in_srgb,var(--dash-surface-solid)_70%,transparent)] p-3.5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold tracking-tight">
                            {item.pet} · {item.vaccine}
                          </p>
                          <p className="mt-1 text-[13px] text-[var(--dash-muted)]">Due {due.toLocaleDateString()}</p>
                        </div>
                        <span
                          className={
                            urgency === "coral"
                              ? "dash-pill bg-[var(--dash-coral-soft)] text-[var(--dash-coral)]"
                              : "dash-pill bg-[var(--dash-mint-soft)] text-[var(--dash-mint)]"
                          }
                        >
                          {days}d
                        </span>
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--dash-border)]">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, Math.max(8, 100 - days))}%`,
                            background:
                              urgency === "coral"
                                ? "linear-gradient(90deg, var(--dash-coral), #ffb199)"
                                : "linear-gradient(90deg, var(--dash-mint), var(--dash-mint-bright))",
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </SoftCard>
          <SoftCard className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-semibold tracking-tight">Autoship</h3>
              <PreviewBadge />
            </div>
            <p className="text-sm leading-relaxed text-[var(--dash-muted)]">
              {data.summary.subscriptionsActive} active food plan. Manage recurring deliveries and never miss a refill.
            </p>
            <Link href="/shop" className="inline-flex text-sm font-semibold text-[var(--dash-mint)] hover:underline">
              Browse autoship products
            </Link>
          </SoftCard>
          <SoftCard className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-semibold tracking-tight">Quick actions</h3>
              <Gift className="h-4 w-4 text-[var(--dash-coral)]" aria-hidden />
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/services" className="dash-btn-primary">
                Book vet
              </Link>
              <Link
                href="/marketplace?type=ADOPTION"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[var(--dash-coral)] to-[#ff9a7a] px-4 py-2 text-sm font-bold text-white shadow-md shadow-[color-mix(in_srgb,var(--dash-coral)_35%,transparent)] transition hover:brightness-105"
              >
                Adopt
              </Link>
              <Link href="/donations" className="dash-btn-ghost">
                Donate
              </Link>
            </div>
          </SoftCard>
        </div>
      </div>
    </DashboardShell>
  );
}
