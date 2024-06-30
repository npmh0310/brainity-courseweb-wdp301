const mongoose = require('mongoose');
const Lesson = require('../models/lesson')
const sectionSchema = new mongoose.Schema(
    {
        sectionName: {
            type: String,
            required: true
        },
        lessons: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson'
        }]
    }, { timestamps: true }
);

sectionSchema.pre('findByIdAndDelete', async function (next) {
    try {
        await Lesson.deleteMany({ _id: { $in: this.lessons } });
        next();
    } catch (error) {
        next(error);
    }
});

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section
