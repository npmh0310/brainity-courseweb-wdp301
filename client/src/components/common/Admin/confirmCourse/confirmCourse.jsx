import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import CourseDialog from "./CourseDialog";

const ConfirmCourseTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([
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

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilteredCourses(
        courses.filter((course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, courses]);

  const handleConfirm = (id) => {
    const updatedCourses = courses.map((course) =>
      course.id === id ? { ...course, status: "Confirmed" } : course
    );
    setCourses(updatedCourses);
    setOpen(false);
  };

  const handleReject = (id) => {
    const updatedCourses = courses.map((course) =>
      course.id === id ? { ...course, status: "Rejected" } : course
    );
    setCourses(updatedCourses);
    setOpen(false);
  };

  const handleRowClick = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  return (
    <div className="pt-4 px-0 lg:px-36 md:px-10">
      <div className="py-1">
        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
          <div className="flex space-x-4 items-center w-full">
            <div className="relative w-1/3">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-lg transition-all"
              />
            </div>
          </div>
        </div>
        <div className="py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-sm font-semibold text-white uppercase tracking-wider"
                  >
                    Course Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-sm font-semibold text-white uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-sm font-semibold text-white uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-sm font-semibold text-white uppercase tracking-wider"
                  >
                    Uploaded By
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-sm font-semibold text-white uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, index) => (
                  <tr
                    key={course.id}
                    className={`hover:bg-gray-100 cursor-pointer ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                    onClick={() => handleRowClick(course)}
                  >
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <div className="flex items-center">
                        <img
                          src={course.img}
                          alt={course.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {course.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {course.category}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {course.price}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {course.uploadBy}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-medium leading-tight ${
                          course.status === "Confirmed"
                            ? "text-green-900"
                            : course.status === "Rejected"
                            ? "text-black"
                            : "text-gray-900"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 ${
                            course.status === "Confirmed"
                              ? "bg-primary"
                              : course.status === "Rejected"
                              ? "bg-red-600"
                              : "bg-gray-200"
                          } opacity-50 rounded-full`}
                        ></span>
                        <span className="relative">{course.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CourseDialog
        open={open}
        course={selectedCourse}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        onReject={handleReject}
      />
    </div>
  );
};

export default ConfirmCourseTable;
