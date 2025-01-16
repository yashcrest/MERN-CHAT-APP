//generating JWT to be used on userController for sending client tokens while registering or logggin in
import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //sending back to frontend
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  });
  return token;
};

export default generateToken;
