import Link from "next/link";
import { ArrowRight, Calendar, Scissors, GraduationCap, Stethoscope, Sun } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SafeImage } from "@/components/ui/safe-image";
import { fetchServices, SERVICE_LABELS, type ServiceType } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";

const SERVICE_ICONS: Record<ServiceType, typeof Scissors> = {
  GROOMING: Scissors,
  TRAINING: GraduationCap,
  DAY_CAMP: Sun,
  VET_CARE: Stethoscope,
};

export default async function ServicesPage() {
  const { items } = await fetchServices();

  return (
    <div className="ui-container motion-page space-y-12 py-12 sm:py-14">
      <div className="space-y-4">
        <p className="ui-micro text-[var(--ui-primary)]">Pet Services</p>
        <h1 className="ui-page-title text-[var(--ui-ink)]">Book expert pet care</h1>
        <p className="ui-body max-w-2xl text-[var(--ui-muted)]">
          Grooming, training, day camp, and veterinary care at your local AdoptMe store. Overnight boarding is not offered.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((service) => {
          const Icon = SERVICE_ICONS[service.type];
          return (
            <Card key={service.id} className="overflow-hidden p-0">
              <div className="relative h-52 overflow-hidden bg-[color-mix(in_srgb,var(--ui-muted)_10%,transparent)]">
                <SafeImage src={service.imageUrl} alt={service.name} fill sizes="50vw" className="transition duration-500 hover:scale-[1.03]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(12_18_16_/_0.35)] via-transparent to-transparent" />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--ui-primary-soft)] text-[var(--ui-primary)]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-semibold tracking-tight text-[var(--ui-ink)]">{service.name}</h2>
                    <p className="text-xs text-[var(--ui-muted)]">{SERVICE_LABELS[service.type]}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[var(--ui-muted)]">{service.summary}</p>
                <p className="text-sm font-semibold text-[var(--ui-primary)]">
                  From {formatMoney(service.priceFromMinor, service.currency)} · {service.duration}
                </p>
                <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ui-primary)]">
                  Book now <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Calendar className="mt-0.5 h-5 w-5 text-[var(--ui-primary)]" aria-hidden />
          <div>
            <p className="font-semibold text-[var(--ui-ink)]">Need a consult sooner?</p>
            <p className="mt-1 text-sm text-[var(--ui-muted)]">Open your parent dashboard to request telemedicine or in-clinic slots.</p>
          </div>
        </div>
        <Link href="/dashboard/appointments" className="ui-btn-primary inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold">
          Open appointments
        </Link>
      </Card>
    </div>
  );
}
