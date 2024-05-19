import React, { useEffect } from "react";
import Message from "./Message";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useGetMessagesQuery } from "../../redux/action/apiSlice";

const Messages = () => {
  // const { _id } = useSelector((state) => state.auth.userInfo);
  const { selectedMessage } = useSelector((state) => state.selectedMessage);

  const {
    data: messages,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetMessagesQuery(selectedMessage._id);

  let content;
  if (isSuccess && messages.length > 0) {
    content = messages.map((message) => {
      return (
        <div key={message._id}>
          <Message message={message} />
        </div>
      );
    });
  } else if (isError) {
    content = toast.error(error?.data?.message || error.error);
  }

  return <div className="px-4 flex-1 overflow-auto">{content}</div>;
};

export default Messages;
