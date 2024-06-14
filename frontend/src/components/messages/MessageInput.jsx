import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSendMessageMutation } from "../../redux/action/apiSlice";
import { BiSend } from "react-icons/bi";
import { toast } from "react-toastify";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { selectedConversation } = useSelector(
    (state) => state.selectedConversation
  );
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!message) return;
      await sendMessage({ id: selectedConversation._id, message }).unwrap();
      setMessage("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="outline-none text-sm rounded-lg block w-full p-2.5 bg-gray-300 dark:bg-gray-700  text-gray-900 dark:text-white"
          placeholder="Send a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-white"
        >
          {isLoading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BiSend className="text-black dark:text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
