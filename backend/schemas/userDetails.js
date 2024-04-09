const { Schema } = require("mongoose");

const userDetails = new Schema({
  username: string,
  email: string,
  password: string,
});
