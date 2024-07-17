import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfirmCourseTable from "./confirmCourse";
import CourseDetail from "./ConfirmCourseDetail";

const ConfirmCourseLayout = () => {
    const [courses, setCourses] = useState([
        // Your course data array
        {
          id: 1,
          name: "React for Beginners",
          category: "Programming",
          img: "https://i.pravatar.cc/150?img=5",
          price: "$50",
          status: "Pending",
          uploadBy: "John Doe",
          sections: [
            {
              title: "Chapter 1",
              videos: [
                { title: "Introduction", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
                { title: "Getting Started", url: "https://www.youtube.com/embed/3JZ_D3ELwOQ" },
              ],
            },
            {
              title: "Chapter 2",
              videos: [
                { title: "Components", url: "https://www.youtube.com/embed/E7wJTI-1dvQ" },
                { title: "Props and State", url: "https://www.youtube.com/embed/MIqjLK2Kz1I" },
              ],
            },
          ],
        },
        {
          id: 2,
          name: "Advanced CSS",
          category: "Design",
          img: "https://i.pravatar.cc/150?img=6",
          price: "$70",
          status: "Pending",
          uploadBy: "Jane Smith",
          sections: [
            {
              title: "Chapter 1",
              videos: [
                { title: "Flexbox", url: "https://www.youtube.com/embed/JJSoEo8JSnc" },
                { title: "Grid Layout", url: "https://www.youtube.com/embed/tI1XE4EOwb4" },
              ],
            },
            {
              title: "Chapter 2",
              videos: [
                { title: "Animations", url: "https://www.youtube.com/embed/CBQGl6zokMs" },
                { title: "Transitions", url: "https://www.youtube.com/embed/zHUpx90NerM" },
              ],
            },
          ],
        },
        // Add more courses if needed
      ]);

      const handleConfirm = (id) => {
        const updatedCourses = courses.map((course) =>
          course.id === id ? { ...course, status: "Confirmed" } : course
        );
        setCourses(updatedCourses);
      };
    
      const handleReject = (id) => {
        const updatedCourses = courses.map((course) =>
          course.id === id ? { ...course, status: "Rejected" } : course
        );
        setCourses(updatedCourses);
      };

  return ( 
        <div>
          <Routes>
            <Route path="/" element={<ConfirmCourseTable courses={courses} />} />
            <Route path="/admin/confirmCourse/:id" element={<CourseDetail  courses={courses}
                  onConfirm={handleConfirm}
                  onReject={handleReject} />} />
          </Routes>
        </div>
  );
};

export default ConfirmCourseLayout;
