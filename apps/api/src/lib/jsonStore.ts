import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const dataFile = fileURLToPath(new URL("../../data/db.json", import.meta.url));

export type Role = "BUYER" | "SELLER" | "ADOPTER" | "DONOR" | "ADMIN" | "MODERATOR";
export type ListingType = "SALE" | "EXCHANGE" | "ADOPTION";
export type ListingStatus = "ACTIVE" | "PENDING_REVIEW" | "PAUSED" | "SOLD" | "REMOVED";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "DELETED";

export type UserProfile = {
  displayName: string;
};

export type SellerProfile = {
  verificationTier: string;
  reputationScore: number;
};

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  emailVerifiedAt: string | null;
  status: UserStatus;
  roles: Role[];
  profile: UserProfile | null;
  sellerProfile: SellerProfile | null;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
};

export type Pet = {
  id: string;
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
  createdById: string;
  createdAt: string;
};

export type Listing = {
  id: string;
  type: ListingType;
  status: ListingStatus;
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
  updatedAt: string;
};

export type ListingImage = {
  id: string;
  listingId: string;
  url: string;
  sortOrder: number;
};

export type Escrow = {
  id: string;
  state: string;
  amountCents: number;
  feeCents: number;
  createdAt: string;
};

export type Order = {
  id: string;
  type: "PURCHASE" | "EXCHANGE";
  buyerId: string;
  listingId: string;
  totalCents: number;
  status: string;
  escrow: Escrow;
  createdAt: string;
  updatedAt: string;
};

export type AdoptionApplication = {
  id: string;
  listingId: string;
  applicantId: string;
  payload: Record<string, unknown>;
  status: string;
  createdAt: string;
};

export type DonationCampaign = {
  id: string;
  title: string;
  description: string;
  goalCents: number | null;
  raisedCents: number;
  status: string;
  beneficiary: string;
  createdAt: string;
};

export type Donation = {
  id: string;
  userId?: string;
  campaignId?: string;
  amountCents: number;
  status: string;
  message?: string;
  createdAt: string;
};

export type MessageThread = {
  id: string;
  createdAt: string;
};

export type ThreadParticipant = {
  threadId: string;
  userId: string;
};

export type Message = {
  id: string;
  threadId: string;
  senderId: string;
  body: string;
  createdAt: string;
};

export type AdoptMeData = {
  users: User[];
  categories: Category[];
  pets: Pet[];
  listings: Listing[];
  listingImages: ListingImage[];
  orders: Order[];
  adoptionApplications: AdoptionApplication[];
  donationCampaigns: DonationCampaign[];
  donations: Donation[];
  messageThreads: MessageThread[];
  threadParticipants: ThreadParticipant[];
  messages: Message[];
};

export type ListingWithRelations = Listing & {
  pet: Pet | null;
  images: ListingImage[];
  seller?: {
    id: string;
    profile: UserProfile | null;
    sellerProfile: SellerProfile | null;
  };
};

let pendingWrite: Promise<void> = Promise.resolve();

export function createId(prefix: string) {
  return `${prefix}_${randomUUID()}`;
}

export function now() {
  return new Date().toISOString();
}

export async function readData(): Promise<AdoptMeData> {
  const raw = await readFile(dataFile, "utf8");
  return JSON.parse(raw) as AdoptMeData;
}

export async function updateData<T>(mutate: (data: AdoptMeData) => T | Promise<T>): Promise<T> {
  const run = pendingWrite.then(async () => {
    const data = await readData();
    const result = await mutate(data);
    await writeFile(dataFile, `${JSON.stringify(data, null, 2)}\n`, "utf8");
    return result;
  });

  pendingWrite = run.then(
    () => undefined,
    () => undefined,
  );

  return run;
}

export function attachListingRelations(data: AdoptMeData, listing: Listing, includeSeller = false): ListingWithRelations {
  const images = data.listingImages
    .filter((image) => image.listingId === listing.id)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const result: ListingWithRelations = {
    ...listing,
    pet: data.pets.find((pet) => pet.id === listing.petId) ?? null,
    images,
  };

  if (includeSeller) {
    const seller = data.users.find((user) => user.id === listing.sellerId);
    result.seller = seller
      ? {
          id: seller.id,
          profile: seller.profile,
          sellerProfile: seller.sellerProfile,
        }
      : undefined;
  }

  return result;
}

export function toPublicUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    roles: user.roles,
  };
}

export function toUserWithRoleRows(user: User) {
  return {
    ...user,
    roles: user.roles.map((role) => ({ role })),
  };
}

export function toMessageThreadView(data: AdoptMeData, thread: MessageThread) {
  return {
    ...thread,
    messages: data.messages
      .filter((message) => message.threadId === thread.id)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 1),
    parts: data.threadParticipants
      .filter((part) => part.threadId === thread.id)
      .map((part) => ({
        ...part,
        user: data.users.find((user) => user.id === part.userId)
          ? {
              id: part.userId,
              profile: data.users.find((user) => user.id === part.userId)?.profile ?? null,
            }
          : null,
      })),
  };
}
