import React, { useEffect, useState, useRef } from "react";
import avatar2 from "../../../assets/images/Avatar/CGakpo2023.jpg";
import avatar from "../../../assets/images/Avatar/CGakpo2023.jpg";
import { Info, Search } from "lucide-react";
import Logo from "../../../assets/images/logo_noBg.png";
import { getMessagesByRoomName, markAllFromRoomAsRead } from "../../../fetchData/Message";
import { SendHorizontal, Paperclip, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getWebSocket, initializeWebSocket } from "../../../utils/websocketManager";

const ContentChatBox = () => {
  const socket = initializeWebSocket() || getWebSocket();
  const [message, setMessage] = useState("");
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const chatBoxRef = useRef(null);

  const handleReceiveMessage = (message) => {
    if (user._id === message.senderId || !user._id) {
      renewMessages(roomName);
    }
  };

  useEffect(() => {
    getMessagesByRoomName(roomName,{page:1, size:20}).then((response) => {
      const data = Object.values(response.data.data);
      setMessages(data[0]);
    });

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage); // Unregister the event handler on cleanup
    };
  }, [roomName]);

  const renewMessages = (roomName) => {
    getMessagesByRoomName(roomName, {page:1, size:20}).then((response) => {
      const data = Object.values(response.data.data);
      setMessages(data[0]);
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        senderId: user._id,
        content: message,
      };
      socket.emit("sendMessage", {
        room: roomName,
        message: newMessage,
      });
    }
    setMessage("");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (chatBoxRef.current.scrollTop === 0) {
        console.log("Scrolled to top");
        // Add your logic here
      }
    };

    const chatBoxElement = chatBoxRef.current;
    if (chatBoxElement) {
      chatBoxElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatBoxElement) {
        chatBoxElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  if (!roomName) {
    return (
      <div className="w-full lg:w-3/4 h-full border-r-2 flex flex-col ">
        <div className="flex-grow text-center flex items-center justify-center flex-col border-b-2 border-gray-200">
          <img src={Logo} className="w-32" alt="Logo" />
          <h1 className="text-sm">Send a message to start a conversation!</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-3/4 h-full border-r-2 flex flex-col ">
      <header className="flex flex-row justify-between items-center px-9 py-4 border-b-2">
        <div className="flex flex-row items-center gap-x-5">
          <img className="w-11 h-11 rounded-full" src={messages.avatarSrc} alt="" />
          <h1 className="font-medium">{messages.otherUsername}</h1>
        </div>
        <div className="flex flex-row items-center gap-x-8 text-gray-500">
          <Search className="hover:text-black" />
          <Info className="hover:text-black" />
        </div>
      </header>
      <div
        ref={chatBoxRef}
        className="h-[78vh] flex-grow text-center flex flex-col-reverse overflow-y-auto scrollbar-custom "
      >
        <div className="flex flex-col px-3 py-5 space-y-8">
          {messages.messages?.map((message, index) => (
            <div
              key={index}
              className={`flex items-end ${message.type === "my" ? "justify-end" : "justify-start"} gap-x-2`}
            >
              {message.type === "their" && (
                <img src={messages.avatarSrc} className="w-9 h-9 rounded-full order-1" alt={messages.name} />
              )}
              <div
                className={`flex flex-col space-y-2 text-xs ${message.type === "their" ? "max-w-xs order-2 items-start" : "items-end"}`}
              >
                {message.type === "their" ? (
                  <div>
                    <span
                      className={`px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600 text-left break-words`}
                    >
                      {message.content}
                    </span>
                  </div>
                ) : (
                  <div className="w-2/3">
                    <span
                      className={`px-4 py-2 rounded-lg inline-block bg-gray-200 text-gray-600 text-left break-words`}
                    >
                      {message.content}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form className="mx-4 my-3">
        <div className="flex items-center px-5 gap-x-2 h-12 border rounded-3xl">
          <label htmlFor="file-upload" className="flex justify-center items-center hover:text-primary cursor-pointer">
            <Paperclip size={20} />
          </label>
          <input id="file-upload" type="file" className="hidden" />
          <input
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 border-none outline-none text-sm"
            type="text"
            value={message}
            placeholder="Ask a question..."
          />
          <button onClick={sendMessage} className="flex justify-center items-center hover:text-primary cursor-pointer">
            <SendHorizontal className=" " size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentChatBox;
