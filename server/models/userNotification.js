const mongoose = require('mongoose');

const userNotificationSchema = new mongoose.Schema({
    user : { 
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User' 
    },
    notification : { 
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Notification' },
    read : { 
        type : Boolean,
        default : false 
    }
}, { timestamps: true });



const userNotification = mongoose.model('userNotification', userNotificationSchema);
module.exports = userNotification