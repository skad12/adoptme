import Link from "next/link";
import { notFound } from "next/navigation";
import { PetTypeNav } from "@/components/shop/pet-type-nav";
import { ProductCard } from "@/components/shop/product-card";
import { fetchProducts, fetchTaxonomy, PET_TYPE_LABELS, type PetTypeSlug } from "@/lib/catalog";

type PageProps = { params: Promise<{ petType: string; category: string }> };

export default async function CategoryPage({ params }: PageProps) {
  const { petType, category } = await params;

  const [{ petTypes }, { items, total }] = await Promise.all([
    fetchTaxonomy(),
    fetchProducts({ petType, category, pageSize: "24" }),
  ]);

  const pet = petTypes.find((p) => p.slug === petType);
  const cat = pet?.categories.find((c) => c.slug === category);
  if (!pet || !cat) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
      <nav className="text-sm text-zinc-500">
        <Link href="/shop">Shop</Link> / <Link href={`/shop/${petType}`}>{PET_TYPE_LABELS[petType as PetTypeSlug]}</Link> /{" "}
        <span className="text-zinc-900 dark:text-zinc-100">{cat.name}</span>
      </nav>
      <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">{cat.name}</h1>
      <p className="text-sm text-zinc-600">{total} results</p>
      <PetTypeNav petTypes={petTypes} active={petType as PetTypeSlug} />
      <div className="flex flex-wrap gap-2">
        {cat.subcategories.map((s) => (
          <Link key={s.slug} href={`/shop/${petType}/${category}/${s.slug}`} className="rounded-full border px-3 py-1 text-xs font-medium hover:border-emerald-500">
            {s.name}
          </Link>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
