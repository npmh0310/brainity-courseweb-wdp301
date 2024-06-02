
const TeacherRequest = require('../models/teacherRequest')
const Course = require('../models/course')


const createTeacherRequest = async (req, res) => {

    const newTeacherRequest = new TeacherRequest({
        user: req.user
    })

    try {
        const savedTeacherRequest = await newTeacherRequest.save()

        res.status(200).json({
            success: true,
            message: "Successfully send teacher request",
            data: savedTeacherRequest
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to send request. Try again"
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
        const teacherRequest = await TeacherRequest.find({user: userId})

        res.status(200).json({
            success: true,
            message: "Successfully get TeacherRequest",
            data: teacherRequest
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

const approveTeacherRequest = async (req, res) => {
    const requestId = req.body.requestId; // Assuming requestId is passed in the request parameters
    try {
        const updatedRequest = await TeacherRequest.findByIdAndUpdate(requestId, { isApproved: true }, { new: true });

        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: "Teacher request not found by Id " + requestId
            });
        }

        return res.status(200).json({
            success: true,
            message: "Teacher request approved successfully",
            data: updatedRequest
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to approve teacher request. Try again"
        });
    }
}

const resetTeacherRole = async (req, res) => {
    const requestId = req.body.requestId; // Assuming requestId is passed in the request parameters
    try {
        const updatedRequest = await TeacherRequest.findByIdAndUpdate(requestId, { isApproved: false }, { new: true });

        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: "Teacher request not found by Id " + requestId
            });
        }

        return res.status(200).json({
            success: true,
            message: "Teacher reset into user successfully",
            data: updatedRequest
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to reset teacher role. Try again"
        });
    }
} 

module.exports = {
    createTeacherRequest,
    deleteTeacherRequestById,
    getTeacherRequestByUserId,
    getTeacherRequestById,
    approveTeacherRequest,
    resetTeacherRole
}