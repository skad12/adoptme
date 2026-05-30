import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../lib/logger.js";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      details: err.flatten(),
    });
  }

  const message = err instanceof Error ? err.message : "Internal error";
  logger.error({ err }, "unhandled_error");
  return res.status(500).json({ error: "INTERNAL", message });
}
