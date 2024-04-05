import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/action/userDetailsSlice";

const register = () => {
  const dispatch = useDispatch();

  // form submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    // combining all users details to send over to userDetailsSlice for backend
    const formData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log();
    // sending users details over to userDetailsSlic, which then sends the data over to backend
    dispatch(registerUser(formData));
  };

  //user object
  // const user = useSelector((state) => state.userDetails);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col form-item">
          <h1 className="text-4xl">Register a new Account</h1>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="input"
            placeholder="username"
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="input"
            placeholder="youremail@example.com"
            required
          />
          <label htmlFor="email">Password:</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            required
          />
          <label htmlFor="email">Confirm Password:</label>
          <input
            type="password"
            className="input"
            placeholder="confirm password"
            required
          />
          {/* submit button */}
          <input className="input-btn" type="submit" value="Sign Up" />
        </form>
      </div>
    </>
  );
};

export default register;

/* 
To do:
1. need to figure out how to send out users data and save it
2. how to validate form
*/
