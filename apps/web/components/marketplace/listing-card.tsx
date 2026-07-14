import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SafeImage } from "@/components/ui/safe-image";
import type { ListingSummary } from "@/lib/api";
import { formatMoney } from "@/lib/money";

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
        <div className="relative aspect-4/3 overflow-hidden bg-[color-mix(in_srgb,var(--ui-muted)_8%,transparent)]">
          {img ? (
            <SafeImage
              src={img}
              alt={listing.title}
              fill
              className="transition duration-500 group-hover:scale-[1.04]"
              sizes="(max-width:768px) 100vw, 33vw"
            />
          ) : (
            <div className="ui-skeleton absolute inset-0" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(12_18_16_/_0.45)] via-transparent to-transparent" />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge>{listingTypeLabel(listing.type)}</Badge>
          </div>
        </div>
        <div className="space-y-2 p-4">
          <p className="line-clamp-2 text-[15px] font-semibold leading-snug text-[var(--ui-ink)]">{listing.title}</p>
          <p className="text-xs text-[var(--ui-muted)]">{[listing.pet.breed, listing.pet.species].filter(Boolean).join(" · ")}</p>
          <div className="flex items-center justify-between gap-2 pt-1">
            <p className="text-[15px] font-semibold text-[var(--ui-primary)]">{formatMoney(listing.priceCents, listing.currency)}</p>
            <p className="truncate text-xs text-[var(--ui-muted)]">{[listing.city, listing.country].filter(Boolean).join(", ")}</p>
          </div>
        </div>
      </Link>
    </Card>
  );
}
