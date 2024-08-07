import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://chatapp.yashshrestha.net", "http://localhost:5173"],
    methods: ["GET", "POST"],
    // credentials: true,
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // here we will keep the extracted userID from the client

// socker server emits "connection" property same as tcp or http server
io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId != undefined) userSocketMap[userId] = socket.id;

  //io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // capturing new msg from frontend
  socket.on("newMessage", (data, id) => {
    //emitting back this data to frontend
    socket.broadcast.emit("newMessage", data);
  });

  //   socket.on() is used to listen to events. can be used on both client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
