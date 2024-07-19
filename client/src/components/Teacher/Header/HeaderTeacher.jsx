import React, { useEffect, useState } from "react";
import { Logo } from "../../common/Logo";
import { Menu, X } from "lucide-react";
import avatarTeacher from "../../../assets/images/Avatar/0_Mikel-Arteta.jpg";
import ImgLogin from "../../../assets/images/logo_noBg.png";
import { useSelector } from "react-redux";
import Popover from "@mui/material/Popover";
import { Link, useNavigate } from "react-router-dom";

const HeaderTeacher = ({ hiddenSidebar, handleSidebar }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate  = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        handleClose();
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex justify-around md:justify-between items-center border-b-[1px] h-[84px]">
      <div
        className={`${
          hiddenSidebar ? "justify-start" : "justify-around"
        } flex flex-row gap-x-3 items-center md:w-1/3 lg:w-1/5 h-full `}
      >
        <div
          onClick={() => navigate('/')}
          className={`${
            hiddenSidebar ? "hidden" : "flex"
          }   items-center transition-all cursor-pointer `}
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
            hiddenSidebar ? "flex" : "hidden"
          }   items-center transition-all px-5`}
        >
          <img
            src={ImgLogin}
            className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
            alt="Brainity Logo"
          />
        </div>

        <div
          className={`${
            hiddenSidebar ? "mx-0" : "mx-0"
          } text-2xl  w-8 h-8 m-1 flex justify-center items-center text-third rounded-full cursor-pointer transition`}
          onClick={() => handleSidebar()}
        >
          {hiddenSidebar ? <X /> : <Menu />}
        </div>
      </div>
      <div className="w-1/5 flex justify-center ">
        <img
          className="w-10 h-10 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110 hover:opacity-80"
          src={user.avatar}
          alt=""
          onClick={handleClick}
        />
        <Popover
          style={{
            marginTop: "12px",
            marginLeft: "22px",
          }}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            style: {
              width: "236px",
              boxShadow:
                "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
              border: "1px solid #e2e8f0",
            },
          }}
        >
          <div>
            <div
              className="flex flex-col justify-center 
              "
            >
              <div className="flex flex-row items-center px-4 py-4 border-b-[1px] border-gray-200">
                <div className="w-1/5">
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="rounded-full w-full h-auto"
                  />
                </div>
                <div className="w-4/5 pl-4">
                  <h1 className="font-secondary font-semibold text-third text-lg">
                    {user.username}
                  </h1>
                  <h1 className="text-xs font-semibold text-gray-500">
                    {user.email}
                  </h1>
                </div>
              </div>
              <div className="mx-3 my-2">
                <ul className="font-secondary text-sm flex flex-col gap-y-2 ">
                  <li className="hover:text-third hover:bg-primary/20 px-2 rounded-md">
                    <Link className="block py-2">My course</Link>
                  </li>
                  <li className="hover:text-third hover:bg-primary/20 px-2 rounded-md">
                    <Link className="block py-2">My profile</Link>
                  </li>
                  <li className="hover:text-third hover:bg-primary/20 px-2 rounded-md">
                    <Link className="block py-2">Setting</Link>
                  </li>
                  <li className="hover:text-third hover:bg-primary/20 px-2 rounded-md">
                    <Link className="block py-2">Sign out</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default HeaderTeacher;
