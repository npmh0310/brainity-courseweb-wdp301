import React, { act, useEffect, useState } from "react";
import io from "socket.io-client";
import { loadMessage } from "../../../fetchData/Message";
import { useSelector } from "react-redux";
import { recompileSchema } from "../../../../../server/models/user";

const ChatboxComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [activeRoom, setActiveRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));

    ///// Teacher + User
    if(user.role !== 'admin' ) {
      let room = 'chatWithAdmin_'+ user._id;
      
      //// Nếu user click để mở box chat thì lúc đó mới tạo kết nối
      //// điều kiện trong if là khi user click vào
      if(true) {
          socket.emit("joinRoom", room);
  
          loadMessage(room).then((response) => {
            const data = Object.values(response.data);
            setMessages(data);
          })
      }
      
      setActiveRoom(room);
    }

    //// Admin
    if(user.role == 'admin') {
        socket.emit("adminJoin");
        socket.on("userRequestChatAdmin", (room) => {
          if(!rooms.includes(room)) {
            rooms.push(room);
          }
        })
    }

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  ///// All role
  
  useEffect(() => {
    if (activeRoom) {
      loadMessage(activeRoom).then((response) => {
        const data = response.data;
        setMessages(data);
      });
    }
  }, [activeRoom]);
  
   const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        senderId: user._id,
        role: user.role,
        content: message,
      };

      socket.emit("sendMessage", {
        room: activeRoom,
        message: newMessage,
      });

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  const selectRoom = (room) => {
    setActiveRoom(room);
  };

  return (
    <div>
      <h2>WebSocket chat box:</h2>
    </div>
  );
};
export default ChatboxComponent;
