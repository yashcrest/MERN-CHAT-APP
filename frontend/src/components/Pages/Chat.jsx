import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import MessageContainer from "../messages/MessageContainer";
import { useSelector } from "react-redux";
const Chat = () => {
  const { fullName } = useSelector((state) => state.auth.userInfo);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200 dark:bg-gray-800">
        <div className=" bg-gray-300 dark:bg-gray-900 shadow-md rounded-lg p-5  flex sm:h-[300px] md:h-[500px]">
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </>
  );
};
export default Chat;
