var express = require('express');
const { createRating, getAvgRatingByCourseId, getRatingCourse } = require('../controllers/ratingController');
const { verify } = require('jsonwebtoken');
const { verifyAdmin, verifyTeacher, verifyUser } = require('../utils/verifyToken');

const ratingRoute = express.Router();

ratingRoute.post("/", verifyUser ,createRating);
ratingRoute.get("/averageRating" ,getAvgRatingByCourseId);
ratingRoute.get("/ratingOfCourse/:id" ,getRatingCourse);

module.exports = ratingRoute