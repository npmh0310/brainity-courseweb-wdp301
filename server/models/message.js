var mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // required: true
        },
        chatRoom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatRoom',
        },
        content: {
            type: String
        }
    }
);

var Message = mongoose.model("Message", messageSchema);
module.exports = Message;
