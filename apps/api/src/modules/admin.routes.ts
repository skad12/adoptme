import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { attachListingRelations, readData } from "../lib/jsonStore.js";
import { requireAuth, requireRoles } from "../middleware/auth.js";

export const adminRouter: ExpressRouter = Router();

adminRouter.use(requireAuth, requireRoles("ADMIN", "MODERATOR"));

adminRouter.get("/metrics/summary", async (_req, res, next) => {
  try {
    const data = await readData();
    return res.json({
      users: data.users.length,
      listings: data.listings.length,
      orders: data.orders.length,
      completedDonations: data.donations.filter((donation) => donation.status === "COMPLETED").length,
    });
  } catch (e) {
    next(e);
  }
});

adminRouter.get("/moderation/queue", async (_req, res, next) => {
  try {
    const data = await readData();
    const pending = data.listings
      .filter((listing) => listing.status === "PENDING_REVIEW")
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .slice(0, 50)
      .map((listing) => attachListingRelations(data, listing, true));
    return res.json({ items: pending });
  } catch (e) {
    next(e);
  }
});
