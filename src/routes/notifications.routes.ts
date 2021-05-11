import { Router } from "express";

import NotificationController from "../controllers/NotificationController";

const router = Router();

router.get("/", NotificationController.list);
router.post("/:id/read", NotificationController.read);

export default router;
