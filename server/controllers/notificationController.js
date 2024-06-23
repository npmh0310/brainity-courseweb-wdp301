
const Notification = require('../models/notification')
const UserNotification = require('../models/userNotification'); 
const User = require('../models/user')
const {io} = require("./../index")


const createNotification = async (userId, io, notification, recieveNotificaitonRooms) => {
    try {
        const newNotification = new Notification(notification)
        const newUserNotification = new UserNotification(
            {
                user: userId,
                notification: newNotification.id,
                read: false
            })

        // save in db
        await newNotification.save();
        await newUserNotification.save()
        // sending real-time
        for(let room of recieveNotificaitonRooms) {
            io.to(room).emit(notification.title, notification);
        }
    } catch (err) {
            console.log("Failed to create notification. Try again" + err )
    }
}

const getAllNotificationByUserId = async (req, res) => {
    const userId = req.user.id;

    try {
        const allNotification = await UserNotification.find({user : userId })
        .populate({
            path: 'notification',
        })

        res.status(200).json({
            success: true,
            message: "Successfully get all notification",
            data: allNotification
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get all notification. Try again"
        })
    }
}

const getRoomsByUserId = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId)

        res.status(200).json({
            success: true,
            message: "Successfully get all rooms",
            data: user.notificationRooms
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get all rooms. Try again" + err
        })
    }
}

const addNotificationRoom = async (req, res) => {
    try {
        const roomToAdd = req.body.room;
        const user = await User.findById(req.user.id);
        
        user.notificationRooms.push(roomToAdd);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Successfully get all",
            data: user.notificationRooms
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to add notification rooms. Try again" + err
        })
    }
}


const removeNotificationRoom = async (req, res) => {
    try {
        const roomToRemove = req.body.room;
        const user = await User.findById(req.user.id);

        user.notificationRooms = user.notificationRooms.filter(roomId => roomId.toString() !== roomToRemove);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Room removed successfully",
            data: user.notificationRooms
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to remove notification room. Try again" + err
        });
    }
}

const markAllNotiAsRead = async (req, res) => {
    const userId = req.user.id;

    try {
        await UserNotification.updateMany({ user: userId }, { read: true });
        return res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const markOneNotiAsRead = async (req, res) => {
    const userNotificationId = req.params.userNotificationId;
    try {
        const notification = await UserNotification.findById(userNotificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.read = true;
        await notification.save();

        return res.json({ message: 'Notification marked as read' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const unMarkOneNotiAsRead = async (req, res) => {
    const userNotificationId = req.params.userNotificationId;

    try {
        const notification = await UserNotification.findById(userNotificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.read = false;
        await notification.save();

        return res.json({ message: 'Notification marked as unread' });
    } catch (error) {
        return res.body.status(500).json({ message: 'Internal server error' });
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
    unMarkOneNotiAsRead
}