import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";

const port = process.env.PORT || 3000;

console.log("frontend URL: ", process.env.FRONTEND_URL);

//cors middleware
app.use(
  cors({
    origin: "https://chatapp.yashcrest.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to set Access-Control-Allow-Credentials header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // this allows us to access jwt from request object i.e. req.cookies.jwt (ref authMiddleware.js file)
// /api/users route middleware (this route logic is handled in userRoutes.js file)
app.use("/api/users", authRoutes);

// for messages routes
app.use("/api/messages", messagesRoutes);

//user routes
app.use("/api/sidebarconversations", userRoutes);

//calling module for connecting to db
connectDB();

// error middleware
app.use(notFound);
app.use(errorHandler);

//starting server
server.listen(port, () => {
  console.log(`server running on port ${port}`);
  console.log("frontend connection coming from: ", process.env.FRONTEND_URL);
});
