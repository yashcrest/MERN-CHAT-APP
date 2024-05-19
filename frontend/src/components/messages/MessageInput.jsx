import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSendMessageMutation } from "../../redux/action/apiSlice";
import { BiSend } from "react-icons/bi";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { selectedMessage } = useSelector((state) => state.selectedMessage);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!message) return;
      await sendMessage({ id: selectedMessage._id, message }).unwrap();
      setMessage("");
    } catch (error) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
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
            <BiSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
