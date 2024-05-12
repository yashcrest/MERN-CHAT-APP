import express from "express";
const router = express.Router();
import { sendMessage, getMessage } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

// send message route
router.post("/send/:id", protect, sendMessage);
router.get("/get/:id", protect, getMessage);

export default router;
