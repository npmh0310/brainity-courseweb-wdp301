import React, { useEffect, useState } from "react";
import ChatBoxClose from "../components/User/ChatBox/ChatBoxClose";
import ChatBoxOpen from "../components/User/ChatBox/ChatBoxOpen";
import { initializeWebSocket, getWebSocket, disconnectWebSocket } from "../utils/websocketManager"; // Adjust the import path as per your project structure
import { useSelector } from "react-redux";


const ChatBoxUser = () => {
  const user = useSelector((state) => state.auth.user);
  const socket = initializeWebSocket() || getWebSocket();
  const [messages, setMessages] = useState([]);
  const [openBox, setOpenBox] = useState(false);
  const handleBox = () => {
    setOpenBox(!openBox);
  };
  useEffect(() => { 
    if(!user) return; 
      if(user._id) {
        socket.emit("joinRoom", 'chatWithAdmin_'+ user._id);
        console.log("user join room success")
      }
      return () => {
        disconnectWebSocket();
      };
    }, [socket]);
      
      return (
        <div className="fixed bottom-6 right-7 z-100000 ">
      {openBox ? (
        <ChatBoxOpen handleCloseBox={handleBox} room = {'chatWithAdmin_'+ user._id} />
      ) : (
        <ChatBoxClose handleOpenBox={handleBox} />
      )}
    </div>
  );
};

export default ChatBoxUser;
