import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "userDetails", //taking ref from userModel.js file (this is telling that the senderId will be an Id from the userDetails Model)
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "userDetails",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  // when this is true mongoose will automatically create createdAt and updatedAt field
  { timestamps: true }
);

const message = model("message", messageSchema);

export default message;
