import React, { useState, useEffect } from "react";
import html from "../../../assets/images/Product/html-css.jpg";
import javascript from "../../../assets/images/Product/js.jpg";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFilled } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-solid-svg-icons";
import Rating from "@mui/material/Rating";
import { getFavouriteCourse } from "../../../fetchData/Course";
import { deleteCourseInFavourite } from "../../../fetchData/Course";
import { addCourseInFavourite } from "../../../fetchData/Course";
import toast from "react-hot-toast";

const FavoriteCourses = () => {
  const [favorite, setFavorite] = useState({});
  const [courseList, setCourseList] = useState([]);

  const handleFavorite = (courseId, favouriteStatus) => {
    if (!favouriteStatus) {
      deleteCourseInFavourite(courseId).then((res) => {
        toast.success("Remove favourite course");
        // const data = Object.values(res.data.data)
        // setCourseList(data)
      });
    } else {
      addCourseInFavourite(courseId).then((res) => {
        toast.success("Undo remove favourite course");
        // const data = Object.values(res.data.data)
        // setCourseList(data)
      });
    }
    setFavorite((prevFavorite) => ({
      ...prevFavorite, // prevFavorite là trạng thái trc đó của favorites
      [courseId]: !prevFavorite[courseId], // ghi đè lên mảng cũ = mảng mới với giá trị đc thay đổi  (example: 2: false => 2: !false => 2: true)
    }));
  };

  useEffect(() => {
    getFavouriteCourse()
      .then((response) => {
        const data = Object.values(response.data.data);
        setCourseList(data);
      })
      .catch((error) => {
        console.error("Error while fetching favourite courses: ", error);
      });
  }, []);

  return (
    <div className="w-full md:w-[65%]  bg-white mt-8  border py-8 px-8 border-gray-200 rounded-md">
      <h1 className="text-2xl uppercase font-bold border-b-[1px] border-b-gray-200 pb-6 text-third text-center italic ">
        Favorites courses
      </h1>
      <div className="flex flex-col justify-center items-center my-5 gap-y-7">
        {courseList.map((item, index) => (
          <div
            key={index}
            className="relative w-full mx-3 py-4 px-4 border border-gray-200 rounded-lg  hover:ring-1 hover:ring-primary"
          >
            <button
              className="absolute border border-red-400 flex justify-center items-center p-[6px] rounded-full top-4 right-5 z-30"
              onClick={() => handleFavorite(item._id, favorite[item._id])}
            >
              {favorite[item._id] ? (
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
                to={`/course/${item._id}`}
              ></Link>
              <div className="w-[55%] pt-3 md:pt-0 md:w-2/5 flex justify-center relative">
                <img
                  className="w-full h-36 object-cover"
                  src={item.imageUrl}
                  alt=""
                />
              </div>
              <div className="flex w-full items-center text-center md:items-start md:text-left flex-col gap-y-2 md:w-3/5  ">
                <h2 className=" font-semibold  text-lg text-third ">
                  {item.courseName}
                </h2>
                <span className="text-sm italic">{item.description}</span>

                <span className="text-xs text-gray-600">
                  {item.instructor.name}
                </span>
                <div className="flex flex-row items-center gap-x-1">
                  <span className="text-sm">{item.rating}</span>
                  <Rating
                    className="mb-[1px]"
                    name="half-rating-read"
                    defaultValue={item.ratingInfo.avgRating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <span className="text-sm text-gray-500">
                    ({item.ratingInfo.numOfRates})
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
