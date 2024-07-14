var mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // required: true
        },
        chatRoom: {
            type: String,
        },
        content: {
            type: String
        },
        read: {
            type: Boolean,
            default: false    
        },
    },
  { timestamps: true }
);

var Message = mongoose.model("Message", messageSchema);
module.exports = Message;
