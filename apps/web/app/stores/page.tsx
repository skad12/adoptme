import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { fetchStores, SERVICE_LABELS, type ServiceType } from "@/lib/catalog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function StoresPage() {
  const { items, byState } = await fetchStores();

  return (
    <div className="ui-container motion-page space-y-12 py-12 sm:py-14">
      <div className="space-y-4">
        <p className="ui-micro text-[var(--ui-primary)]">Store Locator</p>
        <h1 className="ui-page-title text-[var(--ui-ink)]">Find an AdoptMe store</h1>
        <p className="ui-body max-w-2xl text-[var(--ui-muted)]">
          Browse locations across Nigeria for in-store shopping, grooming, training, day camp, and vet care.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {byState.map((group) => (
          <Link
            key={group.stateCode}
            href={`/stores/${group.stateCode}`}
            className="ui-glass motion-card block p-5 transition"
          >
            <p className="font-semibold tracking-tight text-[var(--ui-ink)]">{group.state}</p>
            <p className="mt-1 text-sm text-[var(--ui-muted)]">
              {group.stores.length} store{group.stores.length !== 1 ? "s" : ""}
            </p>
          </Link>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="ui-section-title text-[var(--ui-ink)]">All locations</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((store) => (
            <Card key={store.id} className="space-y-3 p-5">
              <Link href={`/stores/${store.stateCode}/${store.slug}`} className="font-semibold tracking-tight text-[var(--ui-ink)] hover:text-[var(--ui-primary)]">
                {store.name}
              </Link>
              <p className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {store.address}, {store.city}, {store.state}
              </p>
              <p className="flex items-center gap-2 text-sm text-zinc-600">
                <Phone className="h-4 w-4" /> {store.phone}
              </p>
              <p className="text-xs text-zinc-500">{store.hours}</p>
              <div className="flex flex-wrap gap-1.5">
                {store.services.map((s) => (
                  <Badge key={s} className="border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    {SERVICE_LABELS[s as ServiceType]}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
