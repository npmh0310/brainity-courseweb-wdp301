import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import { getAllCourse } from "../../../fetchData/Course";
import { Toaster, toast } from "react-hot-toast";

const ConfirmCourseDetail = ({ courses, onConfirm, onReject }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses?.find((c) => c._id === id);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleConfirm = () => {
    onConfirm(course._id);
    toast.success("This course has been confirmed");
    navigate(-1); // Go back to the previous page
  };

  const handleReject = () => {
    onReject(course._id);
    toast.error("This course has been rejected");
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="flex flex-col px-32 py-7 min-h-screen bg-gray-50">
      <div>
        <Toaster />
      </div>
      <p className="text-2xl font-semibold mx-3">{course.courseName}</p>

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

        {/* Section Accordion */}
        <div className="mt-16">
          {course.sections.length === 0 ? (
            <p>No section to load</p>
          ) : (
            course.sections.map((section, index) => (
              <Accordion
                key={index}
                className="mb-2 rounded-lg overflow-hidden"
                style={{ boxShadow: "none" }}
              >
                <AccordionSummary
                  expandIcon={<IoIosArrowDown />}
                  style={{ backgroundColor: "#f0f0f0", borderBottom: "none" }}
                >
                  <p className="text-lg font-semibold">{section.sectionName}</p>
                </AccordionSummary>

                <AccordionDetails style={{ backgroundColor: "#f0f0f0" }}>
                  {/* Lesson Accordion */}
                  {section.lessons.length === 0 ? (
                    <p>No lessons to load</p>
                  ) : (
                    section.lessons?.map((lesson, idx) => (
                      <Accordion
                        className="mb-2 rounded-2xl overflow-hidden "
                        key={idx}
                        style={{
                          borderRadius: "7px",
                        }}
                      >
                        <AccordionSummary
                          className="hover: bg-gray-300"
                          expandIcon={<IoIosArrowDown />}
                          style={{
                            backgroundColor: "#ffffff",
                            borderBottom: "none",
                          }}
                        >
                          <p className="text-xl font-semibold">
                            {lesson.lessonName}
                          </p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="flex flex-col space-y-2">
                            <p className="text-xl">
                              <span className="font-semibold">
                                Description:
                              </span>{" "}
                              {lesson.description}
                            </p>
                            <div className="rounded-lg overflow-hidden">
                              <p className="text-xl mb-6">
                                <span className="font-semibold">
                                  Lesson video:
                                </span>
                              </p>
                              <div className="flex items-center justify-center">
                                <iframe
                                  className="rounded-lg w-96 h-64 md:h-96 lg:w-[700px] lg:h-[400px]"
                                  src={lesson.videoUrl}
                                  title={lesson.title}
                                  frameBorder="0"
                                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    ))
                  )}
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </div>
      </main>

      {/* Buttons */}
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
