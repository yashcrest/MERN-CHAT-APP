import React from "react";
import { useSelector } from "react-redux";

const Chat = () => {
  const { username } = useSelector((state) => state.userDetails.user);
  const user = useSelector((state) => state.userDetails.user);
  // capitalizing username
  const capitalizeUsername = (username) => {
    const firstletter = username.charAt(0).toUpperCase();
    const remainingChar = username.slice(1);
    return firstletter + remainingChar;
  };
  return (
    <div>
      <h1 className="text-5xl">Chat Window</h1>
      {user ? <p>Hello {capitalizeUsername(username)}!</p> : null}
    </div>
  );
};

export default Chat;
