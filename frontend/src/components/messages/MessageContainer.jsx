import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { PiChatsDuotone } from "react-icons/pi";

const MessageContainer = () => {
  const { selectedConversation } = useSelector(
    (state) => state.selectedConversation
  );

  return (
    <div className="md:min-w-[450px] flex flex-col overflow-auto">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-200 dark:bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">Too: </span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-700 font-semibold flex-col items-center gap-2 ">
        <p className="dark:text-white">Hey, {userInfo.fullName}! 👋</p>
        <p className="dark:text-white">Select a chat to start conversation</p>
        <div className="flex justify-center">
          <PiChatsDuotone className="text-3xl md:text-6xl dark:text-white" />
        </div>
      </div>
    </div>
  );
};
