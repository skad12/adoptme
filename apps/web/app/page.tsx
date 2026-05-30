import Link from "next/link";
import { ArrowRight, HeartHandshake, Repeat2, ShieldCheck, ShoppingBag, Sparkles, UploadCloud } from "lucide-react";
import { HeroVideoMontage } from "@/components/marketing/hero-video-montage";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const btnPrimary =
  "inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm shadow-emerald-600/25 transition hover:bg-emerald-700";
const btnOutline =
  "inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-transparent px-6 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900";

const pillars = [
  {
    title: "Escrow-protected commerce",
    body: "Purchase and exchange flows settle through a documented escrow state machine with dispute hooks.",
    icon: ShieldCheck,
  },
  {
    title: "Adoption, not just transactions",
    body: "Structured applications, moderator review, and transparent timelines center animal welfare.",
    icon: HeartHandshake,
  },
  {
    title: "Built to scale globally",
    body: "Stateless API routes and clean modular boundaries ready for a real database, search replicas, and async workers.",
    icon: Sparkles,
  },
];

const marketplacePaths = [
  {
    title: "Buy / sell",
    href: "/marketplace?type=SALE",
    cta: "Browse sale listings",
    icon: ShoppingBag,
    body: "Create structured listings with price, animal profile, health notes, vaccination status, microchip details, photos, and seller contact fields.",
  },
  {
    title: "Exchange",
    href: "/marketplace?type=EXCHANGE",
    cta: "Explore swaps",
    icon: Repeat2,
    body: "Support safe swaps with clear exchange preferences, compatibility notes, owner attestations, and escrow-ready follow-up flows.",
  },
  {
    title: "Adoption",
    href: "/marketplace?type=ADOPTION",
    cta: "Find adoptable pets",
    icon: HeartHandshake,
    body: "Adoption-first listings highlight welfare, application steps, care expectations, and transparent records before a family commits.",
  },
];

const listingSteps = [
  "Upload pet identity, breed, age, sex, color, weight, and location.",
  "Add vaccination, microchip, health, medication, and vet-record details.",
  "Describe temperament, training, compatibility, and ideal home fit.",
  "Publish photos and owner attestation for moderation-ready review.",
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-zinc-200/80 bg-linear-to-b from-emerald-50/60 via-white to-white dark:border-zinc-800/80 dark:from-emerald-950/30 dark:via-zinc-950 dark:to-zinc-950">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(circle_at_top,rgb(16_185_129/0.35),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgb(16_185_129/0.25),transparent_60%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:py-24">
          <div className="flex-1 space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/70 px-3 py-1 text-xs font-medium text-emerald-900 shadow-sm backdrop-blur dark:border-emerald-900/50 dark:bg-zinc-950/60 dark:text-emerald-200">
              Enterprise starter · TypeScript everywhere
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
              The trusted marketplace for animals, adopters, and donors.
            </h1>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              AdoptMe pairs a premium Next.js storefront with a hardened Express API, structured JSON content, and payment flows designed for serious operators.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/marketplace" className={cn(btnPrimary, "gap-2")}>
                Explore marketplace
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/donations" className={btnOutline}>
                Support welfare causes
              </Link>
            </div>
            <dl className="grid max-w-lg grid-cols-3 gap-4 pt-4 text-xs text-zinc-500 dark:text-zinc-400">
              <div>
                <dt className="font-medium text-zinc-800 dark:text-zinc-200">Roles</dt>
                <dd className="mt-1">Buyers, sellers, adopters, donors, admins.</dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-800 dark:text-zinc-200">Security</dt>
                <dd className="mt-1">RBAC, audit logs, rate limits, Helmet.</dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-800 dark:text-zinc-200">Data</dt>
                <dd className="mt-1">Local JSON starter data.</dd>
              </div>
            </dl>
          </div>
          <div className="flex-1 motion-float">
            <HeroVideoMontage />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Marketplace categories</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Choose the right path for every animal</h2>
          </div>
          <Link href="/sell" className={cn(btnPrimary, "gap-2")}>
            Create a listing
            <UploadCloud className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {marketplacePaths.map((path) => (
            <Card key={path.title} className="group flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <path.icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">{path.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{path.body}</p>
              </div>
              <Link href={path.href} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                {path.cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-200/80 bg-white/70 py-16 dark:border-zinc-800/80 dark:bg-zinc-950/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Responsible uploads</p>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">A better seller form for serious pet listings.</h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              The sell page asks for the information buyers and moderators need before money, adoption applications, or exchanges enter the conversation.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {listingSteps.map((step, index) => (
              <Card key={step} className="flex gap-3 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">{index + 1}</span>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{step}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Why teams pick this foundation</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Every surface — from RBAC to disputes — is modeled so you can grow into subscriptions, vet telehealth, insurance, and logistics without rewriting core flows.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.title} className="space-y-3 border-zinc-200/80 bg-white/80 p-5 dark:border-zinc-800/80 dark:bg-zinc-950/80">
              <p.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{p.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Card className="flex flex-col gap-4 bg-emerald-600 p-8 text-white dark:bg-emerald-700 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">Ready to list?</p>
            <h2 className="mt-2 text-2xl font-semibold">Create a safer sale or swap listing in minutes.</h2>
          </div>
          <Link href="/sell" className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
            Start seller form
          </Link>
        </Card>
      </section>
    </div>
  );
}
