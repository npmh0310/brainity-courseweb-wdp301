import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import parse from "html-react-parser";
import { formatDate2 } from "../../../function/function";
import {
  Eye,
  MessageCircleMore,
  Heart,
  Share2,
  Facebook,
  Twitter,
  Link2,
  SendHorizontal,
} from "lucide-react";
import { updateBlogStatus } from "../../../fetchData/Blog";
import toast from "react-hot-toast";
const BlogDialog = ({ open, blog, onClose, fetchData }) => {
  const onConfirm = async (blogId) => {
    try {
      const response = await updateBlogStatus(blogId, "Confirmed");
      if (response.data.success) {
        toast.success("The blog has been accepted");
        onClose(false);
        fetchData();
      } else {
        toast.error("Failed to confirm blog");
        onClose(false);
      }
    } catch (error) {
      console.error("Error confirming blog:", error);
      toast.error("Fail....");
      onClose(false);
    }
  };

  const onReject = async (blogId) => {
    try {
      const response = await updateBlogStatus(blogId, "Rejected");
      if (response.data.success) {
        toast.success("The blog has been rejected");
        onClose(false);
        fetchData();
      } else {
        toast.error("Failed to reject blog");
        onClose(false);
      }
    } catch (error) {
      console.error("Error rejecting blog:", error);
      toast.error("Fail....");
      onClose(false);
    }
  };
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
          <DialogContent className="py-10 px-7 space-y-6 w-full overflow-y-auto max-h-[70vh]">
            {blog && (
              <div>
                <div className="flex lg:flex-row justify-between mb-4 lg:mb-4">
                  <div className="flex items-center gap-3 mb-4 lg:mb-0">
                    <img
                      src={blog.author.avatar}
                      className=" w-10 h-10 object-cover rounded-full"
                      alt=""
                    />
                    <div className="flex gap-2 lg:gap-4 text-xs lg:text-sm">
                      <li className="list-none">{blog.author.name}</li>
                      <li>{formatDate2(blog.createdAt)}</li>
                    </div>
                  </div>
                  <div className="">
                    <Share2 size="16px" className="lg:size-20px" />
                  </div>
                </div>

                <div className="block pt-4">
                  <div className="pb-8 border-b-2">
                    <p className="font-medium text-base lg:text-lg pb-4 lg:pb-8 text-left">
                      {blog.description}
                    </p>
                    <img
                      src={blog.imgUrl}
                      alt="img"
                      className="w-full lg:w-1/2 h-auto mx-auto pb-4 lg:pb-8"
                    />
                    {/* <p className="font-bold text-lg lg:text-1xl text-left italic pb-4 lg:pb-8">
                      {parse(blog.content)}
                    </p> */}
                    <p className="pb-4 lg:pb-8 text-sm lg:text-base">
                      {parse(blog.content)}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Buttons */}
            <div className="flex justify-between md:justify-end space-x-4">
              <button
                className="bg-primary hover:bg-[#03ecbe] text-white   
                                      px-[40px] py-[9px] my-1 text-sm font-semibold  
                                      rounded-full backdrop-blur-md transition transform hover:scale-105"
                onClick={() => onConfirm(blog._id)}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white   
                                      px-[40px] py-[9px] my-1 text-sm font-semibold  
                                      rounded-full backdrop-blur-md transition transform hover:scale-105"
                onClick={() => onReject(blog._id)}
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
