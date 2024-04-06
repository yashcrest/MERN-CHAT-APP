import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/action/userDetailsSlice";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const register = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails.user);
  const error = useSelector((state) => state.userDetails.error);
  const navigate = useNavigate();

  //user details state (this is used to clear out the form fields)
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  //form validation
  const formvalidation = () => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // check if email is valid
    setEmailValid(regex.test(email));

    //check if password is same
    setPasswordMatch(password === confirmPassword);
  };

  //useEffect to run validation whenever field changes
  useEffect(() => {
    formvalidation();
  }, [password, confirmPassword, email]);

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
      //reset form fields
      setuserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/chat");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

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
            value={username}
            onChange={(e) => setuserName(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="input"
            placeholder="youremail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Password:</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="email">Confirm Password:</label>
          <input
            type="password"
            className="input"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {/* checking password requirements */}
          <div className="password-requirements">
            <span>
              {passwordMatch ? <FaXmark /> : <FaCheckCircle />}
              <p>Password Match</p>
            </span>
            <span>
              {passwordMatch ? <FaCheckCircle /> : <FaXmark />} Contains letter
            </span>
            <span>
              {passwordMatch ? <FaCheckCircle /> : <FaXmark />}
              Contains special characters
            </span>
          </div>
          {/* submit button */}
          <input className="input-btn" type="submit" value="Sign Up" />
        </form>
      </div>
    </>
  );
};

export default register;
