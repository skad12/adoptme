import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SafeImage } from "@/components/ui/safe-image";
import { fetchListing } from "@/lib/listing-data";
import { formatMoney } from "@/lib/money";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await fetchListing(slug);
  if (!listing) return { title: "Listing" };
  const desc = listing.description.slice(0, 160).trim();
  return {
    title: listing.title,
    description: desc,
    openGraph: { title: listing.title, description: desc, type: "website" },
  };
}


function listingTypeLabel(type: "SALE" | "EXCHANGE" | "ADOPTION" | "BREEDING") {
  if (type === "SALE") return "For sale";
  if (type === "EXCHANGE") return "Exchange";
  if (type === "BREEDING") return "Breeding animal";
  return "Adoption";
}

function age(months: number | null | undefined) {
  if (months == null) return "Unknown";
  if (months < 12) return `${months} months`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest ? `${years} yr ${rest} mo` : `${years} yr`;
}

function infoRows(rows: Array<[string, string | number | null | undefined]>) {
  return rows.filter(([, value]) => value != null && value !== "");
}

export default async function PetDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const listing = await fetchListing(slug);
  if (!listing) notFound();

  const images = listing.images ?? [];
  const hero = images[0]?.url;
  const pet = listing.pet;
  const basics = infoRows([
    ["Name", pet?.name],
    ["Species", pet?.species],
    ["Breed", pet?.breed],
    ["Age", age(pet?.ageMonths)],
    ["Sex", pet?.sex?.toLowerCase()],
    ["Color", pet?.color],
    ["Size", pet?.size],
    ["Weight", pet?.weightKg ? `${pet.weightKg} kg` : null],
  ]);
  const health = infoRows([
    ["Vaccination", pet?.vaccinationStatus],
    ["Vaccine details", pet?.vaccineDetails],
    ["Microchip", pet?.microchipStatus],
    ["Microchip ID", pet?.microchipId],
    ["Spay/neuter", pet?.spayedNeutered],
    ["Medication", pet?.medications],
  ]);
  const compatibility = infoRows([
    ["Children", pet?.goodWithKids],
    ["Dogs", pet?.goodWithDogs],
    ["Cats", pet?.goodWithCats],
    ["Training", pet?.trainingLevel],
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-4">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
            {hero ? (
              <SafeImage
                src={hero}
                alt={listing.title}
                fill
                priority
                className="transition duration-500 hover:scale-[1.02]"
                sizes="(max-width:1024px) 100vw, 55vw"
              />
            ) : null}
          </div>
          {images.length > 1 ? (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(1, 5).map((im) => (
                <div key={im.url} className="relative aspect-square overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <SafeImage src={im.url} alt={`${listing.title} — photo`} fill sizes="(max-width:768px) 25vw, 10vw" />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge>{listingTypeLabel(listing.type)}</Badge>
            {listing.seller?.sellerProfile?.verificationTier && listing.seller.sellerProfile.verificationTier !== "NONE" ? (
              <Badge className="border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-900/60 dark:bg-indigo-950/50 dark:text-indigo-100">
                Verified seller tier: {listing.seller.sellerProfile.verificationTier.toLowerCase()}
              </Badge>
            ) : null}
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{listing.title}</h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {[listing.city, listing.country].filter(Boolean).join(", ")}
            </p>
          </div>
          <Card className="space-y-3 border-emerald-100/80 bg-emerald-50/40 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/30">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-200">Pricing</p>
            <p className="text-3xl font-semibold text-emerald-900 dark:text-emerald-100">{formatMoney(listing.priceCents, listing.currency)}</p>
            <p className="text-xs text-emerald-900/80 dark:text-emerald-100/80">
              {listing.type === "ADOPTION"
                ? "Adoption listings use an application workflow instead of cart checkout."
                : listing.type === "BREEDING"
                  ? "Breeding listings use direct inquiry so families can review parent health, lineage, and care expectations first."
                : "Checkout uses escrow-backed settlement — funds move in phases with dispute windows."}
            </p>
          </Card>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">About this listing</h2>
            <p className="whitespace-pre-line">{listing.description}</p>
          </div>
          {listing.exchangePreferences ? (
            <Card className="space-y-2 border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
              <h2 className="text-sm font-semibold text-amber-950 dark:text-amber-100">Exchange preferences</h2>
              <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-100/80">{listing.exchangePreferences}</p>
            </Card>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            {listing.type === "ADOPTION" ? (
              <Link
                href={`/adoption?listingId=${listing.id}`}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Start adoption application
              </Link>
            ) : listing.type === "BREEDING" ? (
              <Link
                href={`/support?topic=breeding&listingId=${listing.id}`}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Ask about breeding records
              </Link>
            ) : (
              <Link
                href={`/checkout/escrow/demo?listingId=${listing.id}`}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Proceed to escrow checkout
              </Link>
            )}
            <Link
              href="/marketplace"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-300 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Back to marketplace
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Animal profile</h2>
          <dl className="space-y-3">
            {basics.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-zinc-100 pb-2 text-sm last:border-0 dark:border-zinc-800">
                <dt className="text-zinc-500 dark:text-zinc-400">{label}</dt>
                <dd className="text-right font-medium text-zinc-900 dark:text-zinc-100">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Health and records</h2>
          <dl className="space-y-3">
            {health.map(([label, value]) => (
              <div key={label} className="space-y-1 border-b border-zinc-100 pb-2 text-sm last:border-0 dark:border-zinc-800">
                <dt className="text-zinc-500 dark:text-zinc-400">{label}</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">{value}</dd>
              </div>
            ))}
          </dl>
          {pet?.healthNotes ? <p className="rounded-xl bg-zinc-50 p-3 text-sm leading-relaxed text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">{pet.healthNotes}</p> : null}
        </Card>

        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Temperament and fit</h2>
          {pet?.temperament ? <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{pet.temperament}</p> : null}
          <dl className="space-y-3">
            {compatibility.map(([label, value]) => (
              <div key={label} className="space-y-1 border-b border-zinc-100 pb-2 text-sm last:border-0 dark:border-zinc-800">
                <dt className="text-zinc-500 dark:text-zinc-400">{label}</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Documents included</h2>
          {pet?.documentsIncluded?.length ? (
            <div className="flex flex-wrap gap-2">
              {pet.documentsIncluded.map((doc) => (
                <span key={doc} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
                  {doc}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Ask the seller which records are available before arranging transfer.</p>
          )}
          {listing.ownerNotes ? <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{listing.ownerNotes}</p> : null}
        </Card>
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Seller contact</h2>
          <dl className="space-y-3 text-sm">
            {infoRows([
              ["Name", listing.contactName ?? listing.seller?.profile?.displayName],
              ["Email", listing.contactEmail],
              ["Phone", listing.contactPhone],
            ]).map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-zinc-100 pb-2 last:border-0 dark:border-zinc-800">
                <dt className="text-zinc-500 dark:text-zinc-400">{label}</dt>
                <dd className="text-right font-medium text-zinc-900 dark:text-zinc-100">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 dark:bg-amber-950/20 dark:text-amber-100">
            Always verify health records, microchip transfer, ownership authority, and local legal requirements before payment or handover.
          </p>
        </Card>
      </div>
    </div>
  );
}
