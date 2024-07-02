import React from "react";
import { Link } from "react-router-dom";
import "./scrollbar.css";
import imgSystem from "../../../assets/images/logo11.jpg";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const ModalNotification = ({ notifications }) => {
  const navigate = useNavigate();

  // const notificationConfig = {
  //   passwordChangeNotification: {
  //     imgSrc:
  //       "https://media.istockphoto.com/id/1416937202/vector/settings-or-gear-icon-cog-setting-vector-illustration.jpg?s=612x612&w=0&k=20&c=3vVNW4ssuNPwKUMT5HSMEbUlknZmp5FeEBF1eZTzJYA=",
  //     getMessage: (message) => (
  //       <h1 className="">
  //         Your password <span className="font-medium">{message}</span>
  //       </h1>
  //     ),
  //   },
  //   system: {
  //     imgSrc: imgSystem,
  //     getMessage: (message) => (
  //       <h1 className="">
  //         <span className="font-semibold text-third">Brainity:</span>{" "}
  //         <span className=" ">{message}</span>
  //       </h1>
  //     ),
  //   },
  //   lessonAdded: {
  //     imgSrc: "https://example.com/lesson_added.png",
  //     getMessage: (message) => (
  //       <h1 className="">
  //         New lesson <span className="font-medium">{message}</span> has been
  //         added
  //       </h1>
  //     ),
  //   },
  // };

  return (
    <div className=" mx-auto">
      <div className="px-3 mb-3">
        <header className="my-5">
          <span className="text-third font-secondary font-semibold">
            Notification
          </span>
        </header>
        <div className="flex flex-col gap-y-2 max-h-[60vh] scrollbar-custom pr-1 overflow-y-auto ">
          {notifications.map((notification) => {
            const timeAgo = moment(notification.updatedAt).fromNow();

            return (
              <div
                key={notification._id}
                className="flex flex-row px-2 py-4 gap-x-4 bg-primary/15 rounded-md cursor-pointer "
                onClick={() => navigate(`/notification/${notification._id}`)}
              >
                <div className="w-[15%]">
                  <img
                    className="rounded-full w-[90%] object-cover"
                    src={notification.image}
                    alt=""
                  />
                </div>
                <div className="w-4/5 text-sm flex flex-col gap-y-2">
                  <span>{notification.message}</span>
                  <span className="text-third text-xs">{timeAgo}</span>
                </div>
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
