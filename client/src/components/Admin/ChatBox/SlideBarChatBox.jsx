import React, { useEffect, useState } from "react";
import avatar from "../../../assets/images/Avatar/0_Mikel-Arteta.jpg";
import avatar2 from "../../../assets/images/Avatar/CGakpo2023.jpg";
import { initializeWebSocket, getWebSocket, disconnectWebSocket } from "../../../utils/websocketManager";
import moment from 'moment';

import { Search, Settings } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { markAllFromRoomAsRead } from "../../../fetchData/Message";

const SlideBarChatBox = ({previewMessages, renewPreviewMessage}) => {
  const socket = initializeWebSocket() || getWebSocket();
  const navigate = useNavigate();
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const { roomId } = useParams();
  const user = useSelector((state) => state.auth.user);

  
    // ? handle click load message by room, and set curr room.
  const handleRoomIdClick = (roomName) => {
    markAllFromRoomAsRead(roomName).then((response) => {
      renewPreviewMessage();
      navigate(`/admin/messageAdmin/${roomName}`);
      console.log("come")
    });

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
          <h1 className="text-primary font-semibold ">{user.username}</h1>
          <h4 className="text-xs text-gray-500 ">{user.email}</h4>
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
            {previewMessages.map((message) => (
              <div
                onClick={() => {
                  handleRoomIdClick(message.chatRoom);
                  setSelectedRoomId(message.chatRoom);
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
                    <h1 className="font-medium">{message.otherUserUsername}</h1>
                    <h1 className="text-xs text-gray-400">
                      {moment(message.createdAt).fromNow()}
                    </h1>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h1
                      className={`text-gray-500 text-xs truncate w-4/5 ${
                        message.unreadCount > 0 ? "font-semibold text-gray-900" : ""
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
