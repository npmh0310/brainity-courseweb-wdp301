import React, { useState } from "react";
import html from "../../assets/images/Product/html-css.jpg";
import javascript from "../../assets/images/Product/js.jpg";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFilled } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-solid-svg-icons";
import Rating from "@mui/material/Rating";
const FavoriteCourses = () => {
  const [favorite, setFavorite] = useState({});
  const handleFavorite = (courseId) => {
    setFavorite((prevFavorite) => ({
      ...prevFavorite, // prevFavorite là trạng thái trc đó của favorites
      [courseId]: !prevFavorite[courseId], // ghi đè lên mảng cũ = mảng mới với giá trị đc thay đổi  (example: 2: false => 2: !false => 2: true)
    }));
  };

  const courseList = {
    courses: [
      {
        id: 1,
        image: html,
        name: "HTML vs CSS basic",
        description:
          "In this course, we will work together to build the interface of two websites, The Band & Shopee.",
        price: 340000,
        teacher: "John Wick",
        rating: 3,
        student: 2450,
      },
      {
        id: 2,
        image: javascript,
        name: "Java script basic",
        description:
          "In this course, we will work together to build the interface of two websites, The Band & Shopee.",
        price: 450000,
        teacher: "Eazy Bytes",
        rating: 4.5,
        student: 6420,
      },
    ],
  };

  return (
    <div className="w-full md:w-[65%]  bg-white mt-8  border py-8 px-8 border-gray-200 rounded-md">
      <h1 className="text-2xl uppercase font-bold border-b-[1px] border-b-gray-200 pb-6 text-third text-center italic ">
        Favorites courses
      </h1>
      <div className="flex flex-col justify-center items-center my-5 gap-y-7">
        {courseList.courses.map((item, index) => (
          <div
            key={index}
            className="relative w-full mx-3 py-4 px-4 border border-gray-200 rounded-lg  hover:ring-1 hover:ring-primary"
          >
            <button
              className="absolute border border-red-400 flex justify-center items-center p-[6px] rounded-full top-4 right-5 z-30"
              onClick={() => handleFavorite(item.id)}
            >
              {favorite[item.id] ? (
                <FontAwesomeIcon
                  className="text-red-500 text-sm"
                  icon={faHeartFilled}
                />
              ) : (
                <FontAwesomeIcon
                  className="text-red-500 text-sm"
                  icon={faHeartOutline}
                />
              )}
            </button>
            <div className="flex flex-col gap-y-3 md:flex-row gap-x-10 pt-4 justify-center items-center w-full relative">
              <Link
                className="absolute top-0 bottom-0 left-0 right-0 z-20"
                to={"/"}
              ></Link>
              <div className="w-[55%] pt-3 md:pt-0 md:w-2/5 flex justify-center relative">
                <img className="w-full " src={item.image} alt="" />
              </div>
              <div className="flex w-full items-center text-center md:items-start md:text-left flex-col gap-y-2 md:w-3/5  ">
                <h2 className=" font-semibold  text-lg text-third ">
                  {item.name}
                </h2>
                <span className="text-sm italic">{item.description}</span>

                <span className="text-xs text-gray-600">{item.teacher}</span>
                <div className="flex flex-row items-center gap-x-1">
                  <span className="text-sm">{item.rating}</span>
                  <Rating
                    className="mb-[1px]"
                    name="half-rating-read"
                    defaultValue={item.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <span className="text-sm text-gray-500">
                    ({item.student})
                  </span>
                </div>
                <div className="flex flex-row gap-x-2 items-center">
                  {" "}
                  <span className="font-medium">{item.price} VND</span>
                  <span className="text-gray-400 text-sm line-through">
                    120000 VND
                  </span>
                </div>
              </div>
            </div>
            <div className=" absolute right-0 bottom-1 px-3 mb-[-4px] rounded-br-lg py-1 bg-[#eceb98]">
              <span className="uppercase text-sm font-medium">Best seller</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCourses;
