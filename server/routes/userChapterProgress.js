var express = require('express');
const { submitLesson, addProgress, getLessonsProgressUser, completeLesson, completeCourse } = require('../controllers/userChapterProgressController');
const { verifyUser } = require('../utils/verifyToken');

const progressRoute = express.Router();

progressRoute.put("/submitLesson", submitLesson);
progressRoute.post("/addCourseProgress/:id" ,verifyUser, addProgress )
progressRoute.get("/getLessonsProgressUser/:id" ,verifyUser, getLessonsProgressUser )
progressRoute.put("/completedLesson" , verifyUser, completeLesson)
progressRoute.put("/completedCourse" , verifyUser, completeCourse )


module.exports = progressRoute;