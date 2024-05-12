import asyncHandler from "express-async-handler";
import message from "../models/messageModel";

export const sendMessage = asyncHandler(async (req, res) => {
  console.log("message sent");
});
