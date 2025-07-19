import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedConversation } from "../../redux/action/messagesSlice";
import { useSocketContext } from "../../contexts/SocketContext";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector(
    (state) => state.selectedConversation
  );
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  let isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`flex items-center gap-2 text-black hover:bg-sky-400 dark:hover:text-black rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-600" : ""
        }`}
        onClick={() => dispatch(setSelectedConversation(conversation))}
      >
        {/* avatar */}
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="profile pic" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-1 justify-between">
            <p className="font-bold dark:text-white">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 dark:divider-neutral" />}
    </>
  );
};

export default Conversation;
