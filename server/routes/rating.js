var express = require('express');
const { createRating } = require('../controllers/ratingController');
const { verify } = require('jsonwebtoken');
const { verifyAdmin, verifyTeacher, verifyUser } = require('../utils/verifyToken');


lessonRoute.post("/", verifyUser ,createRating);
