var express = require('express');
const { createRating, getAvgRatingByCourseId ,getAverageRatingByCourseId,getRatingByCourseId} = require('../controllers/ratingController');
const { verify } = require('jsonwebtoken');
const { verifyAdmin, verifyTeacher, verifyUser } = require('../utils/verifyToken');

const ratingRoute = express.Router();

ratingRoute.post("/", verifyUser ,createRating);
ratingRoute.get("/averageRating" ,getAvgRatingByCourseId);
ratingRoute.get("/:courseId/averageRating" ,getAverageRatingByCourseId);
ratingRoute.get('/:courseId/ratings', getRatingByCourseId);
module.exports = ratingRoute