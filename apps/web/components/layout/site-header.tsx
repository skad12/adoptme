"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogIn, Menu, PawPrint, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--ui-border)] bg-[color-mix(in_srgb,var(--ui-surface-solid)_78%,transparent)] backdrop-blur-xl supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--ui-surface-solid)_62%,transparent)]">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5 font-semibold tracking-tight text-[var(--ui-ink)]">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-primary-bright)] text-white shadow-lg shadow-[color-mix(in_srgb,var(--ui-primary)_35%,transparent)] transition group-hover:scale-[1.03]">
            <PawPrint className="h-5 w-5" aria-hidden />
          </span>
          <span className="hidden text-[15px] sm:inline">AdoptMe</span>
        </Link>

        <nav className="hidden items-center gap-0.5 text-sm font-medium text-[var(--ui-muted)] md:flex" aria-label="Primary">
          <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
            <Link
              href="/shop"
              className={cn(
                "inline-flex items-center gap-1 rounded-xl px-3 py-2.5 transition hover:bg-[var(--ui-primary-soft)] hover:text-[var(--ui-primary)]",
                pathname.startsWith("/shop") && "bg-[var(--ui-primary-soft)] text-[var(--ui-primary)]",
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
                    className="block px-4 py-2.5 text-sm text-[var(--ui-ink)] transition hover:bg-[var(--ui-primary-soft)] hover:text-[var(--ui-primary)]"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="my-1 border-t border-[var(--ui-border)]" />
                <Link href="/shop" className="block px-4 py-2.5 text-sm font-semibold text-[var(--ui-primary)]">
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
                "rounded-xl px-3 py-2.5 transition hover:bg-[var(--ui-primary-soft)] hover:text-[var(--ui-primary)]",
                pathname.startsWith(l.href) && "bg-[var(--ui-primary-soft)] text-[var(--ui-primary)]",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <Link
            href="/rewards"
            className="hidden h-10 items-center rounded-xl px-3 text-xs font-semibold text-[var(--ui-muted)] transition hover:bg-[var(--ui-primary-soft)] hover:text-[var(--ui-primary)] lg:inline-flex"
          >
            PawRewards
          </Link>
          <Link
            href="/dashboard"
            className="hidden h-10 items-center rounded-xl px-3 text-sm font-semibold text-[var(--ui-ink)] transition hover:bg-[var(--ui-primary-soft)] sm:inline-flex"
          >
            Dashboard
          </Link>
          <Link
            href="/login"
            className="hidden h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-[var(--ui-ink)] transition hover:bg-[var(--ui-primary-soft)] sm:inline-flex"
          >
            <LogIn className="h-4 w-4" />
            Login
          </Link>
          <Link
            href="/sell"
            className="ui-btn-primary hidden h-10 items-center rounded-xl px-4 text-sm font-semibold sm:inline-flex"
          >
            Sell
          </Link>
          <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu" onClick={() => setMobileOpen((o) => !o)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen ? (
        <nav className="border-t border-[var(--ui-border)] bg-[var(--ui-surface-solid)] px-4 py-4 md:hidden" aria-label="Mobile">
          <ul className="space-y-1 text-sm font-medium">
            {mainLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-xl px-3 py-2.5 hover:bg-[var(--ui-primary-soft)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ui-muted)]">Shop by pet</li>
            {shopPetLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-xl px-3 py-2 pl-6 hover:bg-[var(--ui-primary-soft)]" onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/dashboard" className="block rounded-xl px-3 py-2.5 hover:bg-[var(--ui-primary-soft)]" onClick={() => setMobileOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/login" className="block rounded-xl px-3 py-2.5 hover:bg-[var(--ui-primary-soft)]" onClick={() => setMobileOpen(false)}>
                Login
              </Link>
            </li>
            <li>
              <Link href="/rewards" className="block rounded-xl px-3 py-2.5 hover:bg-[var(--ui-primary-soft)]" onClick={() => setMobileOpen(false)}>
                PawRewards
              </Link>
            </li>
            <li>
              <Link href="/adoption" className="block rounded-xl px-3 py-2.5 hover:bg-[var(--ui-primary-soft)]" onClick={() => setMobileOpen(false)}>
                Adoption
              </Link>
            </li>
            <li>
              <Link href="/donations" className="block rounded-xl px-3 py-2.5 hover:bg-[var(--ui-primary-soft)]" onClick={() => setMobileOpen(false)}>
                Donations
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
