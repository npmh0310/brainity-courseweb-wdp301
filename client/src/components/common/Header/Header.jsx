import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import menuConfigs from "../../../configs/menu.configs.js";
import { Logo } from "../Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import { CgMenuRight, CgClose } from "react-icons/cg";
import HeaderMobile from "./HeaderMobile.jsx";
import HeaderUser from "./HeaderUser.jsx";

const Header = () => {
  const [bg, setBg] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [btnColor, setBtnColor] = useState(false);
  const [loginSuccess, setLogginSuccess] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBg(true);
        setBtnColor(true);
      } else {
        setBg(false);
        setBtnColor(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`${
        bg ? "bg-[white] shadow-md  shadow-bottom  py-3 lg:py-2" : "bg-none"
      }  fixed left-0 w-full py-3 lg:py-2 z-10 transition-all duration-200`}
    >
      <div className=" flex items-center justify-around">
        <div className="flex items-center justify-between gap-x-10 ">
          <a href="/">
            <Logo />
          </a>
          <nav className="hidden px-10 md:flex">
            <ul className="flex md:gap-x-12">
              {menuConfigs.main.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      className="flex py-1 mx-2 relative nav-link capitalize text-base font-medium transition-all "
                      href={item.path}
                    >
                      {item.display}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center justify-around gap-x-14 ">
          <div className=" items-center hidden lg:flex">
            <input
              type="text"
              className="w-[240px] h-[42px] border-2 border-gray-200 px-8  py-3 text-xs rounded-l-full  focus:outline-none"
              placeholder="search anything..."
            />
            <button className="w-12 h-[42px] border-2 border-gray-200 border-l-0 rounded-r-full relative">
              <FontAwesomeIcon
                className="text-third w-4 transition-transform duration-700
                00 ease-in-out hover:scale-125"
                icon={faSearch}
              />
            </button>
          </div>

          <HeaderUser />

          {/* <Link
            to="/signin"
            className={`${
              btnColor
                ? "bg-primary hover:bg-[#03ecbe] text-white "
                : "bg-grey-5 hover:bg-grey-1 text-second"
            }  
                                      px-[40px] py-[9px] my-1 hover:transform-[scale3d(1.05,1.05,1.05)] text-sm font-semibold  
                                      rounded-full  backdrop-blur-md transition  transform hover:scale-105 hidden md:flex`}
          >
            Login
          </Link> */}
        </div>

        {/* MOBILE */}
        <div
          className={`${
            mobileNav ? " top-[64px]" : "bottom-full"
          } md:hidden h-[550px] fixed left-0 w-full max-w-full backdrop-blur-lg bg-white/60 transition-all shadow-lg border-t-[1px] custom-nav-mobile `}
        >
          <HeaderMobile />
        </div>
        {/* MOBILE */}
        {/* menu icon*/}
        <div
          onClick={() => setMobileNav(!mobileNav)}
          className="text-2xl bg-gray-500 w-8 h-8 m-1 flex justify-center items-center text-white rounded-full md:hidden lg:text-3xl cursor-pointer"
        >
          {mobileNav ? <CgClose /> : <CgMenuRight />}
        </div>
        {/* menu icon*/}
      </div>
    </header>
  );
};

export default Header;
