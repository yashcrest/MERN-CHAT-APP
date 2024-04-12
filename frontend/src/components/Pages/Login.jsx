import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, useField, Field } from "formik";
import { loginValidationSchema } from "../../schemas/userSchema";
const Login = () => {
  //formik labels and inputs
  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {/* this is to check if the input field has been touched or any invalid input has been entered */}
        {meta.touched && meta.error ? (
          <div className="reg-error-msg">{meta.error}</div>
        ) : null}
      </>
    );
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={async ({ setSubmitting }) => {}}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col form-item">
              <h1 className="text-5xl pb-2">Log in to your account</h1>
              <MyTextInput
                label="Username"
                placeholder="Enter your username"
                name="username"
                type="text"
                className="input"
              />
              <MyTextInput
                label="Password"
                placeholder="Enter Password"
                name="password"
                type="password"
                className="input"
              />
              <button
                type="submit"
                className="input-btn"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
