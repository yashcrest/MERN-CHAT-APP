import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Login = () => {
  const [fields, setFields] = useState();
  return (
    <>
      <h1 className="text-5xl">Log In to your account</h1>
      <form className="login-form">
        <div className="">
          <label className="">Email address:</label>
          <input type="text" name="" />
          <label>Password:</label>
          <input type="password" name="" />
          <button>Log In</button>
          {/* routing to register page with Link tag */}
          <span>
            <Link to="/register" className="input-btn">
              Create an Account.
            </Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default Login;
