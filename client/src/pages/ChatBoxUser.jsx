import React, { useState } from "react";
import ChatBoxClose from "../components/User/ChatBox/ChatBoxClose";
import ChatBoxOpen from "../components/User/ChatBox/ChatBoxOpen";

const ChatBoxUser = () => {
  const [openBox, setOpenBox] = useState(false);
  const handleBox = () => {
    setOpenBox(!openBox);
  };
  return (
    <div className="fixed bottom-6 right-7 z-100000 ">
      {openBox ? (
        <ChatBoxOpen handleCloseBox={handleBox} />
      ) : (
        <ChatBoxClose handleOpenBox={handleBox} />
      )}
    </div>
  );
};

export default ChatBoxUser;
