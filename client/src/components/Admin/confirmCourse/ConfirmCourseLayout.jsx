import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfirmCourseTable from "./confirmCourse";
import CourseDetail from "./ConfirmCourseDetail";
import {
  getAllCourseForConfirm,
  confirmCourse,
  rejectCourse,
} from "../../../fetchData/Admin";

const ConfirmCourseLayout = () => {
  const [courses, setCourses] = useState([]);
  const fetchCourse = async () => {
    try {
      const response = await getAllCourseForConfirm();
      if (response.data.success) {
        setCourses(response.data.data);
      } else {
        console.log("Failed to fetch course data");
      }
    } catch (error) {
      console.log("Error fetching course: ", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courses]);

  const handleConfirm = async (id) => {
    try {
      await confirmCourse(id);
      const updatedCourse = { ...courses, isConfirm: true, isRejected: false };
      const updatedCourses = courses.map((c) =>
        c._id === courses._id ? updatedCourse : c
      );
      setCourses(updatedCourses);
      fetchCourse();
    } catch (error) {
      console.log("Error confirming course:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectCourse(id);
      const updatedCourse = { ...courses, isConfirm: false, isRejected: true };
      const updatedCourses = courses.map((c) => (c._id === courses._id ? updatedCourse : c));
      setCourses(updatedCourses);
      fetchCourse();
    } catch (error) {
      console.log("Error rejecting course:", error);
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<ConfirmCourseTable courses={courses} />} />
        <Route
          path="/:id"
          element={
            <CourseDetail
              courses={courses}
              onConfirm={handleConfirm}
              onReject={handleReject}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default ConfirmCourseLayout;
