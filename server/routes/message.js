var express = require('express');
const { getLatestMessages, getMessagesByRoomName, markRoomChatAtRead } = require('../controllers/messageController.js');
const { verifyUser } = require('../utils/verifyToken.js');

const messageRoute = express.Router();

messageRoute.get("/previewMessages", getLatestMessages);
messageRoute.get("/:roomName",verifyUser, getMessagesByRoomName);
messageRoute.put("/markAllAsRead/:roomName", markRoomChatAtRead);


module.exports = messageRoute;