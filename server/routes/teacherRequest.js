var express = require('express');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken');
const teacherRequestRoute = express.Router();
const {getAllTeacherRequest, createTeacherRequest, approveTeacherRequest, resetTeacherRole }= require('../controllers/teacherRequestController');


// teacherRequestRoute.post("/requestTeacher/:userId", createTeacherRequest);
teacherRequestRoute.get("/",verifyAdmin, getAllTeacherRequest);
teacherRequestRoute.put("/approveRequest", verifyAdmin, approveTeacherRequest);
teacherRequestRoute.put("/resetTeacherRole", verifyAdmin, resetTeacherRole);

module.exports = teacherRequestRoute;
