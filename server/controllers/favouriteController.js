const { use } = require('passport');
const Course = require('../models/course');
const User = require('../models/user');
const { model } = require('mongoose');
const { getCourseNumOfEnrolled } = require('./courseController');


const addCourseToFavourite = async (req, res, next) => {
    if(!req.body.action) 
        return res.status(400).json({
        success: false,
        message: "Please provide an action: add or remove in req body"
    });

    if(req.body.action == "remove") {
        return next();
    }

    const courseId = req.body.courseId;
    const userId = req.user.id;

    try {
        let user = (await User.findById(userId));

        // Check if the course already exists in the cart
        if (user.favouriteCourses.includes(courseId)) {
            return res.status(200).json({
                success: true,
                message:"Course already exists in the wishlist",
                data: {
                    "favouriteCourses": user.favouriteCourses
                }
            });
        }

        // Add the course to the wishlist
        user.favouriteCourses.push(courseId);
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Course added to wishlist successfully",
            data: {
                user
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to add course. Try again"
        });
    } 
}

const removeCourseFromFavourite = async (req, res) => {
    const courseId = req.body.courseId;
    const userId = req.user.id;
    try {
        let user = await User.findById(userId);


        // Remove the course from the cart
        const index = user.favouriteCourses.indexOf(courseId);
        if (index !== -1) {
            user.favouriteCourses.splice(index, 1);
            await user.save();
            return res.status(200).json({
                success: true,
                message: "Course remove successfully",
                data: {
                    user
                }
            })
        } else {
            return res.status(200).json({
                success: false,
                message: "Course not found in the cart"
            })
        }
    } catch (error) {
        return { message: 'Failed to remove course from cart' };
    }
} 

const getFavouriteByUserId = async (req, res) => {
    const userId = req.user.id;
    try {
        const wishList = await User.findById(userId)
        .populate({
            path: 'favouriteCourses',
            // rating:
            populate: {
                path: 'instructor',
                model: User,
                select: 'id name'
            }
        })

        // for (let i = 0; i < wishList.favouriteCourses.length; i++) {
        //     const courseId = wishList.favouriteCourses[i]._id; // Assuming the course id field is '_id'
        //     const numOfEnrolledUsers = getCourseNumOfEnrolled(courseId); // Call a helper function to get enrolled number
        //     wishList.favouriteCourses[i].numOfEnrolledUsers = numOfEnrolledUsers; // Add enrolled number to the course object
        // }

        const promises = wishList.favouriteCourses.map(async (course) => {
            const numOfEnrolledUsers = await getCourseNumOfEnrolled(course._id);
            return { ...course.toObject(), numOfEnrolledUsers }; // Add enrolled number to the course object
        });

        // Wait for all promises to resolve
        const coursesWithEnrolledNumbers = await Promise.all(promises);
        


        return res.status(200).json({
            success: true,
            message: "Successfully get Favourite",
            data: coursesWithEnrolledNumbers
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get Favourite. Try again"
        })
    }
}

module.exports = {
    getFavouriteByUserId,
    removeCourseFromFavourite,
    addCourseToFavourite,
}