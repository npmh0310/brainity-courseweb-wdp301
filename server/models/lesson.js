const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    videoUrl: {
        type: String,
        // required: true
    },
    lessonName: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    isFree: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        // required: true
    },
}, { timestamps: true });

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;