import React from "react";
import { useSelector } from "react-redux";
const Chat = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      {/* outer div for chat window */}
      <div className="max-w-screen-xl mx-auto p-8 flex justify-center">
        {/* main chat window */}
        <div className="chat-container border-solid border-2 w-96 h-96 p-5 border-red-700">
          <h1 className="mx-auto flex justify-center text-3xl">Chat window</h1>
        </div>
      </div>
    </>
  );
};
export default Chat;
