import React from "react";

const register = () => {
  const handleSubmit = () => {};
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h1 className="text-4xl">Register a new Account</h1>
          <label htmlFor="username">Username:</label>
          <input type="text" className="border-2 border-grey-100" />
          <label htmlFor="email">Email:</label>
          <input type="email" />
          <label htmlFor="email">Password:</label>
          <input type="password" />
          <label htmlFor="email">Confirm Password:</label>
          <input type="password" />
          {/* submit button */}
          <input
            className="mx-5 border text-2xl"
            type="submit"
            value="Sign Up"
          />
        </form>
      </div>
    </>
  );
};

export default register;
