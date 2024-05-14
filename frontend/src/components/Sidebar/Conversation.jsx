import React from "react";

const Conversation = () => {
  return (
    <>
      <div className="flex items-center gap-2 hover:bg-sky-400 dark:hover:text-black rounded p-2 py-1 cursor-pointer">
        {/* avatar */}
        <div className="avatar">
          <div className="w-12 mask mask-hexagon">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-1 justify-between">
            <p className="font-bold">Yash Shrestha</p>
            <span className="text-xl">🎃</span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default Conversation;
