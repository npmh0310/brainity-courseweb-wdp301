var mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema(
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
        rate: Number 
    }
);

var Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
