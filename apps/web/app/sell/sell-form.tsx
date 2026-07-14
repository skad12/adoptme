"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createListing, type CreateListingPayload } from "@/lib/api";
import { nairaToMinor } from "@/lib/money";

const fieldClass =
  "min-h-24 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-500/30 placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50";

const selectClass =
  "h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none ring-emerald-500/30 focus:border-emerald-500 focus:ring-4 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50";

const documentOptions = [
  "Vaccination record",
  "Vet health check",
  "Microchip transfer info",
  "Spay/neuter certificate",
  "Pedigree or breeder record",
  "Training notes",
  "Diet plan",
  "Medication notes",
];

function splitLines(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function optionalNumber(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  if (!text) return undefined;
  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function nairaInputToMinor(value: FormDataEntryValue | null) {
  const amount = optionalNumber(value);
  return amount == null ? null : nairaToMinor(amount);
}

function speciesFor(category: string) {
  if (category === "dogs") return "Canis familiaris";
  if (category === "cats") return "Felis catus";
  return "Aves";
}

export function SellForm() {
  const router = useRouter();
  const [listingType, setListingType] = useState<"SALE" | "EXCHANGE">("SALE");
  const [animalCategory, setAnimalCategory] = useState<"dogs" | "cats" | "birds">("dogs");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const helperText = useMemo(() => {
    if (listingType === "EXCHANGE") return "Describe exactly what swap, fee adjustment, or care setup you will consider.";
    return "Set a fair asking price and include what records, supplies, or guarantees are included.";
  }, [listingType]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);
    const documentsIncluded = documentOptions.filter((option) => form.getAll("documentsIncluded").includes(option));
    const imageUrls = splitLines(form.get("imageUrls"));

    const payload: CreateListingPayload = {
      listingType,
      animalCategory,
      title: String(form.get("title") ?? ""),
      description: String(form.get("description") ?? ""),
      priceCents: listingType === "SALE" ? nairaInputToMinor(form.get("price")) : null,
      exchangePreferences: String(form.get("exchangePreferences") ?? ""),
      city: String(form.get("city") ?? ""),
      country: String(form.get("country") ?? ""),
      contactName: String(form.get("contactName") ?? ""),
      contactEmail: String(form.get("contactEmail") ?? ""),
      contactPhone: String(form.get("contactPhone") ?? ""),
      imageUrls,
      ownerNotes: String(form.get("ownerNotes") ?? ""),
      attestation: true,
      pet: {
        name: String(form.get("petName") ?? ""),
        species: speciesFor(animalCategory),
        breed: String(form.get("breed") ?? ""),
        ageMonths: Number(form.get("ageMonths") ?? 0),
        sex: String(form.get("sex") ?? "UNKNOWN") as "MALE" | "FEMALE" | "UNKNOWN",
        color: String(form.get("color") ?? ""),
        weightKg: optionalNumber(form.get("weightKg")),
        size: String(form.get("size") ?? "Medium") as "Small" | "Medium" | "Large" | "Extra large",
        healthNotes: String(form.get("healthNotes") ?? ""),
        vaccinationStatus: String(form.get("vaccinationStatus") ?? ""),
        vaccineDetails: String(form.get("vaccineDetails") ?? ""),
        microchipStatus: String(form.get("microchipStatus") ?? ""),
        microchipId: String(form.get("microchipId") ?? ""),
        spayedNeutered: String(form.get("spayedNeutered") ?? ""),
        medications: String(form.get("medications") ?? ""),
        temperament: String(form.get("temperament") ?? ""),
        trainingLevel: String(form.get("trainingLevel") ?? ""),
        goodWithKids: String(form.get("goodWithKids") ?? ""),
        goodWithDogs: String(form.get("goodWithDogs") ?? ""),
        goodWithCats: String(form.get("goodWithCats") ?? ""),
        documentsIncluded,
      },
    };

    try {
      const listing = await createListing(payload);
      router.push(`/pets/${listing.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create listing. Please review the form and try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Listing intent</p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">What are you listing?</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{helperText}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2">
            <span className="text-sm font-medium">Listing type</span>
            <select className={selectClass} value={listingType} onChange={(event) => setListingType(event.target.value as "SALE" | "EXCHANGE")}>
              <option value="SALE">Sell</option>
              <option value="EXCHANGE">Exchange / swap</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Animal category</span>
            <select className={selectClass} value={animalCategory} onChange={(event) => setAnimalCategory(event.target.value as "dogs" | "cats" | "birds")}>
              <option value="dogs">Dog</option>
              <option value="cats">Cat</option>
              <option value="birds">Bird</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Price in ₦ (Naira)</span>
            <Input name="price" type="number" min="0" step="1" placeholder={listingType === "SALE" ? "1200" : "Optional for swap"} disabled={listingType === "EXCHANGE"} />
          </label>
        </div>
        {listingType === "EXCHANGE" ? (
          <label className="space-y-2">
            <span className="text-sm font-medium">Exchange preferences</span>
            <textarea name="exchangePreferences" className={fieldClass} placeholder="Example: open to swapping for a young, vaccinated cat plus delivery support." />
          </label>
        ) : null}
      </Card>

      <Card className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Animal profile</p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">Identity and care details</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium">Pet name</span>
            <Input name="petName" required placeholder="Luna" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Breed or best estimate</span>
            <Input name="breed" required placeholder="Golden Retriever" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Age in months</span>
            <Input name="ageMonths" required type="number" min="0" placeholder="14" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Sex</span>
            <select name="sex" className={selectClass} required>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="UNKNOWN">Unknown / not verified</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Color / markings</span>
            <Input name="color" placeholder="Black and white" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Weight in kg</span>
            <Input name="weightKg" type="number" min="0" step="0.1" placeholder="18" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Size</span>
            <select name="size" className={selectClass}>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
              <option>Extra large</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Spay / neuter status</span>
            <Input name="spayedNeutered" placeholder="Spayed, neutered, intact, or not applicable" />
          </label>
        </div>
      </Card>

      <Card className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Health and safety</p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">Records buyers should see</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium">Vaccination status</span>
            <select name="vaccinationStatus" className={selectClass} required>
              <option>Fully vaccinated</option>
              <option>Partially vaccinated</option>
              <option>Awaiting first vaccine</option>
              <option>Vet checked - no routine vaccine required</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Microchip status</span>
            <select name="microchipStatus" className={selectClass} required>
              <option>Microchipped and registered</option>
              <option>Microchipped, transfer pending</option>
              <option>Will be microchipped before transfer</option>
              <option>Not microchipped</option>
              <option>Not applicable</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Vaccine product/date details</span>
            <Input name="vaccineDetails" placeholder="Rabies and DHPP current; records available" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Microchip ID</span>
            <Input name="microchipId" placeholder="Optional until transfer" />
          </label>
        </div>
        <label className="space-y-2">
          <span className="text-sm font-medium">Health notes</span>
          <textarea name="healthNotes" required className={fieldClass} placeholder="Mention vet checks, deworming, allergies, known issues, surgeries, or special care." />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Current medication or supplements</span>
          <Input name="medications" placeholder="None, or list medication name and schedule" />
        </label>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {documentOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 rounded-xl border border-zinc-200 p-3 text-sm dark:border-zinc-800">
              <input name="documentsIncluded" type="checkbox" value={option} className="h-4 w-4 rounded border-zinc-300 text-emerald-600" />
              {option}
            </label>
          ))}
        </div>
      </Card>

      <Card className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Temperament</p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">Behavior and home fit</h2>
        </div>
        <label className="space-y-2">
          <span className="text-sm font-medium">Temperament summary</span>
          <textarea name="temperament" required className={fieldClass} placeholder="Describe handling, energy level, confidence, noise sensitivity, prey drive, and any triggers." />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium">Training level</span>
            <Input name="trainingLevel" placeholder="Litter trained, leash started, step-up trained, obedience classes..." />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Good with children?</span>
            <Input name="goodWithKids" placeholder="Yes, older children, unknown, or no" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Good with dogs?</span>
            <Input name="goodWithDogs" placeholder="Yes, slow introductions, unknown, or no" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Good with cats?</span>
            <Input name="goodWithCats" placeholder="Yes, slow introductions, unknown, or no" />
          </label>
        </div>
      </Card>

      <Card className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Listing content</p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">Photos, location, and contact</h2>
        </div>
        <label className="space-y-2">
          <span className="text-sm font-medium">Listing title</span>
          <Input name="title" required placeholder="Healthy Border Collie ready for an active home" />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Public description</span>
          <textarea name="description" required className={fieldClass} placeholder="Tell buyers why this animal is a good match, what is included, and what kind of home you are seeking." />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Photo URLs</span>
          <textarea
            name="imageUrls"
            required
            className={fieldClass}
            defaultValue="https://images.unsplash.com/photo-1552053831-71594a27632d?w=1200&q=80"
            placeholder="Paste one image URL per line. File uploads can be wired to object storage later."
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium">City</span>
            <Input name="city" required placeholder="Austin" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Country</span>
            <Input name="country" required placeholder="US" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Contact name</span>
            <Input name="contactName" required placeholder="Your name or organization" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Contact email</span>
            <Input name="contactEmail" required type="email" placeholder="seller@example.com" />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium">Contact phone</span>
            <Input name="contactPhone" placeholder="+1 555 000 0000" />
          </label>
        </div>
        <label className="space-y-2">
          <span className="text-sm font-medium">Private transfer notes</span>
          <textarea name="ownerNotes" className={fieldClass} placeholder="Meet-and-greet requirements, delivery radius, preferred buyer profile, or safety notes." />
        </label>
        <div className="rounded-2xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          <p className="font-medium text-zinc-900 dark:text-zinc-100">Future file uploads</p>
          <p className="mt-1">Add photos, vaccine records, microchip proof, and vet reports here once object storage is connected.</p>
          <input type="file" multiple accept="image/*,.pdf" className="mt-3 block text-sm" />
        </div>
      </Card>

      <Card className="space-y-4 border-amber-200 bg-amber-50/60 dark:border-amber-900/50 dark:bg-amber-950/20">
        <label className="flex gap-3 text-sm leading-relaxed text-amber-950 dark:text-amber-100">
          <input name="attestation" required type="checkbox" className="mt-1 h-4 w-4 rounded border-amber-300 text-emerald-600" />
          <span>
            I confirm I am the animal owner or authorized representative, the information is complete and truthful, and I will follow local animal welfare,
            licensing, microchip, vaccination, and transfer rules.
          </span>
        </label>
        {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-200">{error}</p> : null}
        <Button type="submit" disabled={isSubmitting} className="w-full gap-2 sm:w-auto">
          {isSubmitting ? "Publishing listing..." : "Publish demo listing"}
          {isSubmitting ? <CheckCircle2 className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </Button>
      </Card>
    </form>
  );
}
