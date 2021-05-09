import { Router } from "express";

import MessageController from "../controllers/MessageController";
import multer from "../multer";

const router = Router();

router.post("/", multer.single("file"), MessageController.store);

export default router;
