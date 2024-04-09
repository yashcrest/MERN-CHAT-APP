const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
//middleware
app.use(express.json());
app.use(cors());

//connect db
mongoose
  .connect("mongodb://localhost:3001/")
  .then(() => console.log("Connected to mongoDB"))
  .catch(() => console.error("Error occured while connecting: " + error));

//post request
app.post("/api/register", (req, res) => {
  console.log(req.body);
  res.json({ message: "All good data is received", user: req.body });
});

//starting server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
