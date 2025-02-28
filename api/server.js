import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config({ path: ".env" });
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import corsOptions from "./config/corsOptions.js";

const port = process.env.PORT || 3001;

//cors middleware
app.use(cors(corsOptions));

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/users", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message:
      "API working. Please navigate to the frontend of this API, http://localhost:5173",
  });
});

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
});
