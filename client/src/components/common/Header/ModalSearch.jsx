import React from "react";
import { useNavigate } from "react-router-dom";

const ModalSearch = ({ searchResults }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/course/${id}`);
  };
  return (
    <div className="py-3 border rounded-xl">
      <ul className="flex flex-col px-2  gap-y-3">
        {searchResults.map((course) => (
          <li
            className="hover:bg-slate-200 px-4 py-2 rounded-md cursor-pointer"
            key={course._id}
            onClick={() => handleClick(course._id)}
          >
            <div className="flex flex-row items-center gap-x-5">
              <img
                className="w-10 h-10 rounded-sm object-cover"
                src={course.imageUrl}
                alt=""
              />
              <div className="flex flex-col gap-y-1">
                <h1 className="text-sm font-semibold">{course.courseName}</h1>
                <h1 className="text-xs text-gray-500">
                  <span className="text-gray-700 font-semibold">Course </span>{" "}
                  {course.instructor.username}
                </h1>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModalSearch;
