import React from "react";
import { useSelector } from "react-redux";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  return (
    <>
      <div className="flex items-center gap-2 hover:bg-sky-400 dark:hover:text-black rounded p-2 py-1 cursor-pointer">
        {/* avatar */}
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="profile pic" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-1 justify-between">
            <p className="font-bold">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
