import React, { act, useEffect, useState } from "react";
import { loadMessage } from "../../../fetchData/Message";
import { initializeWebSocket, getWebSocket, disconnectWebSocket } from "../../../utils/websocketManager"; // Adjust the import path as per your project structure
import { useSelector } from "react-redux";

const ChatboxComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [activeRoom, setActiveRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const socket = initializeWebSocket() || getWebSocket();
  

  useEffect(() => { 
    if (!user) return;
    ///// Teacher + User
    if(user.role === 'user' ) {
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
    if(user.role === 'admin') {
      console.log("come")
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
      disconnectWebSocket();
    };
  }, []);

    ///// All role
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
        // loadMessage(activeRoom).then((response) => {
        //   const data = response.data;
        //   setMessages(data);
        // });
    };

  return (
    <div className="chat-container">
    {/* Sidebar */}
    <div className="sidebar">
      <h2>Rooms</h2>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>
            <button onClick={() => selectRoom(room)}>{room}</button>
          </li>
        ))}
      </ul>
    </div>

    {/* Main Chat Area */}
    <div className="chat-area">
      <h2>WebSocket Chat Box</h2>
      <div className="message-list">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.senderId === user._id ? "my-message" : "other-message"}
          >
            <strong>{msg.senderId === user._id ? "You" : "Admin"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>

    {/* CSS for styling */}
    <style jsx>{`
      .chat-container {
        display: flex;
        height: 100vh;
      }

      .sidebar {
        flex: 1;
        padding: 20px;
        background-color: #f0f0f0;
        border-right: 1px solid #ccc;
        overflow-y: auto;
      }

      .sidebar h2 {
        margin-bottom: 10px;
      }

      .sidebar ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }

      .sidebar ul li {
        margin-bottom: 10px;
      }

      .sidebar button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 5px 10px;
        font-size: 16px;
        width: 100%;
        text-align: left;
      }

      .sidebar button:hover {
        background-color: #e0e0e0;
      }

      .chat-area {
        flex: 3;
        padding: 20px;
      }

      .message-list {
        height: 70vh;
        overflow-y: auto;
        margin-bottom: 20px;
      }

      .my-message {
        text-align: right;
        background-color: #dcf8c6;
        padding: 5px 10px;
        margin: 5px;
        border-radius: 10px;
      }

      .other-message {
        text-align: left;
        background-color: #f1f0f0;
        padding: 5px 10px;
        margin: 5px;
        border-radius: 10px;
      }

      .input-area {
        display: flex;
      }

      .input-area input {
        flex: 1;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px 0 0 5px;
      }

      .input-area button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        background-color: #4caf50;
        color: #fff;
        border: none;
        border-radius: 0 5px 5px 0;
      }

      .input-area button:hover {
        background-color: #45a049;
      }
    `}</style>
  </div>
  );
};
export default ChatboxComponent;
