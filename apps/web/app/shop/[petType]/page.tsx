import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryLinks, PetTypeNav } from "@/components/shop/pet-type-nav";
import { ProductCard } from "@/components/shop/product-card";
import { fetchProducts, fetchTaxonomy, PET_TYPE_LABELS, type PetTypeSlug } from "@/lib/catalog";

type PageProps = { params: Promise<{ petType: string }> };

const VALID: PetTypeSlug[] = ["dog", "cat", "fish", "bird", "reptile", "small-pet", "farm-animal"];

export default async function PetShopPage({ params }: PageProps) {
  const { petType } = await params;
  if (!VALID.includes(petType as PetTypeSlug)) notFound();

  const [{ petTypes }, { items }] = await Promise.all([
    fetchTaxonomy(),
    fetchProducts({ petType, pageSize: "12" }),
  ]);

  const pet = petTypes.find((p) => p.slug === petType);
  if (!pet) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
          {PET_TYPE_LABELS[petType as PetTypeSlug]} Shop
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {PET_TYPE_LABELS[petType as PetTypeSlug]} supplies
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{pet.description}</p>
      </div>

      <PetTypeNav petTypes={petTypes} active={petType as PetTypeSlug} />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Browse categories</h2>
        <CategoryLinks petType={petType} categories={pet.categories} />
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Popular products</h2>
        {items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-300 p-8 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
            No products in this category yet.{" "}
            <Link href="/shop" className="font-semibold text-emerald-700 dark:text-emerald-400">
              Browse all shop
            </Link>
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
