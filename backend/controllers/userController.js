/*
We also will need to setup async/await into this function because we will be dealing with mongo Database which returns a promise
- using express-async-hanlder to avoid wrapping everything inside try/catch block
*/

import asyncHandler from "express-async-handler";
import userDetails from "../schemas/userDetails.js";
import generateToken from "../utils/generateToken.js";

// @desc     Auth user/set token
// route     POST api/users/auth
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //comparing the user details in DB
  const user = await userDetails.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
    console.log("user sent valid creds");
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// @desc     Register a new user
// route     POST api/users/
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // checking if the user already exists
  const userExists = await userDetails.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error(
      "Don't register... we already have you in our DB. Just go back and sign in"
    );
  }
  // adding into mongoDB
  const user = await userDetails.create({ username, email, password });

  //checking if user is created successfully
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc     Logout user
// route     POST api/users/logout
// @access   Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out successfully!" });
});

export { authUser, registerUser, logoutUser };
