var express = require('express');
const { getCartByUserId, addCourseToCart, removeCourseFromCart, deleteCartById } = require('../controllers/cartController');
const { verifyUser } = require('../utils/verifyToken');

const cartRoute = express.Router();

cartRoute.get("/", verifyUser, getCartByUserId);
cartRoute.post("/", verifyUser, addCourseToCart, removeCourseFromCart);
cartRoute.delete("/", verifyUser, deleteCartById);


module.exports = cartRoute;