
const Section = require('../models/section')
var Lesson = require('../models/lesson')
const Course = require('../models/course')
const UserChapterProgress = require('../models/UserChapterProgress');



const createLesson = async (req, res) => {
    const newLesson = new Lesson(req.body)

    try {
        const savedLesson = await newLesson.save()

        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedLesson
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again"
        })
    }
}

const createLessonInChapter = async (req, res) => {
    const chapterId = req.params.chapterId;
    const newLesson = new Lesson({ ...req.body })

    try {
        const savedLesson = await newLesson.save()

        await Section.findByIdAndUpdate(chapterId, {
            $push: { lessons: savedLesson._id }
        })

        const courses = await Course.find({ sections: chapterId });
        if (!courses || courses.length === 0) {
            throw new Error("No courses found with the given chapterId");
        }

        // Duyệt qua từng khóa học để tìm UserChapterProgress
        for (const course of courses) {
            const listUserProgress = await UserChapterProgress.find({ course: course._id });

            for (const userProgress of listUserProgress) {
                // Tính index lớn nhất
                const maxIndex = Math.max(...userProgress.lessonsProgress.map(lesson => lesson.index));

                // Thêm bài học mới vào lessonsProgress
                userProgress.lessonsProgress.push({
                    index: maxIndex + 1,
                    lesson: savedLesson._id, // Giả sử newLesson là một ID hợp lệ
                    isCompleted: false
                });

                // Lưu lại tài liệu đã cập nhật
                await userProgress.save();
            }
        }

        console.log("Successfully added new lesson to user progress.");

        res.status(200).json({
            success: true,
            message: "Successfully Lession submitted",
            data: savedLesson
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to submit. Try again"
        })
    }
}

const getAllLesson = async (req, res) => {

    try {
        const AllLesson = await Lesson.find({})

        res.status(200).json({
            success: true,
            count: AllLesson.length,
            message: "Successfully get all",
            data: AllLesson
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get all. Try again"
        })
    }
}

const getLessonById = async (req, res) => {
    const id = req.params.id;

    try {
        const getLessonById = await Lesson.findById(id)

        res.status(200).json({
            success: true,
            message: "Successfully get Lesson",
            data: getLessonById
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get Lesson. Try again"
        })
    }
}

const updateLesson = async (req, res) => {
    const id = req.params.id;

    try {
        const updateLesson = await Lesson.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updateLesson
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update. Try again"
        })
    }
}

const deleteLessonById = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteLessonById = await Lesson.findByIdAndDelete(id)


        res.status(200).json({
            success: true,
            message: "Successfully deleted",
            data: deleteLessonById
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete. Try again"
        })
    }
}

const getLessonCount = async (req, res) => {
    try {
        const LessonCount = await Lesson.estimatedDocumentCount()

        res.status(200).json({
            success: true,
            data: LessonCount
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch. Try again"
        })
    }
}

module.exports = {
    createLesson,
    deleteLessonById,
    getAllLesson,
    getLessonById,
    updateLesson,
    getLessonCount,
    createLessonInChapter
}