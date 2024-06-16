import React, { useEffect, useState } from "react";

import CategoriesBg from "../assets/images/Categories/bg1.jpg";

import Item from "../components/common/Item";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { getAllCourse } from "../fetchData/Course";

export const Categories = () => {
  const [courseList, setCourseList] = useState([]);
  const { ref: courseRef, inView: courseView } = useInView({
    triggerOnce: true,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (courseView) {
      setLoading(true);
      getAllCourse().then((res) => {
        setCourseList(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
    }
  }, [courseView]);
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

  const [checked, setChecked] = useState("");
  const handleChecked = (option) => {
    setChecked((prevOption) => (prevOption === option ? "" : option));
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div ref={courseRef} className="container bg-white px-0 mx-auto pb-20">
      <div className="flex justify-center gap-3 text-4xl pt-8 pb-16">
        <p className="font-semibold">E-learning Courses</p>
      </div>
      <div>
        <div className="border-b-2 pb-4 text-3xl font-semibold">
          <p>All E-learning courses</p>
        </div>
        <div className="flex justify-between mt-4 mb-8 items-center">
          <div className="relative inline-block text-left items-center gap-2">
            <div>
              <button
                type="button"
                className="inline-flex justify-between items-center w-48 h-fit rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={toggleDropdown}
              >
                <div className="text-left">
                  <p className="text-sm font-normal">Sorted by</p>
                  <p className="text-lg font-semibold">Best Seller</p>
                </div>

                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {isOpen && (
              <div
                className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Best Seller
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    New release
                  </a>
                </div>
              </div>
            )}
          </div>

          <div>{courseList && courseList.length} results</div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-10">
        {/* left-container */}
        <div className="block col-span-1 items-center">
          {/* sort */}
          <div className="block text-black font-medium pt-4 border-t-2 border-y-yellow-800">
            <p className="mb-4 text-lg">Sort by</p>
            <div className="mb-3 cursor-pointer hover:text-third text-sm ">
              <input
                className="mr-2 cursor-pointer hover:text-third"
                type="radio"
                checked={checked === 1}
                onClick={() => handleChecked(1)}
                readOnly
                name=""
                id=""
              />
              <label htmlFor="" onClick={() => handleChecked(1)}>
                Best Seller
              </label>
            </div>

            <div className="mb-3 cursor-pointer hover:text-third text-sm ">
              <input
                className="mr-2 cursor-pointer hover:text-third"
                checked={checked === 2}
                onClick={() => handleChecked(2)}
                readOnly
                type="radio"
                name=""
                id=""
              />
              <label htmlFor="" onClick={() => handleChecked(2)}>
                Star
              </label>
            </div>
            <div className="border-b-2 border-y-yellow-800 pb-4"></div>
          </div>
          {/* categories */}
          <div className="block text-black font-medium pt-4">
            <p className="mb-4 text-lg  ">Categories</p>
            <div className="mb-3 cursor-pointer hover:text-third text-sm">
              <input
                className="mr-2 cursor-pointer hover:text-third"
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">All level (00)</label>
            </div>
            <div className="mb-3 cursor-pointer hover:text-third text-sm">
              <input
                className="mr-2 cursor-pointer hover:text-third"
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">Beginners (00)</label>
            </div>
            <div className="mb-3 cursor-pointer hover:text-third text-sm pb-4">
              <input
                className="mr-2 cursor-pointer hover:text-third"
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">Experts (00)</label>
            </div>
            <div className="border-b-2 border-y-yellow-800"></div>
          </div>
          {/* duration */}
          <div className="block text-black font-medium pt-4">
            <p className="mb-4 text-lg  ">Course Duration</p>
            <div className="mb-3 cursor-pointer hover:text-third text-sm">
              <input
                className="mr-2 cursor-pointer hover:text-third"
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">0-1 Hour</label>
            </div>
            <div className="mb-3 cursor-pointer hover:text-third text-sm">
              <input
                className="mr-2 cursor-pointer hover:text-third"
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">1-3 Hours</label>
            </div>
            <div className="mb-3 cursor-pointer hover:text-third text-sm">
              <input
                className="mr-2 cursor-pointer hover:text-third"
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">3+ Hours</label>
            </div>
            <div className="border-b-2 border-y-yellow-800 pb-4"></div>
          </div>
          {/* price */}
          <div className="block text-black font-medium pt-4">
            <p className="mb-4 text-lg  ">Price</p>
            <div className="mb-3 cursor-pointer hover:text-third text-sm">
              <input
                className="mr-2 cursor-pointer hover:text-third"
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">200.000vnd - 500.000vnd</label>
            </div>
            <div className="mb-3 cursor-pointer hover:text-third text-sm">
              <input
                className="mr-2 cursor-pointer hover:text-third"
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">500.000vnd - 1.000.000vnd</label>
            </div>
            <div className="mb-3 cursor-pointer hover:text-third text-sm">
              <input
                className="mr-2 cursor-pointer hover:text-third"
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">1.000.000vnd - 5.000.000vnd</label>
            </div>
          </div>
          {/* level */}
        </div>
        {/* right-container */}
        <div className="col-span-5 block">
          {/* cate-head */}
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
          {/* cate */}
          <div className="grid justify-items-center grid-cols-1 gap-y-10 sm:grid-cols-2  lg:grid-cols-3 ">
            {courseList?.map((data) => (
              <Item key={data.id} data={data} loading={loading} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
