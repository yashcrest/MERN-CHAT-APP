import { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "userDetails", // taking ref from userModel.js file
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "message",
        default: [], // im guessing this is referencing that by default the messages object is empty
      },
    ],
  },
  { timestamps: true }
);

const Conversation = model("conversation", conversationSchema);

export default Conversation;
