import React, { useState } from "react";
import { useDispatch } from "react-redux";
const Login = () => {
  const [fields, setFields] = useState();
  return (
    <>
      <form className="login-form">
        <h1 className="text-5xl">Log In to your account</h1>
        <label className="flex-col">Email address:</label>
        <input className="border" type="text" name="" />
        <label>Password:</label>
        <input type="password" name="" />
      </form>
    </>
  );
};

export default Login;
