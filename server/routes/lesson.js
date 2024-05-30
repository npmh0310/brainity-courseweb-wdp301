var express = require('express');
const { createLesson, getAllLesson, updateLesson, deleteLessonById, getLessonCount, createLessonInChapter } = require('../controllers/lessonController');
// const { verifyAdmin } = require('../utils/verifyToken');

const lessonRoute = express.Router();

lessonRoute.get("/", getAllLesson);
lessonRoute.get("/search/getLessonCount", getLessonCount);
lessonRoute.post("/", createLesson);
lessonRoute.post("/:chapterId", createLessonInChapter);
lessonRoute.put("/:id", updateLesson);
lessonRoute.delete("/:id", deleteLessonById);

module.exports = lessonRoute;