
const e = require('express')
var Course = require('../models/course')
const User = require('../models/user')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


const createCourse = async (req, res) => {
    const newCourse = new Course({instructor: req.user.id, ...req.body})
    console.log(newCourse)
    try {
        const savedCourse = await newCourse.save()
        console.log(savedCourse)
        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedCourse
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again" + err
        })
    }
}

const getAllCourse = async (req, res) => {

    const page = parseInt(req.query.page)

    try {
        const getAllCourse = await Course.find({})
            // .populate({
            //     path: 'section',
            //     populate: {
            //         path: 'sections',
            //         model: 'Section' // Tên của mô hình Lesson
            //     }
            // })
            .populate('categories')
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
            message: "Failed to get all. Try again. Details:  " + err.message
        })
    }
}

const getCourseById = async (req, res) => {
    const id = req.params.id;

    try {
        const getCourseById = await Course.findById(id)
            .populate({
                path: 'chapters',
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

const updateCourse = async (req, res) => {
    const id = req.params.id;

    try {
        const updateCourse = await Course.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })

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
        const deleteCourseById = await Course.findByIdAndDelete(id)

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

const getCourseNumOfEnrolled = async (courseId) => {
        const course = new mongoose.Types.ObjectId(courseId);

        const result = await User.aggregate([
            {
                $match: { coursesEnrolled: { $in: [course] } }
            },
            {
                $group: {
                    _id: null,  
                    count: { $sum: 1 }
                }
            }
        ]).exec();
        return result[0] ? result[0].count : 1
};

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
    getCourseNumOfEnrolled
}