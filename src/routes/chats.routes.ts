import { Router } from "express";

import ChatController from "../controllers/ChatController";

const router = Router();

router.get("/", ChatController.list);
router.get("/:chat_uuid", ChatController.retrieve);
router.post("/", ChatController.store);

// TODO: delete route to close chat
// TODO: create ticket for chat route / escalate chat

export default router;
