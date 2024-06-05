import React from "react";
import {
  Dialog,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Button,
} from "@mui/material";
import { IoMdClose, IoIosArrowDown } from "react-icons/io";

const CourseDialog = ({ open, course, onClose, onConfirm, onReject }) => {
  if (!course) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <div className="bg-primary flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold">{course.name}</h1>
        <IconButton onClick={handleClose} className="text-white">
          <IoMdClose />
        </IconButton>
      </div>
      <DialogContent dividers>
        <div className="mt-2">
          <p className="text-lg">
            <span className="font-semibold">Category:</span> {course.category}
          </p>
          <p className="text-lg mt-2">
            <span className="font-semibold">Uploaded By:</span> {course.uploadBy}
          </p>
        </div>

        <div className="mt-4">
          {course.sections.map((section, index) => (
            <Accordion
              key={index}
              className="mb-4 rounded-lg overflow-hidden"
              style={{ boxShadow: "none" }}
            >
              <AccordionSummary
                expandIcon={<IoIosArrowDown />}
                style={{ backgroundColor: "#f0f0f0", borderBottom: "none" }}
              >
                <p className="text-lg font-semibold">{section.title}</p>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: "#f9f9f9" }}>
                {section.videos.map((video, idx) => (
                  <div key={idx} className="mb-4 flex flex-col space-y-2">
                    <p className="font-semibold">{video.title}</p>
                    <iframe
                      width="100%"
                      height="400"
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>

        <div className="flex justify-between md:justify-end space-x-4">
          <button
            className="bg-primary hover:bg-[#03ecbe] text-white   
                                      px-[40px] py-[9px] my-1 text-sm font-semibold  
                                      rounded-full backdrop-blur-md transition transform hover:scale-105"
            onClick={() => onConfirm(course.id)}
          >
            Confirm
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white   
                                      px-[40px] py-[9px] my-1 text-sm font-semibold  
                                      rounded-full backdrop-blur-md transition transform hover:scale-105"
            onClick={() => onReject(course.id)}
          >
            Reject
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDialog;
