import React from "react";
import { useSelector } from "react-redux";
const Chat = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <p>Hello {userInfo.username} !</p>
    </>
  );
};
export default Chat;
