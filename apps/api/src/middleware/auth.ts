import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

export type AuthPayload = { sub: string; roles: string[] };

declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload;
    }
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return next();
  try {
    const token = header.slice(7);
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
    req.auth = decoded;
  } catch {
    // ignore invalid token for optional routes
  }
  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "UNAUTHORIZED", message: "Missing bearer token" });
  }
  try {
    const token = header.slice(7);
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
    req.auth = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "UNAUTHORIZED", message: "Invalid or expired token" });
  }
}

export function requireRoles(...allowed: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth) {
      return res.status(401).json({ error: "UNAUTHORIZED" });
    }
    const ok = req.auth.roles.some((r) => allowed.includes(r));
    if (!ok) {
      return res.status(403).json({ error: "FORBIDDEN", message: "Insufficient role" });
    }
    next();
  };
}

/** Demo helper: issue JWT for seeded users in development only */
export function signAccessToken(payload: AuthPayload) {
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"] };
  return jwt.sign(payload, env.JWT_SECRET, options);
}
