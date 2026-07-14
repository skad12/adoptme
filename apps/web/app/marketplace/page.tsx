import Link from "next/link";
import type { Metadata } from "next";
import { ListingCard } from "@/components/marketplace/listing-card";
import { MarketplaceToolbar } from "@/components/marketplace/marketplace-toolbar";
import { fetchListings } from "@/lib/listing-data";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Search and filter pet listings, including sales, exchanges, adoptions, and responsible breeding.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function pick(sp: SearchParams, key: string) {
  const v = sp[key];
  return Array.isArray(v) ? v[0] : v;
}

export default async function MarketplacePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const q = pick(sp, "q");
  const type = pick(sp, "type");
  const sort = pick(sp, "sort");
  const page = pick(sp, "page");
  const category = pick(sp, "category");

  const data = await fetchListings({
    q,
    type,
    sort: sort ?? "newest",
    page: page ?? "1",
    pageSize: "12",
    category,
  });

  const totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));

  return (
    <div className="ui-container motion-page space-y-8 py-10 sm:py-12">
      <div className="space-y-3">
        <p className="ui-micro text-[var(--ui-primary)]">Marketplace</p>
        <h1 className="ui-page-title text-[var(--ui-ink)]">Marketplace</h1>
        <p className="ui-body max-w-2xl text-[var(--ui-muted)]">
          Browse pet listings with filters for dogs, cats, birds, breeding, sales, exchanges, and adoptions. Review care notes before you contact a family, shelter, or breeder.
        </p>
      </div>

      <MarketplaceToolbar query={{ q, type, sort: sort ?? "newest", category }} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.length === 0 ? (
          <p className="col-span-full rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700">
            No listings match these filters yet. Try another pet category, search term, or listing type.
          </p>
        ) : (
          data.items.map((l) => <ListingCard key={l.id} listing={l} />)
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          Page {data.page} of {totalPages} · {data.total} results
        </p>
        <div className="flex gap-2">
          {data.page > 1 ? (
            <Link
              className="rounded-lg border border-zinc-300 px-3 py-1 font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
              href={`/marketplace?${new URLSearchParams({
                ...(q ? { q } : {}),
                ...(type ? { type } : {}),
                ...(sort ? { sort } : {}),
                ...(category ? { category } : {}),
                page: String(data.page - 1),
              }).toString()}`}
            >
              Previous
            </Link>
          ) : null}
          {data.page < totalPages ? (
            <Link
              className="rounded-lg border border-zinc-300 px-3 py-1 font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
              href={`/marketplace?${new URLSearchParams({
                ...(q ? { q } : {}),
                ...(type ? { type } : {}),
                ...(sort ? { sort } : {}),
                ...(category ? { category } : {}),
                page: String(data.page + 1),
              }).toString()}`}
            >
              Next
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
