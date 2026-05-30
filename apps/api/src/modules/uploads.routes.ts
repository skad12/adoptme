import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import multer from "multer";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const ok = ["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.mimetype);
    cb(null, ok);
  },
});

export const uploadsRouter: ExpressRouter = Router();

uploadsRouter.use(requireAuth);

uploadsRouter.post("/pet-asset", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "FILE_REQUIRED" });
  }
  const listingId = z.string().min(1).optional().safeParse(req.body.listingId);
  if (req.body.listingId && !listingId.success) {
    return res.status(400).json({ error: "INVALID_LISTING_ID" });
  }
  // Wire to S3/GCS + virus scan in production
  return res.status(201).json({
    url: `https://cdn.example.com/uploads/${req.file.originalname}`,
    bytes: req.file.size,
    mime: req.file.mimetype,
  });
});
