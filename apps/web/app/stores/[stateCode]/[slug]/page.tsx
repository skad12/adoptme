import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone } from "lucide-react";
import { fetchStores, SERVICE_LABELS, type ServiceType } from "@/lib/catalog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PageProps = { params: Promise<{ stateCode: string; slug: string }> };

export default async function StoreDetailPage({ params }: PageProps) {
  const { stateCode, slug } = await params;
  const { items } = await fetchStores();
  const store = items.find((s) => s.stateCode === stateCode && s.slug === slug);
  if (!store) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6">
      <nav className="text-sm text-zinc-500">
        <Link href="/stores">Stores</Link> / <Link href={`/stores/${stateCode}`}>{store.state}</Link> /{" "}
        <span className="text-zinc-900 dark:text-zinc-100">{store.name}</span>
      </nav>
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{store.name}</h1>
      <Card className="space-y-4 p-6">
        <p className="flex items-start gap-2 text-sm">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          {store.address}, {store.city}, {store.state}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-emerald-600" /> {store.phone}
        </p>
        <p className="text-sm text-zinc-600">{store.hours}</p>
        <div>
          <p className="mb-2 text-sm font-semibold">Services at this location</p>
          <div className="flex flex-wrap gap-2">
            {store.services.map((s) => (
              <Badge key={s}>{SERVICE_LABELS[s as ServiceType]}</Badge>
            ))}
          </div>
        </div>
      </Card>
      <Link href="/services" className="inline-flex text-sm font-semibold text-emerald-700 dark:text-emerald-400">
        Book a service at this store →
      </Link>
    </div>
  );
}
