import React, { useState } from "react";
import SlideBarChatBox from "../../components/Admin/ChatBox/SlideBarChatBox";
import ContentChatBox from "../../components/Admin/ChatBox/ContentChatBox";
import { Logo } from "../../components/common/Logo";
import avatar from "../../assets/images/Avatar/0_Mikel-Arteta.jpg";
const ChatBoxAdmin = () => {
 
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
      <SlideBarChatBox  />
      <ContentChatBox  />
      </div>
    </div>
  );
};

export default ChatBoxAdmin;
