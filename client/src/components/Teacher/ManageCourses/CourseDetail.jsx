import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Pen,
  LayoutDashboard,
  ListChecks,
  CirclePlus,
  List,
  Upload,
  Trash2,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonAdd from "../common/ButtonAdd";

import Modal from "@mui/material/Modal";
import ModalChapter from "./ModalChapter";
import {
  createLinkUrl,
  deleteSection,
  getCourseById,
  getCourseByName,
  updateCourse,
} from "../../../fetchData/TeacherCourse";
import EditCourse from "./EditCourse";
import toast from "react-hot-toast";
import axios from "axios";
import UpdateCate from "./UpdateCate";
import Skeleton from "@mui/material/Skeleton";

const CourseDetail = () => {
  const [status, setStatus] = useState(false);
  const [pendingImg, setPendingImg] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const { urlLink } = useParams();

  useEffect(() => {
    getCourseById(urlLink)
      .then((res) => {
        setCourse(res.data.data);
        setLoading(false);
      })
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
    setPendingImg(true);
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/doydh7dtj/image/upload",
      formData
    );

    if (res && res.status === 200) {
      const linkImg = {
        imageUrl: res.data.secure_url,
      };

      const resUpdate = await updateCourse(course._id, linkImg);

      if (resUpdate && resUpdate.status === 200) {
        toast.success("Updated success");
        setStatus(true);
        setPendingImg(false);
      } else {
        toast.error("Something wrong");
        setPendingImg(false);
      }
    } else {
      toast.error("Please select the image file");
      setPendingImg(false);
    }
  };
  // delete section
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const handleDeleteOpen = (id) => {
    setSelectedSectionId(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => setDeleteOpen(false);
  const handleDelete = async () => {
    const res = await deleteSection(selectedSectionId);
    if (res.status === 200) {
      toast.success("Deleted successfully");
      setStatus(true);
    } else {
      toast.error("Delete failed");
    }
    setDeleteOpen(false);
  };

  // xử lý checked public
  const handleChecked = async (event) => {
    const isChecked = !event.target.checked;
    const res = await updateCourse(course._id, { isPublic: isChecked });

    if (res && res.status === 200) {
      toast.success("Course status updated successfully");
      setStatus(true);
    } else {
      toast.error("Failed to update course status");
    }
  };
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
          {/* CHECKED PRIVATE */}
          {loading ? (
            <Skeleton variant="rounded" width="10%" height={32} />
          ) : (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                checked={!course.isPublic}
                className="sr-only peer"
                onChange={handleChecked}
              />
              <div className="group peer ring-0  bg-emerald-500  rounded-full outline-none duration-300 after:duration-300 w-16 h-8  shadow-md peer-checked:bg-red-500  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95">
                <svg
                  className="absolute  top-1 left-[34px] stroke-gray-900 w-6 h-6"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 100 100"
                  x="0"
                  xmlns="http://www.w3.org/2000/svg"
                  y="0"
                >
                  <path
                    className="svg-fill-primary"
                    d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z"
                  ></path>
                </svg>
                <svg
                  className="absolute top-1 left-[6px] stroke-gray-900  w-6 h-6"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 100 100"
                  x="0"
                  xmlns="http://www.w3.org/2000/svg"
                  y="0"
                >
                  <path
                    d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </label>
          )}
          {/* CHECKED PRIVATE */}
        </div>
        <div className="flex flex-col gap-y-4">
          {/* part 1 */}
          <div className="flex items-start justify-between gap-x-10">
            {loading ? (
              <Skeleton variant="rounded" width="100%" height={132} />
            ) : (
              <div className="flex items-center flex-col bg-white justify-between  px-6 py-6 w-6/12 gap-y-4 rounded-lg border border-spacing-1 ">
                <EditCourse
                  idCourse={course._id}
                  label="Course name"
                  value={course.courseName}
                  inputId="courseName"
                  setStatus={setStatus}
                />
              </div>
            )}
            {loading ? (
              <Skeleton variant="rounded" width="100%" height={132} />
            ) : (
              <div className="flex items-center flex-col bg-white justify-between  px-6 py-6 w-6/12 gap-y-4 rounded-lg border border-spacing-1">
                <EditCourse
                  idCourse={course._id}
                  label="Course description"
                  value={course.description}
                  inputId="description"
                  setStatus={setStatus}
                />
              </div>
            )}
          </div>
          {/* part 1 */}
          {/* part 2 */}
          <div className="flex items-start justify-between gap-x-10 ">
            {loading ? (
              <Skeleton variant="rounded" width="50%" height={401} />
            ) : (
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
                    className={`flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium ${
                      pendingImg && "hidden"
                    }`}
                    onClick={handleFileInputClick}
                  >
                    <Upload className="w-4 h-4" />
                    Choose file
                  </span>
                </div>

                <div className="flex items-center justify-center w-full">
                  <div
                    className={`flex relative flex-col items-center justify-center w-full  h-[310px] rounded-lg  bg-gray-50`}
                  >
                    <>
                      <img
                        className={`w-full h-full object-cover rounded-lg ${
                          pendingImg && "opacity-20"
                        } `}
                        src={course.imageUrl}
                        alt={course.courseName}
                      />
                      {pendingImg && (
                        <div
                          role="status"
                          className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      )}
                    </>
                  </div>
                </div>
              </div>
            )}{" "}
            <div className="flex flex-col justify-start w-6/12 gap-y-4 h-full">
              {loading ? (
                <Skeleton variant="rounded" width="100%" height={132} />
              ) : (
                <div className="flex flex-col bg-white px-6 py-6 gap-y-4 rounded-lg border border-spacing-1 ">
                  <UpdateCate
                    idCourse={course._id}
                    label="Course categories"
                    inputId="categories"
                    setStatus={setStatus}
                    cateData={course.categories}
                  />
                </div>
              )}
              {loading ? (
                <Skeleton variant="rounded" width="100%" height={132} />
              ) : (
                <div className="flex items-center flex-col bg-white justify-between px-6 py-6 gap-y-4 rounded-lg border border-spacing-1   ">
                  <EditCourse
                    idCourse={course._id}
                    label="Course price"
                    value={course.price}
                    inputId="price"
                    setStatus={setStatus}
                  />
                </div>
              )}
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
                className="flex items-center justify-between w-full px-4 py-4  rounded-lg bg-gray-200 cursor-pointer hover:bg-gray-300 hover: transition-all  "
                onClick={() => handleAddNewChapter(section._id)}
                key={index}
              >
                <div>
                  <span className="flex items-center gap-x-5 text-sm font-medium">
                    <span> {index + 1}.</span> {section.sectionName}
                  </span>
                </div>
                <div className="mr-3">
                  <p
                    className="text-gray-900 whitespace-no-wrap w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-300
                       "
                    onClick={(e) => {
                      e.stopPropagation();
                      // Your custom delete handler here
                      handleDeleteOpen(section._id);
                    }}
                  >
                    <Trash2 size={18} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Modal
          open={deleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="flex items-center justify-center h-full ">
            <div className="bg-white py-6  rounded shadow-lg">
              <h2 className="text-lg text-center uppercase font-medium text-third  border-b-[1px]  pb-5">
                Section Deletion
              </h2>
              <p className="my-5 px-4">
                Are you sure you want to delete this section?
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
    </div>
  );
};

export default CourseDetail;
