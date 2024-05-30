var express = require('express');
const { createCategory, getAllCategory, getCategoryById, updateCategory, deleteCategoryById, createCategoryInCourse } = require('../controllers/categoryController');
// const { verifyAdmin } = require('../utils/verifyToken');

const categoryRoute = express.Router();

categoryRoute.get("/", getAllCategory);
categoryRoute.get("/:cateId", getCategoryById);
categoryRoute.post("/", createCategory);
categoryRoute.post("/:courseId", createCategoryInCourse);
categoryRoute.put("/:cateId", updateCategory);
categoryRoute.delete("/:cateId", deleteCategoryById);



module.exports = categoryRoute;