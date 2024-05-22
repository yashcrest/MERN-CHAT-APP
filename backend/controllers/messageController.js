import asyncHandler from "express-async-handler";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId } from "../socket/socket.js";

// @desc     Send Message
// route     POST api/messages/send/:id
// @access   Private
const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;

    // need to get sender id
    const senderId = req.user._id;

    console.log("receiver id : ", receiverId);
    console.log("sender id: ", senderId);

    // getting the conversation between the users from DB
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

    //creating message object
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    //and pushing the messages into the Message array
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // saving the conversation and messages into mongoDB
    await Promise.all([conversation.save(), newMessage.save()]);

    //  socket IO functionality
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>.emit() is used to send  events to specific client)
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// @desc     Get Message
// route     GET api/messages/get/:id
// @access   Private
const getMessage = asyncHandler(async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    // getting the conversation/ messages between them
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // this is giving the actual messages instead of the messages array

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { sendMessage, getMessage };
