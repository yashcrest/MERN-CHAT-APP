// @desc Auth user/set token
// route POST api/users/auth
// @access Public
//this function the logic for verifying the authentication logic from login.jsx file
const authUser = (req, res) => {
  res.status(200).json({ message: "authenticating user.." });
};

export { authUser };
