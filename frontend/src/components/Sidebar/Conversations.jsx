import React, { useEffect } from "react";
import Conversation from "./Conversation";
import { toast } from "react-toastify";
import { useGetSidebarConversationQuery } from "../../redux/action/messagesApiSlice";
import { getRandomEmoji } from "../../utils/emoji";

const Conversations = () => {
  const { data: conversations, isLoading } = useGetSidebarConversationQuery();

  return (
    <>
      <div className="py-2 flex flex-col overflow-auto">
        {isLoading
          ? "loading...."
          : conversations.map((conversation, idx) => {
              return (
                <Conversation
                  key={conversation._id}
                  conversation={conversation}
                  emoji={getRandomEmoji()}
                  lastIdx={idx === conversations.length - 1}
                />
              );
            })}
      </div>
    </>
  );
};

export default Conversations;
