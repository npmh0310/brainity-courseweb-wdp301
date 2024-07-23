import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { User, Shield, FolderHeart, Handshake } from "lucide-react";
import { Link as Link2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import axios from "axios";
import { updateAvatar, updateUserProfile } from "../../../fetchData/User";
import { validateToken } from "../../../redux/features/authSlice";

const SidebarProfileUser = () => {
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation(); //save location hiện tại
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = React.useRef(null);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
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
    setPendingImg(true);
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/doydh7dtj/image/upload",
      formData
    );
    if (res && res.status === 200) {
      const linkImg = {
        avatar: res.data.secure_url,
      };
      const resUpdate = await updateAvatar(linkImg);

      if (resUpdate && resUpdate.status === 200) {
        dispatch(validateToken());
        toast.success("Updated success");
        setPendingImg(false);
      } else {
        toast.error("Something wrong");
        setPendingImg(false);
      }
    } else {
      toast.error("Please select the image file");
      setPendingImg(false);
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // loading img
  const [pendingImg, setPendingImg] = useState(false);
  return (
    <div className=" w-full md:w-[30%] max-h-[640px] bg-white mt-8 border pb-10 border-gray-200 rounded-md">
      <div className="pt-10 pb-8 border-b-[1px] ">
        <h1 className="text-4xl uppercase font-logoTitle font-semibold text-center text-third">
          My profile
        </h1>
        <div className="flex flex-col items-center gap-y-4 mt-8">
          <div className="relative">
            {" "}
            <img
              className={`rounded-full w-[140px] h-[140px] ${
                pendingImg && "opacity-20"
              }`}
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
            {pendingImg && (
              <div
                role="status"
                className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
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
