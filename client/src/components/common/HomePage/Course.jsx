import React, { useEffect, useState } from "react";
import Item from "../Item/index";
import AOS from "aos";
import "aos/dist/aos.css";
import { getAllCourse } from "../../../fetchData/Course";
import { useInView } from "react-intersection-observer";

const Course = () => {
  const [courseList, setCourseList] = useState([]);
  const { ref: courseRef, inView: courseView, entry } = useInView();

  useEffect(() => {
    if (courseView) getAllCourse().then((res) => setCourseList(res.data.data));
  }, [courseView]);

  // console.log(courseList);

  useEffect(() => {
    AOS.init({ duration: 1400, once: true });
    window.addEventListener("load", AOS.refresh);
  }, []);

  const sampleData = [
    {
      id: 1,
      image:
        "https://i.ytimg.com/vi/Yr80SetR5Qo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCsZVY3Jo-CAm0H5XG5BkvpCz9-kQ",
      courseName: "HTML vs CSS basic  ",
      description:
        "In this course, we will work together to build the interface of two websites, The Band & Shopee.",
      price: 340000,
      teacher: "John Wick",
      rating: 3,
      student: 2450,
    },
    {
      id: 2,
      image:
        "https://i.ytimg.com/vi/m9ehDBMnCzM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCYWjtqLfV7A0B1L_wkvIWwRTfCLQ",
      courseName: "Java script basic",
      description:
        "In this course, we will work together to build the interface of two websites, The Band & Shopee.",
      price: 450000,
      teacher: "Eazy Bytes",
      rating: 4.5,
      student: 6420,
    },
    {
      id: 3,
      image:
        "https://i.ytimg.com/vi/kUMe1FH4CHE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCQWfMGw9okv82ODRddbo1Ez2zPUg",
      courseName: "React for Beginners",
      description:
        "Learn the basics of React and build a simple web application.",
      price: 500000,
      teacher: "Jane Doe",
      rating: 4,
      student: 3250,
    },
    {
      id: 4,
      image:
        "https://i.ytimg.com/vi/2Ji-clqUYnA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAULYm0FtLaD1OFW5-VPbGTCrOBLw",
      courseName: "Advanced CSS and Sass",
      description: "Master advanced CSS and Sass to build modern web layouts.",
      price: 600000,
      teacher: "Alice Johnson",
      rating: 4.8,
      student: 4800,
    },
    {
      id: 5,
      image:
        "https://i.ytimg.com/vi/N7d73NmztLg/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARg1IFgocjAP&rs=AOn4CLANcTsLjLnv8f7EMOvbja_2vc_Rqg",
      courseName: "Node.js Complete Guide",
      description:
        "Get up and running with Node.js to build scalable backend applications.",
      price: 700000,
      teacher: "Mark Smith",
      rating: 4.7,
      student: 5400,
    },
    {
      id: 6,
      image:
        "https://i.ytimg.com/vi/MkESyVB4oUw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDSg8FiyXNG8RaI49yQSTEnMh6W-g",
      courseName: "Python for Data Science",
      description:
        "Learn Python programming and how to use it for data analysis and visualization.",
      price: 650000,
      teacher: "Sophia Lee",
      rating: 4.9,
      student: 7200,
    },
    {
      id: 7,
      image:
        "https://i.ytimg.com/vi/NBgloVgJD7M/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDlau5qyuiZM-TbhkM19ugRaT7mYg",
      courseName: "Full-Stack Web Development",
      description:
        "Become a full-stack web developer by learning both frontend and backend technologies.",
      price: 800000,
      teacher: "David Kim",
      rating: 5,
      student: 9100,
    },
    {
      id: 8,
      image:
        "https://i.ytimg.com/vi/HjRNLafYiU4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBy0w9F4QfAPpHRHRaC4fO-pGzATw",
      courseName: "Machine Learning A-Z",
      description:
        "An extensive course on machine learning, covering algorithms and practical applications.",
      price: 750000,
      teacher: "Emma Brown",
      rating: 4.6,
      student: 8500,
    },
  ];

  return (
    <section ref={courseRef} className="pb-20 text-center">
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
        <div className="container">
          <div className="grid justify-items-center grid-cols-1 gap-y-10 sm:grid-cols-2  lg:grid-cols-3 ">
            {sampleData.map((item) => (
              <Item key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Course;
