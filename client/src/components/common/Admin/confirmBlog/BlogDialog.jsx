import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { IoMdClose } from "react-icons/io";

const BlogDialog = ({ open, blog, onClose, onConfirm, onReject }) => {
  if (!blog) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <div className="relative">
        {/* Dialog Title */}
        <div className="bg-primary flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold  p-4 mx-1">{blog.title}</h2>
          <IconButton onClick={onClose}>
            <IoMdClose />
          </IconButton>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Main Content */}
          <DialogContent className="p-6 space-y-6 w-full overflow-y-auto max-h-[70vh]">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-4">
                  Blog Content
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap">{blog.content}</p>
                <p className="mt-4">
                  <strong>Uploaded By:</strong> {blog.uploadBy}
                </p>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-between md:justify-end space-x-4">
          <button
            className="bg-primary hover:bg-[#03ecbe] text-white   
                                      px-[40px] py-[9px] my-1 text-sm font-semibold  
                                      rounded-full backdrop-blur-md transition transform hover:scale-105"
            onClick={() => onConfirm(blog.id)}
          >
            Confirm
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white   
                                      px-[40px] py-[9px] my-1 text-sm font-semibold  
                                      rounded-full backdrop-blur-md transition transform hover:scale-105"
            onClick={() => onReject(blog.id)}
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

export default BlogDialog;
