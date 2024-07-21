import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./scrollbar.css";
import imgSystem from "../../../assets/images/logo11.jpg";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { markOneNotiAsRead } from "../../../fetchData/Notification";
import {useNotifications} from "../Notification/useNotifications";

const ModalNotification = () => {
  const { notifications, setNotifications, setUnreadCount } =
    useNotifications();
  const navigate = useNavigate();

  const handleRead = (notification) => {
    if (!notification.read) {
      markOneNotiAsRead(notification._id)
        .then(() => {
          setNotifications((prevNotifications) =>
            prevNotifications.map((noti) =>
              noti._id === notification._id ? { ...noti, read: true } : noti
            )
          );
          setUnreadCount((prevUnreadCount) => prevUnreadCount - 1);
        })
        .catch((error) => {
          console.error("Error marking notification as read:", error);
        });
    }

    navigate(`${notification.notification.link}`);
  };

  return (
    <div className=" mx-auto">
      <div className="px-3 mb-3">
        <header className="my-3">
          <span className="text-third font-secondary font-semibold">
            Notification
          </span>
        </header>
        <div className="flex flex-col gap-y-2 max-h-[60vh] scrollbar-custom pr-1 overflow-y-auto ">
          {notifications.length === 0 && (
            <div className="my-3 ">
              <h1 className="text-center">No notifications</h1>
            </div>
          )}
          {notifications.map((notification) => {
            const timeAgo = moment(notification.updatedAt).fromNow();
            return (
              <div
                key={notification._id}
                className={`flex flex-row px-2 py-4 gap-x-4 ${
                  notification.read ? "hover:bg-gray-200" : "bg-primary/15"
                } rounded-md cursor-pointer relative`}
                onClick={() => handleRead(notification)}
              >
                <div className="w-[15%]">
                  <img
                    className="rounded-full w-[90%] object-cover"
                    src={notification.notification.image}
                    alt=""
                  />
                </div>
                <div className="w-4/5 text-sm flex flex-col gap-y-2">
                  {(notification.notification.type === "profile" ||
                    notification.notification.type === "system") && (
                    <div>
                      <span className="font-medium">
                        {notification.notification.name}
                      </span>{" "}
                      <span>{notification.notification.message}</span>
                    </div>
                  )}
                  {(notification.notification.type === "blog" ||
                    notification.notification.type === "course") && (
                    <div>
                      <span>{notification.notification.message}</span>{" "}
                      <span className="font-medium">
                        {notification.notification.name}
                      </span>
                    </div>
                  )}
                  <span className="text-third text-xs">{timeAgo}</span>
                </div>
                {!notification.read && (
                  <div className="absolute w-2 h-2 rounded-full bg-primary right-3 top-1/2 transform -translate-y-1/2"></div>
                )}
              </div>
            );
          })}
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
