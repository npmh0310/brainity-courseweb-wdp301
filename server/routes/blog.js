var express = require('express');
const { verifyUser } = require('../utils/verifyToken');
const { getAllBlog, getBlogById, getBlogByUser, createBlog, deleteBlogById } = require('../controllers/blogController');

const blogRoute = express.Router();

blogRoute.get("/" , getAllBlog);
blogRoute.get("/blogUser", verifyUser, getBlogByUser)
blogRoute.get("/:id" , getBlogById);
blogRoute.delete('/:id' , verifyUser,deleteBlogById )
blogRoute.post("/", verifyUser, createBlog)

module.exports = blogRoute;