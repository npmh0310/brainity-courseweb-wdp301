var express = require('express');
const { getLatestMessages, getMessagesByRoomName } = require('../controllers/messageController.js');
const { verifyUser } = require('../utils/verifyToken.js');

const messageRoute = express.Router();

messageRoute.get("/previewMessages", getLatestMessages);
messageRoute.get("/:roomName",verifyUser, getMessagesByRoomName);


module.exports = messageRoute;