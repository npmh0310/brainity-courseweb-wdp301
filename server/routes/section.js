var express = require('express');
const { createChapter, getAllChapter, updateChapter, deleteChapterById, getChapterCount, createChapterInCourse, getChapterById } = require('../controllers/sectionController');
// const { verifyAdmin } = require('../utils/verifyToken');

const sectionRouter = express.Router();

sectionRouter.get("/", getAllChapter);
sectionRouter.get("/:id", getChapterById);
sectionRouter.get("/search/getChapterCount", getChapterCount);
sectionRouter.post("/", createChapter);
sectionRouter.post("/:courseId", createChapterInCourse);
sectionRouter.put("/:id", updateChapter);
sectionRouter.delete("/:id", deleteChapterById);

module.exports = sectionRouter;