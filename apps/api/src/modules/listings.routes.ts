import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { z } from "zod";
import { optionalAuth } from "../middleware/auth.js";
import { attachListingRelations, createId, now, readData, updateData, type Listing, type ListingImage, type Pet } from "../lib/jsonStore.js";

export const listingsRouter: ExpressRouter = Router();

const querySchema = z.object({
  q: z.string().optional(),
  type: z.enum(["SALE", "EXCHANGE", "ADOPTION"]).optional(),
  category: z.string().optional(),
  sort: z.enum(["newest", "price_asc", "price_desc"]).default("newest"),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(50).default(12),
});

const createListingSchema = z.object({
  listingType: z.enum(["SALE", "EXCHANGE"]),
  animalCategory: z.enum(["dogs", "cats", "birds"]),
  title: z.string().min(8).max(140),
  description: z.string().min(40).max(2000),
  priceCents: z.number().int().nonnegative().nullable().optional(),
  exchangePreferences: z.string().max(1000).optional(),
  city: z.string().min(2).max(80),
  country: z.string().min(2).max(80),
  contactName: z.string().min(2).max(100),
  contactEmail: z.string().email(),
  contactPhone: z.string().max(40).optional(),
  pet: z.object({
    name: z.string().min(1).max(80),
    species: z.string().min(2).max(100),
    breed: z.string().min(1).max(100),
    ageMonths: z.number().int().min(0).max(600),
    sex: z.enum(["MALE", "FEMALE", "UNKNOWN"]),
    color: z.string().max(80).optional(),
    weightKg: z.number().positive().max(500).optional(),
    size: z.enum(["Small", "Medium", "Large", "Extra large"]).optional(),
    healthNotes: z.string().min(10).max(1000),
    vaccinationStatus: z.string().min(2).max(120),
    vaccineDetails: z.string().max(500).optional(),
    microchipStatus: z.string().min(2).max(120),
    microchipId: z.string().max(80).optional(),
    spayedNeutered: z.string().max(80).optional(),
    medications: z.string().max(500).optional(),
    temperament: z.string().min(10).max(1000),
    trainingLevel: z.string().max(500).optional(),
    goodWithKids: z.string().max(120).optional(),
    goodWithDogs: z.string().max(120).optional(),
    goodWithCats: z.string().max(120).optional(),
    documentsIncluded: z.array(z.string().min(1).max(80)).max(12).default([]),
  }),
  imageUrls: z.array(z.string().url()).min(1).max(6),
  ownerNotes: z.string().max(1000).optional(),
  attestation: z.literal(true),
});

const speciesByCategory = {
  dogs: "Canis familiaris",
  cats: "Felis catus",
  birds: "Aves",
} as const;

listingsRouter.get("/", optionalAuth, async (req, res, next) => {
  try {
    const q = querySchema.parse(req.query);
    const data = await readData();
    const search = q.q?.toLowerCase();
    const filtered = data.listings.filter((listing) => {
      if (listing.status !== "ACTIVE") return false;
      if (q.type && listing.type !== q.type) return false;
      if (q.category && !listing.categorySlugs.includes(q.category)) return false;
      if (!search) return true;
      return listing.title.toLowerCase().includes(search) || listing.description.toLowerCase().includes(search);
    });

    const sorted = filtered.sort((a, b) => {
      if (q.sort === "price_asc") return (a.priceCents ?? Number.MAX_SAFE_INTEGER) - (b.priceCents ?? Number.MAX_SAFE_INTEGER);
      if (q.sort === "price_desc") return (b.priceCents ?? 0) - (a.priceCents ?? 0);
      return b.createdAt.localeCompare(a.createdAt);
    });

    const total = sorted.length;
    const items = sorted
      .slice((q.page - 1) * q.pageSize, q.page * q.pageSize)
      .map((listing) => attachListingRelations(data, listing));

    return res.json({
      items,
      page: q.page,
      pageSize: q.pageSize,
      total,
    });
  } catch (e) {
    next(e);
  }
});

listingsRouter.post("/", optionalAuth, async (req, res, next) => {
  try {
    const body = createListingSchema.parse(req.body);
    const created = await updateData((data) => {
      const timestamp = now();
      const sellerId = req.auth?.sub ?? "user_seller";
      const petId = createId("pet");
      const listingId = createId("listing");
      const pet: Pet = {
        id: petId,
        name: body.pet.name,
        species: body.pet.species || speciesByCategory[body.animalCategory],
        breed: body.pet.breed,
        ageMonths: body.pet.ageMonths,
        sex: body.pet.sex,
        color: body.pet.color || null,
        weightKg: body.pet.weightKg ?? null,
        size: body.pet.size ?? null,
        healthNotes: body.pet.healthNotes,
        vaccinationStatus: body.pet.vaccinationStatus,
        vaccineDetails: body.pet.vaccineDetails || null,
        microchipStatus: body.pet.microchipStatus,
        microchipId: body.pet.microchipId || null,
        spayedNeutered: body.pet.spayedNeutered || null,
        medications: body.pet.medications || null,
        temperament: body.pet.temperament,
        trainingLevel: body.pet.trainingLevel || null,
        goodWithKids: body.pet.goodWithKids || null,
        goodWithDogs: body.pet.goodWithDogs || null,
        goodWithCats: body.pet.goodWithCats || null,
        documentsIncluded: body.pet.documentsIncluded,
        createdById: sellerId,
        createdAt: timestamp,
      };
      const listing: Listing = {
        id: listingId,
        type: body.listingType,
        status: "ACTIVE",
        sellerId,
        petId,
        title: body.title,
        description: body.description,
        priceCents: body.listingType === "SALE" ? (body.priceCents ?? null) : null,
        currency: "USD",
        country: body.country,
        city: body.city,
        categorySlugs: [body.animalCategory],
        exchangePreferences: body.listingType === "EXCHANGE" ? (body.exchangePreferences || null) : null,
        ownerNotes: body.ownerNotes || null,
        contactName: body.contactName,
        contactEmail: body.contactEmail,
        contactPhone: body.contactPhone || null,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      const images: ListingImage[] = body.imageUrls.map((url, index) => ({
        id: createId("image"),
        listingId,
        url,
        sortOrder: index,
      }));

      data.pets.push(pet);
      data.listings.push(listing);
      data.listingImages.push(...images);

      return attachListingRelations(data, listing, true);
    });

    return res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

listingsRouter.get("/:id", optionalAuth, async (req, res, next) => {
  try {
    const id = z.string().min(1).parse(req.params.id);
    const data = await readData();
    const listingRow = data.listings.find((listing) => listing.id === id && listing.status === "ACTIVE");
    const listing = listingRow ? attachListingRelations(data, listingRow, true) : null;
    if (!listing) {
      return res.status(404).json({ error: "NOT_FOUND" });
    }
    return res.json(listing);
  } catch (e) {
    next(e);
  }
});
