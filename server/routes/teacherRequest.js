var express = require('express');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken');
const teacherRequestRoute = express.Router();
const {getAllTeacherRequest, createTeacherRequest, approveTeacherRequest, resetTeacherRole }= require('../controllers/teacherRequestController');


teacherRequestRoute.get("/", verifyAdmin, getAllTeacherRequest);
teacherRequestRoute.post("/requestTeacher/:userId", createTeacherRequest);
teacherRequestRoute.put("/approveRequest", verifyAdmin, approveTeacherRequest);
teacherRequestRoute.put("/resetTeacherRole", verifyAdmin, resetTeacherRole);

module.exports = teacherRequestRoute;
