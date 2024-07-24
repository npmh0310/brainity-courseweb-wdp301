var express = require('express');
const { createCourse,getCourseInHomePage, getAllCourse, getCourseById, updateCourse, deleteCourseById, getCourseCount,
    getCourseBySearch, getFeaturedCourse, getFreeCourse, getProCourse, getCourseOfTeacher,
    getCourseByName, enrollCourse, 
    getStudents,getAllCourseForConfirm, confirmCourse, rejectCourse, getCourseByPagination,
    getAllCourseNoLimit} = require('../controllers/courseController');
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
courseRoute.get("/getCourseById/:id", getCourseById);
courseRoute.get("/getStudents/:id",getStudents )
courseRoute.get("/page/getCoursePage", getCourseByPagination);
courseRoute.get("/getCourse/noLimit", getAllCourseNoLimit);
// teacher
courseRoute.get("/teacher/getCourse", verifyTeacher, getCourseOfTeacher);
courseRoute.post("/teacher/", verifyTeacher, createCourse);
courseRoute.put("/teacher/:id", verifyTeacher, updateCourse);
courseRoute.delete("/teacher/:id", verifyTeacher, deleteCourseById);
courseRoute.post("/getCourseByName", getCourseByName)
//admin
courseRoute.get("/confirm/getCourse", getAllCourseForConfirm);
courseRoute.put("/confirm/:courseId", confirmCourse);
courseRoute.put("/reject/:courseId",rejectCourse);
module.exports = courseRoute;
