import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useGetMessagesQuery } from "../../redux/action/apiSlice";
import MessageSkeleton from "./MessageSkeleton";

const Messages = () => {
  const { selectedMessage } = useSelector((state) => state.selectedMessage);
  const lastMessageRef = useRef();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" });
  });

  const {
    data: messages,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetMessagesQuery(selectedMessage._id);

  let content;
  if (isLoading) {
    content = [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />);
  } else if (!isFetching && messages.length === 0) {
    content = (
      <p className="text-center">Send a message to start the conversation</p>
    );
  } else if (!isLoading && messages.length > 0) {
    content = messages.map((message) => {
      return (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      );
    });
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return <div className="px-4 flex-1 overflow-auto">{content}</div>;
};

export default Messages;
