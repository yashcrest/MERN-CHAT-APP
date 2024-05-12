/*
You will notice that we do not have the code that handles the req and res on this file, that is because we are handling the logic in the "controller" file i.e. userController.js
*/

import express from "express";
const router = express.Router();
import {
  authUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/auth", authUser);
router.post("/register", registerUser);
// protected routes
router.post("/logout", protect, logoutUser);

export default router;
