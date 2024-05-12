import asyncHandler from "express-async-handler";
import userDetails from "../models/userModel.js";

const getUsersForSidebar = asyncHandler(async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // getting all the users in DB
    const allUsers = await userDetails.find().select("-password");

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { getUsersForSidebar };
