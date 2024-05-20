import asyncHandler from "express-async-handler";
import userDetails from "../models/userModel.js";

const getUsersForSidebar = asyncHandler(async (req, res) => {
  try {
    // if you would like to filter current users from the sideBar
    const loggedInUserId = req.user._id;
    const filteredUsers = await userDetails
      .find({ _id: { $ne: loggedInUserId } })
      .select("-password");

    // getting all the users in DB
    // const allUsers = await userDetails.find().select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { getUsersForSidebar };
