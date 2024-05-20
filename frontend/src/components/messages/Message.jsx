import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
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
      <div className="chat-footer  text-xs flex gap-1 items-center">12:43</div>
    </div>
  );
};

export default Message;
