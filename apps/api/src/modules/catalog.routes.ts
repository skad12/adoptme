import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { z } from "zod";
import {
  filterProducts,
  findArticleBySlug,
  findProductBySlug,
  findServiceBySlug,
  findStoreBySlug,
  groupStoresByState,
  readCatalog,
} from "../lib/catalogStore.js";

export const catalogRouter: ExpressRouter = Router();

const productQuerySchema = z.object({
  petType: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  q: z.string().optional(),
  brand: z.string().optional(),
  sort: z.enum(["best_sellers", "price_asc", "price_desc", "newest"]).default("best_sellers"),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(50).default(12),
});

catalogRouter.get("/taxonomy", async (_req, res, next) => {
  try {
    const catalog = await readCatalog();
    return res.json({ petTypes: catalog.petTypes });
  } catch (e) {
    next(e);
  }
});

catalogRouter.get("/products", async (req, res, next) => {
  try {
    const q = productQuerySchema.parse(req.query);
    const catalog = await readCatalog();
    let items = filterProducts(catalog.products, q);

    items = items.sort((a, b) => {
      if (q.sort === "price_asc") return a.priceMinor - b.priceMinor;
      if (q.sort === "price_desc") return b.priceMinor - a.priceMinor;
      if (q.sort === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.reviewCount - a.reviewCount;
    });

    const total = items.length;
    const pageItems = items.slice((q.page - 1) * q.pageSize, q.page * q.pageSize);
    return res.json({ items: pageItems, page: q.page, pageSize: q.pageSize, total });
  } catch (e) {
    next(e);
  }
});

catalogRouter.get("/products/:slug", async (req, res, next) => {
  try {
    const slug = z.string().min(1).parse(req.params.slug);
    const catalog = await readCatalog();
    const product = findProductBySlug(catalog.products, slug);
    if (!product) return res.status(404).json({ error: "NOT_FOUND" });
    return res.json(product);
  } catch (e) {
    next(e);
  }
});

catalogRouter.get("/services", async (_req, res, next) => {
  try {
    const catalog = await readCatalog();
    return res.json({ items: catalog.services });
  } catch (e) {
    next(e);
  }
});

catalogRouter.get("/services/:slug", async (req, res, next) => {
  try {
    const slug = z.string().min(1).parse(req.params.slug);
    const catalog = await readCatalog();
    const service = findServiceBySlug(catalog.services, slug);
    if (!service) return res.status(404).json({ error: "NOT_FOUND" });
    return res.json(service);
  } catch (e) {
    next(e);
  }
});

catalogRouter.get("/stores", async (req, res, next) => {
  try {
    const stateCode = typeof req.query.state === "string" ? req.query.state : undefined;
    const search = typeof req.query.q === "string" ? req.query.q.toLowerCase() : undefined;
    const catalog = await readCatalog();

    let stores = catalog.stores;
    if (stateCode) stores = stores.filter((s) => s.stateCode === stateCode);
    if (search) {
      stores = stores.filter(
        (s) =>
          s.name.toLowerCase().includes(search) ||
          s.city.toLowerCase().includes(search) ||
          s.state.toLowerCase().includes(search),
      );
    }

    return res.json({ items: stores, byState: groupStoresByState(catalog.stores) });
  } catch (e) {
    next(e);
  }
});

catalogRouter.get("/stores/:slug", async (req, res, next) => {
  try {
    const slug = z.string().min(1).parse(req.params.slug);
    const catalog = await readCatalog();
    const store = findStoreBySlug(catalog.stores, slug);
    if (!store) return res.status(404).json({ error: "NOT_FOUND" });
    return res.json(store);
  } catch (e) {
    next(e);
  }
});

catalogRouter.get("/learn", async (req, res, next) => {
  try {
    const petType = typeof req.query.petType === "string" ? req.query.petType : undefined;
    const catalog = await readCatalog();
    const items = petType ? catalog.articles.filter((a) => a.petType === petType) : catalog.articles;
    return res.json({ items });
  } catch (e) {
    next(e);
  }
});

catalogRouter.get("/learn/:slug", async (req, res, next) => {
  try {
    const slug = z.string().min(1).parse(req.params.slug);
    const catalog = await readCatalog();
    const article = findArticleBySlug(catalog.articles, slug);
    if (!article) return res.status(404).json({ error: "NOT_FOUND" });
    return res.json(article);
  } catch (e) {
    next(e);
  }
});
