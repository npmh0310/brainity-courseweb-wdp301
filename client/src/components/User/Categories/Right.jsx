import { useEffect, useState } from "react";
import Item from "../../common/Item";
import { useInView } from "react-intersection-observer";
import CategoriesBg from "../../../assets/images/Categories/bg1.jpg";

export const Right = ({ filteredCourses }) => {
  const [courseList, setCourseList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;
  const { ref: courseRef, inView: courseView } = useInView({
    triggerOnce: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (courseView) {
      setLoading(true);
      setCourseList(filteredCourses);
      setCurrentPage(1); // Reset to page 1 whenever filteredCourses changes
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [courseView, filteredCourses]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courseList.slice(indexOfFirstCourse, indexOfLastCourse);
  
  const totalPages = Math.ceil(courseList.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div ref={courseRef} className="col-span-5 block">
      <div
        className="relative w-full h-56 rounded-3xl mb-8 hover:-translate-y-2 transition-all duration-500 "
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
            {currentCourses.map((data) => (
              <Item key={data.id} data={data} loading={loading} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-11 h-11 mx-1 rounded-full ${pageNumber === currentPage ? "bg-primary text-black" : "bg-white text-black"}`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};