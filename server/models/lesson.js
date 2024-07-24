const mongoose = require('mongoose');
const UserChapterProgress = require('../models/UserChapterProgress');

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

const removeLessonFromAllProgress = async (lessonIdToRemove) => {
    try {
      const result = await UserChapterProgress.updateMany(
        {},
        { $pull: { lessonsProgress: { lesson: lessonIdToRemove } } }
      );
      console.log(`${result} tài liệu đã được cập nhật.`);
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
    }
  };
  
lessonSchema.post('findOneAndDelete', function (doc ) {
    console.log('Lesson to be removed:', doc._id);
    removeLessonFromAllProgress(doc._id)
    
});



const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;