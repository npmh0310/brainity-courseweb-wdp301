
const Blog = require('../models/blog')
const Course = require('../models/course')


const createBlog = async (req, res) => {
    const newBlog = new Blog(req.body)

    try {
        const savedBlog = await newBlog.save()

        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedBlog
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again"
        })
    }
}

const getBlogById = async (req, res) => {
    const blogId = req.params.blogId;

    try {
        const getBlogById = await Blog.findById(blogId)

        res.status(200).json({
            success: true,
            message: "Successfully get Blog",
            data: getBlogById
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get Blog. Try again"
        })
    }
}

const getBlogByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await Blog.find({author: userId})

        res.status(200).json({
            success: true,
            message: "Successfully get Blog",
            data: user.cart
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get Blog. Try again"
        })
    }
}

const deleteBlogById = async (req, res) => {
    const blogId = req.params.blogId;

    try {
        const deleteBlogById = await Blog.findByIdAndDelete(blogId)

        res.status(200).json({
            success: true,
            message: "Successfully deleted",
            data: deleteBlogById
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete. Try again"
        })
    }
}

module.exports = {
    createBlog,
    deleteBlogById,
    getBlogByUserId,
    getBlogById
}