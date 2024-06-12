
const TeacherRequest = require('../models/teacherRequest')
const Course = require('../models/course')
const User = require('../models/user')


const createTeacherRequest = async (req, res) => {

    const newTeacherRequest = new TeacherRequest({
        user: req.params.userId
    })
    try {
        
        const user = await User.findById(req.params.userId);
        if(user.role !== "user") {
            return res.status(400).json({
                success: false,
                message: "Teacher request is already approved"
            });
        }

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
    const requestId = req.params.requestId;

    try {
        const deleteTeacherRequestById = await TeacherRequest.findByIdAndDelete(requestId)

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
        const existingRequest = await TeacherRequest.findById(requestId);

        if (!existingRequest) {
            return res.status(404).json({
                success: false,
                message: "Teacher request not found by Id " + requestId
            });
        }

        if (existingRequest.isApproved) {
            return res.status(400).json({
                success: false,
                message: "Teacher request is already approved"
            });
        }

        const updatedRequest = await TeacherRequest.findByIdAndUpdate(requestId, { isApproved: true }, { new: true });

        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: "Teacher request not found by Id " + requestId
            });
        }

        // Update the role of the user associated with the teacher request to 'teacher'
        if (updatedRequest.user) {
            const newUser = await User.findByIdAndUpdate(updatedRequest.user._id, { role: 'teacher' }, { new: true });
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



const getAllTeacherRequest = async (req, res) => {
    const page = parseInt(req.query.page)
    try {
        const teacherRequestList = await TeacherRequest.find({})
            .populate('user')
            .skip((page-1) * 8)
            .limit(8);

        res.status(200).json({
            success: true,
            count: teacherRequestList.length,
            message: "Successfully get all",
            data: teacherRequestList
            
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get all teacher request. Try again"
        })
    }
}

module.exports = {
    getAllTeacherRequest,
    createTeacherRequest,
    deleteTeacherRequestById,
    getTeacherRequestByUserId,
    getTeacherRequestById,
    approveTeacherRequest,
    resetTeacherRole,
    getAllTeacherRequest
}