import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Gift,
  HeartHandshake,
  MapPin,
  PawPrint,
  Repeat2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Stethoscope,
  Truck,
  UploadCloud,
  type LucideIcon,
} from "lucide-react";
import { HeroPetMotion } from "@/components/marketing/hero-pet-motion";
import { HeroVideoMontage } from "@/components/marketing/hero-video-montage";
import { ProductCard } from "@/components/shop/product-card";
import { Card } from "@/components/ui/card";
import { SafeImage } from "@/components/ui/safe-image";
import { fetchProducts, fetchServices, SERVICE_LABELS } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";

const btnPrimary =
  "ui-btn-primary inline-flex h-12 items-center justify-center rounded-full px-8 text-[15px] font-semibold";

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
    secondaryHref: "/services/veterinary-care",
    secondaryLabel: "Book veterinary care",
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

const carePathTiles = [
  {
    title: "Veterinary & pet care",
    href: "/services",
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=900&q=80",
    tint: "bg-[var(--ui-sky)]",
  },
  {
    title: "Breeding",
    href: "/marketplace?type=BREEDING",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80",
    tint: "bg-[var(--ui-pastel)]",
  },
  {
    title: "Adoption",
    href: "/marketplace?type=ADOPTION",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80",
    tint: "bg-[var(--ui-accent-soft)]",
  },
];

const trustStrip = [
  { icon: Truck, title: "Same-day delivery", body: "On qualifying Lagos orders before 11:00" },
  { icon: MapPin, title: "Free store pickup", body: "Collect from AdoptMe locations near you" },
  { icon: Star, title: "Rated 4.8 / 5", body: "From verified shoppers and adopters" },
  { icon: ShieldCheck, title: "Welfare-first", body: "Escrow, care records, and safer handovers" },
];

const platformFeatures: {
  title: string;
  body: string;
  href: string;
  cta: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Shop",
    body: "Food, toys, health, habitats, and autoship — curated by pet type.",
    href: "/shop",
    cta: "Browse shop",
    icon: ShoppingBag,
  },
  {
    title: "Marketplace",
    body: "Sale, breeding, exchange, and adoption listings with care records.",
    href: "/marketplace",
    cta: "Open marketplace",
    icon: PawPrint,
  },
  {
    title: "Services",
    body: "Grooming, training, day camp, and veterinary care near you.",
    href: "/services",
    cta: "Book care",
    icon: Stethoscope,
  },
  {
    title: "Stores",
    body: "Find AdoptMe locations for pickup, services, and in-person support.",
    href: "/stores",
    cta: "Find a store",
    icon: MapPin,
  },
  {
    title: "Care dashboard",
    body: "Pets, vaccines, appointments, orders, and messages in one place.",
    href: "/dashboard",
    cta: "Open dashboard",
    icon: CalendarDays,
  },
  {
    title: "PawRewards",
    body: "Earn points on every naira and unlock Bestie and VIPP perks.",
    href: "/rewards",
    cta: "View rewards",
    icon: Gift,
  },
  {
    title: "Donations",
    body: "Fund shelters, rescues, and welfare campaigns that protect animals.",
    href: "/donations",
    cta: "Give today",
    icon: HeartHandshake,
  },
  {
    title: "Learn",
    body: "Guides for new pet parents, nutrition, training, and healthier homes.",
    href: "/learn",
    cta: "Start learning",
    icon: BookOpen,
  },
];

