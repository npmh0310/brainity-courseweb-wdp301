var express = require('express');
const { createCourse,getCourseInHomePage, getAllCourse, getCourseById, updateCourse, deleteCourseById, getCourseCount,
    getCourseBySearch, getFeaturedCourse, getFreeCourse, getProCourse, getCourseOfTeacher,
    getCourseByName, enrollCourse } = require('../controllers/courseController');
const { verify } = require('jsonwebtoken');
const { verifyAdmin, verifyTeacher, verifyUser } = require('../utils/verifyToken');


const courseRoute = express.Router();
courseRoute.get("/", getAllCourse);
courseRoute.get("/homepage", getCourseInHomePage);
courseRoute.get("/search/getFeaturedCourse", getFeaturedCourse);
courseRoute.get("/search/getCourseBySearch", getCourseBySearch);
courseRoute.get("/search/getCourseCount", getCourseCount);
courseRoute.get("/getCourseFree", getFreeCourse);
courseRoute.get("/getCoursePro", getProCourse);
courseRoute.get("/:id", getCourseById);
courseRoute.post("/enrollment", verifyUser, enrollCourse);
courseRoute.post("/", verifyTeacher, createCourse);
courseRoute.put("/:id", updateCourse);
courseRoute.delete("/:id", deleteCourseById);
courseRoute.get("/getCourseById/:id", getCourseById);
// teacher
courseRoute.get("/teacher/getCourse", verifyTeacher, getCourseOfTeacher);
courseRoute.post("/teacher/", verifyTeacher, createCourse);
courseRoute.put("/teacher/:id", verifyTeacher, updateCourse);
courseRoute.delete("/teacher/:id", verifyTeacher, deleteCourseById);
courseRoute.post("/getCourseByName", getCourseByName)

module.exports = courseRoute;