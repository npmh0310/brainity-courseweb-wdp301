import React, { useEffect, useState } from "react";
import Item from "../Item/index";
import AOS from "aos";
import "aos/dist/aos.css";
import { getCourseInHomePage } from "../../../fetchData/Course";
import { useInView } from "react-intersection-observer";
import { MoveRight } from "lucide-react";
import "./course.css";
import { useNavigate } from "react-router-dom";
const Course = () => {
  const [courseList, setCourseList] = useState([]);
  const { ref: courseRef, inView: courseView } = useInView({
    triggerOnce: true,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (courseView) {
      setLoading(true);
      getCourseInHomePage().then((res) => {
        setCourseList(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    }
  }, [courseView]);

  // console.log(courseList);

  useEffect(() => {
    AOS.init({ duration: 1400, once: true });
    window.addEventListener("load", AOS.refresh);
  }, []);

  return (
    <section ref={courseRef} className="py-20 text-center">
      <div className="container mx-auto">
        <div
          className="mb-7 flex flex-col gap-y-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h1 className="block text-center text-7xl uppercase font-bold font-third text-primary ">
            All Product
          </h1>
          <span className="max-x-[639px] mx-auto mb-[30px] lg:mb-[30px] text-center text-lg">
            "All brainity's courses"
          </span>
        </div>
        <div className="container mb-12">
          <div className="grid justify-items-center grid-cols-1 gap-y-10 sm:grid-cols-2  lg:grid-cols-3 ">
            {courseList?.map((item) => (
              <Item key={item.id} data={item} loading={loading} />
            ))}
          </div>
        </div>
        <div className="flex  justify-center items-center">
          <button
            className="cta flex flex-row  items-center"
            onClick={() => navigate("/categories")}
          >
            <span>See all course</span>
            <svg width="15px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Course;
