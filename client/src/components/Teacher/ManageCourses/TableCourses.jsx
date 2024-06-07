import React, { useState } from "react";
import { Ellipsis } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CirclePlus, List } from "lucide-react";
import ButtonAdd from "../common/ButtonAdd";

import Modal from "@mui/material/Modal";
import ModalCourse from "./ModalCourse";

const TableCourses = ({ courses }) => {
  const navigate = useNavigate();

  const headers = ["Course name", "Price", "Created", "Published", ""];

  const handleRowClick = (course) => {
    navigate(`/teacher/managecourses/${course.urlLink}`);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className=" mt-6 px-10">
      <div className="py-4 overflow-x-auto">
        <div className="flex items-center justify-between gap-x-4 mb-6">
          <div className="flex flex-row items-center text-third gap-x-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-third bg-third bg-opacity-15 ">
              <List className=" " />
            </div>
            <h1 className="text-xl font-semibold">List courses</h1>
          </div>
          <ButtonAdd label="create course" onClick={handleOpen} />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <>
              <ModalCourse handleClose={handleClose} />
            </>
          </Modal>
        </div>
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {headers.map((item, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left  font-semibold text-white  "
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* {courses.length > 0 ? ( */}
              {courses.map((course, index) => (
                <tr
                  key={course.id}
                  className={`hover:bg-gray-100 cursor-pointer text-sm ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                  onClick={() => handleRowClick(course)}
                >
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {course.name}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {course.price}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <span className="relative">{course.created}</span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <h1
                      className={`${
                        course.published === "published"
                          ? "bg-green-400"
                          : course.published === "pending"
                          ? "bg-gray-300"
                          : "bg-red-400"
                      }  relative text-xs w-24 text-center text-gray-800 font-medium border border-spacing-1 px-4 py-[6px] rounded-2xl ml-[-5px]`}
                    >
                      {course.published}
                    </h1>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      <Ellipsis size={18} />
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableCourses;
