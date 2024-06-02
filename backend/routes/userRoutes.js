import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUsersForSidebar } from "../controllers/userController.js";
const router = express.Router();

router.get("/", getUsersForSidebar);
export default router;
