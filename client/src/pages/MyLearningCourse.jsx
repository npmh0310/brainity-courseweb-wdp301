import React from "react";
import learningImg from "../assets/images/wallpaperflare.com_wallpaper.jpg";
import avatar from "../assets/images/6298053d43cd1.jpg";
import html from "../assets/images/Product/html-css.jpg";
import javascript from "../assets/images/Product/js.jpg";

import { HiUserGroup } from "react-icons/hi";
import { HiCursorClick } from "react-icons/hi";
import { Link } from "react-router-dom";
const MyLearningCourse = () => {
  const courseList = {
    courses: [
      {
        image: html,
        name: "HTML vs CSS basic",
        description:
          "In this course, we will work together to build the interface of two websites, The Band & Shopee.",
      },
      {
        image: javascript,
        name: "Java script basic",
        description:
          "In this course, we will work together to build the interface of two websites, The Band & Shopee.",
      },
    ],
  };
  return (
    <div className="mb-20">
      <div className="container w-full mx-auto">
        <div
          className="relative h-80 rounded-b-3xl"
          style={{
            backgroundImage: `url(${learningImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute top-56 left-24 flex items-end">
            <div className="rounded-full p-2 bg-white">
              <img className="rounded-full w-40" src={avatar} alt="" />
            </div>
            <div className="mb-8 ml-5">
              <h1 className="text-3xl font-semibold">Nguyen Phuoc Minh Hieu</h1>
            </div>
          </div>
        </div>
        <div className="flex mt-32 justify-between container mx-auto">
          {/* Left */}
          <div className="flex w-[41%] gap-y-4 flex-col">
            <div
              className="flex flex-col gap-y-4 rounded-lg px-6 py-5 w-full"
              style={{
                boxShadow: "0 0 5px 0 rgba(0,0,0,.1),0 0 1px 0 rgba(0,0,0,.1)",
              }}
            >
              <h2 className="text-lg font-medium">Introduce</h2>
              <div className="flex items-center gap-x-3">
                <HiUserGroup className="text-xl mb-1 text-gray-600" />
                <span className="text-sm">
                  Brainity member since{" "}
                  <span className="font-medium">2 years ago</span>
                </span>
              </div>
            </div>
            <div
              className="flex flex-col gap-y-4 rounded-lg px-6 py-5 w-full"
              style={{
                boxShadow: "0 0 5px 0 rgba(0,0,0,.1),0 0 1px 0 rgba(0,0,0,.1)",
              }}
            >
              <h2 className="text-lg font-medium">Recent activity</h2>
              <div className="flex items-center gap-x-3">
                <HiCursorClick className="text-xl mb-1 text-gray-600" />
                <span className="text-sm">No recent activity</span>
              </div>
            </div>
          </div>
          {/* Left */}
          {/* Right */}

          <div className="flex w-[57%]">
            <div
              className="flex w-full flex-col gap-y-7 rounded-lg px-6 py-5"
              style={{
                boxShadow: "0 0 5px 0 rgba(0,0,0,.1),0 0 1px 0 rgba(0,0,0,.1)",
              }}
            >
              <h1 className="text-lg font-medium">Courses attended</h1>
              {courseList.courses.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-x-10 mx-3 pb-7 border-b-[1px] border-b-gray-300 last:border-none last:pb-0 "
                >
                  <Link className="w-[90%]" to={"/"}>
                    <img
                      className="rounded-lg w-full"
                      src={item.image}
                      alt=""
                    />
                  </Link>
                  <div>
                    <h2 className=" font-medium">
                      <Link to={"/"}>{item.name}</Link>
                    </h2>
                    <span className="text-sm">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
        </div>
      </div>
    </div>
  );
};

export default MyLearningCourse;
