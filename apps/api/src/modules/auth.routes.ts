import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createId, now, readData, toPublicUser, updateData, type User } from "../lib/jsonStore.js";
import { signAccessToken } from "../middleware/auth.js";

export const authRouter: ExpressRouter = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10),
  displayName: z.string().min(2).max(80),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

authRouter.post("/register", async (req, res, next) => {
  try {
    const body = registerSchema.parse(req.body);
    const email = body.email.toLowerCase();
    const existing = (await readData()).users.find((user) => user.email === email);
    if (existing) {
      return res.status(409).json({ error: "EMAIL_IN_USE", message: "Email already registered" });
    }
    const passwordHash = await bcrypt.hash(body.password, 12);
    const user = await updateData((data) => {
      const timestamp = now();
      const created: User = {
        id: createId("user"),
        email,
        passwordHash,
        emailVerifiedAt: null,
        status: "ACTIVE",
        roles: ["BUYER"],
        profile: { displayName: body.displayName },
        sellerProfile: null,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      data.users.push(created);
      return created;
    });
    const token = signAccessToken({
      sub: user.id,
      roles: user.roles,
    });
    return res.status(201).json({
      accessToken: token,
      user: toPublicUser(user),
    });
  } catch (e) {
    next(e);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const body = loginSchema.parse(req.body);
    const user = (await readData()).users.find((row) => row.email === body.email.toLowerCase());
    if (!user || user.status !== "ACTIVE") {
      return res.status(401).json({ error: "INVALID_CREDENTIALS" });
    }
    const ok = await bcrypt.compare(body.password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "INVALID_CREDENTIALS" });
    }
    const token = signAccessToken({
      sub: user.id,
      roles: user.roles,
    });
    return res.json({
      accessToken: token,
      user: toPublicUser(user),
    });
  } catch (e) {
    next(e);
  }
});

authRouter.post("/password-reset-request", async (req, res, next) => {
  try {
    const schema = z.object({ email: z.string().email() });
    schema.parse(req.body);
    return res.status(202).json({ ok: true, message: "If the account exists, a reset link will be sent." });
  } catch (e) {
    next(e);
  }
});
