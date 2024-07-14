import React, { useEffect, useState } from "react";
import avatar2 from "../../../assets/images/Avatar/CGakpo2023.jpg";
import avatar from "../../../assets/images/Avatar/CGakpo2023.jpg";
import { Info, Search } from "lucide-react";
import Logo from "../../../assets/images/logo_noBg.png";
import { getMessagesByRoomName } from "../../../fetchData/Message";
import { SendHorizontal, Paperclip, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const ContentChatBox = () => {
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);

  console.log(user)

  // XỬ LÝ API
  useEffect(() => {
        getMessagesByRoomName(roomName).then((response) => {
          const data = Object.values(response.data.data);
          setMessages(data[0]);
          console.log(messages.messages)
        });
    }, [roomName]);

  // XỬ LÝ API

  const chatRooms = [
    {
      id: 1,
      avatarSrc:
        "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-1/274961617_1031354217755700_9193705406630906752_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=UYqoziiUPaIQ7kNvgHAzk8W&_nc_ht=scontent.fdad3-6.fna&oh=00_AYAHun75S1iUv6auh-p1rAzPdUs5YCY8wYkwB6f2NT8QqQ&oe=668F258E",
      name: "John Doe",
      messages: [
        {
          type: "their",
          text: "Xin chào! Bạn khỏe không? Mình có một số câu hỏi về sản phẩm của bạn.",
          imgSrc: Logo,
        },
        {
          type: "my",
          text: "Chào bạn! Mình khỏe, cảm ơn bạn đã hỏi. Bạn cần hỏi về điều gì?",
        },
      ],
    },
    {
      id: 2,
      avatarSrc: avatar2,
      name: "Minh Hieu",
      messages: [
        {
          type: "their",
          text: "Mình muốn biết thêm về tính năng mới của sản phẩm. Bạn có thể giải thích chi tiết hơn không?",
          imgSrc: Logo,
        },
        {
          type: "my",
          text: "Chắc chắn rồi! Tính năng mới cho phép bạn tùy chỉnh giao diện người dùng một cách dễ dàng hơn và tích hợp với nhiều dịch vụ khác nhau.",
        },
        // Các tin nhắn khác
      ],
    },
    // Các phòng chat khác
  ];

  if (!roomName) {
    return (
      <div className="w-full lg:w-3/4 h-full border-r-2  flex flex-col ">
        <div className="flex-grow text-center flex items-center justify-center flex-col border-b-2 border-gray-200">
          <img src={Logo} className="w-32" alt="Logo" />
          <h1 className="text-sm">Send a message to start a conversation!</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-3/4 h-full border-r-2  flex flex-col ">
      <header className="flex flex-row justify-between items-center px-9 py-4 border-b-2">
        <div className="flex flex-row items-center gap-x-5">
          <img
            className="w-11 h-11 rounded-full"
            src={messages.avatarSrc}
            alt=""
          />
          <h1 className="font-medium">{messages.name}</h1>
        </div>
        <div className="flex flex-row items-center gap-x-8 text-gray-500">
          <Search className="hover:text-black" />
          <Info className="hover:text-black" />
        </div>
      </header>
      {/* MESSAGE CONTENT */}
      <div className="h-[78vh] flex-grow text-center flex flex-col-reverse overflow-y-auto scrollbar-custom ">
        <div className=" flex flex-col px-3 py-5 space-y-8">
          {messages.messages?.map((message, index) => (
            <div
              key={index}
              className={`flex items-end ${
                message.type === "my" ? "justify-end" : "justify-start"
              } gap-x-2`}
            >
              {message.type === "their" && (
                <img
                  src={messages.avatarSrc}
                  className="w-9 h-9 rounded-full order-1"
                  alt={messages.name}
                />
              )}
              <div
                className={`flex flex-col space-y-2 text-xs ${
                  message.type === "their"
                    ? "max-w-xs order-2 items-start"
                    : "items-end"
                }`}
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
          <label
            htmlFor="file-upload"
            className="flex justify-center items-center hover:text-primary cursor-pointer"
          >
            <Paperclip size={20} />
          </label>
          <input id="file-upload" type="file" className="hidden" />
          <input
            className="w-full px-3 border-none outline-none text-sm "
            type="text"
            placeholder="Ask a question..."
          />
          <button className="flex justify-center items-center  hover:text-primary cursor-pointer ">
            <SendHorizontal className=" " size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentChatBox;
