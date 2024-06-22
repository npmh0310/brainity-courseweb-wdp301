import React from "react";
import { Link } from "react-router-dom";
import "./scrollbar.css";
import { useNavigate } from "react-router-dom";
const ModalNotification = ({ notifications }) => {
  const navigate = useNavigate();

  return (
    <div className=" mx-auto">
      <div className="px-3 mb-3">
        <header className="my-5">
          <span className="text-third font-secondary font-semibold">
            Notification
          </span>
        </header>
        <div className="flex flex-col gap-y-2 max-h-[60vh] scrollbar-custom overflow-y-auto ">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-row px-2 py-4 gap-x-4 bg-primary/15 rounded-md cursor-pointer "
              onClick={() => navigate(`/notification/${notification.id}`)}
            >
              <div className="w-[15%]">
                <img
                  className="rounded-full w-[90%] object-cover"
                  src={notification.avatar}
                  alt=""
                />
              </div>
              <div className="w-4/5 text-sm flex flex-col gap-y-2">
                <h1 className="">
                  New lesson{" "}
                  <span className="font-medium">{notification.message}</span>{" "}
                  has been added
                </h1>
                <span className="text-third">
                  <span>{notification.time}</span> ago
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" border border-t-2 hover:bg-gray-100">
        <Link className="block py-4 text-center text-sm">
          See all notification
        </Link>
      </div>
    </div>
  );
};

export default ModalNotification;
