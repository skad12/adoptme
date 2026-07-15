"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { useCart } from "@/components/shop/cart-provider";
import { formatMoney, REWARDS } from "@/lib/money";

export function CartPageClient() {
  const { items, itemCount, subtotalMinor, hydrated, setQuantity, removeItem, clearCart } = useCart();

  if (!hydrated) {
    return (
      <div className="ui-container py-16">
        <div className="ui-skeleton h-40 w-full rounded-[1.5rem]" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="ui-container flex min-h-[60vh] flex-col items-center justify-center gap-5 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ui-mist)] text-[var(--ui-ink)]">
          <ShoppingBag className="h-7 w-7" aria-hidden />
        </span>
        <h1 className="ui-section-title text-[var(--ui-ink)]">Your cart is empty</h1>
        <p className="max-w-md text-sm text-[var(--ui-muted)]">Browse the shop and add food, toys, or care essentials when you find something you love.</p>
        <Link href="/shop" className="ui-btn-primary inline-flex h-11 items-center rounded-full px-7 text-sm font-semibold">
          Continue shopping
        </Link>
      </div>
    );
  }

  const freeShipping = subtotalMinor >= REWARDS.freeShippingThresholdMinor;
  const remaining = Math.max(0, REWARDS.freeShippingThresholdMinor - subtotalMinor);

  return (
    <div className="ui-container space-y-8 py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ui-micro text-[var(--ui-muted)]">Shop</p>
          <h1 className="ui-section-title text-[var(--ui-ink)]">Your cart ({itemCount})</h1>
        </div>
        <button type="button" onClick={clearCart} className="text-sm font-semibold text-[var(--ui-muted)] transition hover:text-[var(--ui-ink)]">
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <ul className="space-y-4">
          {items.map((item) => {
            const href = `/shop/${item.petType}/${item.categorySlug}/${item.subcategorySlug}/${item.slug}`;
            return (
              <li key={item.productId} className="flex gap-4 rounded-[1.25rem] border border-[var(--ui-border)] bg-[var(--ui-surface-solid)] p-4 shadow-[var(--ui-shadow)]">
                <Link href={href} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--ui-mist)]">
                  <SafeImage src={item.imageUrl} alt={item.name} fill className="object-contain p-2" sizes="96px" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 space-y-1">
                    <p className="text-xs uppercase tracking-[0.06em] text-[var(--ui-muted)]">{item.brand}</p>
                    <Link href={href} className="line-clamp-2 font-semibold text-[var(--ui-ink)] hover:underline">
                      {item.name}
                    </Link>
                    <p className="text-sm font-semibold text-[var(--ui-ink)]">{formatMoney(item.priceMinor, item.currency)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center rounded-full border border-[var(--ui-border-strong)]">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="flex h-9 w-9 items-center justify-center text-[var(--ui-ink)] hover:bg-[var(--ui-mist)]"
                        onClick={() => setQuantity(item.productId, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold text-[var(--ui-ink)]">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="flex h-9 w-9 items-center justify-center text-[var(--ui-ink)] hover:bg-[var(--ui-mist)]"
                        onClick={() => setQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="min-w-[5.5rem] text-right text-sm font-semibold text-[var(--ui-ink)]">
                      {formatMoney(item.priceMinor * item.quantity, item.currency)}
                    </p>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--ui-muted)] transition hover:bg-[var(--ui-mist)] hover:text-[var(--ui-ink)]"
                      onClick={() => removeItem(item.productId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit space-y-4 rounded-[1.5rem] border border-[var(--ui-border)] bg-[var(--ui-mist)] p-6">
          <h2 className="ui-display text-xl text-[var(--ui-ink)]">Order summary</h2>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--ui-muted)]">Subtotal</span>
            <span className="font-semibold text-[var(--ui-ink)]">{formatMoney(subtotalMinor)}</span>
          </div>
          <p className="text-xs leading-relaxed text-[var(--ui-muted)]">
            {freeShipping
              ? "You’ve unlocked free shipping on this order."
              : `Add ${formatMoney(remaining)} more for free shipping.`}
          </p>
          <Link href="/login" className="ui-btn-primary inline-flex h-12 w-full items-center justify-center rounded-full text-[15px] font-semibold">
            Checkout
          </Link>
          <Link href="/shop" className="inline-flex h-11 w-full items-center justify-center rounded-full border border-[var(--ui-border-strong)] bg-white text-sm font-semibold text-[var(--ui-ink)] transition hover:bg-[var(--ui-surface-solid)]">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
