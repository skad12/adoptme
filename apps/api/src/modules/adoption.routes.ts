import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { createId, now, readData, updateData, type AdoptionApplication } from "../lib/jsonStore.js";

export const adoptionRouter: ExpressRouter = Router();

adoptionRouter.use(requireAuth);

adoptionRouter.post("/applications", async (req, res, next) => {
  try {
    const body = z
      .object({
        listingId: z.string().min(1),
        payload: z.record(z.unknown()),
      })
      .parse(req.body);

    const listing = (await readData()).listings.find(
      (row) => row.id === body.listingId && row.status === "ACTIVE" && row.type === "ADOPTION",
    );
    if (!listing) {
      return res.status(400).json({ error: "INVALID_LISTING" });
    }

    const appRow = await updateData((data) => {
      const created: AdoptionApplication = {
        id: createId("adoption"),
        listingId: listing.id,
        applicantId: req.auth!.sub,
        payload: body.payload,
        status: "PENDING_REVIEW",
        createdAt: now(),
      };
      data.adoptionApplications.push(created);
      return created;
    });

    return res.status(201).json(appRow);
  } catch (e) {
    next(e);
  }
});
