import React, { useState } from "react";
import { useDispatch } from "react-redux";
const Login = () => {
  const [fields, setFields] = useState();
  return (
    <>
      <form className="login-form">
        <h1>Log In to your account</h1>
        <label>Email address:</label>
        <input type="text" name="" />
        <label>Password:</label>
        <input type="password" name="" />
      </form>
    </>
  );
};

export default Login;
