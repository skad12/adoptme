import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { z } from "zod";
import { optionalAuth } from "../middleware/auth.js";
import { createId, now, readData, updateData, type Donation } from "../lib/jsonStore.js";

export const donationsRouter: ExpressRouter = Router();

donationsRouter.get("/campaigns", async (_req, res, next) => {
  try {
    const campaigns = (await readData()).donationCampaigns
      .filter((campaign) => campaign.status === "ACTIVE")
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return res.json({ items: campaigns });
  } catch (e) {
    next(e);
  }
});

donationsRouter.post("/checkout", optionalAuth, async (req, res, next) => {
  try {
    const body = z
      .object({
        amountCents: z.number().int().positive().max(10_000_000),
        campaignId: z.string().min(1).optional(),
        message: z.string().max(500).optional(),
      })
      .parse(req.body);

    const donation = await updateData((data) => {
      const created: Donation = {
        id: createId("donation"),
        userId: req.auth?.sub,
        campaignId: body.campaignId,
        amountCents: body.amountCents,
        status: "PENDING",
        message: body.message,
        createdAt: now(),
      };
      data.donations.push(created);
      return created;
    });

    return res.status(201).json({
      donation,
      paymentSessionUrl: "https://payments.example.com/session/demo",
    });
  } catch (e) {
    next(e);
  }
});
