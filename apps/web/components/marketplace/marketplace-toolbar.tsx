import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  query?: Record<string, string | undefined>;
};

function buildHref(base: Record<string, string | undefined>, patch: Record<string, string | undefined>) {
  const qs = new URLSearchParams();
  const merged = { ...base, ...patch };
  Object.entries(merged).forEach(([k, v]) => {
    if (v) qs.set(k, v);
  });
  const s = qs.toString();
  return s ? `?${s}` : "/marketplace";
}

export function MarketplaceToolbar({ query = {} }: Props) {
  const type = query.type;
  const category = query.category;
  const sort = query.sort ?? "newest";
  const q = query.q ?? "";

  const types: { id?: string; label: string }[] = [
    { id: undefined, label: "All" },
    { id: "SALE", label: "Buy / Sell" },
    { id: "BREEDING", label: "Breeding Animals" },
    { id: "EXCHANGE", label: "Exchange" },
    { id: "ADOPTION", label: "Adoption" },
  ];

  const sorts = [
    { id: "newest", label: "Newest" },
    { id: "price_asc", label: "Price ↑" },
    { id: "price_desc", label: "Price ↓" },
  ];

  const categories: { id?: string; label: string }[] = [
    { id: undefined, label: "All pets" },
    { id: "dogs", label: "Dogs" },
    { id: "cats", label: "Cats" },
    { id: "birds", label: "Birds" },
    { id: "fish", label: "Fish" },
    { id: "reptile", label: "Reptile" },
    { id: "small-pet", label: "Small Pet" },
  ];

  return (
    <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-white p-4 dark:border-zinc-800/80 dark:bg-zinc-950">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <Link
              key={t.label}
              href={buildHref(query, { type: t.id, page: "1" })}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition",
                (type ?? undefined) === (t.id ?? undefined)
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
              )}
            >
              {t.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Sort</span>
          {sorts.map((s) => (
            <Link
              key={s.id}
              href={buildHref(query, { sort: s.id, page: "1" })}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition",
                sort === s.id
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
              )}
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Animal</span>
          {categories.map((c) => (
            <Link
              key={c.label}
              href={buildHref(query, { category: c.id, page: "1" })}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition",
                (category ?? undefined) === (c.id ?? undefined)
                  ? "bg-amber-500 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
              )}
            >
              {c.label}
            </Link>
          ))}
        </div>
        <form className="w-full lg:w-80" action="/marketplace" method="get">
          {type ? <input type="hidden" name="type" value={type} /> : null}
          {category ? <input type="hidden" name="category" value={category} /> : null}
          <input type="hidden" name="sort" value={sort} />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search breed, title, keywords…"
            className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none ring-emerald-500/30 focus:border-emerald-500 focus:ring-4 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          />
        </form>
      </div>
    </div>
  );
}
