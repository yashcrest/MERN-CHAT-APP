import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { apiSlice, useGetMessagesQuery } from "../../redux/action/apiSlice";
import MessageSkeleton from "./MessageSkeleton";
import { useSocketContext } from "../../contexts/SocketContext";

const Messages = () => {
  const { socket } = useSocketContext;
  const { selectedConversation } = useSelector(
    (state) => state.selectedConversation
  );

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
  } = useGetMessagesQuery(selectedConversation._id);

  useEffect(() => {
    if (selectedConversation?._id && socket) {
      socket.emit("join", selectedConversation._id);

      socket.on("newMessage", (newMessage) => {
        if (newMessage.conversationId === selectedConversation._id) {
          apiSlice.util.updateQueryData(
            "getMessages",
            selectedConversation._id,
            (draft) => {
              draft.puhs(newMessage);
            }
          );
        }
      });
      return () => {
        socket.off("newMessage");
      };
    }
  }, [selectedConversation, socket]);

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
