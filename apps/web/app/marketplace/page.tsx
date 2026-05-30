import Link from "next/link";
import type { Metadata } from "next";
import { ListingCard } from "@/components/marketplace/listing-card";
import { MarketplaceToolbar } from "@/components/marketplace/marketplace-toolbar";
import { fetchListings } from "@/lib/api";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Search and filter pet listings — sales, exchanges, and adoptions with escrow-aware checkout.",
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
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Marketplace</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Browse verified-style listings with advanced filters. Escrow protects purchases and exchanges; adoption listings follow a separate application flow.
        </p>
      </div>

      <MarketplaceToolbar query={{ q, type, sort: sort ?? "newest", category }} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.length === 0 ? (
          <p className="col-span-full rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700">
            No listings yet. Start the API to load demo data from the local JSON store.
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
