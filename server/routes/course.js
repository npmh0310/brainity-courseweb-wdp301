var express = require('express');
const { createCourse, getAllCourse, getCourseById, updateCourse, deleteCourseById, getCourseCount,
    getCourseBySearch, getFeaturedCourse, getFreeCourse, getProCourse, getCourseOfTeacher,
    getCourseByName } = require('../controllers/courseController');
const { verify } = require('jsonwebtoken');
const { verifyAdmin, verifyTeacher, verifyUser } = require('../utils/verifyToken');


const courseRoute = express.Router();

courseRoute.get("/", getAllCourse);
courseRoute.get("/search/getFeaturedCourse", getFeaturedCourse);
courseRoute.get("/search/getCourseBySearch", getCourseBySearch);
courseRoute.get("/search/getCourseCount", getCourseCount);
courseRoute.get("/getCourseFree", getFreeCourse);
courseRoute.get("/getCoursePro", getProCourse);
courseRoute.get("/getCourseById/:id", getCourseById);
// teacher
courseRoute.get("/teacher/getCourse", verifyTeacher, getCourseOfTeacher);
courseRoute.post("/teacher/", verifyTeacher, createCourse);
courseRoute.put("/teacher/:id", verifyTeacher, updateCourse);
courseRoute.delete("/teacher/:id", verifyTeacher, deleteCourseById);
courseRoute.post("/getCourseByName", getCourseByName)

module.exports = courseRoute;