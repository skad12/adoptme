import { getPublicApiBaseUrl } from "./env";

export type PetTypeSlug = "dog" | "cat" | "fish" | "bird" | "reptile" | "small-pet" | "farm-animal";

export type ShopCategory = {
  slug: string;
  name: string;
  subcategories: { slug: string; name: string }[];
};

export type PetType = {
  slug: PetTypeSlug;
  name: string;
  description: string;
  categories: ShopCategory[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  petType: PetTypeSlug;
  categorySlug: string;
  subcategorySlug: string;
  priceMinor: number;
  currency: "NGN";
  description: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  autoshipEligible?: boolean;
};

export type ServiceType = "GROOMING" | "TRAINING" | "DAY_CAMP" | "VET_CARE";

export type Service = {
  id: string;
  slug: string;
  type: ServiceType;
  name: string;
  summary: string;
  description: string;
  priceFromMinor: number;
  currency: "NGN";
  duration: string;
  bookingSteps: string[];
  imageUrl: string;
};

export type StoreLocation = {
  id: string;
  slug: string;
  name: string;
  address: string;
  city: string;
  state: string;
  stateCode: string;
  phone: string;
  services: ServiceType[];
  hours: string;
};

export type LearningArticle = {
  id: string;
  slug: string;
  petType: PetTypeSlug | "general";
  category: string;
  title: string;
  summary: string;
  tags: string[];
  readMinutes: number;
};

const base = () => getPublicApiBaseUrl();

export async function fetchTaxonomy(): Promise<{ petTypes: PetType[] }> {
  try {
    const res = await fetch(`${base()}/v1/catalog/taxonomy`, { next: { revalidate: 300 } });
    if (!res.ok) return { petTypes: [] };
    return res.json();
  } catch {
    return { petTypes: [] };
  }
}

export async function fetchProducts(params: Record<string, string | undefined> = {}): Promise<{
  items: Product[];
  page: number;
  pageSize: number;
  total: number;
}> {
  try {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v) qs.set(k, v);
    });
    const res = await fetch(`${base()}/v1/catalog/products?${qs}`, { next: { revalidate: 60 } });
    if (!res.ok) return { items: [], page: 1, pageSize: 12, total: 0 };
    return res.json();
  } catch {
    return { items: [], page: 1, pageSize: 12, total: 0 };
  }
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${base()}/v1/catalog/products/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchServices(): Promise<{ items: Service[] }> {
  try {
    const res = await fetch(`${base()}/v1/catalog/services`, { next: { revalidate: 300 } });
    if (!res.ok) return { items: [] };
    return res.json();
  } catch {
    return { items: [] };
  }
}

export async function fetchService(slug: string): Promise<Service | null> {
  try {
    const res = await fetch(`${base()}/v1/catalog/services/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchStores(params: Record<string, string | undefined> = {}): Promise<{
  items: StoreLocation[];
  byState: { state: string; stateCode: string; stores: StoreLocation[] }[];
}> {
  try {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v) qs.set(k, v);
    });
    const res = await fetch(`${base()}/v1/catalog/stores?${qs}`, { next: { revalidate: 300 } });
    if (!res.ok) return { items: [], byState: [] };
    return res.json();
  } catch {
    return { items: [], byState: [] };
  }
}

export async function fetchStore(slug: string): Promise<StoreLocation | null> {
  try {
    const res = await fetch(`${base()}/v1/catalog/stores/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchArticles(petType?: string): Promise<{ items: LearningArticle[] }> {
  try {
    const qs = petType ? `?petType=${petType}` : "";
    const res = await fetch(`${base()}/v1/catalog/learn${qs}`, { next: { revalidate: 300 } });
    if (!res.ok) return { items: [] };
    return res.json();
  } catch {
    return { items: [] };
  }
}

export async function fetchArticle(slug: string): Promise<LearningArticle | null> {
  try {
    const res = await fetch(`${base()}/v1/catalog/learn/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export const PET_TYPE_LABELS: Record<PetTypeSlug, string> = {
  dog: "Dog",
  cat: "Cat",
  fish: "Fish",
  bird: "Bird",
  reptile: "Reptile",
  "small-pet": "Small Pet",
  "farm-animal": "Farm & Backyard",
};

export const SERVICE_LABELS: Record<ServiceType, string> = {
  GROOMING: "Grooming",
  TRAINING: "Training",
  DAY_CAMP: "Doggie Day Camp",
  VET_CARE: "Veterinary Care",
};

export function productPath(product: Product) {
  return `/shop/${product.petType}/${product.categorySlug}/${product.subcategorySlug}/${product.slug}`;
}

export function categoryPath(petType: string, category: string, subcategory?: string) {
  if (subcategory) return `/shop/${petType}/${category}/${subcategory}`;
  return `/shop/${petType}/${category}`;
}
