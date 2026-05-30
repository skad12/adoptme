import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { authRouter } from "../modules/auth.routes.js";
import { listingsRouter } from "../modules/listings.routes.js";
import { ordersRouter } from "../modules/orders.routes.js";
import { adoptionRouter } from "../modules/adoption.routes.js";
import { donationsRouter } from "../modules/donations.routes.js";
import { messagesRouter } from "../modules/messages.routes.js";
import { adminRouter } from "../modules/admin.routes.js";
import { uploadsRouter } from "../modules/uploads.routes.js";

export const apiRouter: ExpressRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/listings", listingsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/adoption", adoptionRouter);
apiRouter.use("/donations", donationsRouter);
apiRouter.use("/messages", messagesRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/uploads", uploadsRouter);
