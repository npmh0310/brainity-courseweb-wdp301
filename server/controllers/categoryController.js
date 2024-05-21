
var Category = require('../models/category')
const Course = require('../models/course')


const createCategory = async (req, res) => {
    const newCategory = new Category(req.body)

    try {
        const savedCategory = await newCategory.save()

        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedCategory
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again"
        })
    }
}

const createCategoryInCourse = async (req, res) => {
    const courseId = req.params.courseId;
    const newCategory = new Category({ ...req.body })

    try {
        const savedCategory = await newCategory.save()

        await Course.findByIdAndUpdate(courseId, {
            $push: { categories: savedCategory._id }
        })

        res.status(200).json({
            success: true,
            message: "Successfully Category submitted",
            data: savedCategory
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to submit. Try again"
        })
    }
}

const getAllCategory = async (req, res) => {

    try {
        const getAllCategory = await Category.find({})
            .limit(8);

        res.status(200).json({
            success: true,
            count: getAllCategory.length,
            message: "Successfully get all",
            data: getAllCategory
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get all. Try again"
        })
    }
}

const getCategoryById = async (req, res) => {
    const cateId = req.params.cateId;

    try {
        const getCategoryById = await Category.findById(cateId)

        res.status(200).json({
            success: true,
            message: "Successfully get Category",
            data: getCategoryById
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get Category. Try again"
        })
    }
}

const updateCategory = async (req, res) => {
    const cateId = req.params.cateId;

    try {
        const updateCategory = await Category.findByIdAndUpdate(cateId, {
            $set: req.body
        }, { new: true })

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updateCategory
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update. Try again"
        })
    }
}

const deleteCategoryById = async (req, res) => {
    const cateId = req.params.cateId;

    try {
        const deleteCategoryById = await Category.findByIdAndDelete(cateId)

        res.status(200).json({
            success: true,
            message: "Successfully deleted",
            data: deleteCategoryById
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete. Try again"
        })
    }
}


module.exports = {
    createCategory,
    deleteCategoryById,
    getAllCategory,
    getCategoryById,
    updateCategory,
    createCategoryInCourse
}