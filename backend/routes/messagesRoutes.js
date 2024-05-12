import express from "express";
const router = express.Router();
import { sendMessage } from "../controllers/messageController.js";

// send message route
router.post("/send/:id", sendMessage);

export default router;
