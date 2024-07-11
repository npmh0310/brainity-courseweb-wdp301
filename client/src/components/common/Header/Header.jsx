import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import menuConfigs from "../../../configs/menu.configs.js";
import { Logo } from "../Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { CgMenuRight, CgClose } from "react-icons/cg";
import HeaderMobile from "./HeaderMobile.jsx";
import HeaderUser from "./HeaderUser.jsx";
import { useSelector } from "react-redux";

const Header = () => {
  const [bg, setBg] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [btnColor, setBtnColor] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  const user = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 0) {
        setBg(true);
        setBtnColor(true);
      } else {
        setBg(false);
        setBtnColor(false);
      }

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

// xử lý search

  return (
    <header
      className={`${bg ? "bg-[white] shadow-md shadow-bottom " : "bg-none"} ${
        scrollDirection === "up" ? "show-header" : "hidden-header"
      } fixed header left-0 w-full z-40 transition-all duration-200`}
    >
      <div className="flex items-center justify-around">
        <div className="flex items-center justify-between gap-x-10">
          <a href="/">
            <Logo />
          </a>
          <nav className="hidden px-10 md:flex">
            <ul className="flex md:gap-x-12">
              {menuConfigs.main.map((item, index) => (
                <li key={index}>
                  <Link
                    className="flex py-1 mx-2 relative nav-link capitalize text-base font-medium transition-all"
                    to={item.path}
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center justify-around gap-x-14  h-[76px]">
          <div className="items-center hidden lg:flex w-[450px] justify-end">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="w-[200px] h-[42px] border-2 border-gray-200 px-8 py-3 text-xs rounded-l-full focus:outline-none focus:border-blue-300 focus:w-[300px] focus:flex-grow transition-all"
              placeholder="Search anything..."
             
            />
            <Link
              to={`/searchpage?q=${encodeURIComponent(searchQuery)}`}
              className="w-12 h-[42px] border-2 border-gray-200 border-l-0 rounded-r-full flex items-center justify-center relative"
            >
              <FontAwesomeIcon
                className="text-third w-4 transition-transform duration-700 ease-in-out hover:scale-125"
                icon={faSearch}
              />
            </Link>
          </div>
          {user ? (
            <HeaderUser />
          ) : (
            <Link
              to="/signin"
              className={`${
                btnColor
                  ? "bg-primary hover:bg-[#03ecbe] text-white "
                  : "bg-grey-5 hover:bg-grey-1 text-second"
              } px-[40px] py-[9px] my-1 hover:transform-[scale3d(1.05,1.05,1.05)] text-sm font-semibold rounded-full backdrop-blur-md transition transform hover:scale-105 hidden md:flex`}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile navigation */}
        <div
          className={`${
            mobileNav ? " top-[64px]" : "bottom-full"
          } md:hidden h-[550px] fixed left-0 w-full max-w-full backdrop-blur-lg bg-white/60 transition-all shadow-lg border-t-[1px] custom-nav-mobile`}
        >
          <HeaderMobile />
        </div>
        {/* Mobile menu toggle */}
        <div
          onClick={() => setMobileNav(!mobileNav)}
          className="text-2xl bg-gray-500 w-8 h-8 m-1 flex justify-center items-center text-white rounded-full md:hidden lg:text-3xl cursor-pointer"
        >
          {mobileNav ? <CgClose /> : <CgMenuRight />}
        </div>
      </div>
    </header>
  );
};

export default Header;
