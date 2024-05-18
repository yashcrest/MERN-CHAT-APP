import React, { useEffect } from "react";
import Message from "./Message";
import { useSelector, useDispatch } from "react-redux";
import { useGetMessagesQuery } from "../../redux/action/messagesApiSlice";

const Messages = () => {
  const { _id } = useSelector((state) => state.auth.userInfo);

  const { data: messages, isloading, isError } = useGetMessagesQuery(_id);

  return (
    <div className="px-4 flex-1 overflow-auto">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;
