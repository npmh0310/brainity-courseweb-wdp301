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


sectionSchema.post('findOneAndDelete', async function (doc ) {
    
    if (doc) {
        console.log('section to be removed:', doc.lessons);
        const lessonsRemove = doc.lessons;
        try {
            for (const lesson of lessonsRemove) {
                await Lesson.findByIdAndDelete(lesson);
            }
        } catch (error) {
            console.error('Error removing lessons:', error);
        }
    }
    
});

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section
