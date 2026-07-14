import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchStores } from "@/lib/catalog";
import { Card } from "@/components/ui/card";

type PageProps = { params: Promise<{ stateCode: string }> };

export default async function StoreStatePage({ params }: PageProps) {
  const { stateCode } = await params;
  const { items } = await fetchStores({ state: stateCode });
  if (items.length === 0) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
      <nav className="text-sm text-zinc-500">
        <Link href="/stores">Stores</Link> / <span className="text-zinc-900 dark:text-zinc-100">{items[0].state}</span>
      </nav>
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Stores in {items[0].state}</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((store) => (
          <Card key={store.id} className="space-y-2 p-5">
            <Link href={`/stores/${store.stateCode}/${store.slug}`} className="font-semibold text-emerald-700 dark:text-emerald-400">
              {store.name}
            </Link>
            <p className="text-sm text-zinc-600">{store.address}, {store.city}</p>
            <p className="text-xs text-zinc-500">{store.hours}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
