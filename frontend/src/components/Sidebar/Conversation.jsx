import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMessage } from "../../redux/action/messagesSlice";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const dispatch = useDispatch();
  const { selectedMessage } = useSelector((state) => state.selectedMessage);

  let isSelected = selectedMessage?._id === conversation._id;

  return (
    <>
      <div
        className={`flex items-center gap-2 hover:bg-sky-400 dark:hover:text-black rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-600" : ""
        }`}
        onClick={() => dispatch(setSelectedMessage(conversation))}
      >
        {/* avatar */}
        <div className="avatar online">
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
      {!lastIdx && <div className="divider my-0 py-0" />}
    </>
  );
};

export default Conversation;
