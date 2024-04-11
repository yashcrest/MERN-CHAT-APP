const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const { userDetails } = require("./schemas/userDetails");

//middleware
app.use(express.json());
app.use(cors());

//load config
dotenv.config({ path: "./config/config.env" });

//connecting to db
connectDB();

//post request
app.post("/api/register", (req, res) => {
  const newUser = req.body;
  console.log(req.body);
  res.json({ message: "All good data is received", user: req.body });
});

//starting server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
