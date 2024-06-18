const Rating = require('../models/rating')
const User = require('../models/user')
const Course = require('../models/course')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const createRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId, rating: newRatingValue } = req.body;

        const existCourse = await Course.findOne({ _id: courseId });

        if (!existCourse) {
            return res.status(400).json({ error: 'Course does not exist' });
        }

        // Check if the user is enrolled in the course
        const isEnrolled = await User.findOne({ _id: userId, coursesEnrolled: { $in: courseId } });

        if (!isEnrolled) {
            return res.status(400).json({ error: 'User is not enrolled in the course' });
        }

        // Check if a rating already exists for the user and course
        const existingRating = await Rating.findOne({ user: userId, course: courseId });

        if (existingRating) {
            // Update the existing rating
            existingRating.rate = newRatingValue;
            await existingRating.save();
            return res.status(200).json({ message: 'Rating updated successfully', data: existingRating });
        } else {
            // Create a new rating instance
            const newRating = new Rating({
                user: userId,
                course: courseId,
                rate: newRatingValue
            });

            // Save the new rating to the database
            await newRating.save();

            // Send the response with correct structure
            return res.status(201).json({ message: 'Rating created successfully', data: newRating });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const getAvgRatingByCourseId = async (courseId) => {
    try {
        // Find all ratings for the specified course
        const ratings = await Rating.find({ course: courseId });

        if (ratings.length === 0) return {
            avgRating : 0, numOfRates: ratings.length
        }; 
        
        const totalRating = ratings.reduce((acc, curr) => acc + curr.rate, 0);

        // Calculate the average rating
        const avgRating = totalRating / ratings.length;
        return {
            avgRating, numOfRates: ratings.length
        }
    } catch (error) {
        return -1; // Return -1 if an error occurs
    }
};

module.exports = {
    createRating,
    getAvgRatingByCourseId
}




