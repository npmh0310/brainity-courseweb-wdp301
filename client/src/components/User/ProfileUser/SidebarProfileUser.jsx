import React, { useEffect, useState } from "react";
import Avatar from "../../../assets/images/6298053d43cd1.jpg";
import { Link, useLocation } from "react-router-dom";
import { User, Shield, FolderHeart } from "lucide-react";
import { Link as Link2 } from "lucide-react";
const SidebarProfileUser = () => {
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation(); //save location hiện tại

  const handleActiveItem = (item) => {
    setActiveItem(item);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const profileItem = [
    {
      display: "Information profile",
      path: "/profile/informationuser",
      key: "information",
      icon: <User />,
    },
    {
      display: " Favorite courses",
      path: "/profile/favoritecourses",
      key: "favorite",
      icon: <FolderHeart />,
    },
    {
      display: " Security and login",
      path: "/profile/security",
      key: "security",
      icon: <Shield />,
    },
  ];
  // xử lý lưu lại location khi load và dùng vào active
  useEffect(() => {
    const currentItem = profileItem.find(
      (item) => item.path === location.pathname
    );
    if (currentItem) {
      setActiveItem(currentItem.key);
    }
  }, [location.pathname, profileItem]);

  return (
    <div className=" w-full md:w-[30%] h-[560px] bg-white mt-8 border pb-10 border-gray-200 rounded-md">
      <div className="pt-10 pb-8 border-b-[1px] ">
        <h1 className="text-4xl uppercase font-logoTitle font-semibold text-center text-third">
          My profile
        </h1>
        <div className="flex flex-col items-center gap-y-4 mt-8">
          <img className="rounded-full" src={Avatar} alt="" />
          <h2 className="text-lg font-medium text-center">
            Nguyen Phuoc Minh Hieu
          </h2>
          <button className="border flex items-center gap-x-3  border-third px-5 py-3 rounded-md text-third text-[13px]">
            {" "}
            {<Link2 size={18} />} Share profile link
          </button>
        </div>
      </div>
      <ul className=" text-sm text-center mt-7 ">
        {profileItem.map((item, index) => (
          <li
            key={index}
            className={` text-third font-medium  ${
              activeItem === item.key ? "bg-third bg-opacity-10" : ""
            } hover:bg-third hover:bg-opacity-10 `}
            onClick={() => handleActiveItem(item.key)}
          >
            <Link
              className="flex justify-center items-center  py-3 gap-x-3 "
              to={item.path}
            >
              <span className="text-primary"> {item.icon}</span> {item.display}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarProfileUser;
