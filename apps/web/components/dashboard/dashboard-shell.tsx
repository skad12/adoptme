"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CalendarDays,
  ChartColumn,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  PawPrint,
  Pill,
  ShoppingBag,
  Stethoscope,
  Users,
  Wallet,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export type DashboardRole = "customer" | "vendor" | "vet" | "admin";

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> };

const NAV: Record<DashboardRole, NavItem[]> = {
  customer: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/pets", label: "My Pets", icon: PawPrint },
    { href: "/dashboard/appointments", label: "Appointments", icon: CalendarDays },
    { href: "/dashboard/orders", label: "Orders", icon: ShoppingBag },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  ],
  vendor: [
    { href: "/dashboard/vendor", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/vendor/products", label: "Products", icon: Package },
    { href: "/dashboard/vendor/orders", label: "Orders", icon: ShoppingBag },
    { href: "/dashboard/vendor/payouts", label: "Payouts", icon: Wallet },
  ],
  vet: [
    { href: "/dashboard/vet", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/vet/schedule", label: "Schedule", icon: CalendarDays },
    { href: "/dashboard/vet/patients", label: "Patients", icon: PawPrint },
    { href: "/dashboard/vet/prescriptions", label: "Prescriptions", icon: Pill },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/metrics", label: "Metrics", icon: ChartColumn },
    { href: "/dashboard/admin/users", label: "Users", icon: Users },
  ],
};

const ROLE_LABEL: Record<DashboardRole, string> = {
  customer: "Pet parent",
  vendor: "Vendor",
  vet: "Veterinarian",
  admin: "Administrator",
};

const ROLE_ICON: Record<DashboardRole, React.ComponentType<{ className?: string }>> = {
  customer: PawPrint,
  vendor: ShoppingBag,
  vet: Stethoscope,
  admin: ChartColumn,
};

function isActive(pathname: string, href: string) {
  if (href === "/dashboard" || href === "/dashboard/vendor" || href === "/dashboard/vet" || href === "/dashboard/admin") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardShell({
  role,
  title,
  subtitle,
  children,
}: {
  role: DashboardRole;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const items = NAV[role];
  const RoleIcon = ROLE_ICON[role];

  return (
    <div className="dash-shell">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="dash-aside sticky top-0 hidden h-screen w-[var(--dash-sidebar-w)] shrink-0 flex-col p-5 lg:flex">
          <Link href="/" className="mb-9 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--dash-mint)] to-[var(--dash-mint-bright)] text-white shadow-lg shadow-[color-mix(in_srgb,var(--dash-mint)_40%,transparent)]">
              <PawPrint className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[15px] font-bold tracking-tight">AdoptMe</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--dash-muted)]">{ROLE_LABEL[role]}</p>
            </div>
          </Link>

          <nav className="flex flex-1 flex-col gap-1" aria-label="Dashboard">
            {items.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
              return (
                <Link key={item.href} href={item.href} className="dash-nav-link" data-active={active} aria-current={active ? "page" : undefined}>
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 space-y-1 border-t border-[var(--dash-border)] pt-4">
            <Link href="/shop" className="dash-nav-link">
              <ShoppingBag className="h-4 w-4" aria-hidden /> Shop
            </Link>
            <Link href="/marketplace" className="dash-nav-link">
              <PawPrint className="h-4 w-4" aria-hidden /> Marketplace
            </Link>
            <Link href="/login" className="dash-nav-link" aria-label="Log out">
              <LogOut className="h-4 w-4" aria-hidden /> Log out
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="dash-topbar sticky top-0 z-20 flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--dash-mint-soft)] text-[var(--dash-mint)] lg:hidden">
                <RoleIcon className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl lg:text-[1.75rem] lg:leading-tight">{title}</h1>
                {subtitle ? <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--dash-muted)]">{subtitle}</p> : null}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-surface-solid)] text-[var(--dash-ink)] shadow-sm transition hover:border-[var(--dash-border-strong)] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-mint)]"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[var(--dash-coral)] ring-2 ring-[var(--dash-surface-solid)]" />
              </button>
              <ThemeToggle />
            </div>
          </header>

          <nav className="flex gap-2 overflow-x-auto border-b border-[var(--dash-border)] px-4 py-3 lg:hidden" aria-label="Mobile dashboard">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold transition",
                    active
                      ? "bg-gradient-to-r from-[var(--dash-mint)] to-[var(--dash-mint-bright)] text-white shadow-md shadow-[color-mix(in_srgb,var(--dash-mint)_30%,transparent)]"
                      : "bg-[var(--dash-surface-solid)] text-[var(--dash-muted)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="dash-stagger flex-1 px-4 py-6 pb-28 sm:px-6 lg:px-8 lg:py-8 lg:pb-8">{children}</div>

          <nav
            className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--dash-border)] bg-[color-mix(in_srgb,var(--dash-surface-solid)_92%,transparent)] px-3 py-2.5 backdrop-blur-xl lg:hidden"
            aria-label="Bottom navigation"
          >
            <div className="mx-auto flex max-w-lg items-stretch justify-between gap-1">
              {items.slice(0, 5).map((item) => {
                const Icon = item.icon;
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-bold tracking-wide transition",
                      active ? "bg-[var(--dash-mint-soft)] text-[var(--dash-mint)]" : "text-[var(--dash-muted)]",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
