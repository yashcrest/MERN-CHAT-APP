import express from "express";
const router = express.Router();
import { sendMessage, getMessage } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

// messages routes
router.get("/:id", protect, getMessage);
router.post("/send/:id", protect, sendMessage);

export default router;
