import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import MessageContainer from "../messages/MessageContainer";
const Chat = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="border-solid border-2  p-5 border-red-700 mx-10 flex sm:h-[300px] md:h-[500px]">
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </>
  );
};
export default Chat;
