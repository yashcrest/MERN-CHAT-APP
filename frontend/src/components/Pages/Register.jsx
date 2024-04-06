import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/action/userDetailsSlice";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import { registerValidationSchema } from "../../schemas";

const register = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails.user);
  const error = useSelector((state) => state.userDetails.error);
  const navigate = useNavigate();

  // formik reusable labels and inputs
  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  // form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // combining all users details to send over to userDetailsSlice for backend
    const formData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      await dispatch(registerUser(formData)).unwrap();
      navigate("/chat");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* formik form */}
        <Formik
          initialValues={{
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerValidationSchema}
        >
          <Form className="flex flex-col form-item">
            <h1 className="text-5xl">Create a new account</h1>
            <MyTextInput
              label="Username:"
              name="username"
              type="text"
              placeholder="avatar"
              className="input"
            />
            <MyTextInput
              label="Email:"
              name="email"
              type="email"
              placeholder="name@example.com"
              className="input"
            />
            <MyTextInput
              label="Password:"
              name="password"
              type="password"
              className="input"
            />
            <MyTextInput
              lable="Confirm Password"
              name="confirmPassword"
              type="password"
              className="input"
            />
            <button type="submit" className="input-btn">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default register;
