import React, { useEffect, useRef, useState } from "react";
import {
  Pen,
  LayoutDashboard,
  ListChecks,
  CirclePlus,
  List,
  Eye,
  Video, Check, X
} from "lucide-react";
import LessonDetail from "./LessonDetail";
import ButtonAdd from "../common/ButtonAdd";
import Modal from "@mui/material/Modal";
import ModalChapter from "./ModalChapter";
import ModalLesson from "./ModalLesson";
import InputCustom from "../common/InputCustom";
import { useLocation } from "react-router-dom";
import { getSectionById, updateSection } from "../../../fetchData/TeacherCourse";
import toast from "react-hot-toast";

const SectionDetail = () => {
  // const { urlLink } = useParams();
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const sectionId = pathSegments[4];
  const courseId = pathSegments[3];
  const [status, setStatus] = useState(false)

  // console.log(sectionId)
  // console.log(courseId)
  const [section, setSection] = useState({})

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState({
    sectionName: undefined,
  });
  // console.log(inputValue)
  const inputRef = useRef(null);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(prev => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(inputValue)
  };

  const handleCancel = () => {
    // setInputValue(value);
    setIsEditing(false);
  };

  const getSection = async () => {
    const res = await getSectionById(sectionId)
    if (res && res.status === 200) {
      setSection(res.data.data)
      // console.log(section.sectionName)
    }
  }

  useEffect(() => {
    getSection()
    setStatus(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const handleSave = async () => {
    const res = await updateSection(sectionId, inputValue)
    if (res && res.status === 200) {
      toast.success("Successfully edit")
      setInputValue(undefined)
      setStatus(true)
      setIsEditing(false);
    } else {
      toast.error("Failed to edit")
    }

  };

  if (!section) {
    return <div>Section not found</div>;
  }

  return (
    <div className="mt-6 px-10 ">
      <div className="flex flex-col gap-y-5 mb-8">
        <div className="flex items-center gap-x-4 text-third  mt-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-third bg-third bg-opacity-15 ">
            <LayoutDashboard className=" " />
          </div>
          <h1 className="text-xl font-semibold">Edit section</h1>
        </div>
        <div className="flex flex-col gap-y-4">
          {/* part 1 */}
          <div className="flex items-center justify-between gap-x-10">
            <div className="flex items-center flex-col bg-white justify-between px-6 py-6 w-full gap-y-4 rounded-lg border border-spacing-1   ">
              <div className="flex items-center justify-between w-full">
                <label className="font-medium" >
                  Section Name:
                </label>
                {isEditing ? (
                  <span className="flex items-center gap-x-2 text-sm hover:font-medium">
                    <div
                      className="p-1 hover:bg-green-200 cursor-pointer"
                      onClick={handleSave}
                    >
                      <Check size={14} className="text-green-800" />
                    </div>
                    <div
                      className="p-1 hover:bg-red-200 cursor-pointer"
                      onClick={handleCancel}
                    >
                      <X size={14} className="text-red-700" />
                    </div>
                  </span>
                ) : (
                  <span
                    className="flex items-center gap-x-2 text-sm cursor-pointer hover:font-medium"
                    onClick={toggleEdit}
                  >
                    <Pen size={14} /> edit
                  </span>
                )}
              </div>
              <div className="w-full">
                {isEditing ? (
                  <InputCustom
                    id="sectionName"
                    value={section.sectionName}
                    onChange={handleInputChange}
                    ref={inputRef}
                  />
                ) : (
                  <h1 className="text-start text-sm ml-[0.5em] my-[0.74em]  truncate">
                    {section.sectionName}
                  </h1>
                )}
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
            <ButtonAdd label="create lesson" onClick={handleOpen} />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <>
                <ModalLesson handleClose={handleClose} sectionId={sectionId} setStatus={setStatus} />
              </>
            </Modal>
          </div>
        </div>
        {/* header */}
        {/* main */}
        <div>
          <LessonDetail section={section} />
        </div>
        {/* main */}
      </div>
    </div>
  );
};

export default SectionDetail;
