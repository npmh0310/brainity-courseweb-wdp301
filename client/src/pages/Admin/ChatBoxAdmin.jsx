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
  const [messages, setMessages] = useState([]);
  const [previewMessages, setPreviewMessages] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => { 
    socket.emit("adminJoin");
    socket.on("userRequestChatAdmin", (room) => {
      console.log("Có phòng chat mới kìa: " + room)
      if(!rooms.includes(room)) {
        rooms.push(room);
      }
      // admin join room
      socket.emit("joinRoom", room);
    })

    getAllPreviewMessages().then((response) => {
      const data = Object.values(response.data.data);
      setPreviewMessages(data)
    });
       
    // renewPreviewMessage();

    socket.on("receiveMessage", (message) => {
      console.log("come recieve: ", message)

      // hàm set ni if ( curr room. contains message.senderId)
      // current room , được set = cách bắn room khi sideBarChat được click, bắn thằng room qua (id của user tạo room nớ )
      // setMessages((prevMessages) => [...prevMessages, 
      //   {
      //     type: user._id == message.senderId ? "my" : "their",
      //     text: message.content,
      //   },
      // ]);
      
      renewPreviewMessage();

    });
    
    const renewPreviewMessage = () => {
      getAllPreviewMessages().then((response) => {
        console.log("Has changed")
        const data = Object.values(response.data.data);
        setPreviewMessages(data);
      });
    }
  
    return () => {
        disconnectWebSocket();
      };
    }, [rooms]);

    // previewMessage update when recieve message.  
    
    // const sendMessage = (e) => {
    //   console.log("room: ", room)
    //   e.preventDefault();
    //   if (message.trim()) {
    //     const newMessage = {
    //         senderId: user._id,
    //         content: message,
    //       };
          
    //       socket.emit("sendMessage", {
    //         room: room,
    //         message: newMessage,
    //       });
    //     }
    //   setMessage("");
    // };

    // const selectRoom = (room) => {
    //   setActiveRoom(room);
    //     // loadMessage(activeRoom).then((response) => {
    //     //   const data = response.data;
    //     //   setMessages(data);
    //     // });
    // };

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
      <SlideBarChatBox previewMessages = {previewMessages} />
      <ContentChatBox/>
      </div>
    </div>
  );
};

export default ChatBoxAdmin;
