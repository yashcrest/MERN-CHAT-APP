import React from "react";
import { useDispatch } from "react-redux";
const Login = () => {
  return (
    <>
      <form className="login-form">
        <h1>Log In</h1>
        <label>Email address:</label>
        <input type="text" name="" />
        <label>Password:</label>
        <input type="password" name="" />
      </form>
    </>
  );
};

export default Login;
