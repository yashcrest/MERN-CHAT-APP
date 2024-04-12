const { Schema, model } = require("mongoose");

const userDetailsSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

const userDetails = model("userDetails", userDetailsSchema);
module.exports = userDetails;
