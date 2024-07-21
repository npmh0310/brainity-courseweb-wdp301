const Blog = require("../models/blog");
const Course = require("../models/course");
const { createNotification } = require("./notificationController");

const createBlog = async (req, res) => {
  const userId = req.user.id;
  const newBlog = new Blog(req.body);
  newBlog.author = userId;
  const rooms = [`room_profile_${req.user.id}`];
  const notification = {
    title: "system",
    sender: userId,
    name: "a new blog",
    message:
      "You have just created ",
    type: "blog",
    link: "/myblog",
    image: "https://img.upanh.tv/2024/07/21/logo11.jpg",
  };
  createNotification(req.user.id, res.io, notification, rooms);
  
  try {
    const savedBlog = await newBlog.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedBlog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
};

const getBlogById = async (req, res) => {
  const blogId = req.params.id;

  try {
    const getBlogById = await Blog.findById(blogId)
      .populate({
        path: "author",
        select: "name avatar",
      })
      .populate("categories");

    res.status(200).json({
      success: true,
      message: "Successfully get Blog",
      data: getBlogById,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get Blog. Try again",
    });
  }
};

// const getBlogByUserId = async (req, res) => {
//     // const userId = req.user.id;
//     try {
//         // const bloguser = await Blog.find({author: userId})

//         res.status(200).json({
//             success: true,
//             message: "Successfully get Blog",
//             data: bloguser
//         })
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to get Blog. Try again"
//         })
//     }
// }

const deleteBlogById = async (req, res) => {
  const blogId = req.params.id;

  try {
    const deleteBlogById = await Blog.findByIdAndDelete(blogId);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
      data: deleteBlogById,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete. Try again",
    });
  }
};

const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().populate({
      path: "author",
      select: "name avatar",
    });
    res.status(200).json({
      blogs: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get all. Try again",
    });
  }
};

const getBlogByUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const blogs = await Blog.find({ author: userId }).populate({
      path: "author",
      select: "name avatar",
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get all. Try again",
    });
  }
};

module.exports = {
  createBlog,
  deleteBlogById,
  getBlogById,
  getAllBlog,
  getBlogByUser,
};
