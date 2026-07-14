import Link from "next/link";
import { ArrowRight, BookOpen, MapPin, Scissors, ShoppingBag, Sparkles } from "lucide-react";
import { PetTypeNav } from "@/components/shop/pet-type-nav";
import { ProductCard } from "@/components/shop/product-card";
import { Card } from "@/components/ui/card";
import { fetchProducts, fetchTaxonomy } from "@/lib/catalog";
import { formatMoney, REWARDS } from "@/lib/money";

export default async function ShopPage() {
  const [{ petTypes }, { items: featured }] = await Promise.all([
    fetchTaxonomy(),
    fetchProducts({ sort: "best_sellers", pageSize: "8" }),
  ]);

  return (
    <div className="ui-container motion-page space-y-12 py-12 sm:py-14">
      <div className="space-y-4">
        <p className="ui-micro text-[var(--ui-primary)]">Shop</p>
        <h1 className="ui-page-title text-[var(--ui-ink)]">Shop anything. Any way.</h1>
        <p className="ui-body max-w-2xl text-[var(--ui-muted)]">
          Browse supplies by pet type — food, toys, health, habitats & more. Free ship to home on orders{" "}
          {formatMoney(REWARDS.freeShippingThresholdMinor)}+.
        </p>
      </div>

      <PetTypeNav petTypes={petTypes} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: ShoppingBag, title: "Autoship", body: "35% off first order, 5% off future orders", href: "/shop?autoship=1" },
          { icon: Sparkles, title: "New & Featured", body: "Latest products for your best friends", href: "/shop/new-and-featured" },
          { icon: Scissors, title: "Pet Services", body: "Grooming, training, day camp & vet care", href: "/services" },
          { icon: BookOpen, title: "Learning Center", body: "Guides, tips & care advice", href: "/learn" },
        ].map((item) => (
          <Card key={item.title} className="flex flex-col gap-3 p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--ui-primary-soft)] text-[var(--ui-primary)]">
              <item.icon className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="font-semibold tracking-tight text-[var(--ui-ink)]">{item.title}</h2>
            <p className="flex-1 text-sm leading-relaxed text-[var(--ui-muted)]">{item.body}</p>
            <Link href={item.href} className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--ui-primary)]">
              Shop now <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Card>
        ))}
      </div>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="ui-section-title text-[var(--ui-ink)]">Best sellers</h2>
          <Link href="/shop/all" className="text-sm font-semibold text-[var(--ui-primary)]">
            View all
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-primary-bright)] p-8 text-white shadow-[var(--ui-shadow-lift)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-6 w-6 shrink-0" aria-hidden />
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Find a store near you</h2>
              <p className="mt-1 text-sm text-white/85">Shop in-store, book services, or pick up same-day.</p>
            </div>
          </div>
          <Link
            href="/stores"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[var(--ui-primary)] transition hover:bg-[var(--ui-primary-soft)]"
          >
            Store locator
          </Link>
        </div>
      </Card>
    </div>
  );
}
