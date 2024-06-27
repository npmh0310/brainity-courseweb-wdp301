import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Search } from "lucide-react";
import TableCourses from "./TableCourses";
import { Outlet, useLocation, useParams } from "react-router-dom";
import CourseDetail from "./CourseDetail";
import { useDispatch } from "react-redux";
import { setCourses } from "../../../redux/features/teacherSlice";
import CreateNewChapter from "./CreateNewChapter";
import ManageSection from "./SectionDetail";
const ManageCourses = () => {
  const { urlLink, sectionId } = useParams();
  const showTableCourses = !urlLink;


  return (
    <div className="bg-gray-100 w-full pb-20">
      <div className=" mx-auto px-12 ">
        <div className="mt-6 px-10">
          {/* header */}
          <div className="flex flex-row items-center justify-between mx-10">
            <div className="flex flex-col gap-y-4">
              <span className="text-sm">
                Pages / Manage courses
               
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
            <TableCourses  />
          ) : sectionId ? (
            <ManageSection />
          ) : (
            <CourseDetail />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;
