import React from "react";

const Message = ({ message }) => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://cdn4.iconfinder.com/data/icons/office-thick-outline/36/office-14-1024.png"
            alt=""
          />
        </div>
      </div>
      <div className="chat-bubble text-white dark:bg-blue-500">
        {message.message}
      </div>
      <div className="chat-footer  text-xs flex gap-1 items-center">12:43</div>
    </div>
  );
};

export default Message;
