var express = require('express');
const { createRating, getAvgRatingByCourseId } = require('../controllers/ratingController');
const { verify } = require('jsonwebtoken');
const { verifyAdmin, verifyTeacher, verifyUser } = require('../utils/verifyToken');

const ratingRoute = express.Router();

ratingRoute.post("/", verifyUser ,createRating);
ratingRoute.get("/averageRating" ,getAvgRatingByCourseId);

module.exports = ratingRoute