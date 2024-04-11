const { Schema, model } = require("mongoose");

const userDetailsSchema = new Schema({
  username: string,
  email: string,
  password: string,
});

const userDetails = model("userDetails", userDetailsSchema);
module.exports = userDetails;
