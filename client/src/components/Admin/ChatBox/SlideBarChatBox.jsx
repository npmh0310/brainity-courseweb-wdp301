import React, { useState } from "react";
import avatar from "../../../assets/images/Avatar/0_Mikel-Arteta.jpg";
import avatar2 from "../../../assets/images/Avatar/CGakpo2023.jpg";

import { Search, Settings } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const SlideBarChatBox = () => {
  const navigate = useNavigate();
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const { roomId } = useParams();
  
  const messages = [
    {
      id: 1,
      avatarSrc:
        "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-1/274961617_1031354217755700_9193705406630906752_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=UYqoziiUPaIQ7kNvgHAzk8W&_nc_ht=scontent.fdad3-6.fna&oh=00_AYAHun75S1iUv6auh-p1rAzPdUs5YCY8wYkwB6f2NT8QqQ&oe=668F258E",
      name: "John Doe",
      timestamp: "3 hours ago",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      unreadCount: 0,
      read: true,
    },
    {
      id: 2,
      avatarSrc: avatar2,
      name: "Minh Hieu",
      timestamp: "12 hours ago",
      content:
        "Xin chào tôi là Nguyễn Phước Minh Hiếu, một câu văn dài để kiểm tra hiệu ứng cắt văn bản với dấu ba chấm khi nó vượt quá chiều rộng của phần tử.",
      unreadCount: 1,
      read: false,
    },
    {
      id: 3,
      avatarSrc:
        "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/448018127_1002026374628798_3622888256421732204_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=fJ9HN8VrA-QQ7kNvgHF1R70&_nc_ht=scontent.fdad3-6.fna&oh=00_AYANZ4ARaVF0P8WdrIYARiultOPxrzFY5wrJ0qsGR_d29w&oe=668F4A9F",
      name: "Alice",
      timestamp: "1 day ago",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      unreadCount: 3,
      read: false,
    },
    {
      id: 4,
      avatarSrc:
        "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/435707687_274298929085192_2309877864598837562_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=HGiAReKwRmYQ7kNvgH9sGlj&_nc_ht=scontent.fdad3-6.fna&oh=00_AYAolxoQydUsT2fFZD5ZI-ghl8i5h2jk6uQV0cfCtKEPuQ&oe=668F26E6",
      name: "Bob",
      timestamp: "2 days ago",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      unreadCount: 0,
      read: true,
    },
  ];

  const handleRoomIdClick = (messageId) => {
    navigate(`/admin/messageAdmin/${messageId}`);
  };
  return (
    <div className="lg:w-1/4 w-24 h-full  pt-7 bg-gray-50 border-x-2 flex flex-col gap-y-6">
      <div className="flex flex-row items-center justify-center lg:justify-start gap-x-3 lg:px-6">
        <img
          className="w-11 h-11 rounded-full object-cover "
          src={avatar}
          alt=""
        />
        <div className="hidden lg:flex flex-col truncate">
          <h1 className="text-primary font-semibold ">Admin 1</h1>
          <h4 className="text-xs text-gray-500 ">admin123@gmail.com</h4>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-2 relative px-3">
        <input
          className="hidden lg:flex border-spacing-1 border rounded-3xl w-full pl-8 py-2 text-xs"
          type="text"
        />
        <Search className=" lg:absolute top-2 left-5 text-gray-400" size={17} />
      </div>
      <div className="flex h-[66vh] flex-grow flex-col gap-y-4">
        <div className="hidden lg:flex flex-row items-center justify-between pl-5 pr-3 text-sm">
          <h1 className="">All Message</h1>
          <button className="relative flex items-center justify-center p-2">
            <span className="bg-gray-200 rounded-full absolute inset-0 z-0"></span>
            <Settings size={16} className="relative z-10 text-gray-600" />
          </button>
        </div>
        <div className="flex flex-col  flex-grow  scrollbar-custom overflow-y-auto">
          <div className=" flex flex-col  px-1  gap-y-1">
            {messages.map((message) => (
              <div
                onClick={() => {
                  handleRoomIdClick(message.id);
                  setSelectedRoomId(message.id);
                }}
                key={message.id}
                className={`flex flex-row lg:justify-center px-3 py-3 gap-x-3 rounded-md cursor-pointer ${
                  parseInt(roomId) === message.id
                    ? "bg-gray-200 "
                    : "hover:bg-primary/20 "
                }`}
              >
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={message.avatarSrc}
                  alt=""
                />
                <div className="w-4/5 hidden lg:flex flex-col flex-grow gap-y-[6px] pr-1">
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-medium">{message.name}</h1>
                    <h1 className="text-xs text-gray-400">
                      {message.timestamp}
                    </h1>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h1
                      className={`text-gray-500 text-xs truncate w-4/5 ${
                        !message.read ? "font-semibold text-gray-900" : ""
                      }`}
                    >
                      {message.content}
                    </h1>
                    {message.unreadCount > 0 && (
                      <span className="w-4 h-4 text-[10px] bg-primary/70 rounded-full flex justify-center items-center">
                        {message.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideBarChatBox;
