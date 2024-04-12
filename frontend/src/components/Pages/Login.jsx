import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, useField, Field } from "formik";
const Login = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <form className="login-form flex flex-col">
          <h1 className="text-5xl">Log In to your account</h1>
          <label className="">Email address:</label>
          <input type="text" name="" />
          <label>Password:</label>
          <input type="password" name="" />
          <button className="input-btn">Log In</button>
          {/* routing to register page with Link tag */}
          <span className="my-4">
            Don't have an account?
            <Link to="/register" className="btn bg-black text-white p-1 ">
              Create an Account.
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
