"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";
import { useState } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ROLES = [
  { id: "customer", label: "Buyer", href: "/dashboard", email: "buyer@adoptme.local", blurb: "Pets, vaccines, orders, and appointments." },
  { id: "vendor", label: "Vendor", href: "/dashboard/vendor", email: "seller@adoptme.local", blurb: "Catalog, fulfilment, and payouts." },
  { id: "vet", label: "Veterinarian", href: "/dashboard/vet", email: "vet@adoptme.local", blurb: "Schedule, patients, and prescriptions." },
  { id: "admin", label: "Admin", href: "/dashboard/admin", email: "admin@adoptme.local", blurb: "GMV, users, and moderation." },
] as const;

/** Pawvelure-inspired immersive login — full-bleed lifestyle photo, depth type, glass form. */
export function LoginForm() {
  const [roleId, setRoleId] = useState<(typeof ROLES)[number]["id"]>("customer");
  const role = ROLES.find((r) => r.id === roleId) ?? ROLES[0];

  return (
    <div className="relative isolate min-h-[calc(100vh-4.5rem)] overflow-hidden">
      {/* Full-bleed lifestyle background */}
      <div className="absolute inset-0">
        <SafeImage
          src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgb(10_17_8_/_0.72)_0%,rgb(48_62_48_/_0.45)_42%,rgb(10_17_8_/_0.55)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_20%,rgb(10_17_8_/_0.35)_100%)]" />
      </div>

      {/* Depth typography sitting behind the card */}
      <p
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] z-0 -translate-x-1/2 -translate-y-1/2 select-none text-center ui-display text-[clamp(4.5rem,18vw,14rem)] font-semibold uppercase leading-none tracking-[-0.04em] text-white/[0.14]"
      >
        Welcome
      </p>

      {/* Premium dark frame edge */}
      <div aria-hidden className="pointer-events-none absolute inset-3 z-10 rounded-[1.75rem] border border-white/15 sm:inset-5" />

      <div className="relative z-20 mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-6xl flex-col justify-center gap-10 px-5 py-16 sm:px-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:py-20">
        <div className="space-y-5 text-white">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur-md">
            <PawPrint className="h-3.5 w-3.5 text-[#EAF1E0]" aria-hidden />
            Pet care workspace
          </p>
          <h1 className="ui-display max-w-xl text-[clamp(2.4rem,5vw,4rem)] leading-[1.05] text-white">
            Sign in to care for the pets who trust you.
          </h1>
          <p className="max-w-lg text-[15px] leading-relaxed text-[#EAF1E0]/90 sm:text-base">
            Open your AdoptMe dashboard — shoppers, vendors, veterinarians, and admins each get a role-ready workspace.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {ROLES.map((r) => (
              <span
                key={r.id}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition",
                  roleId === r.id ? "bg-[#EAF1E0] text-[#0A1108]" : "bg-white/10 text-white/80",
                )}
              >
                {r.label}
              </span>
            ))}
          </div>
        </div>

        {/* Glass card — Pawvelure translucent green panels */}
        <div className="rounded-[1.75rem] border border-white/20 bg-[color-mix(in_srgb,#303E30_72%,transparent)] p-6 shadow-[0_24px_80px_rgb(10_17_8_/_0.45)] backdrop-blur-xl sm:p-8">
          <div className="mb-6">
            <h2 className="ui-display text-2xl text-[#EAF1E0]">Welcome back</h2>
            <p className="mt-1.5 text-sm text-[#B7BB9F]">Demo password: ChangeMeNow!1</p>
          </div>

          <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Choose workspace role">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={roleId === r.id}
                onClick={() => setRoleId(r.id)}
                className={cn(
                  "rounded-full px-3.5 py-2 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EAF1E0]",
                  roleId === r.id
                    ? "bg-[#EAF1E0] text-[#0A1108]"
                    : "border border-white/20 bg-white/5 text-[#EAF1E0] hover:bg-white/10",
                )}
              >
                {r.label}
              </button>
            ))}
          </div>

          <p className="mb-5 text-sm leading-relaxed text-[#B7BB9F]">{role.blurb}</p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[#EAF1E0]">Email</span>
              <Input
                key={role.email}
                type="email"
                defaultValue={role.email}
                autoComplete="username"
                className="h-12 rounded-2xl border-white/20 bg-white/10 text-[#EAF1E0] placeholder:text-[#B7BB9F] focus:border-[#EAF1E0] focus:ring-[#EAF1E0]/30"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[#EAF1E0]">Password</span>
              <Input
                type="password"
                defaultValue="ChangeMeNow!1"
                autoComplete="current-password"
                className="h-12 rounded-2xl border-white/20 bg-white/10 text-[#EAF1E0] placeholder:text-[#B7BB9F] focus:border-[#EAF1E0] focus:ring-[#EAF1E0]/30"
              />
            </label>
            <Link
              href={role.href}
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#EAF1E0] px-5 text-[15px] font-semibold text-[#0A1108] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EAF1E0]"
            >
              Continue to {role.label.toLowerCase()} dashboard
            </Link>
          </form>

          <p className="mt-5 text-xs leading-relaxed text-[#B7BB9F]">
            Demo login routes you into seeded dashboards. Live auth and payments remain separate.
          </p>
        </div>
      </div>
    </div>
  );
}
