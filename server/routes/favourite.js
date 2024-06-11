var express = require('express');
const { getFavouriteByUserId, addCourseToFavourite, removeCourseFromFavourite } = require('../controllers/favouriteController.js');
const { verifyUser } = require('../utils/verifyToken.js');
// const { verifyAdmin } = require('../utils/verifyToken');

const favouriteRoute = express.Router();

favouriteRoute.get("/", verifyUser, getFavouriteByUserId);
favouriteRoute.post("/", verifyUser, addCourseToFavourite, removeCourseFromFavourite);

module.exports = favouriteRoute;