import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/action/userDetailsSlice";
import { Formik, Field, Form, ErrorMessage, useField, useFormik } from "formik";
import { registerValidationSchema } from "../../schemas/registerSchema";

const Register = () => {
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
        {/* this is displaying the error after schema does form validation */}
        {meta.touched && meta.error ? (
          <div className="reg-error-msg">{meta.error}</div>
        ) : null}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* formik form */}
        <Formik
          initialValues={{
            Username: "",
            Email: "",
            Password: "",
            ConfirmPassword: "",
          }}
          validationSchema={registerValidationSchema}
          // handle form submission
          onSubmit={async (values, { setSubmitting }) => {
            //destructuring values
            const { Username, Email, Password } = values;
            const formData = {
              username: Username,
              email: Email,
              password: Password,
            };

            try {
              await dispatch(registerUser(formData)).unwrap();
              navigate("/chat");
            } catch (error) {
              console.error("Registration failed:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col form-item">
              <h1 className="text-5xl">Create a new account</h1>
              <MyTextInput
                label="Username:"
                name="Username"
                type="text"
                placeholder="avatar"
                className="input"
              />
              <MyTextInput
                label="Email:"
                name="Email"
                type="email"
                placeholder="name@example.com"
                className="input"
              />
              <MyTextInput
                label="Password:"
                name="Password"
                type="password"
                className="input"
                placeholder="******"
              />
              <MyTextInput
                label="Confirm Password"
                name="ConfirmPassword"
                type="password"
                className="input"
                placeholder="******"
              />
              <button
                disabled={isSubmitting}
                type="submit"
                className="input-btn"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
