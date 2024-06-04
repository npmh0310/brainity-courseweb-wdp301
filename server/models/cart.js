var mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // required: true
        },
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }],
    }
);

var Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
