import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { User, Shield, FolderHeart, Handshake } from "lucide-react";
import { Link as Link2 } from "lucide-react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import axios from "axios";
import { updateUserProfile } from "../../../fetchData/User";

const SidebarProfileUser = () => {
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation(); //save location hiện tại
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = React.useRef(null);
  const [userData, setUserData] = useState({});
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
    {
      display: "Request to teacher",
      path: "/profile/request-to-teacher",
      key: "request-to-teacher",
      icon: <Handshake />,
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
  const user = useSelector((state) => state.auth.user);

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const preset_key = "hbmfnkks";
    // setSelectedFile(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/doydh7dtj/image/upload",
      formData
    );
    if (res && res.status === 200) {

      const linkImg = {
        avatar: res.data.secure_url,
      };
      console.log(linkImg);
      const resUpdate = await updateUserProfile(user._id, linkImg);
     
      if (resUpdate && resUpdate.status === 200) {
        toast.success("Updated success");
       
      } else {
        toast.error("Something wrong");
      }
    } else {
      toast.error("Please select the image file");
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className=" w-full md:w-[30%] max-h-[640px] bg-white mt-8 border pb-10 border-gray-200 rounded-md">
      <div className="pt-10 pb-8 border-b-[1px] ">
        <h1 className="text-4xl uppercase font-logoTitle font-semibold text-center text-third">
          My profile
        </h1>
        <div className="flex flex-col items-center gap-y-4 mt-8">
          <div className="relative">
            <img
              className="rounded-full w-[140px] h-[140px]"
              src={user.avatar}
              alt=""
            />
            <input
              type="file"
              id="profileImageUpload"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileInputChange}
            />
            <FontAwesomeIcon
              onClick={handleFileInputClick}
              className="absolute bottom-0 right-2 p-2 bg-gray-600 text-white rounded-full cursor-pointer"
              icon={faCamera}
            />
          </div>
          <h2 className="text-lg font-medium text-center">{user.username}</h2>
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
              className="flex justify-center items-center py-3 gap-x-3 "
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
