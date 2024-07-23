import React, { useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Trash2, List } from "lucide-react";
import ButtonAdd from "../common/ButtonAdd";

import Modal from "@mui/material/Modal";
import ModalCourse from "./ModalCourse";
import {
  deleteCourse,
  getCourseOfTeacher,
} from "../../../fetchData/TeacherCourse";
import toast from "react-hot-toast";
import { formatCurrencyVND } from "../../../function/function";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faLock } from '@fortawesome/free-solid-svg-icons';
const TableCourses = () => {
  const navigate = useNavigate();
  const headers = [
    "Course name",
    "Price",
    "Created",
    "Published",
    "Status",
    "",
  ];
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getCourseOfTeacher(page).then((res) => {
      setCourses(res.data.data);
      setTotalPages(res.data.totalPages);
    });
    setStatus(false);
  }, [status, page]);

  const handleRowClick = (course) => {
    navigate(`/teacher/managecourses/${course._id}`);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // delete course
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const handleDeleteOpen = (id) => {
    setSelectedCourseId(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => setDeleteOpen(false);

  const handleDelete = async () => {
    const res = await deleteCourse(selectedCourseId);
    if (res.status === 200) {
      toast.success("Deleted successfully");
      setStatus(true);
    } else {
      toast.error("Delete failed");
    }
    setDeleteOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  // chuyen totalPage qua mảng
  const pagesArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePageClick = (page) => {
    setPage(page);
  };
  console.log(courses);

  const getCourseStatus = (course) => {
    if (course.isRejected) {
      return "Rejected";
    } else if (course.isConfirm) {
      return "Confirmed";
    } else {
      return "Pending";
    }
  };

  const getCourseBgColor = (course) => {
    if (course.isRejected) {
      return "bg-red-400";
    } else if (course.isConfirm) {
      return "bg-green-400";
    } else {
      return "bg-gray-200";
    }
  };
  console.log(courses);
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
              <ModalCourse handleClose={handleClose} setStatus={setStatus} />
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
                    className="w-10 h-10 border-b-2 pl-2 border-gray-200 bg-primary text-left  font-semibold text-white  "
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* {courses.length > 0 ? ( */}
              {courses?.map((course, index) => (
                <tr
                  key={index + 1}
                  className={`hover:bg-gray-100 cursor-pointer text-sm ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                  onClick={() => handleRowClick(course)}
                >
                  <td className="pr-16 pl-3 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {course.courseName}
                    </p>
                  </td>
                  <td className=" py-5 border-b border-gray-200 text-sm">
                    {course.price === 0 ? (
                      <h1 className="px-2 py-[6px] text-xs w-20 text-center rounded-2xl bg-yellow-400">
                        Free
                      </h1>
                    ) : (
                      <p className="text-gray-900 px-2   whitespace-no-wrap">
                        {formatCurrencyVND(course.price)}
                      </p>
                    )}
                  </td>
                  <td className="py-5 border-b border-gray-200 text-sm">
                    <span className="relative">
                      {formatDate(course.createdAt)}
                    </span>
                  </td>
                  <td className=" py-5 border-b border-gray-200 text-sm">
                    <h1
                      className={`${
                        course.isPublic ? "text-green-500" : "text-red-500"
                      }  relative w-24 text-xl text-center  font-medium px-4 py-[6px] rounded-2xl ml-[-5px]`}
                    >
                      {course.isPublic ? (<FontAwesomeIcon icon={faEarthAsia} />) : (<FontAwesomeIcon icon={faLock} />)}
                    </h1>
                  </td>
                  <td className="pr-2 py-5 border-b border-gray-200 text-sm">
                    <h1
                      className={`${getCourseBgColor(
                        course
                      )} relative text-xs w-24 text-center text-gray-800 font-medium border border-spacing-1 px-4 py-[6px] rounded-2xl ml-[-5px]`}
                    >
                      {getCourseStatus(course)}
                    </h1>
                  </td>
                  <td className="py-5 border-b border-gray-200 text-sm">
                    <p
                      className="text-gray-900 whitespace-no-wrap w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-300
                       "
                      onClick={(e) => {
                        e.stopPropagation();
                        // Your custom delete handler here
                        handleDeleteOpen(course._id);
                      }}
                    >
                      <Trash2 size={18} />
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center gap-x-3 mt-4">
        {pagesArray.map((pageNumber, index) => {
          return (
            <button
              key={index}
              className={`w-11 h-11 mx-1 rounded-full ${
                page === index ? "bg-primary" : ""
              }`}
              onClick={() => handlePageClick(index)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <Modal
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex items-center justify-center h-full">
          <div className="bg-white py-6  rounded shadow-lg">
            <h2 className="text-lg text-center uppercase font-medium text-third  border-b-[1px]  pb-5">
              Confirm Deletion
            </h2>
            <p className="my-5 px-4">
              Are you sure you want to delete this course?
            </p>
            <div className="mt-6 flex justify-around">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-sm text-gray-800 font-semibold py-2 px-8 rounded-3xl mr-2"
                onClick={handleDeleteClose}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-sm text-white font-semibold py-2 px-8 rounded-3xl"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TableCourses;
