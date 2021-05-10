import { Router } from "express";

import ChatController from "../controllers/ChatController";

const router = Router();

router.get("/", ChatController.list);
router.post("/", ChatController.store);

router.get("/:chat_uuid", ChatController.retrieve);
router.delete("/:chat_uuid", ChatController.destroy);
router.post("/:chat_uuid/scale", ChatController.scale);

export default router;
