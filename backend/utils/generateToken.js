//generating JWT to be used on userController for sending client tokens while registering or logggin in
import jwt from "jsonwebtoken";

const generateToken = (res, userID) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 5 * 60 * 60,
  });
};

export default generateToken;