const marketplacePaths: {
  title: string;
  href: string;
  cta: string;
  icon: LucideIcon;
  body: string;
}[] = [
  {
    title: "Buy / sell",
    href: "/marketplace?type=SALE",
    cta: "Browse sale listings",
    icon: ShoppingBag,
    body: "Structured sale listings with health notes, vaccination status, microchip details, photos, and clearer seller contact.",
  },
  {
    title: "Breeding animals",
    href: "/marketplace?type=BREEDING",
    cta: "View breeding animals",
    icon: PawPrint,
    body: "Responsible breeding listings focused on parent health, lineage notes, socialization, and care commitments.",
  },
  {
    title: "Exchange",
    href: "/marketplace?type=EXCHANGE",
    cta: "Explore swaps",
    icon: Repeat2,
    body: "Safer swaps with exchange preferences, compatibility notes, owner attestations, and escrow-ready follow-up.",
  },
  {
    title: "Adoption",
    href: "/marketplace?type=ADOPTION",
    cta: "Find adoptable pets",
    icon: HeartHandshake,
    body: "Adoption-first profiles highlighting welfare, applications, care expectations, and transparent records.",
  },
];

const shopPets = [
  {
    label: "Dog",
    href: "/shop/dog",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80",
    tint: "bg-[#ffe4b5]",
  },
  {
    label: "Cat",
    href: "/shop/cat",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
    tint: "bg-[#ffd6e0]",
  },
  {
    label: "Fish",
    href: "/shop/fish",
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be3?auto=format&fit=crop&w=400&q=80",
    tint: "bg-[#cfefff]",
  },
  {
    label: "Bird",
    href: "/shop/bird",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=400&q=80",
    tint: "bg-[#d8f5c8]",
  },
  {
    label: "Reptile",
    href: "/shop/reptile",
    image: "https://images.unsplash.com/photo-1610629654165-7fcecb54e5b1?auto=format&fit=crop&w=400&q=80",
    tint: "bg-[#e6f0c8]",
  },
  {
    label: "Small Pet",
    href: "/shop/small-pet",
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=400&q=80",
    tint: "bg-[#f0e0ff]",
  },
];

const dashboardGlimpse = [
  { title: "My Pets", body: "Profiles, vaccines, weight trends, and microchip status.", href: "/dashboard/pets" },
  { title: "Appointments", body: "In-clinic and telemedicine bookings with reminder cues.", href: "/dashboard/appointments" },
  { title: "Orders", body: "Multi-vendor purchases, shipping status, and returns preview.", href: "/dashboard/orders" },
  { title: "Messages", body: "Vendor, shelter, and vet conversations in one inbox.", href: "/dashboard/messages" },
];

const pillars = [
  {
    title: "Welfare-first pet care",
    body: "Listings highlight care history, health notes, temperament, and the home each animal needs.",
    icon: ShieldCheck,
  },
  {
    title: "Adoption, not just transactions",
    body: "Structured applications, moderator review, and transparent timelines center animal welfare.",
    icon: HeartHandshake,
  },
  {
    title: "Support for every journey",
    body: "Families, shelters, veterinarians, breeders, and donors work from one pet-focused hub.",
    icon: Sparkles,
  },
];

const listingSteps = [
  "Upload pet identity, breed, age, sex, color, weight, and location.",
  "Add vaccination, microchip, health, medication, and vet-record details.",
  "Describe temperament, training, compatibility, and ideal home fit.",
  "Publish photos and owner attestation for moderation-ready review.",
];

const categoryCtas = [
  {
    title: "Shop accessories",
    href: "/shop/dog/collars-harnesses-and-leashes",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80",
    tint: "bg-[var(--ui-sky)]",
  },
  {
    title: "Shop toys",
    href: "/shop/dog/toys",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    tint: "bg-[var(--ui-pastel)]",
  },
  {
    title: "Shop food",
    href: "/shop/dog/food",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
    tint: "bg-[var(--ui-accent-soft)]",
    badge: "New",
  },
];

function SectionHeading({
  eyebrow,
  title,
  body,
  action,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl space-y-2">
        <p className="ui-micro text-[var(--ui-muted)]">{eyebrow}</p>
        <h2 className="ui-section-title text-[var(--ui-ink)]">{title}</h2>
        {body ? <p className="text-sm leading-relaxed text-[var(--ui-muted)] sm:text-[15px]">{body}</p> : null}
      </div>
      {action}
    </div>
  );
}

