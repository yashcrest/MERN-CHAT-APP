import React, { useState } from "react";
import { useDispatch } from "react-redux";
const Login = () => {
  const [fields, setFields] = useState();
  return (
    <>
      <h1 className="text-5xl">Log In to your account</h1>
      <form className="login-form flex flex-col items-center h-lvh">
        <div className="flex flex-col items-center">
          <label className="flex-col">Email address:</label>
          <input type="text" name="" />
          <label>Password:</label>
          <input type="password" name="" />
          <button>Log In</button>
        </div>
      </form>
    </>
  );
};

export default Login;
