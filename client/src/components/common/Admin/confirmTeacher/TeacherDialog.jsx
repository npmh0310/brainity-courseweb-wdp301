import React from "react";
import { Dialog, DialogContent } from "@mui/material";

const TeacherDialog = ({ open, teacher, onClose, onConfirm, onReject }) => {
  if (!teacher) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="relative">
        <div className="flex flex-col md:flex-row">
          {/* Left Sidebar */}
          <div className="bg-primary p-6 flex flex-col items-center w-full md:w-1/3">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">{teacher.name}</h2>
          </div>
          {/* Main Content */}
          <DialogContent className="p-6 space-y-4 w-full md:w-2/3">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-2">
                  Teacher Information
                </h3>
                <p>
                  <strong>Email:</strong> {teacher.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {teacher.phone}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-2">
                  Bio
                </h3>
                <p>{teacher.bio}</p>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-between md:justify-end space-x-4">
              <button
                className="bg-primary hover:bg-[#03ecbe] text-white   
                                      px-[40px] py-[9px] my-1 text-sm font-semibold  
                                      rounded-full backdrop-blur-md transition transform hover:scale-105"
                onClick={() => onConfirm(teacher.id)}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white   
                                      px-[40px] py-[9px] my-1 text-sm font-semibold  
                                      rounded-full backdrop-blur-md transition transform hover:scale-105"
                onClick={() => onReject(teacher.id)}
              >
                Reject
              </button>
            </div>
          </DialogContent>
        </div>
      </div>
    </Dialog>
  );
};

export default TeacherDialog;
