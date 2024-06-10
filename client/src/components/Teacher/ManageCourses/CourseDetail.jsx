import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Pen,
  LayoutDashboard,
  ListChecks,
  CirclePlus,
  List,
  Upload,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonAdd from "../common/ButtonAdd";

import Modal from "@mui/material/Modal";
import ModalChapter from "./ModalChapter";
import InputCustom from "../common/InputCustom";
import { getCourseById, getCourseByName } from "../../../fetchData/TeacherCourse";
import EditSection from "./EditSection";

const CourseDetail = () => {
  const [status, setStatus] = useState(false)
  const navigate = useNavigate();
  const [course, setCourse] = useState({})
  const { urlLink } = useParams();
  const [data, setData] = useState({
    courseName: urlLink
  })
  // console.log(urlLink)
  useEffect(() => {
    getCourseByName(data).then((res) => setCourse(res.data.data))
    setStatus(false)
  }, [data, status])

  const handleAddNewChapter = (sectionId) => {
    navigate(`/teacher/managecourses/${course.courseName}/${sectionId}`);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // import img
  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  //  chuyen file text name thanh img
  const handleSelectedFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  console.log(course.sections)

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="mt-6 px-10 ">
      <div className="flex flex-col gap-y-5 mb-10 ">
        <div className="flex items-center gap-x-4 text-third  mt-6">
          <div className="w-12 h-12  rounded-full flex items-center justify-center text-third bg-third bg-opacity-15 ">
            <LayoutDashboard className=" " />
          </div>
          <h1 className="text-xl font-semibold">Customize your course</h1>
        </div>
        <div className="flex flex-col gap-y-4">
          {/* part 1 */}
          <div className="flex items-center justify-between gap-x-10">
            <div className="flex items-center flex-col bg-white justify-between  px-6 py-6 w-6/12 gap-y-4 rounded-lg border border-spacing-1 ">
              <EditSection
                idCourse={course._id}
                label="Course name"
                value={course.courseName}
                inputId="courseName"
                setStatus={setStatus}
              />
            </div>
            <div className="flex items-center flex-col bg-white justify-between  px-6 py-6 w-6/12 gap-y-4 rounded-lg border border-spacing-1 ">
              <EditSection
                idCourse={course._id}
                label="Course description"
                value={course.description}
                inputId="description"
                setStatus={setStatus}
              />
            </div>
          </div>
          {/* part 1 */}
          {/* part 2 */}
          <div className="flex items-start justify-between gap-x-10 ">
            <div className="flex items-center flex-col bg-white justify-between px-6 py-6 w-6/12 gap-y-4 rounded-lg border border-spacing-1 h-[100%] ">
              <div className="flex items-center justify-between w-full  ">
                <label className="font-medium" htmlFor="">
                  Course image:{" "}
                </label>

                <input
                  type="file"
                  id="myFile"
                  name="filename"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleSelectedFile}
                />

                {/* Custom button */}
                <span
                  className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium  hover:font-medium"
                  onClick={handleFileInputClick}
                >
                  <Upload className="w-4 h-4" />
                  Choose file
                </span>
              </div>

              <div className="flex items-center justify-center w-full">
                <div
                  className={`flex flex-col items-center justify-center w-full h-[231px] max-h-[291px]rounded-lg  bg-gray-50`}
                >
                  {imagePreview ? (
                    <div className="p-2 w-full h-[231px]  overflow-hidden">
                      <img
                        className="w-full h-full object-cover rounded-lg "
                        src={imagePreview}
                        alt="Selected Image"
                      />
                    </div>
                  ) : (
                    <img
                      className="w-full h-full object-cover rounded-lg "
                      src="https://img-c.udemycdn.com/course/480x270/4993276_3452.jpg"
                      alt={course.courseName}
                    />
                  )}
                </div>
              </div>
            </div>{" "}
            <div className="flex flex-col justify-start w-6/12 gap-y-4 h-full">
              <div className="flex items-center flex-col bg-white justify-between px-6 py-6 gap-y-4 rounded-lg border border-spacing-1   ">
                <EditSection
                  idCourse={course._id}
                  label="Course categories"
                  value="hi"
                  inputId="categories"
                  setStatus={setStatus}
                />
              </div>
              <div className="flex items-center flex-col bg-white justify-between px-6 py-6 gap-y-4 rounded-lg border border-spacing-1   ">
                <EditSection
                  idCourse={course._id}
                  label="Course price"
                  value={course.price}
                  inputId="price"
                  setStatus={setStatus}
                />
              </div>
            </div>
          </div>
          {/* part 2 */}
        </div>
      </div>
      <div className="flex flex-col gap-y-5 ">
        <div className="flex items-center gap-x-4 text-third  mt-6">
          <div className="w-12 h-12  rounded-full flex items-center justify-center text-third bg-third bg-opacity-15 ">
            <ListChecks className=" " />
          </div>
          <h1 className="text-xl font-semibold">Section chapter</h1>
        </div>
        <div className="flex items-center flex-col bg-white justify-between px-6 py-6 gap-y-4 rounded-lg border border-spacing-1 h-[100%] ">
          <div className="flex items-center justify-between w-full mb-3 ">
            <label className="font-medium" htmlFor="">
              List section:{" "}
            </label>
            <ButtonAdd label="create section" onClick={handleOpen} />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <>
                <ModalChapter handleClose={handleClose} />
              </>
            </Modal>
          </div>
          <div className="flex items-center flex-col w-full gap-y-4 ">
            {course.sections?.map((section, index) => (
              <div
                className="flex items-center justify-between w-full px-4 py-3 border rounded-lg bg-slate-200"
                key={index}
              >
                <div>
                  <span className="flex items-center gap-x-4 text-sm font-medium">
                    <List size={20} /> {section.sectionName}
                  </span>
                </div>
                <div>
                  <span
                    onClick={() => handleAddNewChapter(section.sectionName)}
                    className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium"
                  >
                    <Pen size={15} /> edit section
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
