import Link from "next/link";
import { notFound } from "next/navigation";
import { PetTypeNav } from "@/components/shop/pet-type-nav";
import { ProductCard } from "@/components/shop/product-card";
import { fetchProducts, fetchTaxonomy, PET_TYPE_LABELS, type PetTypeSlug } from "@/lib/catalog";

type PageProps = { params: Promise<{ petType: string; category: string; subcategory: string }> };

export default async function SubcategoryPage({ params }: PageProps) {
  const { petType, category, subcategory } = await params;

  const [{ petTypes }, { items, total }] = await Promise.all([
    fetchTaxonomy(),
    fetchProducts({ petType, category, subcategory, pageSize: "24" }),
  ]);

  const pet = petTypes.find((p) => p.slug === petType);
  const cat = pet?.categories.find((c) => c.slug === category);
  const sub = cat?.subcategories.find((s) => s.slug === subcategory);
  if (!pet || !cat || !sub) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
      <nav className="text-sm text-zinc-500">
        <Link href="/shop">Shop</Link> / <Link href={`/shop/${petType}`}>{PET_TYPE_LABELS[petType as PetTypeSlug]}</Link> /{" "}
        <Link href={`/shop/${petType}/${category}`}>{cat.name}</Link> / <span className="text-zinc-900 dark:text-zinc-100">{sub.name}</span>
      </nav>
      <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">{sub.name}</h1>
      <p className="text-sm text-zinc-600">{total} results</p>
      <PetTypeNav petTypes={petTypes} active={petType as PetTypeSlug} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
