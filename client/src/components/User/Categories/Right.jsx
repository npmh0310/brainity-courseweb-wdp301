import React, { useEffect, useState } from "react";
import Item from "../../common/Item";
import { useInView } from "react-intersection-observer";
import CategoriesBg from "../../../assets/images/Categories/bg1.jpg";
import { useLocation, useNavigate } from "react-router-dom";

export const Right = ({ filteredCourses, currentPage,handlePageClick, totalPages }) => {
  const { ref: courseRef, inView: courseView } = useInView({
    triggerOnce: true,
  });
  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    if (courseView) {
      setLoading(true);
      setCourseList(filteredCourses);
      console.log("dit me", filteredCourses);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [courseView,filteredCourses,totalPages]);

  return (
    <div ref={courseRef} className="col-span-5 block">
      <div
        className="relative w-full h-56 rounded-3xl mb-8 hover:-translate-y-2 transition-all duration-500"
        style={{
          backgroundImage: `url(${CategoriesBg})`,
          backgroundSize: "cover",
          backgroundPosition: "right center",
        }}
      >
        <div className="absolute top-[45%] left-52 text-white text-xl"></div>
      </div>
      {courseList.length === 0 ? (
        <p className="text-center text-xl text-gray-600">No Course Found</p>
      ) : (
        <>
          <div className="grid justify-items-center grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {courseList.map((data) => (
              <Item key={data.id} data={data} loading={loading} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                (totalPages > 1 &&
                <button
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber - 1)}
                  className={`mx-1 px-4 py-2 rounded-full ${
                    pageNumber === currentPage + 1
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-primary"
                  }`}
                >
                  {pageNumber}
                </button>
                )
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};
