import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import MessageContainer from "../messages/MessageContainer";
const Chat = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log({ userInfo });
  return (
    <>
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center h-screen sm:h-[450px] md:h-[700px] overflow-hidden">
        <div className="chat-container border-solid border-2  p-5 border-red-700 flex">
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </>
  );
};
export default Chat;
