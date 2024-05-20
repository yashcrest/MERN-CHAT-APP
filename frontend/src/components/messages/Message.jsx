import React from "react";
import { useSelector } from "react-redux";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  // formatted time for message
  const formattedTime = extractTime(message.createdAt);
  const { userInfo } = useSelector((state) => state.auth);
  const { selectedMessage } = useSelector((state) => state.selectedMessage);
  const loggedInUser = message.senderId === userInfo._id;
  const chatClassName = loggedInUser ? "chat-end" : "chat-start";
  const profilePic = loggedInUser
    ? userInfo.profilePic
    : selectedMessage?.profilePic;

  const bubbleBgColor = loggedInUser ? "bg-blue-500" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer  text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
