// this is to protect our routes
// we need the userID from the payload to verify the user
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import userDetails from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  console.log("authMiddleware page, cookies sent from frontend: ", {
    ...req.cookies,
  });
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized - No Token Provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await userDetails.findById(decoded.userId).select("-password");
    console.log({ decoded });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in authMiddleware:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
});

export { protect };
