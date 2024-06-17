var mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // required: true
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        rate: {
            type: Number,
            min: 1,
            max: 5,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            } 
        }
    }
);

var Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
