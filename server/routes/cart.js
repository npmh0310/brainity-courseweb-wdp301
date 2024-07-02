var express = require('express');
const { getCartByUserId, addCourseToCart, removeCourseFromCart, deleteCartById, updateCourseInCart } = require('../controllers/cartController');
const { verifyUser } = require('../utils/verifyToken');

const cartRoute = express.Router();

cartRoute.get("/", verifyUser, getCartByUserId);
cartRoute.put("/add", verifyUser, addCourseToCart);
cartRoute.put("/remove" , verifyUser , removeCourseFromCart)
cartRoute.delete("/", verifyUser, deleteCartById);
cartRoute.put("/update", verifyUser, updateCourseInCart )


module.exports = cartRoute;