const UserChapterProgress = require("../models/UserChapterProgress");

const addProgress = async (user, course) => {
    for (const section of course.chapters) {
        const lessonIds = section.lessons.map(lesson => lesson._id);

        // Create a new progress document for the section's lessons
        const progress = new UserChapterProgress({
            user: user._id,
            course: course._id,
            lessonsProgress: lessonIds.map(lessonId => ({ lesson: lessonId, completed: false })),
            completed: false,
            progressPercentage: 0
        });

        await progress.save();
    }
}

const submitLesson = async (req, res) => {
    try {
        const { userId, courseId, lessonId } = req.body;

        if (!userId || !courseId || !lessonId) {
            return res.status(400).json({ message: 'User ID, Course ID, and Lesson ID are required' });
        }

        const progress = await UserChapterProgress.findOne({ user: userId, course: courseId });

        if (!progress) {
            return res.status(404).json({
                message: 'Progress not found'
            });
        }

        const lessonProgress = progress.lessonsProgress.find(lessonProgress => lessonProgress.lesson.toString() === lessonId);

        if (!lessonProgress) {
            return res.status(404).json({
                message: 'Lesson progress not found'
            });
        }

        lessonProgress.completed = true;

        const allLessonsCompleted = progress.lessonsProgress.every(lesson => lesson.completed);
        progress.completed = allLessonsCompleted;

        await progress.save();

        res.status(200).json({
            message: 'Lesson completed status updated successfully'
        });
    } catch (error) {
        console.error('Error updating lesson completed status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    submitLesson,
    addProgress
}
