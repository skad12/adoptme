import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SafeImage } from "@/components/ui/safe-image";
import { formatMoney } from "@/lib/money";
import { productPath, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden p-0">
      <Link href={productPath(product)} className="block">
        <div className="relative aspect-square overflow-hidden bg-[color-mix(in_srgb,var(--ui-muted)_8%,transparent)]">
          <SafeImage
            src={product.imageUrl}
            alt={product.name}
            fill
            className="transition duration-500 group-hover:scale-[1.04]"
            sizes="(max-width:768px) 50vw, 25vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(12_18_16_/_0.35)] via-transparent to-transparent opacity-70" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.isNew ? <Badge>New</Badge> : null}
            {product.autoshipEligible ? (
              <Badge className="border-transparent bg-[var(--ui-primary)] text-white hover:bg-[var(--ui-primary)]">Autoship</Badge>
            ) : null}
          </div>
        </div>
        <div className="space-y-2 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--ui-muted)]">{product.brand}</p>
          <p className="line-clamp-2 text-[15px] font-semibold leading-snug text-[var(--ui-ink)]">{product.name}</p>
          <div className="flex items-center justify-between gap-2 pt-1">
            <p className="text-[15px] font-semibold text-[var(--ui-primary)]">{formatMoney(product.priceMinor, product.currency)}</p>
            <p className="text-xs text-[var(--ui-muted)]">
              ★ {product.rating} ({product.reviewCount})
            </p>
          </div>
        </div>
      </Link>
    </Card>
  );
}
