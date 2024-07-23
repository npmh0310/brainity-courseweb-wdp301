var express = require('express');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken');
const { enrollCourse, getAllCourseEnrolled, getTotalUser } = require('../controllers/userController');
const userRouter = express.Router()

userRouter.get('/courseEnrolled', verifyUser, getAllCourseEnrolled )
userRouter.put('/enroll/:id', verifyUser , enrollCourse)
userRouter.get('/getTotalDashboard', verifyAdmin, getTotalUser)

module.exports = userRouter