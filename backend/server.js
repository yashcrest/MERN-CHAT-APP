const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const socketServer = require("socket.io");
const client = require("socket.io-client");

//middleware
app.use(express.json());
app.use(cors());
//post request
app.post("/api/register", (req, res) => {
  console.log(req.body);
  res.json({ message: "All good data is received", user: req.body });
});

//starting server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
