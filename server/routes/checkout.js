var express = require('express');
const { verifyUser } = require('../utils/verifyToken');
const { checkoutSuccess, checkoutATM } = require('../controllers/checkout');

const checkout = express.Router();

checkout.post("/", verifyUser, checkoutATM);

module.exports = checkout;