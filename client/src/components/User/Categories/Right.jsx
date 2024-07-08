import { useEffect, useState } from "react";

import Item from "../../common/Item";
import { useInView } from "react-intersection-observer";
import { getAllCourse } from "../../../fetchData/Course";
import CategoriesBg from "../../../assets/images/Categories/bg1.jpg";

export const Right = ({filteredCourses}) => {
  const [courseList, setCourseList] = useState([]);
  const { ref: courseRef, inView: courseView } = useInView({
    triggerOnce: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (courseView) {
      setLoading(true);
      setCourseList(filteredCourses);
        setTimeout(() => {
          setLoading(false);
        }, 500);   
    }
     
  }, [courseView, filteredCourses]);
 
console.log("right component",courseList);
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
     {courseList.length === 0 ?(
      <p className="text-center text-xl text-gray-600">No Course Found</p>
     ) : (
       <div className="grid justify-items-center grid-cols-1 gap-y-10 sm:grid-cols-2  lg:grid-cols-3 ">
        {courseList.map((data) => (
          <Item key={data.id} data={data} loading={loading} />
        ))}
      </div>
     )}
     
    </div>
  );
};