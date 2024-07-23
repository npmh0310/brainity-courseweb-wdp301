var express = require('express');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');
const { getAllBlog, getBlogById, getBlogByUser, createBlog, deleteBlogById, addComment,
    getComments,
    updateComment,
    deleteComment, 
    updateStatusBlog} = require('../controllers/blogController');

const blogRoute = express.Router();

blogRoute.get("/" , getAllBlog);
blogRoute.get("/blogUser", verifyUser, getBlogByUser)
blogRoute.get("/:id" , getBlogById);
blogRoute.delete('/:id' , verifyUser,deleteBlogById )
blogRoute.post("/", verifyUser, createBlog)
blogRoute.put("/:id", verifyAdmin, updateStatusBlog)

blogRoute.post('/:id/comments',verifyUser, addComment);
blogRoute.get('/:id/comments',verifyUser, getComments);
blogRoute.put('/:id/comments/:commentId',verifyUser, updateComment);
blogRoute.delete('/:id/comments/:commentId',verifyUser, deleteComment);
module.exports = blogRoute;