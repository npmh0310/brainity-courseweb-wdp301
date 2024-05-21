
const Section = require('../models/section')
var Lesson = require('../models/lesson')



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