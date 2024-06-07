import React, { useState } from "react";
import { Logo } from "../../common/Logo";
import { Menu, X } from "lucide-react";
import avatarTeacher from "../../../assets/images/Avatar/0_Mikel-Arteta.jpg";
import ImgLogin from "../../../assets/images/logo_noBg.png";
const HeaderTeacher = ({ hiddenSidebar, handleSidebar }) => {
  return (
    <div className="flex justify-around md:justify-between items-center border-b-[1px] h-[84px]">
      <div
        className={`${
          hiddenSidebar ? "justify-start" : "justify-around"
        } flex flex-row gap-x-3 items-center md:w-1/3 lg:w-1/5 h-full `}
      >
        <div
          className={`${
            hiddenSidebar ? "hidden" : "flex"
          }   items-center transition-all `}
        >
          <img
            src={ImgLogin}
            className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
            alt="Brainity Logo"
          />
          <h1 className="text-xl lg:text-2xl text-third font-logoTitle font-semibold">
            Brainity
          </h1>
        </div>

        <div
          className={`${
            hiddenSidebar ? "mx-6" : "mx-0"
          } text-2xl  w-8 h-8 m-1 flex justify-center items-center text-third rounded-full cursor-pointer transition`}
          onClick={() => handleSidebar()}
        >
          {hiddenSidebar ? <X /> : <Menu />}
        </div>
      </div>
      <div className="w-1/5 flex justify-center">
        <img className="w-10 rounded-full" src={avatarTeacher} alt="" />
      </div>
    </div>
  );
};

export default HeaderTeacher;
