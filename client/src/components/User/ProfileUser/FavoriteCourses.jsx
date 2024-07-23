import React, { useState, useEffect } from "react";
import wishListImg from "../../../assets/images/list.png";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
      ...prevFavorite,
      [courseId]: !prevFavorite[courseId],
    }));
  };

  useEffect(() => {
    getFavouriteCourse()
      .then((response) => {
        const data = Object.values(response.data.data);
        setCourseList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching favourite courses: ", error);
        setIsLoading(false);
      });
  }, []);
  console.log(courseList, courseList.length);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="w-full md:w-[65%]  bg-white mt-8  border py-8 px-8 border-gray-200 rounded-md flex flex-col">
      <h1 className="text-2xl uppercase font-bold border-b-[1px] border-b-gray-200 pb-6 text-third text-center italic ">
        WISHLIST
      </h1>
      {isLoading ? (
        <div className="flex-grow flex justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : courseList.length === 0 ? (
        <div className="flex-grow flex justify-center items-center flex-col">
          <div className="flex flex-col justify-center items-center my-5 space-y-12">
            <img className="size-56" src={wishListImg} alt="No courses" />
            <div className="flex justify-center items-center">
              <button
                className="cta flex flex-row items-center"
                onClick={() => navigate("/categories")}
              >
                <span>See all courses</span>
                <svg width="15px" height="10px" viewBox="0 0 13 10">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center my-5 gap-y-7">
          {courseList.map((item, index) => (
            <div
              key={index}
              className="relative w-full mx-3 py-4 px-4 border border-gray-200 rounded-lg hover:ring-1 hover:ring-primary"
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
                <div className="flex w-full items-center text-center md:items-start md:text-left flex-col gap-y-2 md:w-3/5">
                  <h2 className="font-semibold text-lg text-third">
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
                    <span className="font-medium">{item.price} VND</span>
                    <span className="text-gray-400 text-sm line-through">
                      120000 VND
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 bottom-1 px-3 mb-[-4px] rounded-br-lg py-1 bg-[#eceb98]">
                <span className="uppercase text-sm font-medium">
                  Best seller
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteCourses;
