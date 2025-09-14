var mongoose = require('mongoose')

const chatRoomSchema = new mongoose.Schema(
    {
        members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    }
);

var ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
module.exports = ChatRoom;
