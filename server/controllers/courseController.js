var Course = require('../models/course')

/// teacher CRUD
const createCourse = async (req, res) => {
    const userId = req.user.id;
    const newCourse = new Course(req.body)
    newCourse.instructor = userId;

    try {
        const savedCourse = await newCourse.save()

        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedCourse
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again"
        })
    }
}

const getCourseByName = async (req, res) => {
    const name = req.body
    // console.log(name)

    try {
        const savedCourse = await Course.findOne({ courseName: name.courseName })
            .populate({
                path: 'sections',
                populate: {
                    path: 'lessons',
                    model: 'Lesson' // Tên của mô hình Lesson
                }
            })
            .populate('categories')

        res.status(200).json({
            success: true,
            message: "Successfully get",
            data: savedCourse
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get. Try again"
        })
    }
}

const getCourseOfTeacher = async (req, res) => {
    const userId = req.user.id;
    // console.log(userId)
    const page = parseInt(req.query.page);

    try {
        const getAllCourseOfTeacher = await Course.find({ instructor: userId })
            // .populate({
            //     path: 'sections',
            //     populate: {
            //         path: 'lessons',
            //         model: 'Lesson' // Tên của mô hình Lesson
            //     }
            // })
            // .populate('categories')
            .skip(page * 8)
            .limit(8);

        res.status(200).json({
            success: true,
            count: getAllCourseOfTeacher.length,
            message: "Successfully get all of Teacher",
            data: getAllCourseOfTeacher
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get all course of teacher. Try again",
        })
    }
}

const updateCourse = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;

    try {
        const updateCourse = await Course.findOneAndUpdate(
            {
                _id: id,
                instructor: userId
            },
            { $set: req.body },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updateCourse
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update. Try again"
        })
    }
}

const deleteCourseById = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteCourseById = await Course.findOneAndDelete({
            _id: id,
            instructor: userId
        })

        res.status(200).json({
            success: true,
            message: "Successfully deleted",
            data: deleteCourseById
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete. Try again"
        })
    }
}

/// end teacher course CRUD

const getAllCourse = async (req, res) => {

    const page = parseInt(req.query.page)

    try {
        const getAllCourse = await Course.find({})
            // .populate({
            //     path: 'sections',
            //     populate: {
            //         path: 'lessons',
            //         model: 'Lesson' // Tên của mô hình Lesson
            //     }
            // })
            // .populate('categories')
            .skip(page * 8)
            .limit(8);

        res.status(200).json({
            success: true,
            count: getAllCourse.length,
            message: "Successfully get all",
            data: getAllCourse
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get all. Try again"
        })
    }
}

const getCourseById = async (req, res) => {
    const id = req.params.id;
    console.log(id)

    try {
        const getCourseById = await Course.findById(id)
            .populate({
                path: 'sections',
                populate: {
                    path: 'lessons',
                    model: 'Lesson' // Tên của mô hình Lesson
                }
            })
            .populate('categories')

        res.status(200).json({
            success: true,
            message: "Successfully get Course",
            data: getCourseById
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Failed to get Course. Try again"
        })
    }
}

const getFeaturedCourse = async (req, res) => {

    try {
        const getFtCourse = await Course.find({ featured: true })
            .populate('categories')
            .limit(8)

        res.status(200).json({
            success: true,
            message: "Successfully",
            data: getFtCourse
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed. Try again"
        })
    }
}

const getFreeCourse = async (req, res) => {

    try {
        const getFreeCourse = await Course.find({ isFree: true })
            .populate('categories')
            .limit(6)

        res.status(200).json({
            success: true,
            message: "Successfully",
            data: getFreeCourse
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed. Try again"
        })
    }
}

const getProCourse = async (req, res) => {

    try {
        const getProCourse = await Course.find({ isFree: false })
            .populate('categories')
            .limit(6)

        res.status(200).json({
            success: true,
            message: "Successfully",
            data: getProCourse
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed. Try again"
        })
    }
}

const getCourseBySearch = async (req, res) => {
    const search = new RegExp(req.query.city, 'i');

    try {
        const getCourses = await Course.find({ search }).populate('categories')

        res.status(200).json({
            success: true,
            message: "Successfully",
            data: getCourses
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed, Try again"
        })
    }
}

const getCourseCount = async (req, res) => {
    try {
        const CourseCount = await Course.estimatedDocumentCount()

        res.status(200).json({
            success: true,
            data: CourseCount
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch. Try again"
        })
    }
}

module.exports = {
    createCourse,
    deleteCourseById,
    getAllCourse,
    getCourseById,
    updateCourse,
    getFeaturedCourse,
    getCourseBySearch,
    getCourseCount,
    getFreeCourse,
    getProCourse,
    getCourseOfTeacher,
    getCourseByName
}