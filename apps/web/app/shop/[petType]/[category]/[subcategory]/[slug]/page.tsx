import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
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
      <nav className="text-sm text-[var(--ui-muted)]">
        <Link href="/shop">Shop</Link>
        {" / "}
        <Link href={`/shop/${petType}`}>{PET_TYPE_LABELS[petType as PetTypeSlug]}</Link>
        {" / "}
        <Link href={`/shop/${petType}/${category}`}>{category.replace(/-/g, " ")}</Link>
        {" / "}
        <Link href={`/shop/${petType}/${category}/${subcategory}`}>{subcategory.replace(/-/g, " ")}</Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-[var(--ui-mist)]">
          <SafeImage src={product.imageUrl} alt={product.name} fill priority sizes="(max-width:1024px) 100vw, 50vw" />
        </div>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {product.isNew ? <Badge className="border-0 bg-[var(--ui-accent)] text-[var(--ui-ink)]">New</Badge> : null}
            {product.autoshipEligible ? (
              <Badge className="border-0 bg-[var(--ui-primary)] text-white hover:bg-[var(--ui-primary)]">Autoship eligible</Badge>
            ) : null}
          </div>
          <div>
            <p className="text-sm text-[var(--ui-muted)]">{product.brand}</p>
            <h1 className="ui-display mt-1 text-3xl text-[var(--ui-ink)]">{product.name}</h1>
            <p className="mt-2 text-sm text-[var(--ui-muted)]">
              ★ {product.rating} ({product.reviewCount} reviews)
            </p>
          </div>
          <p className="text-2xl font-semibold text-[var(--ui-ink)]">{formatMoney(product.priceMinor, product.currency)}</p>
          <p className="text-sm leading-relaxed text-[var(--ui-muted)]">{product.description}</p>
          <Card className="space-y-2 border-0 bg-[var(--ui-mist)] p-4 text-sm shadow-none">
            <p className="font-semibold text-[var(--ui-ink)]">Fulfillment options</p>
            <ul className="space-y-1 text-[var(--ui-muted)]">
              <li>Ship to home — free on {formatMoney(REWARDS.freeShippingThresholdMinor)}+</li>
              <li>Store pickup — ready in ~2 hours</li>
              <li>Same-day delivery — select areas</li>
              {product.autoshipEligible ? <li>Autoship — 35% off first order</li> : null}
            </ul>
          </Card>
          <div className="flex flex-wrap items-center gap-3">
            <AddToCartButton product={product} />
            <Link
              href="/stores"
              className="inline-flex h-11 items-center rounded-full border border-[var(--ui-border-strong)] px-6 text-sm font-semibold text-[var(--ui-ink)] hover:bg-[var(--ui-mist)]"
            >
              Check store availability
            </Link>
          </div>
        </div>
      </div>

      {related.filter((p) => p.id !== product.id).length > 0 ? (
        <section className="space-y-4">
          <h2 className="ui-display text-xl text-[var(--ui-ink)]">You may also like</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  href={productPath(p)}
                  className="rounded-xl border border-[var(--ui-border)] p-3 text-sm transition hover:border-[var(--ui-primary)]"
                >
                  <p className="line-clamp-2 font-medium text-[var(--ui-ink)]">{p.name}</p>
                  <p className="mt-1 font-semibold text-[var(--ui-ink)]">{formatMoney(p.priceMinor)}</p>
                </Link>
              ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
