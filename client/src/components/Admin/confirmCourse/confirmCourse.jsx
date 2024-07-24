import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { formatDate2 } from "../../../function/function";

const ConfirmCourseTable = ({ courses }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilteredCourses(
        courses.filter((course) =>
          course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, courses]);

  const handleRowClick = (id) => {
    navigate(`${id}`);
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
                    Date Created
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
                    onClick={() => handleRowClick(course._id)}
                  >
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <div className="flex items-center">
                        <img
                          src={course.imageUrl}
                          alt={course.courseName}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {course.courseName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {formatDate2(course.createdAt)}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {course.price}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {course.instructor.username}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-medium leading-tight ${
                          course.isConfirm
                            ? "text-green-900"
                            : course.isRejected
                            ? "text-black"
                            : "text-gray-900"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 ${
                            course.isConfirm
                              ? "bg-primary"
                              : course.isRejected
                              ? "bg-red-600"
                              : "bg-gray-200"
                          } opacity-50 rounded-full`}
                        ></span>
                        <span className="relative">
                          {course.isConfirm
                            ? "Confirm"
                            : course.isRejected
                            ? "Rejected"
                            : "Pending"}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCourseTable;
