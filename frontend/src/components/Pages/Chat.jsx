import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/action/authSlice";

const Chat = () => {
  const user = selectCurrentUser;
  // capitalizing username
  const capitalizeUsername = (username) => {
    const firstletter = username.charAt(0).toUpperCase();
    const remainingChar = username.slice(1);
    return firstletter + remainingChar;
  };
  return (
    <div>
      <h1 className="text-5xl">Chat Window</h1>
      <p>Hello {user}!</p>
    </div>
  );
};

export default Chat;
