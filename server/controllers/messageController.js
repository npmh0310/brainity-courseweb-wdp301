const mongoose = require('mongoose');
const Message = require('../models/message');


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
                    unreadCount: 1 // Include unreadCount in the projection
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
                unreadCount: msg.unreadCount // Include unreadCount in the response data
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// const getMessagesByRoomName = async (req, res) => {
//     const { roomName } = req.params;

//     try {
//         // Query messages by roomName
//         const messages = await Message.find({ chatRoom: roomName })
//             .populate('sender', 'username avatar') // Assuming sender is referenced and you want username and avatar
//             .sort({ createdAt: -1 }) // Sort by creation date descending
//             .exec();

//         res.status(200).json(messages);
//     } catch (error) {
//         console.error('Error fetching messages by room name:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

const getMessagesByRoomName = async (req, res) => {
    const { roomName } = req.params;
    const userId = req.user.id;
    console.log("userId: ", userId);

    try {
        const latestMessages = await Message.aggregate([
            { 
                $match: { chatRoom: roomName } // Filter messages by roomName
            },
            {
                $sort: { createdAt: -1 } // Sort messages by creation date in descending order
            },
            {
                $limit: 10 // Limit to 10 messages per room
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
                        $cond: { if: { $eq: ['$sender', userId] }, then: 'my', else: 'their' }
                    }
                }
            },
            {
                $group: {
                    _id: '$chatRoom',
                    roomName: { $first: '$chatRoom' },
                    avatarSrc: { $first: '$senderDetails.avatar' },
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
                    avatarSrc: 1,
                    name: 1,
                    messages: { $reverseArray: '$messages' } 
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: 'Successfully fetched 10 latest messages by room name',
            data: latestMessages
        });
    } catch (error) {
        console.error('Error fetching latest messages by room name:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getLatestMessages,
    getMessagesByRoomName
};
