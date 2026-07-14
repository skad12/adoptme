import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SafeImage } from "@/components/ui/safe-image";
import { fetchProduct, fetchProducts, PET_TYPE_LABELS, productPath, type PetTypeSlug } from "@/lib/catalog";
import { formatMoney, REWARDS } from "@/lib/money";

type PageProps = { params: Promise<{ petType: string; category: string; subcategory: string; slug: string }> };

export default async function ProductDetailPage({ params }: PageProps) {
  const { petType, category, subcategory, slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) notFound();

  const { items: related } = await fetchProducts({
    petType: product.petType,
    category: product.categorySlug,
    pageSize: "4",
  });

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6">
      <nav className="text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/shop">Shop</Link>
        {" / "}
        <Link href={`/shop/${petType}`}>{PET_TYPE_LABELS[petType as PetTypeSlug]}</Link>
        {" / "}
        <Link href={`/shop/${petType}/${category}`}>{category.replace(/-/g, " ")}</Link>
        {" / "}
        <Link href={`/shop/${petType}/${category}/${subcategory}`}>{subcategory.replace(/-/g, " ")}</Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-zinc-100 dark:bg-zinc-900">
          <SafeImage src={product.imageUrl} alt={product.name} fill priority sizes="(max-width:1024px) 100vw, 50vw" />
        </div>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {product.isNew ? <Badge>New</Badge> : null}
            {product.autoshipEligible ? <Badge className="bg-emerald-600 text-white">Autoship eligible</Badge> : null}
          </div>
          <div>
            <p className="text-sm text-zinc-500">{product.brand}</p>
            <h1 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{product.name}</h1>
            <p className="mt-2 text-sm text-zinc-500">
              ★ {product.rating} ({product.reviewCount} reviews)
            </p>
          </div>
          <p className="text-2xl font-semibold text-emerald-700 dark:text-emerald-400">{formatMoney(product.priceMinor, product.currency)}</p>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{product.description}</p>
          <Card className="space-y-2 bg-zinc-50 p-4 text-sm dark:bg-zinc-900">
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">Fulfillment options</p>
            <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>Ship to home — free on {formatMoney(REWARDS.freeShippingThresholdMinor)}+</li>
              <li>Store pickup — ready in ~2 hours</li>
              <li>Same-day delivery — select areas</li>
              {product.autoshipEligible ? <li>Autoship — 35% off first order</li> : null}
            </ul>
          </Card>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="inline-flex h-11 items-center rounded-full bg-emerald-600 px-8 text-sm font-semibold text-white hover:bg-emerald-700">
              Add to cart
            </button>
            <Link href="/stores" className="inline-flex h-11 items-center rounded-full border border-zinc-300 px-6 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100">
              Check store availability
            </Link>
          </div>
        </div>
      </div>

      {related.filter((p) => p.id !== product.id).length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">You may also like</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <Link key={p.id} href={productPath(p)} className="rounded-xl border border-zinc-200 p-3 text-sm hover:border-emerald-500 dark:border-zinc-800">
                  <p className="font-medium line-clamp-2">{p.name}</p>
                  <p className="mt-1 text-emerald-700 dark:text-emerald-400">{formatMoney(p.priceMinor)}</p>
                </Link>
              ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
