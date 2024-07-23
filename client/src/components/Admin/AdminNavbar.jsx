import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import avatar from "../../assets/images/Avatar/0_Mikel-Arteta.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFacebookMessenger } from "react-icons/fa";
import { onLogout } from "../../fetchData/User";
import { logout } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";

// Hàm hook để xử lý việc nhấn ra ngoài dropdown
function useOutsideClick(ref, onClose) {

  useEffect(() => {
    // Hàm xử lý sự kiện nhấn chuột
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }

    // Gắn sự kiện khi component được mount
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Gỡ sự kiện khi component được unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);
}



// Component Dropdown
const Dropdown = ({ button, children, classNames, animation }) => {
  
  // Tạo một ref để tham chiếu đến element của dropdown
  const wrapperRef = useRef(null);

  // State để quản lý việc mở/đóng dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Sử dụng hook để đóng dropdown khi nhấn ra ngoài
  useOutsideClick(wrapperRef, () => setIsOpen(false));

  return (
    <div ref={wrapperRef} className="relative flex">
      {/* Nút để mở/đóng dropdown */}
      <div className="flex" onMouseDown={() => setIsOpen(!isOpen)}>
        {button}
      </div>

      {/* Nội dung dropdown */}
      <div
        className={`${classNames} absolute z-10 ${animation ||
          "origin-top-right transition-all duration-300 ease-in-out"
          } ${isOpen ? "scale-100" : "scale-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

const Navbar = (props) => {

  const { onOpenSidenav, brandText } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLogout = () => {
    onLogout();
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };
  return (
    <nav className="top-0 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 md:px-24 px-0 pt-8 mx-0 lg:mx-12 mt-5 backdrop-blur-xl">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underlinee"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline "
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 ">
          <Link to="#" className="font-bold capitalize hover:text-navy-700">
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex items-center gap-x-10 rounded-full px-2 py-2">
        <span
          className="flex cursor-pointer text-xl text-gray-600 xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        {/* Profile & Dropdown */}
        <div
          className="cursor-pointer w-12 h-12 flex justify-center items-center relative "
          onClick={() => navigate("/admin/messageAdmin/1")}
        >
          <div className="w-[18px] h-[18px] rounded-full absolute  top-1 right-0 flex justify-center items-center text-xs font-semibold bg-primary z-20">
            2
          </div>
          <FaFacebookMessenger
            className=" transition-transform  duration-200 ease-in-out transform   hover:scale-110"
            size={24}
          />
        </div>
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full"
              src={avatar}
              alt="User Avatar"
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 ">
                    👋 Hey, Adela
                  </p>
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 " />

              <div className="flex flex-col p-4">
                <Link to='/profile' className="text-sm text-gray-800 hover:font-semibold cursor-pointer ">
                  Profile Settings
                </Link>
                {/* <a href=" " className="mt-3 text-sm text-gray-800">
                  Newsletter Settings
                </a> */}
                <div
                  onClick={handleLogout}
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500 hover:font-semibold transition duration-150 ease-out hover:ease-in cursor-pointer"
                >
                  Log Out
                </div>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
