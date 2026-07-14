import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { z } from "zod";
import { optionalAuth } from "../middleware/auth.js";

const dashboardFile = fileURLToPath(new URL("../../data/dashboard.json", import.meta.url));

type OwnerPet = {
  id: string;
  ownerId: string;
  name: string;
  species: string;
  breed: string;
  birthdate: string;
  weightKg: number;
  microchipId: string | null;
  imageUrl?: string | null;
  vaccinations: { id: string; vaccineName: string; dateGiven: string; nextDue: string }[];
  weightHistory: number[];
};

type DashboardData = Record<string, unknown> & { ownerPets: OwnerPet[] };

async function readDashboard(): Promise<DashboardData> {
  const raw = await readFile(dashboardFile, "utf8");
  return JSON.parse(raw) as DashboardData;
}

async function writeDashboard(data: DashboardData) {
  await writeFile(dashboardFile, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

const petBodySchema = z.object({
  name: z.string().min(1),
  species: z.string().min(1),
  breed: z.string().min(1),
  birthdate: z.string().min(1),
  weightKg: z.number().positive(),
  microchipId: z.string().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  vaccinations: z
    .array(
      z.object({
        id: z.string().optional(),
        vaccineName: z.string().min(1),
        dateGiven: z.string().min(1),
        nextDue: z.string().min(1),
      }),
    )
    .optional(),
  weightHistory: z.array(z.number()).optional(),
});

export const dashboardRouter: ExpressRouter = Router();
export const petsRouter: ExpressRouter = Router();

dashboardRouter.get("/customer", optionalAuth, async (_req, res, next) => {
  try {
    const data = await readDashboard();
    return res.json({
      summary: data.customerSummary,
      pets: data.ownerPets,
      appointments: data.appointments,
      orders: data.customerOrders,
      messages: data.customerMessages,
    });
  } catch (e) {
    next(e);
  }
});

dashboardRouter.get("/vendor", optionalAuth, async (_req, res, next) => {
  try {
    const data = await readDashboard();
    return res.json({
      summary: data.vendorSummary,
      products: data.vendorProducts,
      orders: data.vendorOrders,
      payouts: data.vendorPayouts,
    });
  } catch (e) {
    next(e);
  }
});

dashboardRouter.get("/vet", optionalAuth, async (_req, res, next) => {
  try {
    const data = await readDashboard();
    return res.json({
      summary: data.vetSummary,
      schedule: data.vetSchedule,
      patients: data.vetPatients,
      prescriptions: data.vetPrescriptions,
    });
  } catch (e) {
    next(e);
  }
});

dashboardRouter.get("/admin", optionalAuth, async (_req, res, next) => {
  try {
    const data = await readDashboard();
    return res.json({
      summary: data.adminSummary,
      users: data.adminUsers,
      moderationQueue: data.moderationQueue,
    });
  } catch (e) {
    next(e);
  }
});

petsRouter.get("/", optionalAuth, async (_req, res, next) => {
  try {
    const data = await readDashboard();
    return res.json({ items: data.ownerPets });
  } catch (e) {
    next(e);
  }
});

petsRouter.post("/", optionalAuth, async (req, res, next) => {
  try {
    const body = petBodySchema.parse(req.body);
    const data = await readDashboard();
    const pet: OwnerPet = {
      id: `opet_${randomUUID().slice(0, 8)}`,
      ownerId: "user_buyer",
      name: body.name,
      species: body.species,
      breed: body.breed,
      birthdate: body.birthdate,
      weightKg: body.weightKg,
      microchipId: body.microchipId ?? null,
      imageUrl: body.imageUrl ?? null,
      vaccinations: (body.vaccinations ?? []).map((v) => ({
        id: v.id ?? `vax_${randomUUID().slice(0, 8)}`,
        vaccineName: v.vaccineName,
        dateGiven: v.dateGiven,
        nextDue: v.nextDue,
      })),
      weightHistory: body.weightHistory ?? [body.weightKg],
    };
    data.ownerPets.push(pet);
    await writeDashboard(data);
    return res.status(201).json(pet);
  } catch (e) {
    next(e);
  }
});

petsRouter.get("/:id", optionalAuth, async (req, res, next) => {
  try {
    const id = z.string().min(1).parse(req.params.id);
    const data = await readDashboard();
    const pet = data.ownerPets.find((item) => item.id === id);
    if (!pet) return res.status(404).json({ error: "NOT_FOUND" });
    return res.json(pet);
  } catch (e) {
    next(e);
  }
});

petsRouter.put("/:id", optionalAuth, async (req, res, next) => {
  try {
    const id = z.string().min(1).parse(req.params.id);
    const body = petBodySchema.partial().parse(req.body);
    const data = await readDashboard();
    const index = data.ownerPets.findIndex((item) => item.id === id);
    if (index < 0) return res.status(404).json({ error: "NOT_FOUND" });
    const current = data.ownerPets[index]!;
    const updated: OwnerPet = {
      id: current.id,
      ownerId: current.ownerId,
      name: body.name ?? current.name,
      species: body.species ?? current.species,
      breed: body.breed ?? current.breed,
      birthdate: body.birthdate ?? current.birthdate,
      weightKg: body.weightKg ?? current.weightKg,
      microchipId: body.microchipId === undefined ? current.microchipId : body.microchipId,
      imageUrl: body.imageUrl === undefined ? current.imageUrl : body.imageUrl,
      weightHistory: body.weightHistory ?? current.weightHistory,
      vaccinations:
        body.vaccinations === undefined
          ? current.vaccinations
          : body.vaccinations.map((v) => ({
              id: v.id ?? `vax_${randomUUID().slice(0, 8)}`,
              vaccineName: v.vaccineName,
              dateGiven: v.dateGiven,
              nextDue: v.nextDue,
            })),
    };
    data.ownerPets[index] = updated;
    await writeDashboard(data);
    return res.json(updated);
  } catch (e) {
    next(e);
  }
});
