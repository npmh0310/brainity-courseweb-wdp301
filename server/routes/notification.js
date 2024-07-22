var express = require("express");
const {
  getAllNotificationByUserId,
  createNotification,
  addNotificationRoom,
  getRoomsByUserId,
  removeNotificationRoom,
  markAllNotiAsRead,
  markOneNotiAsRead,
  unMarkOneNotiAsRead,
} = require("../controllers/notificationController");
const { verify } = require("jsonwebtoken");
const { verifyUser } = require("../utils/verifyToken");

const notificationRoute = express.Router();
notificationRoute.get("/rooms", verifyUser, getRoomsByUserId);
notificationRoute.post("/addRoom", verifyUser, addNotificationRoom);
notificationRoute.post("/removeRoom", verifyUser, removeNotificationRoom);
notificationRoute.get("/", verifyUser, getAllNotificationByUserId);

notificationRoute.put("/markAllRead", verifyUser, markAllNotiAsRead);
notificationRoute.put("/markRead/:userNotificationId", markOneNotiAsRead);
notificationRoute.put("/unMarkRead/:userNotificationId", unMarkOneNotiAsRead);

module.exports = notificationRoute;
