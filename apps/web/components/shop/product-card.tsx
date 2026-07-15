"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SafeImage } from "@/components/ui/safe-image";
import { useCart } from "@/components/shop/cart-provider";
import { formatMoney } from "@/lib/money";
import { productPath, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="group">
      <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-[var(--ui-mist)]">
        <Link href={productPath(product)} className="absolute inset-0 block">
          <SafeImage
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4 transition duration-500 group-hover:scale-[1.04]"
            sizes="(max-width:768px) 50vw, 25vw"
          />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2">
          {product.isNew ? (
            <Badge className="border-0 bg-[var(--ui-accent)] text-[var(--ui-ink)] hover:bg-[var(--ui-accent)]">New</Badge>
          ) : null}
          {product.autoshipEligible ? (
            <Badge className="border-0 bg-[var(--ui-primary)] text-white hover:bg-[var(--ui-primary)]">Autoship</Badge>
          ) : null}
        </div>
        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          onClick={() => addItem(product, 1)}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ui-primary)] text-white opacity-100 shadow-md transition hover:bg-[var(--ui-primary-bright)] sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Plus className="h-5 w-5" aria-hidden />
        </button>
      </div>
      <Link href={productPath(product)} className="block space-y-1.5 px-1 pt-3">
        <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--ui-muted)]">{product.brand}</p>
        <p className="line-clamp-2 min-h-[2.6em] text-[14px] font-medium leading-snug text-[var(--ui-ink)]">{product.name}</p>
        <div className="flex items-baseline justify-between gap-2 pt-0.5">
          <p className="text-[15px] font-semibold text-[var(--ui-ink)]">{formatMoney(product.priceMinor, product.currency)}</p>
          <p className="text-xs text-[var(--ui-muted)]">★ {product.rating}</p>
        </div>
      </Link>
    </article>
  );
}
