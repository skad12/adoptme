"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ROLES = [
  { id: "customer", label: "Buyer", href: "/dashboard", email: "buyer@adoptme.local", blurb: "Pets, vaccines, orders, and appointments." },
  { id: "vendor", label: "Vendor", href: "/dashboard/vendor", email: "seller@adoptme.local", blurb: "Catalog, fulfilment, and payouts." },
  { id: "vet", label: "Veterinarian", href: "/dashboard/vet", email: "vet@adoptme.local", blurb: "Schedule, patients, and prescriptions." },
  { id: "admin", label: "Admin", href: "/dashboard/admin", email: "admin@adoptme.local", blurb: "GMV, users, and moderation." },
] as const;

export function LoginForm() {
  const [roleId, setRoleId] = useState<(typeof ROLES)[number]["id"]>("customer");
  const role = ROLES.find((r) => r.id === roleId) ?? ROLES[0];

  return (
    <div className="ui-container motion-page relative flex min-h-[78vh] items-center py-14 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(16_185_129_/_0.22),transparent_70%)] blur-2xl motion-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 bottom-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgb(251_146_60_/_0.18),transparent_70%)] blur-2xl"
      />

      <div className="relative grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] lg:items-center">
        <div className="space-y-6">
          <p className="ui-micro inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--ui-primary)_30%,transparent)] bg-[var(--ui-primary-soft)] px-3.5 py-1.5 text-[var(--ui-primary)]">
            <PawPrint className="h-3.5 w-3.5" aria-hidden />
            Account access
          </p>
          <h1 className="ui-page-title max-w-xl text-[var(--ui-ink)]">Sign in to your pet care workspace.</h1>
          <p className="ui-body max-w-xl text-[var(--ui-muted)]">
            Choose a role to open the matching dashboard — pet parent care, vendor store, veterinary clinic, or platform admin.
          </p>
          <ul className="grid max-w-lg gap-3 sm:grid-cols-2">
            {ROLES.map((r) => (
              <li
                key={r.id}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-sm transition",
                  roleId === r.id
                    ? "border-[color-mix(in_srgb,var(--ui-primary)_40%,transparent)] bg-[var(--ui-primary-soft)] text-[var(--ui-ink)] shadow-sm"
                    : "border-[var(--ui-border)] bg-[var(--ui-surface-solid)]/60 text-[var(--ui-muted)]",
                )}
              >
                <p className="font-semibold text-[var(--ui-ink)]">{r.label}</p>
                <p className="mt-1 text-[13px] leading-snug">{r.blurb}</p>
              </li>
            ))}
          </ul>
        </div>

        <Card className="space-y-6 p-7 sm:p-8">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[var(--ui-ink)]">Welcome back</h2>
            <p className="mt-1.5 text-sm text-[var(--ui-muted)]">Demo password: ChangeMeNow!1</p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose workspace role">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={roleId === r.id}
                onClick={() => setRoleId(r.id)}
                className={cn(
                  "rounded-full px-3.5 py-2 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-primary)]",
                  roleId === r.id
                    ? "bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-primary-bright)] text-white shadow-md shadow-[color-mix(in_srgb,var(--ui-primary)_30%,transparent)]"
                    : "border border-[var(--ui-border-strong)] bg-[var(--ui-surface-solid)] text-[var(--ui-ink)] hover:bg-[var(--ui-primary-soft)]",
                )}
              >
                {r.label}
              </button>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-[var(--ui-muted)]">{role.blurb}</p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[var(--ui-ink)]">Email</span>
              <Input key={role.email} type="email" defaultValue={role.email} autoComplete="username" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[var(--ui-ink)]">Password</span>
              <Input type="password" defaultValue="ChangeMeNow!1" autoComplete="current-password" />
            </label>
            <Link
              href={role.href}
              className="ui-btn-primary inline-flex h-12 w-full items-center justify-center rounded-2xl px-5 text-[15px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-primary)]"
            >
              Continue to {role.label.toLowerCase()} dashboard
            </Link>
          </form>

          <p className="text-xs leading-relaxed text-[var(--ui-muted)]">
            Demo login routes you into seeded dashboards. Live auth and payments remain separate.
          </p>
        </Card>
      </div>
    </div>
  );
}
