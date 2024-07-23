var mongoose = require("mongoose");

// Define the comment schema with timestamps
const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
  },
  { timestamps: true }
);

// Define the blog schema
const blogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    comments: [commentSchema], // Use the comment schema
    imgUrl: {
      type: String,
    },
    isApproved: {
      type: String,
      required: true,
      enum: ["Pending", "Confirmed", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

var Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
