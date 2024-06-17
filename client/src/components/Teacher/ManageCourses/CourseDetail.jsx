import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Pen,
  LayoutDashboard,
  ListChecks,
  CirclePlus,
  List,
  Upload,
  Check,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonAdd from "../common/ButtonAdd";

import Modal from "@mui/material/Modal";
import ModalChapter from "./ModalChapter";
import InputCustom from "../common/InputCustom";
import {
  createLinkUrl,
  getCourseById,
  getCourseByName,
  updateCourse,
} from "../../../fetchData/TeacherCourse";
import EditCourse from "./EditCourse";
import toast from "react-hot-toast";
import axios from "axios";

const CourseDetail = () => {
  const [isChecked, setIsChecked] = useState(false);
  const isPublic = isChecked;

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const [course, setCourse] = useState({});
  const { urlLink } = useParams();
  // const [data, setData] = useState({
  //   courseName: urlLink
  // })
  // console.log(urlLink)
  // const [imagePreview, setImagePreview] = useState(true);
  useEffect(() => {
    getCourseById(urlLink)
      .then((res) => setCourse(res.data.data))
      .catch((err) => console.log(err));
    setStatus(false);
  }, [status, urlLink]);

  const handleAddNewChapter = (sectionId) => {
    navigate(`/teacher/managecourses/${course._id}/${sectionId}`);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // import img
  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // const handleAddNewChapter = (sectionId) => {
  //   navigate(`/teacher/managecourses/${course.urlLink}/${sectionId}`);
  // };
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  //  chuyen file text name thanh img
  const handleSelectedFile = async (e) => {
    const file = e.target.files[0];
    const preset_key = "hbmfnkks";
    // setSelectedFile(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    // https://api.cloudinary.com/v1_1/demo/video/create_video

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/doydh7dtj/image/upload",
      formData
    );
    // console.log(res.data)
    if (res && res.status === 200) {
      // console.log(res.data.secure_url)
      const linkImg = {
        imageUrl: res.data.secure_url,
      };
      console.log(linkImg);
      const resUpdate = await updateCourse(course._id, linkImg);
      // console.log(resUpdate)
      if (resUpdate && resUpdate.status === 200) {
        toast.success("Updated success");
        setStatus(true);
      } else {
        toast.error("Something wrong");
      }

      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setImagePreview(reader.result);
      // };
      // reader.readAsDataURL(file);
    } else {
      toast.error("Please select the image file");
    }
  };

  // const handleUpdate = async(e) = {
  //   const res = await updateCourse(course.id, imgLink)

  // }

  // console.log(course.sections)

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="mt-6 px-10 ">
      <div className="flex flex-col gap-y-5 mb-10 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-4 text-third  mt-6">
            <div className="w-12 h-12  rounded-full flex items-center justify-center text-third bg-third bg-opacity-15 ">
              <LayoutDashboard className=" " />
            </div>
            <h1 className="text-xl font-semibold">Customize your course</h1>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={isChecked}
              onChange={handleToggle}
            />
            <div className="group peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-300 w-24 h-12 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-10 after:w-10 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-hover:after:scale-95">
              {isPublic ? (
                <svg
                  className="absolute top-1 left-12 stroke-gray-900 w-10 h-10"
                  height="100"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 100 100"
                  width="100"
                  x="0"
                  xmlns="http://www.w3.org/2000/svg"
                  y="0"
                >
                  <path
                    className="svg-fill-primary"
                    d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="absolute top-1 left-1 stroke-gray-900 w-10 h-10"
                  height="100"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 100 100"
                  width="100"
                  x="0"
                  xmlns="http://www.w3.org/2000/svg"
                  y="0"
                >
                  <path
                    d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              )}
            </div>
          </label>
        </div>
        <div className="flex flex-col gap-y-4">
          {/* part 1 */}
          <div className="flex items-center justify-between gap-x-10">
            <div className="flex items-center flex-col bg-white justify-between  px-6 py-6 w-6/12 gap-y-4 rounded-lg border border-spacing-1 ">
              <EditCourse
                idCourse={course._id}
                label="Course name"
                value={course.courseName}
                inputId="courseName"
                setStatus={setStatus}
              />
            </div>
            <div className="flex items-center flex-col bg-white justify-between  px-6 py-6 w-6/12 gap-y-4 rounded-lg border border-spacing-1">
              <EditCourse
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
                  {course.imageUrl === undefined ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">
                          Click to add image
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  ) : (
                    <img
                      className="w-full h-full object-cover rounded-lg "
                      src={course.imageUrl}
                      alt={course.courseName}
                    />
                  )}
                </div>
              </div>
            </div>{" "}
            <div className="flex flex-col justify-start w-6/12 gap-y-4 h-full">
              <div className="flex items-center flex-col bg-white justify-between px-6 py-6 gap-y-4 rounded-lg border border-spacing-1   ">
                <EditCourse
                  idCourse={course._id}
                  label="Course categories"
                  value="hi"
                  inputId="categories"
                  setStatus={setStatus}
                />
              </div>
              <div className="flex items-center flex-col bg-white justify-between px-6 py-6 gap-y-4 rounded-lg border border-spacing-1   ">
                <EditCourse
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
                <ModalChapter
                  courseId={course._id}
                  handleClose={handleClose}
                  setStatus={setStatus}
                />
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
                    onClick={() => handleAddNewChapter(section._id)}
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
