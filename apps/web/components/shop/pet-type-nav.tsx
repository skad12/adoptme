import Link from "next/link";
import { cn } from "@/lib/utils";
import { PET_TYPE_LABELS, type PetType, type PetTypeSlug } from "@/lib/catalog";

export function PetTypeNav({ petTypes, active }: { petTypes: PetType[]; active?: PetTypeSlug }) {
  return (
    <div className="flex flex-wrap gap-2">
      {petTypes.map((pet) => (
        <Link
          key={pet.slug}
          href={`/shop/${pet.slug}`}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-primary)]",
            active === pet.slug
              ? "bg-[var(--ui-accent)] text-[var(--ui-ink)]"
              : "border border-[var(--ui-border)] bg-[var(--ui-surface-solid)] text-[var(--ui-ink)] hover:bg-[var(--ui-mist)]",
          )}
        >
          {PET_TYPE_LABELS[pet.slug as PetTypeSlug] ?? pet.name}
        </Link>
      ))}
    </div>
  );
}

export function CategoryLinks({ petType, categories }: { petType: string; categories: PetType["categories"] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <div key={cat.slug} className="rounded-[1.25rem] border border-[var(--ui-border)] bg-[var(--ui-mist)] p-5">
          <Link href={`/shop/${petType}/${cat.slug}`} className="text-sm font-semibold text-[var(--ui-ink)] hover:underline">
            {cat.name}
          </Link>
          <ul className="mt-3 space-y-1.5">
            {cat.subcategories.map((sub) => (
              <li key={sub.slug}>
                <Link
                  href={`/shop/${petType}/${cat.slug}/${sub.slug}`}
                  className="text-sm text-[var(--ui-muted)] transition hover:text-[var(--ui-ink)]"
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
