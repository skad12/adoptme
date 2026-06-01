import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { getPublicApiBaseUrl } from "./env";
import type { ListingDetail, ListingSummary, ListingsResponse } from "./api";

type SearchParams = Record<string, string | undefined>;
type ListingType = "SALE" | "EXCHANGE" | "ADOPTION" | "BREEDING";

type SeedPet = ListingDetail["pet"] & {
  id: string;
};

type SeedListing = {
  id: string;
  type: ListingType;
  status: string;
  sellerId: string;
  petId: string;
  title: string;
  description: string;
  priceCents: number | null;
  currency: string;
  country: string | null;
  city: string | null;
  categorySlugs: string[];
  exchangePreferences?: string | null;
  ownerNotes?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  createdAt: string;
};

type SeedImage = {
  listingId: string;
  url: string;
  sortOrder: number;
};

type SeedUser = {
  id: string;
  profile: { displayName: string } | null;
  sellerProfile: { verificationTier: string; reputationScore: number } | null;
};

type SeedCampaign = {
  id: string;
  title: string;
  description: string;
  goalCents: number | null;
  raisedCents: number;
};

type SeedData = {
  users: SeedUser[];
  pets: SeedPet[];
  listings: SeedListing[];
  listingImages: SeedImage[];
  donationCampaigns: SeedCampaign[];
};

const dataFile = resolve(process.cwd(), "../api/data/db.json");

async function readSeedData() {
  const raw = await readFile(dataFile, "utf8");
  return JSON.parse(raw) as SeedData;
}

function emptyListingsResponse(params: SearchParams): ListingsResponse {
  return { items: [], page: Number(params.page) || 1, pageSize: Number(params.pageSize) || 12, total: 0 };
}

function attachSummary(data: SeedData, listing: SeedListing): ListingSummary {
  const pet = data.pets.find((item) => item.id === listing.petId);
  const images = data.listingImages
    .filter((image) => image.listingId === listing.id)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(({ url }) => ({ url }));

  return {
    id: listing.id,
    title: listing.title,
    type: listing.type,
    priceCents: listing.priceCents,
    currency: listing.currency,
    city: listing.city,
    country: listing.country,
    createdAt: listing.createdAt,
    pet: {
      species: pet?.species ?? "",
      breed: pet?.breed ?? null,
    },
    images,
  };
}

function attachDetail(data: SeedData, listing: SeedListing): ListingDetail {
  const pet = data.pets.find((item) => item.id === listing.petId) ?? null;
  const seller = data.users.find((user) => user.id === listing.sellerId);
  const images = data.listingImages
    .filter((image) => image.listingId === listing.id)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(({ url }) => ({ url }));

  return {
    ...listing,
    pet,
    images,
    seller: seller
      ? {
          id: seller.id,
          profile: seller.profile,
          sellerProfile: seller.sellerProfile,
        }
      : undefined,
  };
}

async function fetchSeedListings(params: SearchParams): Promise<ListingsResponse> {
  try {
    const data = await readSeedData();
    const type = params.type as ListingType | undefined;
    const category = params.category;
    const search = params.q?.toLowerCase();
    const sort = params.sort ?? "newest";
    const page = Number(params.page) || 1;
    const pageSize = Number(params.pageSize) || 12;

    const filtered = data.listings.filter((listing) => {
      if (listing.status !== "ACTIVE") return false;
      if (type && listing.type !== type) return false;
      if (category && !listing.categorySlugs.includes(category)) return false;
      if (!search) return true;
      return listing.title.toLowerCase().includes(search) || listing.description.toLowerCase().includes(search);
    });

    const sorted = filtered.sort((a, b) => {
      if (sort === "price_asc") return (a.priceCents ?? Number.MAX_SAFE_INTEGER) - (b.priceCents ?? Number.MAX_SAFE_INTEGER);
      if (sort === "price_desc") return (b.priceCents ?? 0) - (a.priceCents ?? 0);
      return b.createdAt.localeCompare(a.createdAt);
    });

    return {
      items: sorted.slice((page - 1) * pageSize, page * pageSize).map((listing) => attachSummary(data, listing)),
      page,
      pageSize,
      total: sorted.length,
    };
  } catch {
    return emptyListingsResponse(params);
  }
}

async function fetchSeedListing(id: string): Promise<ListingDetail | null> {
  try {
    const data = await readSeedData();
    const listing = data.listings.find((item) => item.id === id && item.status === "ACTIVE");
    return listing ? attachDetail(data, listing) : null;
  } catch {
    return null;
  }
}

async function fetchSeedDonationCampaigns() {
  try {
    const data = await readSeedData();
    return { items: data.donationCampaigns };
  } catch {
    return { items: [] };
  }
}

export async function fetchListings(params: SearchParams): Promise<ListingsResponse> {
  try {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) qs.set(key, value);
    });
    const res = await fetch(`${getPublicApiBaseUrl()}/v1/listings?${qs.toString()}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return fetchSeedListings(params);
    return (await res.json()) as ListingsResponse;
  } catch {
    return fetchSeedListings(params);
  }
}

export async function fetchListing(id: string): Promise<ListingDetail | null> {
  try {
    const res = await fetch(`${getPublicApiBaseUrl()}/v1/listings/${id}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return fetchSeedListing(id);
    return res.json() as Promise<ListingDetail>;
  } catch {
    return fetchSeedListing(id);
  }
}

export async function fetchDonationCampaigns(): Promise<{
  items: { id: string; title: string; description: string; goalCents: number | null; raisedCents: number }[];
}> {
  try {
    const res = await fetch(`${getPublicApiBaseUrl()}/v1/donations/campaigns`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return fetchSeedDonationCampaigns();
    return res.json();
  } catch {
    return fetchSeedDonationCampaigns();
  }
}
