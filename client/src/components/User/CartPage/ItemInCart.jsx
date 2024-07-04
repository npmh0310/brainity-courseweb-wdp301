import React, { useEffect, useState } from "react";
import { Tag } from "lucide-react";
import { Rating } from "@mui/material";
import { getRatingCourse } from "../../../fetchData/RatingOfCourse";
import { useDispatch } from "react-redux";
import {
  moveCourseToCart,
  removeCourse,
  saveCourseForLater,
} from "../../../redux/features/cartSlice";
import { formatCurrencyVND } from "../../../function/function";
import { Link } from "react-router-dom";

function ItemInCart(props) {
  const { course, later } = props;
  const [rating, setRating] = useState();
  const dispatch = useDispatch();
  //action
  const remove = () => {
    dispatch(removeCourse(course._id));
  };
  const moveToCart = () => {
    dispatch(moveCourseToCart(course._id));
  };
  const saveForLater = () => {
    dispatch(saveCourseForLater(course._id));
  };

  // rating
  const fetchRattingCourse = async (courseId) => {
    const response = await getRatingCourse(courseId);
    console.log(response.data);
    if (response != null) {
      setRating(response.data);
    }
  };
  useEffect(() => {
    fetchRattingCourse(course._id);
  }, [course._id]);
  return (
    <div className=" py-4 border-t flex justify-between items-start">
      <div className=" basis-1/6 w-full pr-2">
        <img
          className=" w-full h-full object-cover"
          src={course.imageUrl}
          alt=""
        />
      </div>
      <div className=" basis-4/6 w-full flex flex-col lg:flex-row gap-y-3">
        <div className=" basis-5/6 banner flex flex-col px-2 mb-2 ">
          <Link
            to={`/course/${course._id}`}
            className=" text-[16px] text-black font-bold mb-1"
          >
            {course.courseName}
          </Link>
          <div className=" text-sm text-black mb-1">{course.description}</div>
          <div className=" text-gray text-sm tracking-wide mb-2">
            {/* By <a className=' text-black underline' href="#">{course.instructor.username}</a> */}
          </div>
          <div className=" flex gap-2 text-black justify-start items-center ">
            {rating && rating.numOfRates > 2 && (
              <div className="  p-1 bg-[#eceb98] text-sm text-center font-semibold text-black">
                Bestseller
              </div>
            )}
            {rating != null && (
              <div className=" flex justify-center items-center gap-1 ">
                <span className="text-sm">{rating.avgRating}</span>
                <Rating
                  className="mb-[2px]"
                  name="half-rating-read"
                  value={rating.avgRating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </div>
            )}

            <span className=" text-gray-300 text-sm">
              {rating && rating.numOfRates} rating
            </span>
          </div>
        </div>
        <div className=" flex text-sm px-2 lg:flex-col gap-x-3 gap-y-1 ">
          <span
            className=" text-third lg:text-end hover:text-primary cursor-pointer transition-colors ease-in-out"
            onClick={remove}
          >
            Remove
          </span>
          {later === true ? (
            <span
              className="  text-third lg:text-end hover:text-primary cursor-pointer transition-colors ease-in-out"
              onClick={saveForLater}
            >
              Save for later
            </span>
          ) : (
            <span
              className="  text-third lg:text-end hover:text-primary cursor-pointer transition-colors ease-in-out"
              onClick={moveToCart}
            >
              Move to Cart
            </span>
          )}
          {/* <span className='  text-third lg:text-end hover:text-primary cursor-pointer transition-colors ease-in-out text-nowrap'>
                    Move to wishlist
                  </span> */}
        </div>
      </div>
      <div className=" basis-1/6 w-full flex flex-col items-center ">
        <div className=" flex justify-between gap-x-1 text-primary text-lg font-semibold">
          <span>{formatCurrencyVND(course.price)}</span>
          <Tag className=" mt-2" size={16} />
        </div>
      </div>
    </div>
  );
}

export default ItemInCart;
