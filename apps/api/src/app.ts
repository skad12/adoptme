import express from "express";
import type { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import { pinoHttp } from "pino-http";
import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";
import { rateLimiter } from "./middleware/rateLimit.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiRouter } from "./routes/index.js";

export function createApp(): Express {
  const app = express();

  app.set("trust proxy", 1);
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    }),
  );
  app.use(compression());
  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(
    pinoHttp({
      logger,
      autoLogging: true,
    }),
  );
  app.use(rateLimiter);

  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "adoptme-api", time: new Date().toISOString() });
  });

  app.use("/v1", apiRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "NOT_FOUND", message: "Route not found" });
  });

  app.use(errorHandler);

  return app;
}
