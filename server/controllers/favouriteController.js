const { use } = require('passport');
const Course = require('../models/course');
const User = require('../models/user');
const { model } = require('mongoose');
const { getCourseNumOfEnrolled, checkCourseStatus } = require('./courseController');
const { getAvgRatingByCourseId } = require('./ratingController');


const addCourseToFavourite = async (req, res, next) => {
    const courseId = req.body.courseId;
    const userId = req.user.id;
    if(!req.body.action) 
        return res.status(400).json({
        success: false,
        message: "Please provide an action: add or remove in req body"
    });

    if(req.body.action == "remove") {
        return next();
    }

    try {
        let user = await User.findById(userId).populate("favouriteCourses");
        const existCourseInFavourite = user.favouriteCourses.some(course => course._id.toString() === courseId)

        // Check if the course already exists in the cart
        if (existCourseInFavourite) {
            return res.status(404).json({
                success: true,
                message:"Course already exists in the wishlist",
            });
        }
        const newCourse = await Course.findById(courseId); 
        // Add the course to the wishlist
        user.favouriteCourses.push(newCourse);
        await user.save();

        const promises = user.favouriteCourses.map(async (course) => {
            const numOfEnrolledUsers = await getCourseNumOfEnrolled(course._id);
            const ratingInfo = await getAvgRatingByCourseId(course._id)
            // const courseStatus = await checkCourseStatus(course._id)
            return { ...course.toObject(), numOfEnrolledUsers, ratingInfo }; // Add enrolled number to the course object
        });
        // Wait for all promises to resolve
        const coursesWithEnrolledNumbers = await Promise.all(promises)
        .catch(error => {
            console.error('One of the promises failed:', error); // Log the specific promise rejection error
            return [];
        });

        return res.status(200).json({
            success: true,
            message: "Course added to wishlist successfully",
            data: coursesWithEnrolledNumbers
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
        const user = await User.findById(userId).populate("favouriteCourses");
        const existCourseInFavourite = user.favouriteCourses.some(course => course._id.toString() === courseId)

        // Check if the user and the course exist in the user's favouriteCourses
        if (existCourseInFavourite) {
            const index = user.favouriteCourses.indexOf(courseId);
            user.favouriteCourses.splice(index, 1)
            await user.save();


            const promises = user.favouriteCourses.map(async (course) => {
                const numOfEnrolledUsers = await getCourseNumOfEnrolled(course._id);
                const ratingInfo = await getAvgRatingByCourseId(course._id)
                // const courseStatus = await checkCourseStatus(course._id)
                return { ...course.toObject(), numOfEnrolledUsers, ratingInfo }; // Add enrolled number to the course object
            });
            // Wait for all promises to resolve
            const coursesWithEnrolledNumbers = await Promise.all(promises)
            .catch(error => {
                console.error('One of the promises failed:', error); // Log the specific promise rejection error
                return [];
            });
            return res.status(200).json({
                success: true,
                message: "Course removed successfully",
                data: coursesWithEnrolledNumbers
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Course not found in the favourite list"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to remove course from favourite list'
        });
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

        //add on fields
        const promises = wishList.favouriteCourses.map(async (course) => {
            const numOfEnrolledUsers = await getCourseNumOfEnrolled(course._id);
            const ratingInfo = await getAvgRatingByCourseId(course._id)
            // const courseStatus = await checkCourseStatus(course._id)
            return { ...course.toObject(), numOfEnrolledUsers, ratingInfo }; // Add enrolled number to the course object
        });

        // Wait for all promises to resolve
        const coursesWithEnrolledNumbers = await Promise.all(promises)
        .catch(error => {
            console.error('One of the promises failed:', error); // Log the specific promise rejection error
            return [];
        });
        
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