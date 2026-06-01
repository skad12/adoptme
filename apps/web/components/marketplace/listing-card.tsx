import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ListingSummary } from "@/lib/api";

function formatMoney(cents: number | null, currency: string) {
  if (cents == null) return "Ask";
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(cents / 100);
}

function listingTypeLabel(type: ListingSummary["type"]) {
  if (type === "SALE") return "Sale";
  if (type === "EXCHANGE") return "Exchange";
  if (type === "BREEDING") return "Breeding";
  return "Adoption";
}

export function ListingCard({ listing }: { listing: ListingSummary }) {
  const img = listing.images[0]?.url;
  return (
    <Card className="group overflow-hidden p-0">
      <Link href={`/pets/${listing.id}`} className="block">
        <div className="relative aspect-4/3 bg-zinc-100 dark:bg-zinc-900">
          {img ? (
            <Image
              src={img}
              alt={listing.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width:768px) 100vw, 33vw"
            />
          ) : null}
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge>{listingTypeLabel(listing.type)}</Badge>
          </div>
        </div>
        <div className="space-y-2 p-4">
          <p className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-50">{listing.title}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {[listing.pet.breed, listing.pet.species].filter(Boolean).join(" · ")}
          </p>
          <div className="flex items-center justify-between pt-1">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{formatMoney(listing.priceCents, listing.currency)}</p>
            <p className="text-xs text-zinc-400">{[listing.city, listing.country].filter(Boolean).join(", ")}</p>
          </div>
        </div>
      </Link>
    </Card>
  );
}
