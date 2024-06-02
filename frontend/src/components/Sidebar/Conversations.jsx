import React from "react";
import Conversation from "./Conversation";
import { toast } from "react-toastify";
import { useGetSidebarConversationQuery } from "../../redux/action/apiSlice";
import { getRandomEmoji } from "../../utils/emoji";

const Conversations = () => {
  const {
    data: conversations,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetSidebarConversationQuery();

  let content;
  if (isFetching) {
    content = <span className="loading loading-spinner mx-auto" />;
  } else if (isSuccess) {
    content = conversations.map((conversation, idx) => {
      return (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversation.length - 1}
        />
      );
    });
  } else if (isError) {
    toast.error(error?.data?.error || error.error);
    console.log(error);
  }

  return (
    <>
      <div className="py-2 flex flex-col overflow-auto">{content}</div>
    </>
  );
};

export default Conversations;
