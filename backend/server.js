const express = require("express");
const app = express();
const port = 3000;
const serverAddress = "http://localhost";
app.post("/api/register", (req, res) => {
  res.send("All good, data is received");
});

//starting server
app.listen(port, serverAddress, () => {
  `server running at ${port}`;
});
