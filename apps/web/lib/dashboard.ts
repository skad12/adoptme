import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { getPublicApiBaseUrl } from "./env";

export type OwnerPet = {
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

type DashboardSeed = {
  ownerPets: OwnerPet[];
  appointments: {
    id: string;
    petId: string;
    petName: string;
    vetName: string;
    appointmentDate: string;
    type: "in-person" | "tele";
    status: string;
    notes: string;
  }[];
  customerOrders: { id: string; title: string; status: string; amountMinor: number; createdAt: string }[];
  customerMessages: { id: string; from: string; preview: string; createdAt: string; unread: boolean }[];
  customerSummary: {
    spendMinorThisMonth: number;
    loyaltyPoints: number;
    donationImpactMinor: number;
    subscriptionsActive: number;
    upcomingVaccines: number;
  };
  vendorSummary: {
    revenueMinor: number;
    ordersPending: number;
    ordersFulfilled: number;
    conversionRate: number;
    ratingAvg: number;
    responseMinutes: number;
    salesByDay: number[];
  };
  vendorProducts: { id: string; name: string; stock: number; priceMinor: number; status: string }[];
  vendorOrders: { id: string; buyer: string; items: number; amountMinor: number; status: string; createdAt: string }[];
  vendorPayouts: { id: string; period: string; amountMinor: number; status: string }[];
  vetSummary: {
    consultsThisMonth: number;
    patientLoad: number;
    averageRating: number;
    prescriptionsIssued: number;
    earningsMinor: number;
  };
  vetSchedule: { id: string; petName: string; ownerName: string; at: string; type: string; status: string }[];
  vetPatients: { id: string; name: string; species: string; ownerName: string; lastVisit: string; imageUrl?: string }[];
  vetPrescriptions: { id: string; petName: string; medication: string; dosage: string; issuedAt: string }[];
  adminSummary: {
    gmvMinor: number;
    ordersToday: number;
    conversionRate: number;
    retentionRate: number;
    activeVendors: number;
    aovMinor: number;
    verifiedVetsPct: number;
    salesByCategory: number[];
  };
  adminUsers: { id: string; name: string; role: string; status: string }[];
  moderationQueue: { id: string; title: string; reason: string; createdAt: string }[];
};

const dataFile = resolve(process.cwd(), "../api/data/dashboard.json");

async function readSeed(): Promise<DashboardSeed> {
  const raw = await readFile(dataFile, "utf8");
  return JSON.parse(raw) as DashboardSeed;
}

async function fetchJson<T>(path: string, fallback: () => Promise<T>): Promise<T> {
  try {
    const res = await fetch(`${getPublicApiBaseUrl()}${path}`, { next: { revalidate: 30 } });
    if (!res.ok) return fallback();
    return (await res.json()) as T;
  } catch {
    return fallback();
  }
}

export type CustomerDashboard = {
  summary: DashboardSeed["customerSummary"];
  pets: OwnerPet[];
  appointments: DashboardSeed["appointments"];
  orders: DashboardSeed["customerOrders"];
  messages: DashboardSeed["customerMessages"];
};

export type VendorDashboard = {
  summary: DashboardSeed["vendorSummary"];
  products: DashboardSeed["vendorProducts"];
  orders: DashboardSeed["vendorOrders"];
  payouts: DashboardSeed["vendorPayouts"];
};

export type VetDashboard = {
  summary: DashboardSeed["vetSummary"];
  schedule: DashboardSeed["vetSchedule"];
  patients: DashboardSeed["vetPatients"];
  prescriptions: DashboardSeed["vetPrescriptions"];
};

export type AdminDashboard = {
  summary: DashboardSeed["adminSummary"];
  users: DashboardSeed["adminUsers"];
  moderationQueue: DashboardSeed["moderationQueue"];
};

export async function fetchCustomerDashboard(): Promise<CustomerDashboard> {
  return fetchJson("/v1/dashboard/customer", async () => {
    const data = await readSeed();
    return {
      summary: data.customerSummary,
      pets: data.ownerPets,
      appointments: data.appointments,
      orders: data.customerOrders,
      messages: data.customerMessages,
    };
  });
}

export async function fetchVendorDashboard(): Promise<VendorDashboard> {
  return fetchJson("/v1/dashboard/vendor", async () => {
    const data = await readSeed();
    return {
      summary: data.vendorSummary,
      products: data.vendorProducts,
      orders: data.vendorOrders,
      payouts: data.vendorPayouts,
    };
  });
}

export async function fetchVetDashboard(): Promise<VetDashboard> {
  return fetchJson("/v1/dashboard/vet", async () => {
    const data = await readSeed();
    return {
      summary: data.vetSummary,
      schedule: data.vetSchedule,
      patients: data.vetPatients,
      prescriptions: data.vetPrescriptions,
    };
  });
}

export async function fetchAdminDashboard(): Promise<AdminDashboard> {
  return fetchJson("/v1/dashboard/admin", async () => {
    const data = await readSeed();
    return {
      summary: data.adminSummary,
      users: data.adminUsers,
      moderationQueue: data.moderationQueue,
    };
  });
}

export async function fetchOwnerPets(): Promise<OwnerPet[]> {
  return fetchJson("/v1/pets", async () => {
    const data = await readSeed();
    return data.ownerPets;
  }).then((res) => (Array.isArray(res) ? res : ((res as { items?: OwnerPet[] }).items ?? [])));
}

export async function fetchOwnerPet(id: string): Promise<OwnerPet | null> {
  try {
    const res = await fetch(`${getPublicApiBaseUrl()}/v1/pets/${id}`, { next: { revalidate: 30 } });
    if (res.ok) return (await res.json()) as OwnerPet;
  } catch {
    /* fallback */
  }
  const data = await readSeed();
  return data.ownerPets.find((pet) => pet.id === id) ?? null;
}

export function formatNaira(minor: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(minor / 100);
}

export function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
}
