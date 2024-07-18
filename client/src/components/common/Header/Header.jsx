import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";
import menuConfigs from "../../../configs/menu.configs.js";
import { Logo } from "../Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { CgMenuRight, CgClose } from "react-icons/cg";
import HeaderMobile from "./HeaderMobile.jsx";
import HeaderUser from "./HeaderUser.jsx";
import { useSelector } from "react-redux";
import { getCourseBySearch } from "../../../fetchData/Course.js";
import ModalSearch from "./ModalSearch.jsx";
import { useDebounce } from "use-debounce";
import { Search, CircleX } from "lucide-react";
import { CircularProgress } from "@mui/material";
const Header = () => {
  const [bg, setBg] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [btnColor, setBtnColor] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  // const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

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

  // xử lý search
  const [inputSearch, setInputSearch] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [debouncedSearchTerm] = useDebounce(inputSearch, 300);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const inputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleSearch = (e) => setInputSearch(e.target.value);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        inputRef.current.blur(); // xử lý khi out focus
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const response = await getCourseBySearch(debouncedSearchTerm);
        setSearchResults(response.data.data);
      } catch (error) {
        console.error("khong tim thay", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    inputRef.current.blur();
    setInputSearch("");
  }, [location]);

  return (
    <header
      className={`${bg ? "bg-[white] shadow-md shadow-bottom " : "bg-none"} ${
        scrollDirection === "up" ? "show-header" : "hidden-header"
      } fixed header left-0 w-full z-50 transition-all duration-200`}
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
          <div className=" hidden relative lg:flex flex-col justify-end">
            <div className="relative">
              <div className="items-center hidden lg:flex w-[450px] justify-end">
                <input
                  type="text"
                  ref={inputRef}
                  value={inputSearch}
                  onChange={handleSearch}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className="w-[200px] h-[42px] border-2 border-gray-200 px-8 py-3 text-xs rounded-l-full focus:outline-none  focus:border-blue-300 focus:w-[300px] focus:flex-grow transition-all"
                  placeholder="Search anything..."
                />
                <Link
                  to={`/searchpage?query=${encodeURIComponent(inputSearch)}`}
                  className="w-12 h-[42px] border-2 border-gray-200 border-l-0 rounded-r-full flex items-center justify-center relative"
                >
                  <FontAwesomeIcon
                    className="text-third w-4 transition-transform duration-700 ease-in-out hover:scale-125"
                    icon={faSearch}
                  />
                </Link>{" "}
                {inputSearch && (
                  <div
                    className="absolute right-16 text-gray-500 cursor-pointer"
                    onClick={() => setInputSearch("")}
                  >
                    <CircleX size={16} />
                  </div>
                )}
              </div>
              {isInputFocused && (
                <div
                  onMouseDown={(e) => e.preventDefault()}
                  className="absolute  right-[47px] transition-all duration-300 w-[400px] mt-2 rounded-xl  bg-white"
                >
                  {isSearching ? (
                    <div className="flex flex-row gap-x-5 justify-center items-center rounded-xl py-4 border ">
                      <CircularProgress size={26} />
                      <span className="text-sm">searching...</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <ModalSearch searchResults={searchResults} />
                  ) : (
                    inputSearch &&
                    searchResults.length === 0 && (
                      <div className="py-5 px-5 flex flex-row items-center gap-x-5 text-gray-600 border rounded-xl">
                        <Search className="text-gray-800" size={18} />
                        <span className="text-sm truncate ">
                          No result "{inputSearch}"
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
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
