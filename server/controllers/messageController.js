const mongoose = require('mongoose');
const Message = require('../models/message');
const User = require('../models/user');

const getLatestMessages = async (req, res) => {
    try {
        const latestMessages = await Message.aggregate([
            {
                $sort: { createdAt: -1 } // Sort messages by creation date in descending order
            },
            {
                $group: {
                    _id: "$chatRoom", // Group by chatRoom
                    latestMessage: { $first: "$$ROOT" }, // Get the latest message in each group
                    unreadCount: { $sum: { $cond: [ { $eq: ["$read", false] }, 1, 0 ] } } // Count unread messages
                }
            },
            {
                $sort: { 'latestMessage.createdAt': -1 } // Sort by the latest message date
            },
            {
                $limit: 10 // Limit to 10 chat rooms
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'latestMessage.sender',
                    foreignField: '_id',
                    as: 'latestMessage.sender'
                }
            },
            {
                $unwind: '$latestMessage.sender' // Unwind the sender array
            },
            {
                $addFields: {
                    otherUserId: {
                        $convert: {
                            input: { $arrayElemAt: [{ $split: ['$_id', '_'] }, 1] },
                            to: 'objectId',
                            onError: null,
                            onNull: null
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'otherUserId',
                    foreignField: '_id',
                    as: 'otherUserDetails'
                }
            },
            {
                $unwind: {
                    path: '$otherUserDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    avatarSrc: '$otherUserDetails.avatar',
                    otherUserUsername: '$otherUserDetails.username'
                }
            },
            {
                $project: {
                    _id: 0,
                    chatRoom: '$_id', // Include the chatRoom identifier
                    _id: '$latestMessage._id',
                    content: '$latestMessage.content',
                    createdAt: '$latestMessage.createdAt',
                    sender: {
                        _id: '$latestMessage.sender._id',
                        role: '$latestMessage.sender.role',
                        avatar: '$latestMessage.sender.avatar',
                        username: '$latestMessage.sender.username'
                    },
                    unreadCount: 1, // Include unreadCount in the projection
                    avatarSrc: 1, // Include avatarSrc in the projection
                    otherUserUsername: 1 // Include otherUserUsername in the projection
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: "Successfully get 10 latest message",
            data: latestMessages.map(msg => ({
                _id: msg._id,
                sender: msg.sender,
                content: msg.content,
                createdAt: msg.createdAt,
                chatRoom: msg.chatRoom,
                unreadCount: msg.unreadCount, // Include unreadCount in the response data
                avatarSrc: msg.avatarSrc, // Include avatarSrc in the response data
                otherUserUsername: msg.otherUserUsername // Include otherUserUsername in the response data
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getMessagesByRoomName = async (req, res) => {
    const { roomName } = req.params;
    const senderId = new mongoose.Types.ObjectId(req.user.id); // Convert senderId to ObjectId
    const otherUserId = new mongoose.Types.ObjectId(roomName.split('_')[1]);

    // Extract pagination parameters
    const page = parseInt(req.query.page); // Default to page 1 if not provided
    const size = parseInt(req.query.size); // Default to size 10 if not provided
    console.log("page: ", page + "size: ", size)
    const skip = (page - 1) * size;

    try {
        const latestMessages = await Message.aggregate([
            { 
                $match: { chatRoom: roomName } // Filter messages by roomName
            },
            {
                $sort: { createdAt: -1 } // Sort messages by creation date in descending order
            },
            {
                $skip: skip // Skip messages for pagination
            },
            {
                $limit: size // Limit to 10 messages per page
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'sender',
                    foreignField: '_id',
                    as: 'senderDetails'
                }
            },
            {
                $unwind: '$senderDetails' // Unwind the senderDetails array
            },
            {
                $addFields: {
                    type: {
                        $cond: { if: { $eq: ['$sender', senderId] }, then: 'my', else: 'their' }
                    }
                }
            },
            {
                $group: {
                    _id: '$chatRoom',
                    roomName: { $first: '$chatRoom' },
                    name: { $first: '$senderDetails.username' },
                    messages: {
                        $push: {
                            senderId: '$sender',
                            content: '$content',
                            type: '$type' // Add the computed type field
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    roomName: 1,
                    name: 1,
                    messages: { $reverseArray: '$messages' } // Reverse the messages array
                }
            }
        ]);

        // Fetch avatarSrc and otherUsername from the other user
        const otherUser = await User.findById(otherUserId).select('avatar username');
        const avatarSrc = otherUser ? otherUser.avatar : '';
        const otherUsername = otherUser ? otherUser.username : '';

        // Add avatarSrc and otherUsername to the result
        if (latestMessages.length > 0) {
            latestMessages[0].avatarSrc = avatarSrc;
            latestMessages[0].otherUsername = otherUsername;
        }

        res.status(200).json({
            success: true,
            message: 'Successfully fetched messages by room name',
            data: latestMessages
        });
    } catch (error) {
        console.error('Error fetching messages by room name:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const markRoomChatAtRead = async (req, res) => {
    const { roomName } = req.params;
    try {
        // Kiểm tra có bao nhiêu tin nhắn trước khi update
        const result = await Message.updateMany(
            { 
                chatRoom: roomName,
                read: false
            },
            { 
                $set: { read: true } 
            }
        );

        if (result.nModified > 0) {
            res.status(200).json({
                success: true,
                message: `Marked ${result.nModified} messages as read in room ${roomName}`,
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'No messages to mark as read',
            });
        }
    } catch (error) {
        console.error('Error marking messages as read:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    getLatestMessages,
    getMessagesByRoomName,
    markRoomChatAtRead
};
