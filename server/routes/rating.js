var express = require("express");
const {
  createRating,
  getAvgRatingByCourseId,
  getAverageRatingByCourseId,
  getRatingByCourseId,
  getRatingCourse,
  getRatingByCourseIdSortStar,
} = require("../controllers/ratingController");
const { verify } = require("jsonwebtoken");
const {
  verifyAdmin,
  verifyTeacher,
  verifyUser,
} = require("../utils/verifyToken");

const ratingRoute = express.Router();

ratingRoute.post("/", verifyUser, createRating);
ratingRoute.get("/averageRating", getAvgRatingByCourseId);
ratingRoute.get("/ratingOfCourse/:id", getRatingCourse);
ratingRoute.get("/:courseId/averageRating", getAverageRatingByCourseId);
ratingRoute.get("/:courseId/ratings", getRatingByCourseId);
ratingRoute.get("/:courseId/ratingSortStar", getRatingByCourseIdSortStar);

module.exports = ratingRoute;
