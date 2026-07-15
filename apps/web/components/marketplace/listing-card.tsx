import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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
    <article className="group overflow-hidden rounded-[1.25rem] bg-[var(--ui-surface-solid)] shadow-[var(--ui-shadow)]">
      <Link href={`/pets/${listing.id}`} className="block">
        <div className="relative aspect-4/3 overflow-hidden bg-[var(--ui-mist)]">
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
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge className="border-0 bg-[var(--ui-accent)] text-[var(--ui-ink)] hover:bg-[var(--ui-accent)]">
              {listingTypeLabel(listing.type)}
            </Badge>
          </div>
        </div>
        <div className="space-y-2 p-4">
          <p className="line-clamp-2 text-[15px] font-semibold leading-snug text-[var(--ui-ink)]">{listing.title}</p>
          <p className="text-xs text-[var(--ui-muted)]">{[listing.pet.breed, listing.pet.species].filter(Boolean).join(" · ")}</p>
          <div className="flex items-center justify-between gap-2 pt-1">
            <p className="text-[15px] font-semibold text-[var(--ui-ink)]">{formatMoney(listing.priceCents, listing.currency)}</p>
            <p className="truncate text-xs text-[var(--ui-muted)]">{[listing.city, listing.country].filter(Boolean).join(", ")}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}
