// this is to protect our routes
// we need the userID from the payload to verify the user
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import userDetails from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  // checking for the cookie
  if (token) {
    try {
      // this decoded object will have the userID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userDetails.findById(decoded.userId).select("-password"); // this way the password property will not be sent over

      next(); // calling next because this is a middleware, we still need to complete other steps after this
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

export { protect };

/*
The asyncHandler function is a utility function commonly used in Express.js middleware to handle asynchronous operations. It takes in an asynchronous function as an argument and returns a new function that wraps the original function with error handling.

In the provided code, the protect middleware function is wrapped with asyncHandler. This allows the protect function to use await to handle asynchronous operations, such as querying the database or making API calls.

The purpose of asyncHandler is to catch any errors that occur during the execution of the asynchronous function and pass them to the Express.js error handling middleware. This helps to centralize error handling and avoid repetitive error handling code in each middleware.
*/
