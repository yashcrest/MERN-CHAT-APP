// in mongoDB we create the tables from the code itself which is this schema, rather than this logic being created in the databse in MySQL or postgres

import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userDetailsSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    username: {
      type: String,
      unique: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

//comparing passwords
userDetailsSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// saving a hashed password before sending it over to userController
userDetailsSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const userDetails = model("userDetails", userDetailsSchema);

export default userDetails;

// tip: brad has defined "userDetails" as "User", so might get confused in other part of you code so please be mindful of this
