import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ChevronDown, FilePenLine, Trash2 } from "lucide-react";
import Button from "@mui/material/Button";
import videoTest from "../../../assets/videos/ADBE925D-45A7-437E-A735-415F7A4625E4.mp4";
import { useState } from "react";
import { Modal } from "@mui/material";
import ModalEditLesson from "./ModalEditLesson";
import toast from "react-hot-toast";
import { deleteLesson } from "../../../fetchData/TeacherCourse";
const LessonDetail = ({ section, setStatus }) => {
  // delete lesson
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleDeleteOpen = (id) => {
    setSelectedLessonId(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => setDeleteOpen(false);
  const handleDelete = async () => {
    console.log("Deleting section id:", selectedLessonId);
    const res = await deleteLesson(selectedLessonId)
    if (res.status === 200) {
      toast.success('Deleted successfully')
      setStatus(true)
    }
    else {
      toast.error('Delete failed')
    }
    setDeleteOpen(false);
  };
  // edit lesson
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = (lesson) => {
    setSelectedLesson(lesson);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);

  return (
    <>
      {section.lessons?.map((lesson, lessonIndex) => (
        <div className="mb-3" key={lessonIndex}>
          <Accordion className=" py-2">
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="font-semibold uppercase font-secondary"
            >
              {lessonIndex + 1}. {lesson.lessonName}
            </AccordionSummary>
            <div className="flex flex-col container mx-auto mb-7">
              <div className="flex flex-col gap-y-7 p-5">
                <div className="flex flex-row items-start justify-between gap-x-4 border-b-2">
                  <div className="flex flex-col gap-y-3 mb-6">
                    <span className="italic text-third font-medium">
                      Lesson name:
                    </span>
                    <span className="text-sm">{lesson.lessonName}</span>
                  </div>
                  <div className="flex flex-col gap-y-3 mb-6">
                    <span className="italic text-third font-medium">
                      Lesson description:
                    </span>
                    <span className="text-sm">{lesson.description}</span>
                  </div>
                </div>

                <div className="flex gap-y-5  flex-col mb-4">
                  <span className="italic text-third font-medium ">
                    Lesson video:
                  </span>
                  <div className="flex justify-center max-h-[380px] mb-2 ">
                    {/* <span className="text-sm">{lesson.videoUrl}</span> */}
                    <video width="80%" className="rounded-lg" controls>
                      <source src={lesson.videoUrl} type="video/mp4" />
                    </video>
                  </div>
                </div>

                <div className="flex flex-row gap-x-6 text-sm">
                  <button
                    className="flex justify-center items-center  w-20 px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-105 hover:shadow-lg"
                    onClick={() => handleDeleteOpen(lesson._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    className="flex justify-center items-center  w-20 px-5 py-3 bg-primary/90 text-white rounded-full hover:bg-primary hover:scale-105 hover:shadow-lg"
                    onClick={() => handleEditOpen(lesson)}
                  >
                    <FilePenLine size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Accordion>
        </div>
      ))}
      <Modal
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
          <div className="bg-white py-6  rounded shadow-lg">
            <h2 className="text-lg text-center uppercase font-medium text-third  border-b-[1px]  pb-5">
              Lesson Deletion
            </h2>
            <p className="my-5 px-4">
              Are you sure you want to delete this lesson?
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
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <ModalEditLesson
            close={handleEditClose}
            lesson={selectedLesson}
            setStatus={setStatus}
          />
        </>
      </Modal>
    </>
  );
};

export default LessonDetail;