export default async function HomePage() {
  const [{ items: services }, { items: featured }] = await Promise.all([
    fetchServices(),
    fetchProducts({ sort: "best_sellers", pageSize: "8" }),
  ]);

  return (
    <div>
      {/* Hero — restored video montage + pet motion */}
      <section className="relative min-h-[720px] overflow-hidden bg-zinc-950 text-white">
        <HeroVideoMontage />
        <HeroPetMotion />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_15%_20%,rgb(255_209_0_/_0.22),transparent_34%),linear-gradient(90deg,rgb(0_40_66_/_0.92),rgb(0_40_66_/_0.58)_48%,rgb(0_40_66_/_0.28)),linear-gradient(to_top,rgb(0_40_66_/_0.88),transparent_48%)]" />
        <div className="relative z-[3] mx-auto flex min-h-[720px] max-w-7xl items-center px-4 py-24 sm:px-6 lg:py-28">
          <div className="w-full max-w-3xl">
            <p className="ui-display mb-5 text-2xl tracking-tight text-[var(--ui-accent)] sm:text-3xl">AdoptMe</p>
            <div className="hero-content-slider relative min-h-[430px]">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.title}
                  className="hero-content-slide absolute inset-0 flex flex-col justify-center space-y-6"
                  style={{ animationDelay: `${index * 8}s` }}
                >
                  <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur">
                    <PawPrint className="h-3.5 w-3.5 text-[var(--ui-accent)] motion-float" aria-hidden />
                    {slide.eyebrow}
                  </p>
                  <h1 className="ui-display text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.35rem]">
                    {slide.title}
                  </h1>
                  <p className="max-w-2xl text-pretty text-base leading-relaxed text-white/90 sm:text-lg">{slide.body}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={slide.primaryHref}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--ui-accent)] px-8 text-[15px] font-semibold text-[var(--ui-ink)] shadow-[0_10px_28px_rgb(255_209_0_/_0.28)] transition hover:brightness-95"
                    >
                      {slide.primaryLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    <Link
                      href={slide.secondaryHref}
                      className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 text-[15px] font-semibold text-white backdrop-blur transition hover:bg-white/20"
                    >
                      {slide.secondaryLabel}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              {heroSlides.map((slide, index) => (
                <span
                  key={slide.title}
                  className="hero-content-tick h-1.5 w-12 rounded-full bg-white/25"
                  style={{ animationDelay: `${index * 8}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-[var(--ui-border)] bg-[var(--ui-surface-solid)]">
        <div className="ui-container grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustStrip.map((item) => (
            <div key={item.title} className="flex gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--ui-accent)] text-[var(--ui-ink)]">
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--ui-ink)]">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[var(--ui-muted)]">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category promo tiles */}
      <section className="ui-container space-y-4 py-12 sm:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {categoryCtas.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              className={cn(
                "group relative flex min-h-56 flex-col justify-end overflow-hidden rounded-[1.75rem] p-6 transition hover:-translate-y-1",
                tile.tint,
              )}
            >
              <SafeImage
                src={tile.image}
                alt=""
                fill
                className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.04]"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(0_40_66_/_0.55)] via-transparent to-transparent" />
              {tile.badge ? (
                <span className="absolute right-4 top-4 rounded-full bg-[var(--ui-accent)] px-3 py-1 text-xs font-bold text-[var(--ui-ink)]">
                  {tile.badge}
                </span>
              ) : null}
              <span className="relative ui-display text-2xl text-white">{tile.title}</span>
            </Link>
          ))}
        </div>
        <div className="motion-stagger grid gap-4 md:grid-cols-3">
          {carePathTiles.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              className={cn(
                "group relative flex min-h-56 flex-col justify-end overflow-hidden rounded-[1.75rem] p-6 transition hover:-translate-y-1",
                tile.tint,
              )}
            >
              <SafeImage
                src={tile.image}
                alt=""
                fill
                className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.04]"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(0_40_66_/_0.55)] via-transparent to-transparent" />
              <span className="relative ui-display text-2xl text-white">{tile.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Taste it, Love it — products */}
      <section className="ui-container space-y-8 pb-16 sm:pb-20">
        <SectionHeading
          eyebrow="Bestsellers"
          title="Taste it, love it"
          body="Crowd-favorite food and treats for dogs, cats, and more — ready for autoship."
          action={
            <Link href="/shop" className="text-sm font-semibold text-[var(--ui-ink)] underline-offset-4 hover:underline">
              View all delicious
            </Link>
          }
        />
        {featured.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : null}
      </section>

      {/* Flash sale band */}
      <section className="ui-band-mist py-14 sm:py-16">
        <div className="ui-container grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="ui-micro text-[var(--ui-muted)]">Flash sale</p>
            <h2 className="ui-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-[var(--ui-ink)]">
              50% <span className="text-[1.15rem] font-semibold tracking-normal sm:text-2xl">OFF</span>
            </h2>
            <p className="ui-section-title text-[var(--ui-ink)]">All AdoptMe essentials this week</p>
            <p className="max-w-md text-sm text-[var(--ui-muted)]">
              Use promo code <span className="font-semibold text-[var(--ui-ink)]">CARE50</span> in cart on qualifying food and treat packs.
            </p>
            <Link href="/shop" className={cn(btnPrimary, "gap-2")}>
              Shop the sale
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] bg-[var(--ui-accent)]">
            <SafeImage
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80"
              alt="Pet food and treats on promotion"
              fill
              className="object-cover mix-blend-multiply"
              sizes="(max-width:1024px) 90vw, 40vw"
            />
          </div>
        </div>
      </section>

      {/* Shop by animal */}
      <section className="ui-container space-y-8 py-16 sm:py-20">
        <SectionHeading eyebrow="Shop by animal" title="Find the aisle that fits your pet" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {shopPets.map((item) => (
            <Link key={item.href} href={item.href} className="group flex flex-col items-center gap-3 text-center">
              <span className={cn("relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full transition group-hover:scale-105 sm:h-32 sm:w-32", item.tint)}>
                <SafeImage src={item.image} alt={item.label} fill className="object-cover p-2" sizes="128px" />
              </span>
              <span className="text-sm font-semibold text-[var(--ui-ink)]">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature map */}
      <section className="ui-band-mist py-16 sm:py-20">
        <div className="ui-container space-y-8">
          <SectionHeading
            eyebrow="Everything in one hub"
            title="A glimpse of every AdoptMe service"
            body="Shop supplies, discover animals, book pet care, earn rewards, donate to welfare, and manage your pets — without leaving the platform."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platformFeatures.map((feature) => (
              <Link key={feature.title} href={feature.href} className="group">
                <Card className="flex h-full flex-col justify-between gap-5 border-0 bg-white p-5 shadow-[var(--ui-shadow)]">
                  <div className="space-y-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--ui-accent)] text-[var(--ui-ink)] transition group-hover:scale-105">
                      <feature.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="ui-display text-xl text-[var(--ui-ink)]">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--ui-muted)]">{feature.body}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ui-ink)]">
                    {feature.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace */}
      <section className="ui-container space-y-8 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Marketplace"
          title="Choose the right path for every animal"
          body="Sale, breeding, exchange, and adoption flows keep health, temperament, and handover clarity front and center."
          action={
            <Link href="/sell" className={cn(btnPrimary, "gap-2")}>
              Create a listing
              <UploadCloud className="h-4 w-4" aria-hidden />
            </Link>
          }
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {marketplacePaths.map((path) => (
            <Card key={path.title} className="group flex flex-col justify-between gap-6 border-0 bg-[var(--ui-mist)] p-5 shadow-none">
              <div className="space-y-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[var(--ui-ink)]">
                  <path.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="ui-display text-xl text-[var(--ui-ink)]">{path.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--ui-muted)]">{path.body}</p>
              </div>
              <Link href={path.href} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ui-ink)]">
                {path.cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="ui-band-sky py-16 sm:py-20">
        <div className="ui-container space-y-8">
          <SectionHeading
            eyebrow="Health & wellness"
            title="Book expert care at AdoptMe stores"
            body="Grooming, training, day camp, and veterinary teams — overnight boarding is not offered."
            action={
              <Link href="/services" className="text-sm font-semibold text-[var(--ui-ink)] underline-offset-4 hover:underline">
                See all services
              </Link>
            }
          />
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden border-0 p-0 shadow-[var(--ui-shadow)]">
                <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-44 overflow-hidden bg-[var(--ui-mist)] sm:min-h-full">
                    <SafeImage src={service.imageUrl} alt={service.name} fill sizes="(max-width:768px) 100vw, 40vw" />
                  </div>
                  <div className="flex flex-col justify-between gap-4 p-5 sm:p-6">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ui-muted)]">
                        {SERVICE_LABELS[service.type]}
                      </p>
                      <h3 className="ui-display text-xl text-[var(--ui-ink)]">{service.name}</h3>
                      <p className="text-sm leading-relaxed text-[var(--ui-muted)]">{service.summary}</p>
                      <p className="text-sm font-semibold text-[var(--ui-ink)]">
                        From {formatMoney(service.priceFromMinor, service.currency)} · {service.duration}
                      </p>
                    </div>
                    <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ui-ink)]">
                      Book now
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-4 rounded-[1.75rem] bg-[var(--ui-primary)] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
              <div>
                <p className="font-semibold">Prefer in-store pickup or booking?</p>
                <p className="mt-1 text-sm text-white/85">Browse locations across Nigeria for shopping and pet services.</p>
              </div>
            </div>
            <Link
              href="/stores"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[var(--ui-accent)] px-5 text-sm font-semibold text-[var(--ui-ink)]"
            >
              Find a store
            </Link>
          </div>
        </div>
      </section>

      {/* New pet CTA */}
      <section className="ui-container py-16 sm:py-20">
        <div className="grid overflow-hidden rounded-[2rem] bg-[var(--ui-pastel-deep)] lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 p-8 sm:p-12">
            <p className="ui-micro text-[var(--ui-ink)]/70">New pet in home?</p>
            <h2 className="ui-section-title text-[var(--ui-ink)]">Find everything you need to start.</h2>
            <p className="max-w-md text-sm leading-relaxed text-[var(--ui-ink)]/80">
              Starter kits, first-week guides, vaccination reminders, and the right supplies for your new companion.
            </p>
            <Link href="/new-pet" className={cn(btnPrimary, "w-fit gap-2")}>
              Learn more
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="relative min-h-64">
            <SafeImage
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80"
              alt="Family welcoming a new pet"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Care dashboard */}
      <section className="ui-band-mist py-16 sm:py-20">
        <div className="ui-container space-y-8">
          <SectionHeading
            eyebrow="Care dashboard"
            title="Keep pets, appointments, and orders organized"
            body="Pet parents, vendors, veterinarians, and admins each get a role-ready workspace with the KPIs that matter."
            action={
              <Link href="/login" className={cn(btnPrimary, "gap-2")}>
                Sign in to dashboard
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dashboardGlimpse.map((item) => (
              <Link key={item.title} href={item.href}>
                <Card className="h-full space-y-2 border-0 bg-white p-5 shadow-[var(--ui-shadow)] transition hover:-translate-y-0.5">
                  <h3 className="font-semibold tracking-tight text-[var(--ui-ink)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--ui-muted)]">{item.body}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards + Donations + Learn */}
      <section className="ui-container space-y-8 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Loyalty & welfare"
          title="Earn points, support shelters, and learn as you go"
          body="PawRewards, donations, and learning center resources keep everyday care connected to community impact."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="flex flex-col justify-between gap-6 border-0 bg-[var(--ui-accent-soft)] p-6 shadow-none">
            <div className="space-y-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--ui-accent)] text-[var(--ui-ink)]">
                <Gift className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="ui-display text-xl text-[var(--ui-ink)]">PawRewards</h3>
              <p className="text-sm leading-relaxed text-[var(--ui-muted)]">
                Earn points on every Naira spent, redeem for cart credit, and climb Member → Bestie → VIPP tiers.
              </p>
            </div>
            <Link href="/rewards" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ui-ink)]">
              Explore rewards
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Card>
          <Card className="flex flex-col justify-between gap-6 border-0 bg-[var(--ui-pastel)] p-6 shadow-none">
            <div className="space-y-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[var(--ui-ink)]">
                <HeartHandshake className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="ui-display text-xl text-[var(--ui-ink)]">Donations</h3>
              <p className="text-sm leading-relaxed text-[var(--ui-muted)]">
                Support shelters and welfare campaigns directly from the same account that shops and adopts.
              </p>
            </div>
            <Link href="/donations" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ui-ink)]">
              Donate now
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Card>
          <Card className="flex flex-col justify-between gap-6 border-0 bg-[var(--ui-sky)] p-6 shadow-none">
            <div className="space-y-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[var(--ui-ink)]">
                <BookOpen className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="ui-display text-xl text-[var(--ui-ink)]">Tips & advice</h3>
              <p className="text-sm leading-relaxed text-[var(--ui-muted)]">
                Nutrition, training, and first-week guides for families bringing a companion home.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/learn" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ui-ink)]">
                Learning center
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/new-pet" className="text-sm font-semibold text-[var(--ui-muted)] hover:text-[var(--ui-ink)]">
                New pet parent
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Listing quality */}
      <section className="ui-band-mist py-16 sm:py-20">
        <div className="ui-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="ui-micro text-[var(--ui-muted)]">Responsible uploads</p>
            <h2 className="ui-section-title text-[var(--ui-ink)]">A better pet profile for thoughtful listings.</h2>
            <p className="text-sm leading-relaxed text-[var(--ui-muted)] sm:text-[15px]">
              The listing flow asks for the details families need before a sale, adoption application, exchange, or breeder conversation moves forward.
            </p>
            <Link href="/sell" className={cn(btnPrimary, "gap-2")}>
              Start seller form
              <UploadCloud className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {listingSteps.map((step, index) => (
              <Card key={step} className="flex gap-3 border-0 bg-white p-4 shadow-[var(--ui-shadow)]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--ui-accent)] text-xs font-bold text-[var(--ui-ink)]">
                  {index + 1}
                </span>
                <p className="text-sm leading-relaxed text-[var(--ui-muted)]">{step}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why AdoptMe */}
      <section className="ui-container space-y-8 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Trust"
          title="Why pet communities choose AdoptMe"
          body="Every surface is shaped around animal welfare, clearer records, safer conversations, and stronger support for families bringing pets home."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.title} className="space-y-3 border-0 bg-[var(--ui-mist)] p-5 shadow-none">
              <p.icon className="h-6 w-6 text-[var(--ui-ink)]" aria-hidden />
              <h3 className="ui-display text-lg text-[var(--ui-ink)]">{p.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--ui-muted)]">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter / final CTA */}
      <section className="ui-container pb-16 sm:pb-20">
        <div className="flex flex-col gap-6 overflow-hidden rounded-[2rem] bg-[var(--ui-primary)] p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <p className="ui-display text-3xl sm:text-4xl">Sign up!</p>
            <ul className="mt-4 space-y-1.5 text-sm text-white/85">
              <li>✓ Free shipping on orders over ₦50,000</li>
              <li>✓ New subscribers get 20% off first shop order</li>
              <li>✓ Exclusive deals straight to your inbox</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--ui-accent)] px-7 text-[15px] font-semibold text-[var(--ui-ink)]"
            >
              Create account
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 text-[15px] font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Explore marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
