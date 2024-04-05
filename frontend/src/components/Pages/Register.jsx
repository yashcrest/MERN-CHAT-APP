import React from "react";

const register = () => {
  const handleSubmit = () => {};
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col form-item">
          <h1 className="text-4xl">Register a new Account</h1>
          <label htmlFor="username">Username:</label>
          <input type="text" className="input" required />
          <label htmlFor="email">Email:</label>
          <input type="email" className="input" required />
          <label htmlFor="email">Password:</label>
          <input type="password" className="input" required />
          <label htmlFor="email">Confirm Password:</label>
          <input type="password" className="input" required />
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
