var express = require('express');
const { submitLesson } = require('../controllers/userChapterProgressController');

const progressRoute = express.Router();

progressRoute.put("/submitLesson", submitLesson);


module.exports = progressRoute;