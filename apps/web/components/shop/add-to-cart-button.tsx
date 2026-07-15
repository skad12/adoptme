"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/shop/cart-provider";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  product,
  className,
  label = "Add to cart",
}: {
  product: Product;
  className?: string;
  label?: string;
}) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleAdd}
        className={cn(
          "ui-btn-primary inline-flex h-11 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold",
          added && "bg-[var(--ui-accent)] text-[var(--ui-ink)]",
          className,
        )}
      >
        {added ? <Check className="h-4 w-4" aria-hidden /> : <ShoppingBag className="h-4 w-4" aria-hidden />}
        {added ? "Added" : label}
      </button>
      {added ? (
        <button
          type="button"
          onClick={() => router.push("/cart")}
          className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--ui-border-strong)] px-6 text-sm font-semibold text-[var(--ui-ink)] transition hover:bg-[var(--ui-mist)]"
        >
          View cart
        </button>
      ) : null}
    </div>
  );
}
