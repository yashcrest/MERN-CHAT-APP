import React, { useEffect } from "react";
import Message from "./Message";
import { useSelector, useDispatch } from "react-redux";
import { useGetMessagesQuery } from "../../redux/action/messagesApiSlice";

const Messages = () => {
  const { _id } = useSelector((state) => state.auth.userInfo);
  const { selectedMessage } = useSelector((state) => state.selectedMessage);

  const { data: messages, isloading, isError } = useGetMessagesQuery(_id);

  useEffect(async () => {
    awiat;
  }, []);

  return (
    <div className="px-4 flex-1 overflow-auto">
      <Message />
    </div>
  );
};

export default Messages;
