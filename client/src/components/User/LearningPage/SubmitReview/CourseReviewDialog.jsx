import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { postRating } from "../../../../fetchData/Rating";
import { Rating } from "@mui/material";
import toast from "react-hot-toast";

const CourseReviewDialog = ({
  course,
  courseId,
  onSubmit,
  onClose,
  setToastMessage,
  setToastSeverity,
  setToastOpen,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleSubmit = async () => {
    if (rating < 1 || rating > 5) {
      setToastOpen(false); // Close the toast before setting a new message
      toast.success("Please select a rating between 1 and 5.");
      return;
    }
    try {
      const review = { courseId, rating: rating, comment };
      const response = await postRating(review);
      onSubmit(response.data);
      setComment("");
      onClose();
      setToastOpen(false); // Close the toast before setting a new message
      toast.success("Review submitted successfully");
    } catch (error) {
      toast.success("Error submitting review");
    }
  };

  const handleCancel = () => {
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        &#8203;
      </span>
      <div className="inline-block align-bottom bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:text-left w-full">
              <h3 className="text-xl text-center leading-6 font-medium text-gray-900 mb-2">
                Review <span>"{course.courseName}"</span>
              </h3>
              <div className="flex justify-center items-center space-x-2 py-3">
                <Rating
                  name="half-rating"
                  value={rating}
                  precision={1}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  size="large"
                />
              </div>
              <textarea
                className="mt-4 border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                rows="3"
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-x-2">
          <button
            onClick={handleSubmit}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-7 py-2 bg-primary text-base font-medium text-white hover:bg-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Submit
          </button>
          <button
            onClick={handleCancel}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-7 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewDialog;
