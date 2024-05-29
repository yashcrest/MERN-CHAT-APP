/*
In the provided code, the authUser function is wrapped with asyncHandler. This allows the function to use async/await syntax for handling asynchronous operations. However, if an error occurs within the authUser function, it needs to be caught and handled properly.
The asyncHandler function takes an asynchronous function as an argument and returns a new function that wraps the original function. This wrapper function catches any errors that occur during the execution of the original function and passes them to the Express.js error handling middleware.

*/

import asyncHandler from "express-async-handler";
import userDetails from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc     Auth user/set token
// route     POST api/users/auth
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  //explaination above
  const { username, password } = req.body;

  //comparing the user details in DB
  const user = await userDetails.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    console.log("frontend URL: ", process.env.FRONTEND_URL);
    console.log("test token:");
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
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
  const { fullName, username, email, password } = req.body;

  // checking if the user already exists
  const userEmailExists = await userDetails.findOne({ email });
  const userUsernameExists = await userDetails.findOne({ username });
  if (userUsernameExists) {
    res.status(400);
    throw new Error(
      "Don't register... we already have you in our DB. Just go back and sign in"
    );
  }

  //setting up uconst
  let names = fullName.split(" ");
  let firstName = names[0];
  let lastName = names[1];
  const profilePic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;
  // adding into mongoDB
  const user = await userDetails.create({
    fullName,
    username,
    email,
    password,
    profilePic,
  });

  //checking if user is created successfully
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
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
