"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Heart, LogIn, Menu, PawPrint, Search, ShoppingBag, User, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/shop/cart-provider";
import { cn } from "@/lib/utils";

const mainLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/new-pet", label: "New Pet" },
  { href: "/learn", label: "Learn" },
  { href: "/stores", label: "Stores" },
];

const shopPetLinks = [
  { href: "/shop/dog", label: "Dog" },
  { href: "/shop/cat", label: "Cat" },
  { href: "/shop/fish", label: "Fish" },
  { href: "/shop/bird", label: "Bird" },
  { href: "/shop/reptile", label: "Reptile" },
  { href: "/shop/small-pet", label: "Small Pet" },
  { href: "/shop/farm-animal", label: "Farm & Backyard" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, hydrated } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    setSearchOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  }

  return (
    <header className="sticky top-0 z-40 bg-[var(--ui-surface-solid)] shadow-[0_1px_0_var(--ui-border)]">
      <div className="hidden border-b border-[var(--ui-border)] bg-[var(--ui-mist)] text-[12px] text-[var(--ui-muted)] sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <p className="font-medium text-[var(--ui-ink)]">Free shipping on orders over ₦50,000</p>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 lg:inline-flex">
              <span className="text-[var(--ui-accent)]">★★★★★</span>
              Rated 4.8 / 5
            </span>
            <Link href="/support" className="transition hover:text-[var(--ui-ink)]">
              Help
            </Link>
            <Link href="/stores" className="transition hover:text-[var(--ui-ink)]">
              Stores
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5 text-[var(--ui-ink)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--ui-primary)] text-white transition group-hover:scale-[1.03]">
            <PawPrint className="h-5 w-5" aria-hidden />
          </span>
          <span className="ui-display hidden text-[1.35rem] font-semibold tracking-tight sm:inline">AdoptMe</span>
        </Link>

        <nav className="hidden items-center gap-0.5 text-sm font-medium text-[var(--ui-ink)] md:flex" aria-label="Primary">
          <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
            <Link
              href="/shop"
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3.5 py-2 transition hover:bg-[var(--ui-accent)]",
                pathname.startsWith("/shop") && "bg-[var(--ui-accent)]",
              )}
            >
              Shop <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            {shopOpen ? (
              <div className="absolute left-0 top-full z-50 w-56 overflow-hidden rounded-2xl border border-[var(--ui-border)] bg-[var(--ui-surface-solid)] py-2 shadow-[var(--ui-shadow-lift)]">
                {shopPetLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-4 py-2.5 text-sm text-[var(--ui-ink)] transition hover:bg-[var(--ui-accent-soft)]"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="my-1 border-t border-[var(--ui-border)]" />
                <Link href="/shop" className="block px-4 py-2.5 text-sm font-semibold text-[var(--ui-ink)]">
                  All shop
                </Link>
              </div>
            ) : null}
          </div>
          {mainLinks.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3.5 py-2 transition hover:bg-[var(--ui-mist)]",
                pathname.startsWith(l.href) && "bg-[var(--ui-mist)] font-semibold",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="relative hidden items-center lg:flex">
            <form
              onSubmit={submitSearch}
              className={cn(
                "flex h-10 items-center overflow-hidden rounded-full border border-[var(--ui-border-strong)] bg-[var(--ui-mist)] transition-all duration-300",
                searchOpen ? "w-64 px-3 opacity-100" : "w-0 border-transparent px-0 opacity-0",
              )}
            >
              <input
                ref={searchInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full bg-transparent text-sm text-[var(--ui-ink)] outline-none placeholder:text-[var(--ui-muted)]"
                aria-label="Search products"
              />
            </form>
            <button
              type="button"
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((o) => !o)}
              className="ml-1.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--ui-primary)] text-white transition hover:bg-[var(--ui-primary-bright)]"
            >
              {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </button>
          </div>
          <button
            type="button"
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--ui-primary)] text-white transition hover:bg-[var(--ui-primary-bright)] lg:hidden"
          >
            {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </button>

          <ThemeToggle />
          <Link
            href="/rewards"
            className="hidden h-10 w-10 items-center justify-center rounded-xl bg-[var(--ui-primary)] text-white transition hover:bg-[var(--ui-primary-bright)] sm:inline-flex"
            aria-label="Favorites / rewards"
          >
            <Heart className="h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className="hidden h-10 w-10 items-center justify-center rounded-xl bg-[var(--ui-primary)] text-white transition hover:bg-[var(--ui-primary-bright)] sm:inline-flex"
            aria-label="Account"
          >
            <User className="h-4 w-4" />
          </Link>
          <Link
            href="/cart"
            className="relative hidden h-10 w-10 items-center justify-center rounded-xl bg-[var(--ui-primary)] text-white transition hover:bg-[var(--ui-primary-bright)] sm:inline-flex"
            aria-label={`Cart${hydrated && itemCount > 0 ? `, ${itemCount} items` : ""}`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--ui-accent)] px-1 text-[10px] font-bold text-[var(--ui-ink)]">
              {hydrated ? itemCount : 0}
            </span>
          </Link>
          <Link href="/sell" className="ui-btn-primary hidden h-10 items-center rounded-full px-4 text-sm font-semibold sm:inline-flex">
            Sell
          </Link>
          <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu" onClick={() => setMobileOpen((o) => !o)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {searchOpen ? (
        <div className="border-t border-[var(--ui-border)] bg-[var(--ui-surface-solid)] px-4 py-3 lg:hidden">
          <form onSubmit={submitSearch} className="flex h-11 items-center gap-2 rounded-full border border-[var(--ui-border-strong)] bg-[var(--ui-mist)] px-4">
            <Search className="h-4 w-4 shrink-0 text-[var(--ui-muted)]" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-transparent text-sm text-[var(--ui-ink)] outline-none placeholder:text-[var(--ui-muted)]"
              aria-label="Search products"
              autoFocus
            />
          </form>
        </div>
      ) : null}

      {mobileOpen ? (
        <nav className="border-t border-[var(--ui-border)] bg-[var(--ui-surface-solid)] px-4 py-4 md:hidden" aria-label="Mobile">
          <ul className="space-y-1 text-sm font-medium">
            {mainLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-xl px-3 py-2.5 hover:bg-[var(--ui-mist)]" onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cart" className="block rounded-xl px-3 py-2.5 hover:bg-[var(--ui-mist)]" onClick={() => setMobileOpen(false)}>
                Cart {hydrated && itemCount > 0 ? `(${itemCount})` : ""}
              </Link>
            </li>
            <li className="pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ui-muted)]">Shop by pet</li>
            {shopPetLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-xl px-3 py-2 pl-6 hover:bg-[var(--ui-mist)]" onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 hover:bg-[var(--ui-mist)]" onClick={() => setMobileOpen(false)}>
                <LogIn className="h-4 w-4" /> Login
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
