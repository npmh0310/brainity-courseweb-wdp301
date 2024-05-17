import React, { useState } from "react";
import "./header.css";

import Avatar from "../../../assets/images/6298053d43cd1.jpg";

import { HiOutlineShoppingCart, HiOutlineBell } from "react-icons/hi";
// import UserMenu from "./UserMenu";
function HeaderUser() {
  const [showUserItem, setShowUserItem] = useState(false);

  return (
    <div className=" justify-around items-center gap-x-8 hidden px-3 md:flex">
      <div className=" items-center justify-between gap-x-8 hidden lg:flex">
        <div className="cursor-pointer flex justify-center items-center ">
          <HiOutlineBell className="text-lg " />
        </div>
        <div className="cursor-pointer flex items-center">
          <HiOutlineShoppingCart className="text-lg" />
        </div>
      </div>

      <div
        className="cursor-pointer"
        onClick={() => setShowUserItem(!showUserItem)}
      >
        <img className="w-8 h-8 min-w-8 rounded-full" src={Avatar} alt="" />
      </div>
      {/* {showUserItem && <UserMenu />} */}
    </div>
  );
}

export default HeaderUser;
