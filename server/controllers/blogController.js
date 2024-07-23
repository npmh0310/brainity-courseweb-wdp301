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
    message: "You have just created ",
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

const updateStatusBlog = async (req, res) => {
  const blogId = req.params.id;
  const status = req.body.status;
  try {
    const updatedRequest = await Blog.findByIdAndUpdate(
      blogId,
      { isApproved: status },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Success ",
      data: updatedRequest,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Blog  not found by Id " + error.message,
    });
  }
};

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
    blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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

// Comment
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { content } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    blog.comments.push({ user: userId, content });
    await blog.save();
    const updatedBlog = await Blog.findById(id).populate({
      path: "comments.user",
      select: "username",
    });
    res.status(201).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const blog = await Blog.findById(id).populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User",
      },
    }); // Adjust the 'name' field as per your User model
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json(blog.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateComment = async (req, res) => {
  try {
    const { id, commentId } = req.params; // Blog ID and Comment ID
    const { content } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const comment = blog.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.content = content;
    await blog.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params; // Blog ID and Comment ID

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const comment = blog.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the comment using the pull method
    blog.comments.pull(commentId);
    await blog.save();

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  deleteBlogById,
  getBlogById,
  getAllBlog,
  getBlogByUser,
  addComment,
  getComments,
  updateComment,
  deleteComment,
  updateStatusBlog,
};
