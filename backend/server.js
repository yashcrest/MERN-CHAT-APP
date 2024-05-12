import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";

//variables
const port = process.env.PORT || 3000;

//cors middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//load config
dotenv.config({ path: "./config/.env" });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// /api/users route middleware (this route logic is handled in userRoutes.js file)
app.use("/api/users", userRoutes);

// for messages routes
app.use("/api/messages", messagesRoutes);

//calling module for connecting to db
connectDB();

// error middleware
app.use(notFound);
app.use(errorHandler);

//starting server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
  console.log(process.env.FRONTEND_URL);
});
