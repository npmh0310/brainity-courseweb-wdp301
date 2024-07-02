const mongoose = require('mongoose');

const userChapterProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    lessonsProgress: [{
        index: {
            type: Number
        },
        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson'
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    }],
    isCompleted: {
        type: Boolean,
        default: false
    },
    progressPercentage: {
        type: Number,
        default: 0
    }
});

// Middleware to update progressPercentage before saving
userChapterProgressSchema.pre('save', function (next) {
    // Calculate progress percentage logic here
    // For example, you can calculate based on completed lessons and total lessons
    const totalLessons = this.lessonsProgress.length;
    const completedLessons = this.lessonsProgress.filter(lesson => lesson.completed).length;
    this.progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    next();
});

const UserChapterProgress = mongoose.model('UserChapterProgress', userChapterProgressSchema);

module.exports = UserChapterProgress;
