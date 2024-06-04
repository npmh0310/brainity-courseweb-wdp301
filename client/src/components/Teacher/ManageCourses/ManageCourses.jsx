import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Search } from "lucide-react";
import TableCourses from "./TableCourses";
import { Outlet, useLocation, useParams } from "react-router-dom";
import CourseDetail from "./CourseDetail";
import { useDispatch } from "react-redux";
import { setCourses } from "../../../redux/features/coursesSlice";
import CreateNewChapter from "./CreateNewChapter";
import ManageSection from "./SectionDetail";
const ManageCourses = () => {
  const location = useLocation();
  // const dispatch = useDispatch();
  const courses = [
    {
      id: 1,
      categories: ["Technology", "Programming"],
      name: "Python Programming Masterclass",
      description:
        "Comprehensive course to learn Python programming from scratch.",
      image: "https://example.com/images/python_programming.jpg",
      price: "$99.99",
      published: "published",
      created: "2023-04-25",
      urlLink: "python-programming-masterclass",
      sections: [
        {
          sectionId: 1,
          sectionName: "Getting Started",
          lesson: [
            {
              idLesson: 1,
              videoUrl: "https://example.com/videos/introduction_to_python.mp4",
              lessonName: "Introduction to Python",
              description:
                "Overview of Python programming language and its features.",
            },
            {
              idLesson: 2,
              videoUrl: "https://example.com/videos/installation_guide.mp4",
              lessonName: "Installation Guide",
              description:
                "Step-by-step guide to install Python on your computer.",
            },
          ],
        },
        {
          sectionId: 2,
          sectionName: "Core Concepts",
          lesson: [
            {
              idLesson: 3,
              videoUrl:
                "https://example.com/videos/variables_and_data_types.mp4",
              lessonName: "Variables and Data Types",
              description:
                "Learn about variables, data types, and basic operations in Python.",
            },
            {
              idLesson: 4,
              videoUrl: "https://example.com/videos/conditional_statements.mp4",
              lessonName: "Conditional Statements",
              description:
                "Understand conditional statements and decision-making in Python.",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      categories: ["Fitness", "Health"],
      name: "Yoga for Beginners",
      description:
        "Perfect course for beginners to start practicing yoga and improve flexibility.",
      image: "https://example.com/images/yoga_for_beginners.jpg",
      price: "$49.99",
      published: "pending",
      created: "2023-03-10",
      urlLink: "yoga-for-beginners",
      sections: [
        {
          sectionId: 1,
          sectionName: "Introduction to Yoga",
          lesson: [
            {
              idLesson: 1,
              videoUrl: "https://example.com/videos/yoga_benefits.mp4",
              lessonName: "Benefits of Yoga",
              description:
                "Explore the various physical and mental benefits of practicing yoga.",
            },
            {
              idLesson: 2,
              videoUrl: "https://example.com/videos/yoga_history.mp4",
              lessonName: "History of Yoga",
              description:
                "Learn about the origins and history of yoga as a practice.",
            },
          ],
        },
        {
          sectionId: 2,
          sectionName: "Basic Poses",
          lesson: [
            {
              idLesson: 3,
              videoUrl:
                "https://example.com/videos/yoga_poses_for_beginners.mp4",
              lessonName: "Yoga Poses for Beginners",
              description:
                "Introduction to basic yoga poses suitable for beginners.",
            },
            {
              idLesson: 4,
              videoUrl:
                "https://example.com/videos/yoga_breathing_techniques.mp4",
              lessonName: "Breathing Techniques",
              description:
                "Learn simple breathing techniques to enhance your yoga practice.",
            },
          ],
        },
      ],
    },
  ];

  // const showTableCourses = !location.pathname.match(
  //   /\/teacher\/managecourses\/(\d+|createnewchapter)/
  // );
  const { urlLink, sectionId } = useParams();

  const showTableCourses = !urlLink;

  //lay' id url
  // console.log(id);
  // const selectedCourse = id
  //   ? courses.find((course) => course.urlLink === id)
  //   : null;

  const selectedCourse = urlLink
    ? courses.find((course) => course.urlLink === urlLink)
    : null;
  const showCreateNewChapter = sectionId && selectedCourse;
  
  const selectedSection = sectionId
    ? selectedCourse?.sections.find((section) => section.sectionId === parseInt(sectionId))
    : null;

  return (
    <div className="bg-gray-100 w-full pb-20">
      <div className=" mx-auto px-12 ">
        <div className="mt-6 px-10">
          {/* header */}
          <div className="flex flex-row items-center justify-between mx-10">
            <div className="flex flex-col gap-y-4">
              <span className="text-sm">
                Pages / Manage courses{" "}
                {selectedCourse ? `/ ${selectedCourse.name}` : ""}
              </span>
              <h1 className="font-bold uppercase text-third text italic text-3xl">
                Manage Courses
              </h1>
            </div>
            <div className="flex flex-row items-center ">
              {showTableCourses ? (
                <form className=" items-center hidden lg:flex relative">
                  <input
                    type="text"
                    className="w-[300px] h-[54px] border-2 border-gray-200 px-8  py-3 text-xs rounded-l-full rounded-r-full focus:outline-none"
                    placeholder="search anything..."
                  />
                  <button className="w-14 h-[52px] bg-white border-2 border-gray-200  rounded-full flex items-center justify-center absolute right-0 text-third">
                    <Search size={20} />
                  </button>
                </form>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          {/* header */}
          {showTableCourses ? (
            <TableCourses courses={courses} />
          ) : showCreateNewChapter ? (
            <ManageSection section={selectedSection} />
          ) : (
            <CourseDetail course={selectedCourse} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;
