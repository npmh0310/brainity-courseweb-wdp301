const Notification = require("../models/notification");
const UserNotification = require("../models/userNotification");
const User = require("../models/user");
const { io } = require("./../index");

const createNotification = async (
  userId,
  io,
  notification,
  recieveNotificationRooms
) => {
  try {
    const newNotification = new Notification(notification);
    const users = await User.aggregate([
      {
        $match: {
          notificationRooms: { $exists: true, $ne: [] },
        },
      },
      {
        $project: {
          _id: 1,
          notificationRooms: 1,
          recieveNotificationRooms: 1,
          commonRoom: {
            $setIntersection: ["$notificationRooms", recieveNotificationRooms],
          },
        },
      },
      {
        $match: {
          commonRoom: { $ne: [] },
        },
      },
    ]);

    // Hàm async để lưu UserNotification
    const saveUserNotifications = async () => {
      for (const user of users) {
        const newUserNotification = new UserNotification({
          user: user._id,
          notification: newNotification.id,
          read: false,
        });
        await newUserNotification.save();
      }
    };

    await saveUserNotifications();

    // Lưu notification mới vào cơ sở dữ liệu
    await newNotification.save();

    // Gửi thông báo thời gian thực
    for (let room of recieveNotificationRooms) {
      io.to(room).emit(notification.title, notification);
    }
  } catch (err) {
    console.log("Failed to create notification. Try again: " + err);
  }
};

const getAllNotificationByUserId = async (req, res) => {
  const userId = req.user.id;
  try {
    // Lấy tất cả thông báo của người dùng
    const allNotifications = await UserNotification.find({
      user: userId,
    })
      .populate({
        path: "notification",
      })
      .sort({ createdAt: -1 });

    // Đếm số lượng thông báo chưa đọc
    const unreadCount = await UserNotification.countDocuments({
      user: userId,
      read: false,
    });

    res.status(200).json({
      success: true,
      message: "Successfully retrieved notifications and unread count",
      count: {
        total: allNotifications.length,
        unread: unreadCount,
      },
      data: allNotifications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get notifications and unread count. Try again",
    });
  }
};

const getRoomsByUserId = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "Successfully get all rooms",
      data: user.notificationRooms,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get all rooms. Try again" + err,
    });
  }
};

const addNotificationRoom = async (req, res) => {
  try {
    const roomToAdd = req.body.room;
    const user = await User.findById(req.user.id);

    user.notificationRooms.push(roomToAdd);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Successfully get all",
      data: user.notificationRooms,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add notification rooms. Try again" + err,
    });
  }
};

const removeNotificationRoom = async (req, res) => {
  try {
    const roomToRemove = req.body.room;
    const user = await User.findById(req.user.id);

    user.notificationRooms = user.notificationRooms.filter(
      (roomId) => roomId.toString() !== roomToRemove
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: "Room removed successfully",
      data: user.notificationRooms,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to remove notification room. Try again" + err,
    });
  }
};

const markAllNotiAsRead = async (req, res) => {
  const userId = req.user.id;

  try {
    await UserNotification.updateMany({ user: userId }, { read: true });
    return res.json({ message: "All notifications marked as read" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const markOneNotiAsRead = async (req, res) => {
  const userNotificationId = req.params.userNotificationId;
  try {
    const notification = await UserNotification.findById(userNotificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.read = true;
    await notification.save();
    
    return res.json({ message: "Notification marked as read" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const unMarkOneNotiAsRead = async (req, res) => {
  const userNotificationId = req.params.userNotificationId;

  try {
    const notification = await UserNotification.findById(userNotificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.read = false;
    await notification.save();

    return res.json({ message: "Notification marked as unread" });
  } catch (error) {
    return res.body.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllNotificationByUserId,
  createNotification,
  addNotificationRoom,
  markOneNotiAsRead,
  getRoomsByUserId,
  removeNotificationRoom,
  markAllNotiAsRead,
  markOneNotiAsRead,
  unMarkOneNotiAsRead,
};
