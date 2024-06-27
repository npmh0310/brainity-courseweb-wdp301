var mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // required: true
        },
        courses: [{
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            },
            later: {
                type: Boolean,
                default: true
            }
        }],
    }
);

var Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
