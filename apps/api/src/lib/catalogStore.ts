import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { CatalogData, LearningArticle, Product, Service, StoreLocation } from "./catalogTypes.js";

const catalogFile = fileURLToPath(new URL("../../data/catalog.json", import.meta.url));

let cached: CatalogData | null = null;

export async function readCatalog(): Promise<CatalogData> {
  if (cached) return cached;
  const raw = await readFile(catalogFile, "utf8");
  cached = JSON.parse(raw) as CatalogData;
  return cached;
}

export function filterProducts(
  products: Product[],
  filters: { petType?: string; category?: string; subcategory?: string; q?: string; brand?: string },
) {
  const search = filters.q?.toLowerCase();
  return products.filter((product) => {
    if (filters.petType && product.petType !== filters.petType) return false;
    if (filters.category && product.categorySlug !== filters.category) return false;
    if (filters.subcategory && product.subcategorySlug !== filters.subcategory) return false;
    if (filters.brand && product.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
    if (!search) return true;
    return (
      product.name.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search)
    );
  });
}

export function findProductBySlug(products: Product[], slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export function findServiceBySlug(services: Service[], slug: string) {
  return services.find((s) => s.slug === slug) ?? null;
}

export function findStoreBySlug(stores: StoreLocation[], slug: string) {
  return stores.find((s) => s.slug === slug) ?? null;
}

export function findArticleBySlug(articles: LearningArticle[], slug: string) {
  return articles.find((a) => a.slug === slug) ?? null;
}

export function groupStoresByState(stores: StoreLocation[]) {
  const map = new Map<string, { state: string; stateCode: string; stores: StoreLocation[] }>();
  for (const store of stores) {
    const existing = map.get(store.stateCode);
    if (existing) {
      existing.stores.push(store);
    } else {
      map.set(store.stateCode, { state: store.state, stateCode: store.stateCode, stores: [store] });
    }
  }
  return [...map.values()].sort((a, b) => a.state.localeCompare(b.state));
}
