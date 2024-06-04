
const TeacherRequest = require('../models/blog')
const Course = require('../models/course')


const createTeacherRequest = async (req, res) => {
    const newTeacherRequest = new TeacherRequest(req.body)

    try {
        const savedTeacherRequest = await newTeacherRequest.save()

        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedTeacherRequest
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again"
        })
    }
}

const getTeacherRequestById = async (req, res) => {
    const blogId = req.params.blogId;

    try {
        const getTeacherRequestById = await TeacherRequest.findById(blogId)

        res.status(200).json({
            success: true,
            message: "Successfully get TeacherRequest",
            data: getTeacherRequestById
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get TeacherRequest. Try again"
        })
    }
}

const getTeacherRequestByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await TeacherRequest.find({author: userId})

        res.status(200).json({
            success: true,
            message: "Successfully get TeacherRequest",
            data: user.cart
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get TeacherRequest. Try again"
        })
    }
}

const deleteTeacherRequestById = async (req, res) => {
    const blogId = req.params.blogId;

    try {
        const deleteTeacherRequestById = await TeacherRequest.findByIdAndDelete(blogId)

        res.status(200).json({
            success: true,
            message: "Successfully deleted",
            data: deleteTeacherRequestById
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete. Try again"
        })
    }
}

module.exports = {
    createTeacherRequest,
    deleteTeacherRequestById,
    getTeacherRequestByUserId,
    getTeacherRequestById
}