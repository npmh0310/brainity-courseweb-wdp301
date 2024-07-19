import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Skeleton from "@mui/material/Skeleton";
import { formatCurrencyVND } from "../../../function/function";

function Item(props) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/course/${id}`);
  };

  const { data, loading } = props;

  return (
    <div className="py-7 px-6 bg-white w-[98%] rounded-md  relative border border-gray-200 hover:border-primary min-h-[430px] hover:-translate-y-2 transition-all ease-in-out duration-500">
      <Link
        className="absolute top-0 bottom-0 left-0 right-0 z-20"
        to={`/course/${data._id}`}
      ></Link>
      <div className="flex flex-col mb-6">
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={192} />
        ) : (
          <img
            className="w-full rounded-md h-48 object-cover"
            src={data.imageUrl}
            alt={data.courseName}
          />
        )}
      </div>
      <div className="flex flex-col mx-1 gap-y-2 text-left">
        {loading ? (
          <>
            <Skeleton variant="text" width="80%" height={28} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="50%" height={20} />
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="rectangular" width={80} height={24} />
          </>
        ) : (
          <>
            <h1 className="font-medium text-lg">{data.courseName}</h1>
            {data.instructor && (
              <h2 className="text-gray-700 text-sm">
                {data.instructor.username}
              </h2>
            )}
            <div className="flex flex-row items-center gap-x-1">
              {data.ratingInfo && (
                <>
                  <span className="text-sm">{data.ratingInfo.avgRating}</span>
                  <Rating
                    className="mb-[2px]"
                    name="half-rating-read"
                    defaultValue={data.ratingInfo.avgRating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </>
              )}
            </div>
            <div className="flex flex-row gap-x-2 items-center">
              <span className="font-medium">
                {formatCurrencyVND(data.price)}
              </span>
              <span className="text-gray-400 text-sm line-through">
                120000 VND
              </span>
            </div>
            {data.numOfEnrolledUsers >= 2 && (
              <div className="py-[6px] w-28 bg-[#eceb98]">
                <h1 className="text-center text-sm">Best seller</h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Item;
