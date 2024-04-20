import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { Schema, model } from "mongoose";
import userDetails from "./schemas/userDetails.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// express router configs
import userRoutes from "./routes/userRoutes.js";

//variables
const port = process.env.PORT || 3000;

//load config
dotenv.config({ path: "./config/.env" });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//cors middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

//calling module for connecting to db
connectDB();

// routes middleware
app.use("/api/users", userRoutes);

// error middleware
app.use(notFound);
app.use(errorHandler);

//password hashing
const hashed = async (password) => {
  try {
    console.log(`user normal pw: ${password}`);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Hashed pw version: ${hashedPassword}`);
    return hashedPassword;
  } catch (err) {
    console.log("Bcrypt error: " + err.message);
  }
};

// POST for route registration
app.post("/api/users/register", async (req, res) => {
  try {
    const hashedPassword = await hashed(req.body.password);
    const newUser = await userDetails.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log("new user details: " + newUser);
    res.status(201).json({ message: "All good data is received" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
});

//POST for logout
app.post("api/users/logout", async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({ message: "logging user out" });
  } catch (err) {
    console.log(err.message);
  }
});

// POST request login and request get auth token
app.post("/api/users/auth", async (req, res) => {
  try {
    console.log(req.body);
    const username = await req.body.username;
    res.status(200).json({ message: "User able to login", details: req.body });
    //need to have a condition to compare the username with the database and authenticate the user to login.
  } catch (err) {
    res.status(500).json({ message: "error logging in: ", error: err.message });
  }
});

//starting server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
  console.log(process.env.FRONTEND_URL);
});
