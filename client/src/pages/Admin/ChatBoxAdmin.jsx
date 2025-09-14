import SlideBarChatBox from "../../components/Admin/ChatBox/SlideBarChatBox";
import ContentChatBox from "../../components/Admin/ChatBox/ContentChatBox";
import { Logo } from "../../components/common/Logo";
import avatar from "../../assets/images/Avatar/0_Mikel-Arteta.jpg";
import { getAllPreviewMessages } from "../../fetchData/Message";
import { initializeWebSocket, getWebSocket, disconnectWebSocket } from "../../utils/websocketManager"; // Adjust the import path as per your project structure
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ChatBoxAdmin = () => {
  const socket = initializeWebSocket() || getWebSocket();
  const [rooms, setRooms] = useState([]);

  useEffect(() => { 
    socket.emit("adminJoin");
    socket.on("userRequestChatAdmin", (room) => {
      // console.log("Có phòng chat mới kìa: " + room)
      if(!rooms.includes(room)) {
        rooms.push(room);
      }
      // admin join room
      socket.emit("joinRoom", room);
    })
    return () => {
        // disconnectWebSocket();
      };
    }, [rooms]);
  return (
    <div className="h-[100vh] flex flex-col bg-white">
      <header className="flex justify-between px-20 items-center bg-slate-100 h-[78px] max-h-[78px] border-b-2">
        <a href="/admin">
          <Logo />
        </a>
        <div className="flex flex-row">
          <img className="w-10 h-10 rounded-full" src={avatar} alt="" />
        </div>
      </header>
      <div className="container mx-auto flex-grow flex flex-row  overflow-hidden ">
      <SlideBarChatBox />
      <ContentChatBox/>
      </div>
    </div>
  );
};

export default ChatBoxAdmin;
