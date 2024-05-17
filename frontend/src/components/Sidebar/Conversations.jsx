import React from "react";
import Conversation from "./Conversation";
import { toast } from "react-toastify";
import { useGetSidebarConversationQuery } from "../../redux/action/messagesApiSlice";

const Conversations = () => {
  return (
    <>
      <div className="py-2 flex flex-col overflow-auto">
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
      </div>
    </>
  );
};

export default Conversations;
