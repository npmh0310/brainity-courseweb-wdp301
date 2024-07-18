import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import { getAllCourse } from "../../../fetchData/Course";

const ConfirmCourseDetail = ({ courses, onConfirm, onReject }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  //  const [courses, setCourses] = useState([]);
  //   const fetchCourse = async () => {
  //     try {
  //       const response = await getAllCourse();
  //       if (response.data.success) {
  //         setCourses(response.data.data);
  //         console.log(response.data.data);
  //       } else {
  //         console.log("Failed to fetch course data");
  //       }
  //     } catch (error) {
  //       console.log("Error fetching course: ", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchCourse();
  //   }, []);

  console.log("Courses:", courses);

  const course = courses?.find((c) => c._id === id); // sửa thành c._id để khớp với dữ liệu API của bạn

  console.log("Course:", course);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleConfirm = () => {
    onConfirm(course._id);
    console.log("Confirm", course.isConfirm);
    console.log("Reject:", course.isRejected);
    navigate(-1); // Quay lại trang trước đó
  };

  const handleReject = () => {
    onReject(course._id);
    console.log("Confirm", course.isConfirm);
    console.log("Reject:", course.isRejected);
    navigate(-1); // Quay lại trang trước đó
  };
  return (
    // Name, Description, Category
    <div className="flex flex-col px-32 py-7 min-h-screen bg-gray-50">
      <p className="text-2xl font-semibold mx-3"> {course.courseName}</p>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="mt-4">
          <p className="text-xl">
            <span className="font-semibold">Categories:</span>{" "}
            {course.categories.map((category, index) => (
              <span key={index}>
                {category.categoryName}
                {index !== course.categories.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <p className="text-xl mt-4">
            <span className="font-semibold">Uploaded By:</span>{" "}
            {course.instructor.username}
          </p>
          <p className="text-xl mt-4">
            <span className="font-semibold">Description:</span>{" "}
            {course.description}
          </p>
        </div>
        {/* Accordion của section */}
        <div className="mt-16">
          {course.sections.map((section, index) => (
            <Accordion
              key={index}
              className="mb-4 rounded-lg overflow-hidden"
              style={{ boxShadow: "none" }}
            >
              <AccordionSummary
                expandIcon={<IoIosArrowDown />}
                style={{ backgroundColor: "#f0f0f0", borderBottom: "none" }}
              >
                <p className="text-lg font-semibold">{section.sectionName}</p>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: "#f9f9f9" }}>
                {section.videos?.map((video, idx) => (
                  <div key={idx} className="my-6 space-y-2">
                    <div className="flex justify-between mb-6 border-b-2">
                      <p className="text-xl flex flex-col gap-y-3">
                        <span className="font-semibold">Lesson Name:</span>{" "}
                        {video.title}
                      </p>
                      <p className="text-xl flex flex-col gap-y-3 items-end">
                        <span className="font-semibold">Description:</span> This
                        is video description
                      </p>
                    </div>

                    <div className="rounded-lg overflow-hidden">
                      <p className="text-xl flex flex-col gap-y-3 mb-6">
                        <span className="font-semibold">Lesson video</span>
                      </p>
                      <div className="flex items-center justify-center">
                        <iframe
                          className="rounded-lg w-96 h-64 md:h-96 lg:w-[700px] lg:h-[400px]"
                          src={video.url}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </main>
      {/* 2 cái nút */}
      <footer className="bg-slate-100 p-4 flex justify-between md:justify-end space-x-4 sticky bottom-0">
        <button
          className="bg-primary hover:bg-[#03ecbe] text-white px-[40px] py-[9px] my-1 text-sm font-semibold rounded-full backdrop-blur-md transition transform hover:scale-105"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-[40px] py-[9px] my-1 text-sm font-semibold rounded-full backdrop-blur-md transition transform hover:scale-105"
          onClick={handleReject}
        >
          Reject
        </button>
      </footer>
    </div>
  );
};

export default ConfirmCourseDetail;
