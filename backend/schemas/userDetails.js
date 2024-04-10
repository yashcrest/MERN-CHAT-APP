const { Schema, model } = require("mongoose");

const userDetails = new Schema({
  username: string,
  email: string,
  password: string,
});

module.exports = model("userDetails", userDetails);
