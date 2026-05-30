import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { z } from "zod";
import { attachListingRelations, createId, now, readData, updateData, type Order } from "../lib/jsonStore.js";
import { requireAuth } from "../middleware/auth.js";
import { env } from "../config/env.js";

export const ordersRouter: ExpressRouter = Router();

ordersRouter.use(requireAuth);

ordersRouter.post("/", async (req, res, next) => {
  try {
    const body = z
      .object({
        listingId: z.string().min(1),
      })
      .parse(req.body);

    const data = await readData();
    const listing = data.listings.find(
      (row) => row.id === body.listingId && row.status === "ACTIVE" && ["SALE", "EXCHANGE"].includes(row.type),
    );
    if (!listing || listing.sellerId === req.auth!.sub) {
      return res.status(400).json({ error: "INVALID_LISTING" });
    }
    const priceCents = listing.priceCents;
    if (priceCents == null) {
      return res.status(400).json({ error: "PRICE_REQUIRED" });
    }

    const fee = Math.floor((priceCents * env.ESCROW_PLATFORM_FEE_BPS) / 10_000);
    const order = await updateData((store) => {
      const timestamp = now();
      const created: Order = {
        id: createId("order"),
        type: listing.type === "EXCHANGE" ? "EXCHANGE" : "PURCHASE",
        buyerId: req.auth!.sub,
        listingId: listing.id,
        totalCents: priceCents,
        status: "AWAITING_PAYMENT",
        escrow: {
          id: createId("escrow"),
          state: "PENDING_FUNDING",
          amountCents: priceCents,
          feeCents: fee,
          createdAt: timestamp,
        },
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      store.orders.push(created);
      return created;
    });

    return res.status(201).json({
      order,
      clientSecret: "demo-use-payment-provider-client-secret",
    });
  } catch (e) {
    next(e);
  }
});

ordersRouter.get("/:id", async (req, res, next) => {
  try {
    const id = z.string().min(1).parse(req.params.id);
    const data = await readData();
    const orderRow = data.orders.find((row) => row.id === id && row.buyerId === req.auth!.sub);
    const listingRow = orderRow ? data.listings.find((listing) => listing.id === orderRow.listingId) : undefined;
    const order = orderRow
      ? {
          ...orderRow,
          listing: listingRow ? attachListingRelations(data, listingRow) : null,
        }
      : null;
    if (!order) return res.status(404).json({ error: "NOT_FOUND" });
    return res.json(order);
  } catch (e) {
    next(e);
  }
});
