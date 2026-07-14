import Link from "next/link";
import { ArrowRight, HeartHandshake, PawPrint, Repeat2, ShieldCheck, ShoppingBag, Sparkles, UploadCloud, type LucideIcon } from "lucide-react";
import { HeroVideoMontage } from "@/components/marketing/hero-video-montage";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const btnPrimary =
  "ui-btn-primary inline-flex h-12 items-center justify-center rounded-full px-7 text-[15px] font-semibold";

const pillars = [
  {
    title: "Welfare-first pet care",
    body: "Listings highlight care history, health notes, temperament, and the home environment each animal needs.",
    icon: ShieldCheck,
  },
  {
    title: "Adoption, not just transactions",
    body: "Structured applications, moderator review, and transparent timelines center animal welfare.",
    icon: HeartHandshake,
  },
  {
    title: "Support for every journey",
    body: "Families, shelters, veterinarians, breeders, and donors can work from one pet-focused hub.",
    icon: Sparkles,
  },
];

const heroSlides = [
  {
    eyebrow: "Pet care, adoption, and trusted animal listings",
    title: "The trusted marketplace for animals, adopters, and donors.",
    body: "AdoptMe helps families discover healthy pets, support rescues, connect with responsible breeders, and follow safer handover steps from first message to forever home.",
    primaryHref: "/marketplace",
    primaryLabel: "Explore marketplace",
    secondaryHref: "/donations",
    secondaryLabel: "Support welfare causes",
  },
  {
    eyebrow: "Responsible breeding animals",
    title: "Find breeder listings with health records and care notes.",
    body: "Browse pets from responsible breeders with parent history, early socialization, vaccination records, and clear handover expectations.",
    primaryHref: "/marketplace?type=BREEDING",
    primaryLabel: "View breeding listings",
    secondaryHref: "/sell",
    secondaryLabel: "Create breeder listing",
  },
  {
    eyebrow: "Adoption-first matching",
    title: "Help rescue pets find safer forever homes.",
    body: "Review adoption profiles, temperament notes, medical needs, and household fit before starting a shelter application.",
    primaryHref: "/marketplace?type=ADOPTION",
    primaryLabel: "Find adoptable pets",
    secondaryHref: "/adoption",
    secondaryLabel: "Learn adoption steps",
  },
  {
    eyebrow: "Pet health and care records",
    title: "Bring every care detail into the conversation.",
    body: "Compare vaccination status, microchip details, medication notes, training level, compatibility, and diet before arranging a handover.",
    primaryHref: "/marketplace",
    primaryLabel: "Browse pet profiles",
    secondaryHref: "/sell",
    secondaryLabel: "List with care records",
  },
  {
    eyebrow: "Animal welfare community",
    title: "Support shelters, rescuers, and pet families.",
    body: "Discover donation campaigns, lost-and-found support, volunteer opportunities, and education resources that protect animals beyond the marketplace.",
    primaryHref: "/donations",
    primaryLabel: "Donate to shelters",
    secondaryHref: "/support",
    secondaryLabel: "Visit help center",
  },
];

type MarketplacePath = {
  title: string;
  href: string;
  cta: string;
  icon: LucideIcon;
  body: string;
};

const marketplacePaths: MarketplacePath[] = [
  {
    title: "Buy / sell",
    href: "/marketplace?type=SALE",
    cta: "Browse sale listings",
    icon: ShoppingBag,
    body: "Create structured sale listings with price, animal profile, health notes, vaccination status, microchip details, photos, and seller contact fields.",
  },
  {
    title: "Breeding animals",
    href: "/marketplace?type=BREEDING",
    cta: "View breeding animals",
    icon: PawPrint,
    body: "Responsible breeding listings focus on parent health, lineage notes, early socialization, and care commitments for new homes.",
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
      <section className="relative min-h-[720px] overflow-hidden bg-zinc-950 text-white">
        <HeroVideoMontage />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgb(16_185_129/0.34),transparent_34%),linear-gradient(90deg,rgb(3_7_18/0.88),rgb(3_7_18/0.54)_48%,rgb(3_7_18/0.26)),linear-gradient(to_top,rgb(3_7_18/0.86),transparent_48%)]" />
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-4 py-24 sm:px-6 lg:py-28">
          <div className="w-full max-w-3xl">
            <div className="hero-content-slider relative min-h-[430px]">
              {heroSlides.map((slide, index) => (
                <div key={slide.title} className="hero-content-slide absolute inset-0 flex flex-col justify-center space-y-6" style={{ animationDelay: `${index * 8}s` }}>
                  <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-xs font-medium text-emerald-100 shadow-sm backdrop-blur">
                    {slide.eyebrow}
                  </p>
                  <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">{slide.title}</h1>
                  <p className="max-w-2xl text-pretty text-base leading-relaxed text-zinc-100 sm:text-lg">{slide.body}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link href={slide.primaryHref} className={cn(btnPrimary, "gap-2")}>
                      {slide.primaryLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    <Link href={slide.secondaryHref} className="inline-flex h-11 items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                      {slide.secondaryLabel}
                    </Link>
                  </div>
                  {/* <dl className="grid max-w-lg grid-cols-3 gap-4 pt-4 text-xs text-zinc-200">
                    <div>
                      <dt className="font-medium text-white">Community</dt>
                      <dd className="mt-1">Owners, adopters, shelters, donors.</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-white">Care</dt>
                      <dd className="mt-1">Vaccines, microchips, vet notes.</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-white">Trust</dt>
                      <dd className="mt-1">Clear records and safer handovers.</dd>
                    </div>
                  </dl> */}
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              {heroSlides.map((slide, index) => (
                <span key={slide.title} className="hero-content-tick h-1.5 w-12 rounded-full bg-white/25" style={{ animationDelay: `${index * 8}s` }} />
              ))}
            </div>
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
        <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Shop by pet</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Supplies for every companion</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Dog", href: "/shop/dog" },
              { label: "Cat", href: "/shop/cat" },
              { label: "Fish", href: "/shop/fish" },
              { label: "Bird", href: "/shop/bird" },
              { label: "Reptile", href: "/shop/reptile" },
              { label: "Small Pet", href: "/shop/small-pet" },
              { label: "Farm & Backyard", href: "/shop/farm-animal" },
              { label: "All shop", href: "/shop" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-zinc-200/80 bg-white px-4 py-5 text-sm font-semibold text-zinc-900 transition hover:border-emerald-500 hover:text-emerald-700 dark:border-zinc-800/80 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:text-emerald-400"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200/80 bg-white/70 py-16 dark:border-zinc-800/80 dark:bg-zinc-950/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Responsible uploads</p>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">A better pet profile for thoughtful listings.</h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              The listing flow asks for the details families need before a sale, adoption application, exchange, or breeder conversation moves forward.
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
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Why pet communities choose AdoptMe</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Every surface is shaped around animal welfare, clearer records, safer conversations, and stronger support for families bringing pets home.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.title} className="space-y-3 p-5">
              <p.icon className="h-6 w-6 text-[var(--ui-primary)]" />
              <h3 className="text-[15px] font-semibold text-[var(--ui-ink)]">{p.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--ui-muted)]">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Card className="flex flex-col gap-5 overflow-hidden border-0 bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-primary-bright)] p-8 text-white shadow-[var(--ui-shadow-lift)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">Ready to list?</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Create a safer sale or swap listing in minutes.</h2>
          </div>
          <Link
            href="/sell"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[15px] font-semibold text-[var(--ui-primary)] shadow-lg transition hover:bg-emerald-50"
          >
            Start seller form
          </Link>
        </Card>
      </section>
    </div>
  );
}
