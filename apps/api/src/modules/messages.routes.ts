import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { createId, now, readData, toMessageThreadView, updateData, type Message } from "../lib/jsonStore.js";

export const messagesRouter: ExpressRouter = Router();

messagesRouter.use(requireAuth);

messagesRouter.get("/threads", async (req, res, next) => {
  try {
    const data = await readData();
    const threads = data.messageThreads
      .filter((thread) => data.threadParticipants.some((part) => part.threadId === thread.id && part.userId === req.auth!.sub))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 50)
      .map((thread) => toMessageThreadView(data, thread));
    return res.json({ items: threads });
  } catch (e) {
    next(e);
  }
});

messagesRouter.post("/threads/:threadId/messages", async (req, res, next) => {
  try {
    const threadId = z.string().min(1).parse(req.params.threadId);
    const body = z.object({ body: z.string().min(1).max(8000) }).parse(req.body);

    const member = (await readData()).threadParticipants.find((part) => part.threadId === threadId && part.userId === req.auth!.sub);
    if (!member) {
      return res.status(403).json({ error: "FORBIDDEN" });
    }

    const msg = await updateData((data) => {
      const created: Message = {
        id: createId("message"),
        threadId,
        senderId: req.auth!.sub,
        body: body.body,
        createdAt: now(),
      };
      data.messages.push(created);
      return created;
    });
    return res.status(201).json(msg);
  } catch (e) {
    next(e);
  }
});
