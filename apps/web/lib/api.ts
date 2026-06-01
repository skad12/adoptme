import { getPublicApiBaseUrl } from "./env";

export type ListingSummary = {
  id: string;
  title: string;
  type: "SALE" | "EXCHANGE" | "ADOPTION" | "BREEDING";
  priceCents: number | null;
  currency: string;
  city: string | null;
  country: string | null;
  createdAt: string;
  pet: { species: string; breed: string | null };
  images: { url: string }[];
};

export type PetProfile = {
  name?: string;
  species: string;
  breed: string | null;
  ageMonths: number | null;
  sex: string | null;
  color?: string | null;
  weightKg?: number | null;
  size?: string | null;
  healthNotes: string | null;
  vaccinationStatus?: string | null;
  vaccineDetails?: string | null;
  microchipStatus?: string | null;
  microchipId?: string | null;
  spayedNeutered?: string | null;
  medications?: string | null;
  temperament?: string | null;
  trainingLevel?: string | null;
  goodWithKids?: string | null;
  goodWithDogs?: string | null;
  goodWithCats?: string | null;
  documentsIncluded?: string[];
};

export type ListingsResponse = {
  items: ListingSummary[];
  page: number;
  pageSize: number;
  total: number;
};

export async function fetchListings(params: Record<string, string | undefined>): Promise<ListingsResponse> {
  try {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v) qs.set(k, v);
    });
    const res = await fetch(`${getPublicApiBaseUrl()}/v1/listings?${qs.toString()}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      return { items: [], page: Number(params.page) || 1, pageSize: Number(params.pageSize) || 12, total: 0 };
    }
    return (await res.json()) as ListingsResponse;
  } catch {
    return { items: [], page: Number(params.page) || 1, pageSize: Number(params.pageSize) || 12, total: 0 };
  }
}

export type ListingDetail = {
  id: string;
  title: string;
  description: string;
  type: "SALE" | "EXCHANGE" | "ADOPTION" | "BREEDING";
  priceCents: number | null;
  currency: string;
  city: string | null;
  country: string | null;
  exchangePreferences?: string | null;
  ownerNotes?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  pet: PetProfile | null;
  images: { url: string }[];
  seller?: {
    id: string;
    profile: { displayName: string } | null;
    sellerProfile: { verificationTier: string; reputationScore: number } | null;
  };
};

export type CreateListingPayload = {
  listingType: "SALE" | "EXCHANGE";
  animalCategory: "dogs" | "cats" | "birds";
  title: string;
  description: string;
  priceCents?: number | null;
  exchangePreferences?: string;
  city: string;
  country: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  pet: {
    name: string;
    species: string;
    breed: string;
    ageMonths: number;
    sex: "MALE" | "FEMALE" | "UNKNOWN";
    color?: string;
    weightKg?: number;
    size?: "Small" | "Medium" | "Large" | "Extra large";
    healthNotes: string;
    vaccinationStatus: string;
    vaccineDetails?: string;
    microchipStatus: string;
    microchipId?: string;
    spayedNeutered?: string;
    medications?: string;
    temperament: string;
    trainingLevel?: string;
    goodWithKids?: string;
    goodWithDogs?: string;
    goodWithCats?: string;
    documentsIncluded: string[];
  };
  imageUrls: string[];
  ownerNotes?: string;
  attestation: true;
};

export async function createListing(payload: CreateListingPayload): Promise<ListingDetail> {
  const res = await fetch(`${getPublicApiBaseUrl()}/v1/listings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to create listing");
  }
  return res.json() as Promise<ListingDetail>;
}

export async function fetchListing(id: string): Promise<ListingDetail | null> {
  const res = await fetch(`${getPublicApiBaseUrl()}/v1/listings/${id}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) return null;
  return res.json() as Promise<ListingDetail>;
}

export async function fetchDonationCampaigns(): Promise<{
  items: { id: string; title: string; description: string; goalCents: number | null; raisedCents: number }[];
}> {
  try {
    const res = await fetch(`${getPublicApiBaseUrl()}/v1/donations/campaigns`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { items: [] };
    return res.json();
  } catch {
    return { items: [] };
  }
}
