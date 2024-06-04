import React from "react";
import {
  Pen,
  LayoutDashboard,
  ListChecks,
  CirclePlus,
  List,
  Eye,
  Video,
} from "lucide-react";
import LessonDetail from "./LessonDetail";

const CreateNewChapter = ({ course }) => {


  return (
    <div className="mt-6 px-10 ">
      <div className="flex flex-col gap-y-5 mb-8">
        <div className="flex items-center gap-x-4 text-third  mt-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-third bg-third bg-opacity-15 ">
            <LayoutDashboard className=" " />
          </div>
          <h1 className="text-xl font-semibold">Create new chapter</h1>
        </div>
        <div className="flex flex-col gap-y-4">
          {/* part 1 */}
          <div className="flex items-center justify-between gap-x-10">
            <div className="flex items-center flex-col bg-white justify-between px-6 py-6 w-6/12 gap-y-4 rounded-lg border border-spacing-1   ">
              <div className="flex items-center justify-between w-full  ">
                <label className="font-medium" htmlFor="">
                  Chapter name:{" "}
                </label>
                <span className="flex items-center gap-x-2 text-sm cursor-pointer">
                  <Pen size={15} /> edit name
                </span>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="input chapter name"
                  className="w-full h-9 text-sm focus:outline-none focus:border-b-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        {/* header */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-x-4 text-third  ">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-third bg-third bg-opacity-15 ">
              <List className=" " />
            </div>
            <h1 className="text-xl font-semibold">List lesson</h1>
          </div>
          <div>
            <span
               className="flex items-center gap-x-2 text-xs cursor-pointer border bg-third bg-opacity-10 rounded-3xl px-8 py-3 transition-all hover:bg-opacity-20"
              // onClick={handleAddNewChapter}
            >
              <CirclePlus size={15} /> Add new lesson
            </span>
          </div>
        </div>
        {/* header */}
        {/* main */}
        <div>
      {/* <LessonDetail course={course}/> */}
        </div>
        {/* main */}
      </div>
    </div>
  );
};

export default CreateNewChapter;
