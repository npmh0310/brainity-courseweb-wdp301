import React, { useState } from "react";
import "./header.css";
import Avatar from "../../../assets/images/6298053d43cd1.jpg";
import { HiOutlineShoppingCart, HiOutlineBell } from "react-icons/hi";
import Popover from "@mui/material/Popover";
import { Link, useNavigate } from "react-router-dom";
// import UserMenu from "./UserMenu";
function HeaderUser() {
  const [showUserItem, setShowUserItem] = useState(false);

  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [bellAnchorEl, setBellAnchorEl] = useState(null);
  const handleUserClick = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserClose = () => {
    setUserAnchorEl(null);
  };

  const handleBellClick = (event) => {
    setBellAnchorEl(event.currentTarget);
  };

  const handleBellClose = () => {
    setBellAnchorEl(null);
  };
  const open = Boolean(userAnchorEl);
  const bellOpen = Boolean(bellAnchorEl);

  return (
    <div className=" justify-around items-center gap-x-6 hidden px-3 md:flex">
      <div className=" items-center justify-between gap-x-8 hidden lg:flex">
        <div
          className="cursor-pointer w-8 h-8 flex justify-center items-center "
          onClick={handleBellClick}
        >
          <HiOutlineBell className="text-xl " />
        </div>
        <Popover
          style={{ marginTop: "12px", marginLeft: "22px" }}
          open={bellOpen}
          anchorEl={bellAnchorEl}
          onClose={handleBellClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {/* Content for the bell icon popover */}
          <div className="p-4">
         Từ từ chưa biết phần ni
          </div>
        </Popover>
        <div className="cursor-pointer w-8 h-8 flex items-center">
          <HiOutlineShoppingCart className="text-xl" />
        </div>
      </div>

      <button variant="contained" onClick={handleUserClick}>
        <div onClick={() => setShowUserItem(!showUserItem)}>
          <img className="w-8 h-8 min-w-8 rounded-full" src={Avatar} alt="" />
        </div>
      </button>
      <Popover
        style={{ marginTop: "12px", marginLeft: "20px" }}
        open={open}
        anchorEl={userAnchorEl}
        onClose={handleUserClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className=" px-9 pt-6 pb-2  in-w-40 w-72">
          <div className="flex flex-row items-center pb-4 gap-4 ">
            <img className="w-11 h-11 rounded-full" src={Avatar} alt="" />
            <h1>Nguyen Phuoc Minh Hieu</h1>
          </div>
          <hr className="mb-2" />
          <div className="text-gray-600">
            <ul className="text-sm">
              <li className="hover:text-black mb-2">
                <Link className="block py-2" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
            <hr className="my-2" />

            <ul className="text-sm">
              <li className="hover:text-black mb-4">
                <Link to="/" className="block py-2">
                  Write Blog
                </Link>
              </li>
              <li className="hover:text-black mb-4">
                <Link to="/" className="block py-2">
                  My Blog
                </Link>
              </li>
            </ul>
            <hr className="my-2" />
            <ul className="text-sm">
              <li className="hover:text-black mb-2">
                <Link to="/" className="block py-2">
                  Saved Blogs
                </Link>
              </li>
            </ul>
            <hr className="my-2" />
            <ul className="text-sm">
              <li className="hover:text-black mb-2">
                <Link to="/logout" className="block py-2">
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Popover>
      {/* {showUserItem && <UserMenu />} */}
    </div>
  );
}

export default HeaderUser;
