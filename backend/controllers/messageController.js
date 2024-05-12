import asyncHandler from "express-async-handler";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

// @desc     Send Message
// route     POST api/messages/send/:id
// @access   Private
const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;

    // need to get sender id
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    // if there is no conversation,create a new converstation.
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    res.status(201).json(newMessage);
    console.log("postman trying to connect!");
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// @desc     Get Message
// route     GET api/messages/get/:id
// @access   Private
const getMessage = asyncHandler(async (req, res) => {
  console.log("get message");
});

export { sendMessage, getMessage };
