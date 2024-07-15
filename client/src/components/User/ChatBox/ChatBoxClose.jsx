import React from "react";
import { MessageSquare } from "lucide-react";
const ChatBoxClose = ({ handleOpenBox }) => {
  return (
    <div
      className="cursor-pointer w-14 h-14 text-white text-xl bg-primary flex justify-center items-center rounded-full  transition-transform hover:scale-110"
      onClick={handleOpenBox}
    >
      <MessageSquare />
    </div>
  );
};

export default ChatBoxClose;
